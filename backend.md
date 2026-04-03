LET'S CRACK ENGLISH
Backend Development Guide - Cursor IDE
Complete End-to-End Implementation v1.0
Node.js + Express + MongoDB | April 2026 | Production Ready
TABLE OF CONTENTS
1. Backend Setup & Project Structure
2. Database Models & Schemas
3. Authentication & Middleware
4. API Endpoints - Complete Reference
5. Error Handling & Validation
6. File Storage (S3 Integration)
7. Auto-Save & Session Management
8. Scoring & Band Calculation
9. Admin Workflow
10. Testing & Deployment
1. Backend Setup & Project Structure
1.1 Initial Setup
Create backend directory and initialize Node.js project:
mkdir backend && cd backend
npm init -y
npm install express mongoose jsonwebtoken bcrypt aws-sdk dotenv cors helmet
npm install --save-dev nodemon
1.2 Project File Structure
Organize backend as follows:
backend/
├── src/
│ ├── models/ # Mongoose schemas
│ │ ├── User.js
│ │ ├── TestSession.js
│ │ ├── TestResult.js
│ │ └── QuestionBank.js
│ ├── routes/ # API endpoints
│ │ ├── auth.js
│ │ ├── writing.js
│ │ ├── speaking.js
│ │ ├── examiner.js
│ │ └── admin.js
│ ├── middleware/ # Auth, validation, errors
│ │ ├── auth.js
│ │ ├── validation.js
│ │ └── errorHandler.js
│ ├── utils/ # Helper functions
│ │ ├── s3Upload.js
│ │ ├── bandCalculator.js
│ │ └── emailService.js
│ ├── config/
│ │ └── database.js # MongoDB connection
│ └── server.js # Express app & startup
├── .env # Environment variables
├── .gitignore
├── package.json
└── README.md
1.3 Package.json Scripts
Add these scripts to backend/package.json:
"scripts": {
 "start": "node src/server.js",
 "dev": "nodemon src/server.js",
 "test": "jest --watch",
 "seed": "node scripts/seed.js"
}
2. Database Models & Schemas
2.1 User Model (src/models/User.js)
Complete User schema with all fields:
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 const UserSchema = new mongoose.Schema({
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 firstName: String,
 lastName: String,
 role: { type: String, enum: ['user', 'examiner', 'admin'], default:
'user' },
 country: String,
 phone: String,
 profilePicture: String,
 subscriptionStatus: { type: String, enum: ['active', 'inactive',
'expired'], default: 'inactive' },
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
 lastLoginAt: Date
});
 // Hash password before save
UserSchema.pre('save', async function(next) {
 if (!this.isModified('password')) return next();
 this.password = await bcrypt.hash(this.password, 10);
 next();
});
 // Create index
