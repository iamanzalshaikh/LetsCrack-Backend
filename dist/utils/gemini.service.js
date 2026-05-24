import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { env } from '../config/env.js';
import logger from './logger.js';
/** Fresh client per call so a replaced GEMINI_API_KEY in .env works after server restart. */
const getFlashModel = () => new GoogleGenerativeAI(env.GEMINI_API_KEY).getGenerativeModel({
    model: env.GEMINI_MODEL,
    generationConfig: { maxOutputTokens: 2544, temperature: 0.3 }
});
const parseJsonSafely = (text) => {
    let cleaned = text.replace(/```json|```/g, '').trim();
    try {
        return JSON.parse(cleaned);
    }
    catch (e) {
        // Try to extract JSON structure if surrounded by conversational pre-amble/post-amble
        const startIdx = cleaned.indexOf('{');
        const endIdx = cleaned.lastIndexOf('}');
        if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
            let candidate = cleaned.substring(startIdx, endIdx + 1);
            try {
                return JSON.parse(candidate);
            }
            catch (innerErr) {
                // Attempt minor automatic repairs for common LLM JSON formatting issues
                try {
                    candidate = candidate
                        .replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
                        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ' '); // Clean control characters
                    return JSON.parse(candidate);
                }
                catch (repairErr) {
                    throw new Error(`JSON parsing failed: ${innerErr instanceof Error ? innerErr.message : String(innerErr)}. Tried repairing: ${repairErr instanceof Error ? repairErr.message : String(repairErr)}. Cleaned response: ${cleaned}`);
                }
            }
        }
        throw e;
    }
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * Robust wrapper for Gemini API calls to gracefully pause and retry upon transient errors
 * (e.g. per-minute 429 rate limits, 503 Service Unavailable).
 *
 * IMPORTANT DISTINCTION:
 * - "PerDay" quota = daily limit exhausted. Retrying in 15s won't help — must fail fast with clear error.
 * - "PerMinute" quota = temporary burst limit. Retrying after 15-30s will succeed once the window resets.
 */
const generateContentWithRetry = async (generativeModel, contents, maxAttempts = 3, initialDelayMs = 15000) => {
    let attempt = 0;
    while (attempt < maxAttempts) {
        try {
            attempt++;
            return await generativeModel.generateContent(contents);
        }
        catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            const errorMsgLower = errorMsg.toLowerCase();
            // --- DETECT DAILY QUOTA EXHAUSTION (cannot be retried, must fail fast) ---
            const isDailyQuota = errorMsgLower.includes('perday') ||
                errorMsgLower.includes('per_day') ||
                errorMsgLower.includes('requestsperdayperproject') ||
                (errorMsgLower.includes('quota') && errorMsgLower.includes('day'));
            if (isDailyQuota) {
                logger.error(`Gemini API DAILY QUOTA EXHAUSTED. This API key has hit its daily request limit and cannot process more requests today. Please replace the GEMINI_API_KEY in .env with a fresh key from Google AI Studio.`);
                throw new Error('DAILY_QUOTA_EXHAUSTED: Gemini API daily limit reached. Replace your API key.');
            }
            // --- DETECT TRANSIENT ERRORS (safe to retry with backoff) ---
            const isTransient = errorMsg.includes('429') ||
                errorMsgLower.includes('too many requests') ||
                errorMsgLower.includes('quota exceeded') ||
                errorMsg.includes('503') ||
                errorMsgLower.includes('service unavailable') ||
                errorMsgLower.includes('high demand') ||
                errorMsg.includes('500') ||
                errorMsgLower.includes('internal error') ||
                errorMsg.includes('504') ||
                errorMsgLower.includes('gateway timeout') ||
                error.status === 429 ||
                error.status === 503 ||
                error.status === 500 ||
                error.status === 504;
            if (isTransient && attempt < maxAttempts) {
                // Try to extract the exact retryDelay from Gemini error details (e.g. "retryDelay":"34s")
                let sleepTime = initialDelayMs * Math.pow(2, attempt - 1);
                try {
                    const retryInfoDetail = error.errorDetails?.find?.((d) => d['@type']?.includes('RetryInfo'));
                    if (retryInfoDetail?.retryDelay) {
                        const suggestedSeconds = parseInt(String(retryInfoDetail.retryDelay).replace(/[^0-9]/g, ''), 10);
                        if (!isNaN(suggestedSeconds) && suggestedSeconds > 0) {
                            sleepTime = (suggestedSeconds + 5) * 1000; // +5s buffer on top of suggested delay
                        }
                    }
                }
                catch { /* ignore parsing errors */ }
                logger.warn(`Gemini API Transient Error (${error.status || 'unknown'}). Retrying in ${sleepTime / 1000}s (Attempt ${attempt}/${maxAttempts})...`);
                await delay(sleepTime);
            }
            else {
                throw error;
            }
        }
    }
};
/**
 * Grades a speaking task using Gemini 1.5 Flash
 * @param audioUrl - Public URL of the audio (e.g. Cloudinary)
 * @param taskPrompt - The original question prompt the student answered
 * @returns {Promise<any>} - A JSON object containing transcript, band, and analysis
 */
