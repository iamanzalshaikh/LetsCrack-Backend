import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { env } from '../config/env.js';
import logger from './logger.js';
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
const parseJsonSafely = (text) => {
    const cleaned = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
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
      1. Provide a verbatim transcript of the audio.
      2. Assign a CELPIP Band (1 to 12) based on official standards.
      3. Evaluate four criteria (each 1 to 12): Coherence, Vocabulary, Listenability, and Task Fulfillment.
      4. Provide constructive feedback for the student in 2-3 sentences.

      IMPORTANT: Return your response ONLY as a JSON object with this exact structure:
      {
        "transcript": "Verbatim transcript here...",
        "aiBand": Number,
        "analysis": {
          "coherence": Number,
          "vocabulary": Number,
          "listenability": Number,
          "taskFulfillment": Number,
          "feedback": "Constructive feedback here..."
        }
      }
    `;
        // 3. Send to Gemini
        const result = await model.generateContent([
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
        const cleanedJson = resultText.replace(/```json|```/g, '').trim();
        const parsedResult = JSON.parse(cleanedJson);
        logger.info('AI grading completed successfully');
        return parsedResult;
    }
    catch (error) {
        logger.error('Gemini AI Service Error:', error);
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
/** Phase 1: compact JSON — arrives much faster than a single mega-response so the UI / sockets update quickly. */
export const gradeWritingTaskPhase1Scores = async (responseText, taskPrompt, taskNumber = 1) => {
    const aiPrompt = `${celpipWritingSharedRubric(taskNumber)}

OUTPUT — return VALID JSON ONLY (no markdown fences). Do NOT include detailedFeedback, modelAnswer, or lineFeedback in this call.
Exact shape:
{
  "overallBand": number,
  "coherenceMeaning": number,
  "vocabulary": number,
  "readability": number,
  "taskFulfillment": number,
  "categoryBullets": {
    "coherenceMeaning": ["3–4 bullets, each one short clause"],
    "vocabulary": ["3–4 bullets"],
    "readability": ["3–4 bullets"],
    "taskFulfillment": ["3–4 bullets"]
  },
  "overallRemark": "One balanced paragraph, 3-5 sentences: strengths + weaknesses + level.",
  "strengths": ["3–6 specific strengths"],
  "improvements": ["3–6 specific improvements"],
  "quickTips": ["3–5 short actionable tips"]
}

Rules: All band fields integers 1–6. Tone: encouraging but honest; avoid generic copy-paste feedback.

FULL TASK PROMPT:
${taskPrompt}

STUDENT RESPONSE:
${responseText}
`;
    const scoredModel = genAI.getGenerativeModel({
        model: 'gemini-flash-latest',
        generationConfig: { maxOutputTokens: 1536 },
    });
    const result = await scoredModel.generateContent(aiPrompt);
    const resultText = result.response.text();
    const parsedResult = parseJsonSafely(resultText);
    const cm = clampCelpip6(parsedResult?.coherenceMeaning);
    const voc = clampCelpip6(parsedResult?.vocabulary);
    const read = clampCelpip6(parsedResult?.readability);
    const tf = clampCelpip6(parsedResult?.taskFulfillment);
    const overall = clampCelpip6(parsedResult?.overallBand) || clampCelpip6((cm + voc + read + tf) / 4);
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
    const overallRemark = String(parsedResult?.overallRemark || '').trim();
    return {
        overallBand: overall,
        aiBand: overall,
        coherenceMeaning: cm,
        vocabulary: voc,
        readability: read,
        taskFulfillment: tf,
        taskAchievement: tf,
        coherenceCohesion: cm,
        lexicalResource: voc,
        grammar: read,
        categoryBullets,
        overallRemark,
        strengths,
        improvements,
        quickTips,
    };
};
/** Phase 2: narrative + model answer — heavier; runs after bands are persisted. */
export const gradeWritingTaskPhase2Narrative = async (responseText, taskPrompt, taskNumber, anchor) => {
    const aiPrompt = `${celpipWritingSharedRubric(taskNumber)}

Scores were already finalized for this submission — keep your narrative CONSISTENT with them:
- Overall band: ${anchor.overallBand}/6
- Earlier summary: ${anchor.overallRemark}

OUTPUT — VALID JSON ONLY (no markdown fences), EXACT shape:
{
  "detailedFeedback": "Multi-paragraph CELPIP-trainer style: Overall summary → Coherence/Meaning → Vocabulary → Readability → Task fulfillment. Reference THIS student response specifically.",
  "lineFeedback": [
    { "original": "short excerpt from student text", "issue": "CELPIP-focused issue", "fix": "suggested improvement" }
  ],
  "modelAnswer": "A strong CELPIP-style model response for THIS task (~150–220 words unless the prompt dictates otherwise)."
}

Produce 3–6 lineFeedback items where useful; each original must be quoted from or clearly match the student's text.

FULL TASK PROMPT:
${taskPrompt}

STUDENT RESPONSE:
${responseText}
`;
    const narrativeModel = genAI.getGenerativeModel({
        model: 'gemini-flash-latest',
        generationConfig: { maxOutputTokens: 6144 },
    });
    const result = await narrativeModel.generateContent(aiPrompt);
    const resultText = result.response.text();
    const parsedResult = parseJsonSafely(resultText);
    const detailedFeedback = String(parsedResult?.detailedFeedback || '').trim();
    const modelAnswer = String(parsedResult?.modelAnswer || '').trim();
    const lineFeedback = Array.isArray(parsedResult?.lineFeedback)
        ? parsedResult.lineFeedback
            .slice(0, 6)
            .map((row) => {
            const r = row;
            return {
                original: String(r?.original || '').trim(),
                issue: String(r?.issue || '').trim(),
                fix: String(r?.fix || '').trim(),
            };
        })
            .filter((row) => row.original || row.issue || row.fix)
        : [];
    return { detailedFeedback, modelAnswer, lineFeedback };
};
export const mergeWritingPhasesToGradeResult = (taskNumber, p1, p2) => {
    const overall = p1.overallBand;
    const blendedFeedback = buildBlendedCelpipWritingFeedback(taskNumber, overall, p1.overallRemark, p1.categoryBullets, p2.detailedFeedback, p1.strengths, p1.improvements, p1.quickTips, p2.lineFeedback, p2.modelAnswer);
    return {
        overallBand: overall,
        aiBand: overall,
        coherenceMeaning: p1.coherenceMeaning,
        vocabulary: p1.vocabulary,
        readability: p1.readability,
        taskFulfillment: p1.taskFulfillment,
        taskAchievement: p1.taskAchievement,
        coherenceCohesion: p1.coherenceCohesion,
        lexicalResource: p1.lexicalResource,
        grammar: p1.grammar,
        categoryBullets: p1.categoryBullets,
        overallRemark: p1.overallRemark,
        detailedFeedback: p2.detailedFeedback,
        strengths: p1.strengths,
        improvements: p1.improvements,
        quickTips: p1.quickTips,
        lineFeedback: p2.lineFeedback,
        modelAnswer: p2.modelAnswer,
        analysis: {
            coherence: p1.coherenceMeaning,
            vocabulary: p1.vocabulary,
            readability: p1.readability,
            taskFulfillment: p1.taskFulfillment,
            feedback: blendedFeedback,
        },
    };
};
/**
 * CELPIP Writing (Tasks 1 & 2): band /6, four dimensions @25% each, CELPIP-style feedback (not IELTS).
 * Full single-call path (scripts / tests). Production worker uses phase1 + phase2 for faster first paint.
 */
export const gradeWritingTask = async (responseText, taskPrompt, taskNumber = 1) => {
    try {
        logger.info(`Starting CELPIP writing grading (task ${taskNumber})...`);
        const p1 = await gradeWritingTaskPhase1Scores(responseText, taskPrompt, taskNumber);
        const p2 = await gradeWritingTaskPhase2Narrative(responseText, taskPrompt, taskNumber, {
            overallBand: p1.overallBand,
            overallRemark: p1.overallRemark,
        });
        const merged = mergeWritingPhasesToGradeResult(taskNumber, p1, p2);
        logger.info('CELPIP AI Writing grading completed successfully');
        return merged;
    }
    catch (error) {
        logger.error('Gemini Writing AI Service Error:', error);
        throw new Error('Failed to process AI writing grading');
    }
};
export default { gradeSpeakingTask, gradeWritingTask };
//# sourceMappingURL=gemini.service.js.map