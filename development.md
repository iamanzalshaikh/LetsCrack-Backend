LET'S CRACK ENGLISH
CELPIP Platform - Cursor IDE Development Guide
Complete End-to-End Development Guide v1.0
April 2026 | Production-Ready | MERN Stack
TABLE OF CONTENTS
1. Quick Start with Cursor IDE
2. Project Structure & Setup
3. Environment Configuration
4. Database Setup (MongoDB)
5. Backend API Development (Node.js + Express)
6. Frontend Development (React)
7. Writing Module Implementation
8. Speaking Module Implementation
9. Examiner & Admin Dashboards
10. Testing & Debugging with Cursor
11. Deployment Checklist
1. Quick Start with Cursor IDE
1.1 Cursor Setup
Install Cursor and open the project directory:
• Download Cursor from cursor.com
• Open terminal and navigate to project root
• Type: cursor . (to open in Cursor)
Essential Cursor Features for This Project:
• Cmd+K (macOS) or Ctrl+K (Windows) - AI chat within editor
• Cmd+Shift+K / Ctrl+Shift+K - Generate code with context
• Cmd+L / Ctrl+L - Long chat for complex architectural questions
• Terminal integration - Built-in terminal for npm/bash commands
1.2 Initial Project Clone & Dependencies
Run in Cursor Terminal (Ctrl+` or View > Terminal):
Backend Setup Frontend Setup
cd backend
npm install
cp .env.example .env
cd frontend
npm install
cp .env.example .env
Verify installations:
• node --version (should be v18+)
• npm --version
• mongodb --version (if local, optional for Atlas)
2. Project Structure & Setup
2.1 Directory Tree
Recommended project layout:
• lce-celpip-platform/ ← Root directory
• ├── backend/ ← Node.js + Express API
• │ ├── src/
• │ │ ├── models/ ← Mongoose schemas
• │ │ ├── routes/ ← API endpoints
• │ │ ├── controllers/ ← Business logic
• │ │ ├── middleware/ ← Auth, validation
• │ │ ├── utils/ ← Helpers
• │ │ └── server.js ← Entry point
• │ ├── .env ← Secrets (not committed)
• │ └── package.json
• ├── frontend/ ← React + Vite
• │ ├── src/
• │ │ ├── components/ ← Reusable React components
• │ │ ├── pages/ ← Full page components
• │ │ ├── hooks/ ← Custom React hooks
• │ │ ├── services/ ← API calls
• │ │ ├── context/ ← Global state
• │ │ └── App.jsx ← Root component
• └── docs/ ← Documentation (this guide)
2.2 Using Cursor's Workspace Features
Cursor supports multi-folder workspaces. Add both backend and frontend to your workspace:
• File > Add Folder to Workspace
• Select /backend → Add
• File > Add Folder to Workspace
• Select /frontend → Add
• Now Cmd+P search works across both folders
2.3 Cursor Settings for This Project
Create .cursor/settings.json in project root:
{
 "editor.defaultFormatter": "esbenp.prettier-vscode",
 "editor.formatOnSave": true,
 "editor.rulers": [80, 120],
 "files.watcherExclude": { "**/node_modules": true }
}
3. Environment Configuration
3.1 Backend .env File
Create backend/.env with these variables:
Variable Value / Example
PORT 5000
MONGODB_URI mongodb+srv://
user:pass@cluster.mongodb.net/lce
JWT_SECRET (32+ random chars)
AWS_ACCESS_KEY_ID (from AWS IAM)
AWS_SECRET_ACCESS_KEY (from AWS IAM)
AWS_S3_BUCKET lce-celpip-bucket
AWS_REGION us-east-1
Generate JWT_SECRET safely:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Frontend .env File
Create frontend/.env:
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Let's Crack English
4. Database Setup (MongoDB)
4.1 Using MongoDB Atlas (Recommended)
• Go to mongodb.com/cloud/atlas
• Sign up for free tier (M0)
• Create cluster → wait 5-10 minutes
• Security > Database Access: Create username/password
• Network Access: Add IP 0.0.0.0/0 (for dev only)
• Copy connection string → paste into .env
4.2 Database Schemas (Creating Collections)
Run in Cursor Terminal from /backend:
npm run seed
This creates 5 main collections:
• Users - Students, Examiners, Admins
• TestSessions - Active/completed tests
• TestResults - Scoring and bands
• QuestionBank - Writing/Speaking tasks
• ExaminerAssignments - Auto-assignment logic
Creating Indexes for Performance
In MongoDB Atlas > Collections, add these indexes:
Collection Index Fields
Users email (unique)
TestSessions studentId, testSetNumber
TestResults studentId, publishedAt
5. Backend API Development (Node.js + Express)
5.1 Project Dependencies
Core packages for backend/package.json:
Package Purpose
express Web framework
mongoose MongoDB ORM
jsonwebtoken (jwt) Authentication
bcrypt Password hashing
aws-sdk S3 uploads
dotenv Environment variables
cors Cross-origin requests
Install with:
npm install express mongoose jsonwebtoken bcrypt aws-sdk dotenv cors
5.2 File Structure for Clarity
Use Cursor's code generation to create these files. Open backend/src and use Ctrl+Shift+K:
• models/User.js - Schema for users
• models/TestSession.js - Schema for active tests
• models/TestResult.js - Schema for scored results
• routes/auth.js - /api/auth/* endpoints
• routes/writing.js - /api/writing/* endpoints
• routes/speaking.js - /api/speaking/* endpoints
• middleware/auth.js - JWT verification
• middleware/validation.js - Input validation
• server.js - Express app entry point
5.3 Starting the Backend Server
In Cursor Terminal (cd to backend/):
npm run dev
Expected: Server running on http://localhost:5000
5.4 Building API Routes with Cursor
Use Cursor's chat (Cmd+K) to generate endpoints. Example:
Prompt in Cursor Chat:
• "Create a POST /api/auth/register endpoint with email validation"
• Cursor generates the full code with error handling
• Review, accept, and test immediately
5.5 Testing API Endpoints
Use REST Client extension in Cursor for quick testing:
Create backend/test.http:
POST http://localhost:5000/api/auth/register
Content-Type: application/json
 {
 "email": "student@example.com",
 "password": "SecurePass123!"
}
Click "Send Request" above the endpoint. Cursor shows response in-editor.
6. Frontend Development (React + Vite)
6.1 Frontend Dependencies
Core packages for frontend/package.json:
Package Purpose
react UI library
react-router-dom Routing
axios HTTP client
tailwindcss CSS utility framework
Install with:
npm install react react-router-dom axios tailwindcss
6.2 Starting the Frontend
In Cursor Terminal (cd to frontend/):
npm run dev
Expected: http://localhost:5173
6.3 Building Pages with Cursor
Create pages like WritingTask1.jsx. Use Cursor's code generation:
• Create frontend/src/pages/WritingTask1.jsx
• Use Ctrl+Shift+K: "Create a React component for writing task with timer and auto-save"
• Cursor generates functional component with hooks
Auto-Save Implementation
Key pattern for Writing module - auto-save every 30 seconds:
// In WritingTask1.jsx
const [text, setText] = useState('');
const [saving, setSaving] = useState(false);
 useEffect(() => {
 const interval = setInterval(() => {
 autoSaveResponse();
 }, 30000); // 30 seconds
 return () => clearInterval(interval);
}, [text]);
7. Writing Module Implementation
7.1 Screen Flow
Writing module follows this screen sequence:
12. Practice Test Landing Page
13. Practice Test Info Page
14. Writing Instructions
15. Instructional Video (41 sec)
16. Writing Task 1 (Email, 27 minutes)
17. Writing Task 2 (Survey, 26 minutes)
18. End of Writing Test
7.2 Color Scheme
Use these colors in all components:
Purpose Color Hex Code
Headers #1B3A6B
Buttons #2563EB
Alerts #EF4444
7.3 Task 1: Email Writing
Layout: 35% left panel (scenario), 65% right panel (task + editor)
• Timer: 27 minutes (countdown, red at <5 min)
• Editor: Plain text, 250px min height, word count display
• Auto-save: Every 30 seconds (show subtle "Saving..." indicator)
• Modal: "View sample responses" shows CLB 10-12 level response
7.4 Task 2: Survey Response
CRITICAL: Editor HIDDEN until student selects Option A or B
• Radio buttons for Option A and Option B
• On selection: Editor appears + task prompt
• Timer: 26 minutes (starts on screen load, NOT after selection)
• Save selected option to database
Using Cursor to Build Task 2
Prompt:
• "Create WritingTask2.jsx with conditional rendering:"
• "Show radio buttons first, then text editor after selection"
• "Include 26-minute countdown timer"
8. Speaking Module Implementation
8.1 Task Overview
8 scored tasks + 1 practice (unscored). Each has two phases:
• Phase 1: Preparation (30-60 sec) - read prompt, see image
• Phase 2: Recording (60-90 sec) - microphone records voice
8.2 Audio Recording with Web Audio API
Use Cursor to generate audio recording code. Ask:
• "Create SpeakingRecorder.jsx component using Web Audio API"
• "Capture microphone as WebM format"
• "Upload to S3 with FormData"
8.3 Microphone Permission Handling
Request on first task access:
navigator.mediaDevices.getUserMedia({ audio: true })
 .then(stream => { /* save stream */ })
 .catch(() => showAlert('Microphone denied'));
On denial: "Microphone not available. Check settings and try again."
8.4 Task 5 (Special Case): Comparing & Persuading
This is a 2-part task:
• Part 1 (60-sec prep): Show 2 images side-by-side, student selects preferred
• No recording in Part 1
• Part 2 (60-sec prep + 60-sec recording): Student persuades listener
• Recording happens in Part 2 only
9. Examiner & Admin Dashboards
9.1 Examiner Dashboard
Examiners score submitted responses. Build with Cursor:
• Landing: Table of pending submissions
• Click "Score": Open scoring form
• LEFT: Response text (Writing) or audio player (Speaking)
• RIGHT: 4 criteria dropdowns (1-12 per criterion)
• Optional feedback textarea (max 500 chars)
• SUBMIT locks form, saves scores
9.2 Scoring Criteria
Every response scored on 4 criteria (1-12 each):
Criterion Definition Look For
Content/Coherence Ideas, organization, details Clear main ideas? Good
examples?
Vocabulary Word choice, range, precision Good variety? Correct usage?
Readability Grammar, sentence structure Easy to follow? Good flow?
Task Fulfillment Relevance, completeness, tone Followed instructions?
Complete?
9.3 Admin Dashboard
Admin manages content and system:
• Question Bank: Upload writing scenarios & speaking prompts
• Test Slots: Create available test dates/times
• Users: Manage student/examiner accounts
• Test Results: Publish scores → sends email to students
Question Bank Upload Form
For Writing Tasks:
• Test Set Number: Dropdown (Set 1, Set 2, etc.)
• Task Number: Radio (Task 1 | Task 2)
• Scenario Sub-heading: Text input
• Background Paragraph: Rich text editor
• Task Instructions: 3 bullet points (text inputs)
• Sample Response (CLB 10-12): Rich text, required
• SAVE | PREVIEW buttons
For Speaking Tasks:
• Task Number: Dropdown (1-8)
• Prompt Text: Rich text editor
• Image (if applicable): File upload, max 5MB
• Prep Time: Input field (seconds)
• Speaking Time: Input field (seconds)
• Sample Transcript: Required
10. Testing & Debugging with Cursor
10.1 Using Cursor for Debugging
Cursor has built-in debugging features:
• Click line number to set breakpoint
• Run > Start Debugging (F5) to run in debug mode
• View variables, call stack in left panel
• Step over (F10), step into (F11), continue (F5)
• Evaluate expressions in Debug Console
10.2 Testing Writing Module
Manual checklist:
19. Start test → Timer shows 27:00
20. Type in editor → word count updates live
21. Wait 30 sec → "Saving..." appears, then disappears
22. Refresh page → Text restores from auto-save
23. Timer < 5 min → Red flashing "Time remaining!"
24. Timer 00:00 → Auto-advance to Task 2
10.3 Testing Speaking Module
Manual checklist:
25. Click first task → Microphone permission dialog appears
26. Allow → Prep phase begins (countdown visible)
27. Prep timer 00:00 → Auto-transition to recording
28. Recording phase → Pulsing mic icon, countdown
29. Speak → Levels shown in visualizer
30. Recording timer 00:00 → Auto-upload to S3, next task
31. Task 5: Verify 2-part flow (selection, then recording)
10.4 Testing Examiner Scoring
Manual checklist:
32. Login as examiner → Pending submissions appear
33. Click "Score" → Scoring form loads
34. Writing: Response text visible on left
35. Speaking: Audio player with waveform visible
36. Select scores 1-12 for each criterion
37. Add optional feedback
38. Click SUBMIT → Form locked, submission status = "scored"
39. Student views results → Bands calculated
11. Deployment Checklist
11.1 Pre-Deployment
Before pushing to production:
40. All tests pass: npm test
41. No console errors or warnings
42. Environment variables configured (.env files)
43. Database indexes created
44. S3 bucket created and accessible
45. JWT_SECRET generated with 32+ random characters
11.2 Backend Deployment (Node.js)
Option A: Deploy to Heroku
heroku create lce-celpip-backend
heroku config:set MONGODB_URI=<your-atlas-uri>
heroku config:set JWT_SECRET=<your-secret>
git push heroku main
Option B: Deploy to AWS EC2
• Launch t3.micro EC2 instance (Ubuntu)
• SSH into instance, install Node.js
• Clone repo, npm install, npm start
• Use PM2 to keep server running
11.3 Frontend Deployment (React + Vite)
Option A: Deploy to Vercel
npm run build
npm i -g vercel
vercel --prod
Option B: Deploy to AWS S3 + CloudFront
• npm run build → creates dist/ folder
• Upload dist/ to S3 bucket
• Configure CloudFront distribution
11.4 Environment Variables in Production
Never commit .env files. Set variables in deployment platform:
• Heroku: heroku config:set KEY=value
• Vercel: Project Settings > Environment Variables
• AWS: Secrets Manager or Parameter Store
• EC2: Store in /home/ec2-user/.env (restrictive permissions)
11.5 Post-Deployment Verification
46. Backend API responds: curl https://api-domain.com/health
47. Frontend loads: Visit https://domain.com
48. Database connected: Check logs for connection success
49. S3 uploads working: Upload test audio to bucket
50. SSL certificate valid: Check https lock in browser
51. Run full end-to-end test: Register → Take test → Score
FINAL NOTES
This guide covers the CELPIP Writing and Speaking modules only. Listening and Reading
modules will be built later with the same architecture.
Key Cursor Workflow:
• Ctrl+K - Ask AI for code in current context
• Ctrl+Shift+K - Generate large code blocks
• Ctrl+L - Long chat for architecture questions
• Cmd+P / Ctrl+P - File search
• Terminal (Ctrl+`) - Run npm commands
Contact & Support:
Platform issues: contact@letscrackenglish.com
Technical support: GitHub issues in repository
CELPIP questions: https://www.celpip.ca
Document Version: 1.0 | April 2026 | Status: PRODUCTION READY