export const gradeSpeakingTask = async (audioUrl, taskPrompt) => {
    try {
        logger.info(`Starting AI grading for audio: ${audioUrl}`);
        // 1. Fetch audio by URL
        const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
        const audioBase64 = Buffer.from(response.data).toString('base64');
        // 2. Prepare the AI prompt
        const aiPrompt = `
      You are an expert CELPIP Speaking Examiner. Analyze the provided audio response to this prompt: 
      "${taskPrompt}"

      Your goal is to:
      1. Provide a highly accurate, word-for-word verbatim transcript of the student's speech in the audio. Do NOT omit, clean up, or summarize their words (include raw repetitions, filler words, or slips of the tongue if present).
         - CRITICAL SILENCE/EMPTY RULE: If the audio file is completely silent, contains only background static/noise, or has no audible human speech answering the prompt, you MUST set "transcript" to "[No speech detected]", set all scoring bands (overall band and criteria subscores) to 1, and set the feedback to "No speech was detected in your recording. Please ensure your microphone is working and speak clearly into the mic.". Under no circumstances should you hallucinate, guess, or invent a spoken response if there is no human voice speaking.
      2. Assign a CELPIP Band (1 to 12) based on official standards.
      3. Evaluate four criteria (each 1 to 12): Coherence, Vocabulary, Listenability, and Task Fulfillment.
      4. Provide constructive feedback for the student in 2-3 sentences.
      5. Provide a high-scoring (CELPIP Band 10-12) model spoken response (as text) that shows the student how they could have answered the prompt perfectly in ~150-200 words.

      IMPORTANT: Return your response ONLY as a JSON object with this exact structure:
      {
        "transcript": "Verbatim transcript here...",
        "aiBand": Number,
        "analysis": {
          "coherence": Number,
          "vocabulary": Number,
          "listenability": Number,
          "taskFulfillment": Number,
          "feedback": "Constructive feedback here...",
          "modelAnswer": "High-scoring model spoken response here..."
        }
      }
    `;
        // 3. Send to Gemini
        const result = await generateContentWithRetry(getFlashModel(), [
            aiPrompt,
            {
                inlineData: {
                    data: audioBase64,
                    mimeType: "audio/webm"
                }
            }
        ]);
        const resultText = result.response.text();
        // 4. Parse and return JSON
        const parsedResult = parseJsonSafely(resultText);
        logger.info('AI grading completed successfully');
        return parsedResult;
    }
    catch (error) {
        logger.error('Gemini AI Service Error:', error);
        if (error instanceof Error && error.message.includes('DAILY_QUOTA_EXHAUSTED')) {
            throw error;
        }
        throw new Error('Failed to process AI grading');
    }
};
const clampCelpip6 = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n))
        return 0;
    return Math.max(1, Math.min(6, Math.round(n)));
};
const safeStrList = (value, max) => Array.isArray(value) ? value.slice(0, max).map((v) => String(v).trim()).filter(Boolean) : [];
const writingTask1Block = `
TASK 1 — WRITING AN EMAIL (when taskNumber is 1):
Evaluate: email structure, professionalism, paragraphing, formal/semi-formal/informal tone *as appropriate to the scenario*, clarity of request, ALL bullet points covered, purpose-driven communication.
Penalize: missing bullet points, missing email structure, wrong tone for the scenario, slang where inappropriate, abrupt endings.
Tone: Match scenario — formal (manager/institution), semi-formal (neighbor/colleague), or informal when writing to a friend/cousin; contractions and warmth are OK when the scenario allows.
`;
const writingTask2Block = `
TASK 2 — RESPONDING TO SURVEY QUESTIONS (when taskNumber is 2):
This is opinion-based, persuasive, experience-oriented — NOT the same rubric as Task 1.
Reward: clear opinion (A or B), reasons, personal examples, depth, persuasion, consistency.
Penalize: shallow/generic arguments, weak justification, switching sides unclearly, repetition without development.
CRITICAL: Task 2 may be written EITHER as (A) standard paragraph opinion essay OR (B) email-style with greeting/sign-off.
NEVER penalize email format, greeting, or sign-off in Task 2 alone — score substance: opinion, support, organization, clarity.
`;
const celpipWritingSharedRubric = (taskNumber) => `
You are an expert CELPIP Writing assessor. Evaluate the student's response using official CELPIP-style performance standards (NOT IELTS).

OVERALL GOAL
- Assign ONE overall band out of 6 for THIS task only (Task ${taskNumber} = /6).
- Score four parameters (each weighted 25%, each scored 1–6): Coherence/Meaning, Vocabulary, Readability, Task Fulfillment.
- Prioritize communicative success, organization, clarity, task completion, readability, and natural expression.
- Do NOT mechanically average grammar, over-penalize minor slips, or score mainly on rare vocabulary.

WORD COUNT (both tasks; typical target ~150–200 words from prompt)
- ~150–220: no penalty if quality is strong.
- 221–230: still acceptable; light note only if verbosity hurts clarity.
- Under 150: moderate penalty mainly in Task Fulfillment and Coherence/Meaning if ideas are under-developed — but a concise, strong answer is not auto-failed.
- Beyond ~230–240: mild penalty ONLY if repetition, drift, or weakened organization/readability — never penalize length alone.

FOUR PARAMETERS (each 1–6, whole numbers)
1) Coherence/Meaning — idea clarity, organization, logical flow, paragraph unity, transitions, depth.
2) Vocabulary — range, precision, natural collocations; reward natural accurate words over forced “fancy” words.
3) Readability — grammar, punctuation, sentence variety and control; minor errors OK if meaning is clear.
4) Task Fulfillment — completeness, instructions, relevance, tone fit, word count fit as above.

BAND ANCHORS (holistic)
- 1–2: meaning often unclear / severe issues / major task gaps
- 3–4: basic communication; noticeable limits
- 5: generally effective; some weaknesses; mostly organized
- 6: strong control; well-developed; very minor slips only

${taskNumber === 1 ? writingTask1Block : writingTask2Block}`;
/** Single feedback string merged from structured writing fields — used after phase updates. */
export const buildBlendedCelpipWritingFeedback = (taskNumber, overall, overallRemark, categoryBullets, detailedFeedback, strengths, improvements, quickTips, lineFeedback, modelAnswer) => {
    const boxSection = [
        'CELPIP-style category summary',
        '',
        'Coherence / Meaning',
        ...categoryBullets.coherenceMeaning.map((b) => `• ${b}`),
        '',
        'Vocabulary',
        ...categoryBullets.vocabulary.map((b) => `• ${b}`),
        '',
        'Readability',
        ...categoryBullets.readability.map((b) => `• ${b}`),
        '',
        'Task fulfillment',
        ...categoryBullets.taskFulfillment.map((b) => `• ${b}`),
    ].join('\n');
    return [
        `Overall band (CELPIP Writing Task ${taskNumber}): ${overall}/6`,
        '',
        'Overall remark',
        overallRemark,
        '',
        boxSection,
        '',
        ...(detailedFeedback.trim()
            ? ['Detailed feedback', detailedFeedback.trim(), '']
            : ['Detailed feedback — expanded analysis is loading…']),
        strengths.length ? `Strengths:\n${strengths.map((s) => `- ${s}`).join('\n')}` : '',
        improvements.length ? `Areas to improve:\n${improvements.map((s) => `- ${s}`).join('\n')}` : '',
        quickTips.length ? `Quick tips:\n${quickTips.map((s) => `- ${s}`).join('\n')}` : '',
        lineFeedback.length
            ? `Line-level feedback:\n${lineFeedback.map((row) => `- ${row.original}\n  → ${row.issue}\n  Suggested: ${row.fix}`).join('\n')}`
            : '',
        modelAnswer.trim()
            ? `Model answer (study example — not the student’s text):\n${modelAnswer.trim()}`
            : '',
    ]
        .filter(Boolean)
        .join('\n\n');
};
/**
 * Unified CELPIP Writing Grading: Scores + Detailed Narrative + Model Answer in one high-speed pass.
 * This eliminates sequential latencies and network round-trips, making responses 'quick fast'.
 */
