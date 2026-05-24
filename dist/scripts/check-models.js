import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
async function listModels() {
    try {
        const key = process.env.GEMINI_API_KEY || '';
        console.log('Using API Key:', key.substring(0, 10) + '...' + key.substring(key.length - 5));
        console.log('Listing all available models...');
        // The SDK for Node has a slightly different way to list models sometimes, 
        // but we can try iterating through common ones or using the REST API if needed.
        // In @google/generative-ai, listing models isn't always directly exposed.
        // Let's try the most basic ones that usually work.
        const models = ["gemini-flash-latest", "gemini-1.5-flash-latest", "gemini-1.5-pro-latest", "gemini-pro", "gemini-1.5-flash"];
        for (const modelName of models) {
            try {
                console.log(`Testing ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Keep it short: Hello");
                console.log(`✅ Success with ${modelName}: ${result.response.text()}`);
                return; // Stop if we find one that works
            }
            catch (e) {
                console.log(`❌ Failed with ${modelName}:`, e);
            }
        }
    }
    catch (e) {
        console.error('ListModels Error:', e.message);
    }
}
listModels();
//# sourceMappingURL=check-models.js.map