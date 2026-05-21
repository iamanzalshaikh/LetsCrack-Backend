import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_BASE = 'http://localhost:5000/api';
async function runTests() {
    console.log('🚀 Starting Full API Flow Test...\n');
    try {
        // 1. Health Check
        console.log('📡 Testing Server Health...');
        const health = await axios.get('http://localhost:5000/');
        console.log('✅ Server is up:', health.data.message);
        // 2. Fetch Speaking Tasks (Public check)
        console.log('\n🎙️ Testing Speaking Task Fetch (Set 1, Task 1)...');
        try {
            const task = await axios.get(`${API_BASE}/speaking/task/1?testSetNumber=1`);
            console.log('✅ Task fetched successfully:', task.data.prompt.substring(0, 50) + '...');
        }
        catch (e) {
            console.log('ℹ️ Task 1 not found in DB yet or route is protected.');
        }
        // 3. Admin: Attempt to list users (Check middleware)
        console.log('\n🔐 Testing Admin Protected Route Access...');
        try {
            await axios.get(`${API_BASE}/admin/users`);
            console.log('❌ Error: Accessed protected route without token!');
        }
        catch (e) {
            console.log('✅ Middleware Working: Access Denied as expected (No Token).');
        }
        console.log('\n--- Basic flow tests complete ---');
        console.log('To test audio uploads and AI grading, run: npx tsx src/scripts/test-gemini.ts');
    }
    catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}
runTests();
//# sourceMappingURL=test-api-flow.js.map