export const gradeWritingTask = async (responseText, taskPrompt, taskNumber = 1) => {
    try {
        logger.info(`Starting Unified CELPIP writing grading (task ${taskNumber})...`);
        const aiPrompt = `${celpipWritingSharedRubric(taskNumber)}

OUTPUT — return VALID JSON ONLY (no markdown fences). 
EXACT shape:
{
  "overallBand": number,
  "coherenceMeaning": number,
  "vocabulary": number,
  "readability": number,
  "taskFulfillment": number,
  "categoryBullets": {
    "coherenceMeaning": ["3–4 bullets"],
    "vocabulary": ["3–4 bullets"],
    "readability": ["3–4 bullets"],
    "taskFulfillment": ["3–4 bullets"]
  },
  "overallRemark": "One balanced paragraph summary.",
  "detailedFeedback": "Multi-paragraph expanded analysis: Overall → Parameters. Reference student text.",
  "strengths": ["3–6 specific strengths"],
  "improvements": ["3–6 specific improvements"],
  "quickTips": ["3–5 short tips"],
  "lineFeedback": [
    { "original": "student text excerpt", "issue": "explanation", "fix": "correction" }
  ],
  "modelAnswer": "A professional CELPIP-style study response (~150–220 words)."
}

Rules: 
- Bands are integers 1–6. 
- feedback must be encouraging yet critical. 
- lineFeedback: 3–6 items.

FULL TASK PROMPT:
${taskPrompt}

STUDENT RESPONSE:
${responseText}
`;
        const unifiedModel = new GoogleGenerativeAI(env.GEMINI_API_KEY).getGenerativeModel({
            model: env.GEMINI_MODEL,
            generationConfig: { maxOutputTokens: 6144, temperature: 0.7 },
        });
        const result = await generateContentWithRetry(unifiedModel, aiPrompt);
        const resultText = result.response.text();
        const parsedResult = parseJsonSafely(resultText);
        // 1. Normalize scores
        const cm = clampCelpip6(parsedResult?.coherenceMeaning);
        const voc = clampCelpip6(parsedResult?.vocabulary);
        const read = clampCelpip6(parsedResult?.readability);
        const tf = clampCelpip6(parsedResult?.taskFulfillment);
        const overall = clampCelpip6(parsedResult?.overallBand) || clampCelpip6((cm + voc + read + tf) / 4);
        // 2. Normalize feedback blocks
        const strengths = safeStrList(parsedResult?.strengths, 8);
        const improvements = safeStrList(parsedResult?.improvements, 8);
        const quickTips = safeStrList(parsedResult?.quickTips, 6);
        const rawBullets = (parsedResult?.categoryBullets || {});
        const categoryBullets = {
            coherenceMeaning: safeStrList(rawBullets?.coherenceMeaning, 4),
            vocabulary: safeStrList(rawBullets?.vocabulary, 4),
            readability: safeStrList(rawBullets?.readability, 4),
            taskFulfillment: safeStrList(rawBullets?.taskFulfillment, 4),
        };
        const lineFeedback = Array.isArray(parsedResult?.lineFeedback)
            ? parsedResult.lineFeedback
                .slice(0, 6)
                .map((row) => ({
                original: String(row?.original || '').trim(),
                issue: String(row?.issue || '').trim(),
                fix: String(row?.fix || '').trim(),
            }))
                .filter((row) => row.original || row.issue || row.fix)
            : [];
        const detailedFeedback = String(parsedResult?.detailedFeedback || '').trim();
        const modelAnswer = String(parsedResult?.modelAnswer || '').trim();
        const overallRemark = String(parsedResult?.overallRemark || '').trim();
        // 3. Build the blended feedback string for storage/legacy views
        const blendedFeedback = buildBlendedCelpipWritingFeedback(taskNumber, overall, overallRemark, categoryBullets, detailedFeedback, strengths, improvements, quickTips, lineFeedback, modelAnswer);
        logger.info('Unified CELPIP AI Writing grading completed successfully');
        return {
            overallBand: overall,
            aiBand: overall,
            coherenceMeaning: cm,
            vocabulary: voc,
            readability: read,
            taskFulfillment: tf,
            categoryBullets,
            overallRemark,
            detailedFeedback,
            strengths,
            improvements,
            quickTips,
            lineFeedback,
            modelAnswer,
            analysis: {
                coherence: cm,
                vocabulary: voc,
                readability: read,
                taskFulfillment: tf,
                feedback: blendedFeedback,
            },
        };
    }
    catch (error) {
        logger.error('Unified Gemini Writing AI Service Error:', error);
        throw new Error('Failed to process unified AI writing grading');
    }
};
export default { gradeSpeakingTask, gradeWritingTask };
//# sourceMappingURL=gemini.service.js.map