UserSchema.index({ email: 1 });
module.exports = mongoose.model('User', UserSchema);
2.2 TestSession Model
Stores active test sessions and responses:
const TestSessionSchema = new mongoose.Schema({
 studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:
true },
 testSetNumber: { type: Number, required: true },
 startedAt: { type: Date, default: Date.now },
 completedAt: Date,
 status: { type: String, enum: ['in_progress', 'submitted', 'graded'],
default: 'in_progress' },
 writingResponses: [{
 taskNumber: Number,
 responseText: String,
 wordCount: Number,
 selectedOption: String,
 autoSavedAt: Date,
 submittedAt: Date,
 timeTakenSeconds: Number
 }],
 speakingRecordings: [{
 taskNumber: Number,
 audioUrl: String,
 audioDuration: Number,
 recordedAt: Date,
 submittedAt: Date
 }]
});
2.3 TestResult Model
Stores final scores and bands after examiner scoring:
const TestResultSchema = new mongoose.Schema({
 studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:
true },
 testSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'TestSession'
},
 testSetNumber: Number,
 writingBand: {
 task1Scores: { content: Number, vocab: Number, readability: Number,
taskFulfillment: Number },
 task2Scores: { content: Number, vocab: Number, readability: Number,
taskFulfillment: Number },
 finalBand: String
 },
 speakingBand: {
 taskScores: [{ taskNumber: Number, coherence: Number, vocabulary:
Number, listenability: Number, taskFulfillment: Number, examinerFeedback:
String }],
 finalBand: String
 },
 overallBand: String,
 examinerAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 scoredAt: Date,
 publishedAt: Date,
 certificateUrl: String,
 createdAt: { type: Date, default: Date.now }
});
2.4 QuestionBank Model
Stores all writing and speaking tasks:
const QuestionBankSchema = new mongoose.Schema({
 module: { type: String, enum: ['writing', 'speaking'], required: true },
 testSetNumber: { type: Number, required: true },
 // For Writing
 taskNumber: Number,
 scenario: { subheading: String, backgroundParagraph: String,
taskInstructions: [String] },
 wordCountTarget: String,
 sampleResponse: String,
 // For Speaking
 prompt: String,
 imageUrl: String,
 prepTime: Number,
 speakingTime: Number,
 sampleTranscript: String,
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now }
});
3. Authentication & Middleware
3.1 Authentication Middleware (src/middleware/auth.js)
Verify JWT tokens and protect routes:
const jwt = require('jsonwebtoken');
 const authMiddleware = (req, res, next) => {
 const token = req.headers.authorization?.split(' ')[1];
 if (!token) return res.status(401).json({ error: 'No token provided' });
 try {
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 req.user = decoded;
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
};
 const requireRole = (roles) => (req, res, next) => {
 if (!roles.includes(req.user.role)) {
 return res.status(403).json({ error: 'Forbidden' });
 }
 next();
};
 module.exports = { authMiddleware, requireRole };
3.2 Server Setup (src/server.js)
Initialize Express app with middleware:
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
 const app = express();
// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json({ limit: '50mb' }));
 // Database
mongoose.connect(process.env.MONGODB_URI)
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));
 // Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/writing', require('./routes/writing'));
app.use('/api/speaking', require('./routes/speaking'));
app.use('/api/examiner', require('./routes/examiner'));
app.use('/api/admin', require('./routes/admin'));
 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
4. API Endpoints - Complete Reference
4.1 Authentication Routes (src/routes/auth.js)
All auth endpoints with request/response examples:
POST /api/auth/register
Register new user account
Request Body Response (200)
{ "email": "user@example.com",
"password": "SecurePass123!",
"firstName": "John", "lastName": "Doe",
"country": "Canada" }
{ "token": "eyJhbGc...", "user": {
"id": "userId", "email":
"user@example.com", "role":
"user" } }
POST /api/auth/login
Login and get JWT token
Request Body Response (200)
{ "email": "user@example.com", { "token": "eyJhbGc...", "user":
"password": "SecurePass123!" } {...}, "dashboardUrl":
"/student/dashboard" }
POST /api/auth/logout
Logout (invalidate token on client side)
• Headers: Authorization: Bearer <token>
• Response: { success: true }
4.2 Writing Module Routes (src/routes/writing.js)
POST /api/writing/autosave
Auto-save writing response every 30 seconds
Request
Headers: Authorization: Bearer <token>
Body: { "studentId": "userId", "testSetNumber": 1, "taskNumber": 1,
"responseText": "Email content here...", "wordCount": 150 }
Response (200)
{ "saved": true, "timestamp": "2026-04-03T12:00:00Z", "draftId":
"draftId123" }
Controller Implementation:
exports.autoSave = async (req, res) => {
 try {
 const { studentId, testSetNumber, taskNumber, responseText, wordCount }
= req.body;
 let session = await TestSession.findOne({
 studentId,
 testSetNumber,
 status: 'in_progress'
 });
 if (!session) return res.status(404).json({ error: 'Session not
found' });
 const responseIdx = session.writingResponses.findIndex(r =>
r.taskNumber === taskNumber);
 if (responseIdx === -1) {
 session.writingResponses.push({ taskNumber, responseText, wordCount,
autoSavedAt: new Date() });
 } else {
 session.writingResponses[responseIdx].responseText = responseText;
 session.writingResponses[responseIdx].wordCount = wordCount;
 session.writingResponses[responseIdx].autoSavedAt = new Date();
 }
 await session.save();
 res.json({ saved: true, timestamp: new Date(), draftId: session._id });
 } catch (error) {
 res.status(500).json({ error: error.message });
 }
};
GET /api/writing/restore/:studentId/:setNumber/:taskNumber
Restore auto-saved response when page refreshes
• Response: { responseText, wordCount, savedAt, selectedOption (Task 2 only) }
• Error 404: If no draft found, return empty response
POST /api/writing/submit
Submit writing response - marks as completed
Body: { "studentId": "userId", "testSetNumber": 1, "taskNumber": 1,
"responseText": "Final email...", "wordCount": 165, "timeTaken": 1200,
"selectedOption": "A" // Task 2 only }
Response: { submissionId, status: 'submitted' }
4.3 Speaking Module Routes (src/routes/speaking.js)
POST /api/speaking/save-recording
Upload recorded audio to S3 after speaking task
Request
Headers: Authorization: Bearer <token>, Content-Type: multipart/form-data
Body (FormData): studentId: userId testSetNumber: 1 taskNumber: 1 audioFile:
<binary WebM/MP3> duration: 60
Response (200)
{ "recordingId": "recordId123", "audioUrl": "https://s3.amazonaws.com/...",
"uploadedAt": "2026-04-03T12:00:00Z" }
GET /api/speaking/task/:taskNumber
Get task details (prompt, image, timings) for student to see
• Response: { taskId, prompt, imageUrl (if applicable), prepTime, speakingTime }
• Error 404: Task not found
5. Examiner Routes (src/routes/examiner.js)
5.1 Get Pending Submissions
GET /api/examiner/submissions?status=pending
Response 200:
{ "submissions": [ { "submissionId": "subId123", "studentName":
"John Doe", "testSet": 1, "module": "writing", "taskType":
"Email", "submittedAt": "2026-04-03T10:00:00Z" } ] }
5.2 Get Submission Details
GET /api/examiner/submission/:submissionId/details
For Writing: returns responseText
For Speaking: returns audioUrl + transcript
5.3 Submit Scores
POST /api/examiner/score
Request Body:
{ "submissionId": "subId123", "scores": { "criterion1": 10, //
Content/Coherence "criterion2": 11, // Vocabulary "criterion3": 9, //
Readability "criterion4": 10 // Task Fulfillment }, "feedback": "Strong
writing with good organization" }
Response 200:
{ "scoreId": "scoreId123", "locked": true }
5.4 Examiner Score Controller
exports.submitScore = async (req, res) => {
 try {
 const { submissionId, scores, feedback } = req.body;
 // Validate scores are 1-12
 const validScores = Object.values(scores).every(s => s >= 1 && s <=
12);
 if (!validScores) {
 return res.status(400).json({ error: 'Scores must be 1-12' });
 }
 // Calculate band
 const avg = Object.values(scores).reduce((a, b) => a + b) / 4;
 const band = calculateBand(avg);
 // Save to database
 const result = await TestResult.findByIdAndUpdate(
 submissionId,
 {
 writingBand: { ...scores, finalBand: band },
 examinerAssigned: req.user.id,
 scoredAt: new Date()
 },
 { new: true }
 );
 res.json({ scoreId: result._id, locked: true });
 } catch (error) {
 res.status(500).json({ error: error.message });
 }
};
6. Student Results Routes
6.1 Get Results
GET /api/student/results/:testSetNumber
Returns scores and bands after all scoring complete:
{ "writingBand": "7-8", "speakingBand": "8-9", "overallBand": "8",
"submittedAt": "2026-04-03T10:00:00Z", "publishedAt": "2026-04-05T14:00:00Z" }
6.2 Get Progress
GET /api/student/progress
Returns history of all test attempts:
• Response: { attempts: [{ setNumber, writingBand, speakingBand, date }] }
• Shows progression over time
6.3 Get Certificate
GET /api/student/certificate/:resultId
• Returns PDF file stream
• Generate PDF with student name, date, score
7. Admin Routes (src/routes/admin.js)
7.1 Create/Update Question
POST /api/admin/question/writing
{ "testSetNumber": 1, "taskNumber": 1, "scenario": { "subheading": "Email
to manager", "backgroundParagraph": "You need to...", "taskInstructions":
["Write email", "Be professional", "Include details"] }, "wordCountTarget":
"150-200", "sampleResponse": "Dear Manager..." }
Response: { questionId, created: true }
7.2 Upload Speaking Task with Image
POST /api/admin/question/speaking
• Form: testSetNumber, taskNumber, prompt, image (file), prepTime, speakingTime,
sampleTranscript
• Image uploaded to S3, URL saved in database
7.3 Publish Results
POST /api/admin/results/publish/:resultId
• Auto-calculates final bands
• Generates certificate PDF
• Sends email to student with results
8. Error Handling & Validation
8.1 Global Error Handler (src/middleware/errorHandler.js)
const errorHandler = (err, req, res, next) => {
 const status = err.status || 500;
 const message = err.message || 'Internal Server Error';
 res.status(status).json({
 error: message,
 status: status,
 timestamp: new Date().toISOString()
 });
};
module.exports = errorHandler;
8.2 Input Validation Middleware
Validate before processing:
Validation Rules
• Email: RFC 5322 format
• Password: Min 8 chars, 1 uppercase, 1 number, 1 special
• Word count: 0-1000+ (no hard limit)
• Task score: Integer 1-12
• Audio duration: 30-120 seconds
• Selected option: String 'A' or 'B'
8.3 Common Error Responses
Status Scenario Response
400 Missing/invalid fields { error: "Validation failed",
details }
401 No/invalid JWT token { error: "Invalid token" }
403 Insufficient permissions { error: "Forbidden" }
404 Resource not found { error: "Not found" }
500 Unhandled server error { error: "Server error",
timestamp }
9. File Storage (S3 Integration)
9.1 S3 Upload Utility (src/utils/s3Upload.js)
const AWS = require('aws-sdk');
 const s3 = new AWS.S3({
 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
 exports.uploadAudio = async (file, studentId, taskNumber) => {
 const key = `speaking/${studentId}/task-${taskNumber}-$
{Date.now()}.webm`;
 const params = {
 Bucket: process.env.AWS_S3_BUCKET,
 Key: key,
 Body: file.buffer,
 ContentType: 'audio/webm'
 };
 const result = await s3.upload(params).promise();
 return result.Location; // Full S3 URL
};
9.2 S3 Configuration
AWS S3 bucket permissions required:
• PutObject - Upload audio files
• GetObject - Download for examiner playback
• Server-side encryption enabled
• Bucket NOT publicly accessible (private)
10. Band Calculation Logic
10.1 CLB Band Calculation (src/utils/bandCalculator.js)
exports.calculateBand = (averageScore) => {
 if (averageScore < 2) return 'M';
 if (averageScore < 3) return '3-4';
 if (averageScore < 5) return '5-6';
 if (averageScore < 7) return '7-8';
 if (averageScore < 9) return '9';
 return '10-12';
};
10.2 Band Reference Table
Average Score CLB Band Description
< 2 M Minimal
2-2.9 3-4 Elementary
3-4.9 5-6 Intermediate
5-6.9 7-8 Upper Intermediate
7-8.9 9 Advanced
>= 9 10-12 Expert
11. Testing the Backend
11.1 Manual Testing with REST Client
Create backend/test.http for quick endpoint testing:
### Register User
POST http://localhost:5000/api/auth/register
Content-Type: application/json
 {
 "email": "test@example.com",
 "password": "TestPass123!",
 "firstName": "Test",
 "lastName": "User"
}
 ### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json
 {
 "email": "test@example.com",
 "password": "TestPass123!"
}
11.2 Automated Testing
Install Jest for unit tests:
• npm install --save-dev jest supertest
• Create tests/ directory
• Run: npm test
12. Deployment Checklist
Before deploying to production:
11. All endpoints tested and working
12. Error handling implemented
13. Input validation on all endpoints
14. Database indexes created
15. S3 bucket configured and tested
16. Environment variables set
17. CORS properly configured
18. SSL/HTTPS enabled
19. Rate limiting enabled
20. Logging configured
Document Version: 1.0 | April 2026 | Production Ready