# LET'S CRACK ENGLISH - Complete Admin Master Flow

This document defines the **end-to-end Admin Management Flow**, covering every screen, action, and backend operation required to maintain the LCE platform.

---

## 🏗️ 1. ADMIN DASHBOARD (The Hub)
The first screen the admin sees after a successful login.

*   **UI Screen**: High-fidelity dashboard with real-time analytics cards.
*   **Visual Widgets**:
    *   **Total Active Scholars**: Number of students with `active` subscriptions.
    *   **Pending Evaluations**: Counter for tests graded by examiners but not yet published.
    *   **Recent Activity**: A stream of student registrations and test submissions.
*   **Action**: Sidebar navigation to access User Management, Question Bank, and Results.

---
---

## 👥 2. USER ADMINISTRATION
Managing the people on the platform.

### Step 1: Manage Platform Roles
*   **UI Screen**: A searchable table of all registered users.
*   **Action**: Promote a **Student** to an **Examiner** role or vice versa.
*   **API**: `GET /api/admin/users?role=user`

### Step 2: Account Security
*   **Action**: Reset passwords or permanently delete inactive accounts.
*   **API**: `DELETE /api/admin/user/:userId`

---

## 📚 3. UNIVERSAL QUESTION BANK MANAGEMENT
Where the actual "CELPIP Content" is created and managed.

### Step 1: Module Selection
*   **UI Screen**: A central form with a **Module Dropdown** (Writing, Speaking, Reading, Listening).

### Step 2: Content Creation (Writing/Speaking)
*   **Action**: Admin fills out the following for a test set:
    *   **Set Number**: (e.g., 1)
    *   **Task #**: (e.g., 1)
    *   **Prompt**: The textual scenario/question.
    *   **Media**: (For Speaking) Upload an image reference for specific tasks.
*   **API**: `POST /api/admin/question` -> Uses **upsert** logic to prevent duplicates.

### Step 3: Content Creation (Reading/Listening MCQs)
*   **Action**: Dynamic form to add:
    *   **Passage/Audio**: The material the student will listen to/read.
    *   **MCQ List**: Add multiple questions, each with 4 options and 1 correct key.
*   **API**: Same as above (`POST /api/admin/question`).

---

## 📢 4. THE GRADUATE WORKFLOW (Publishing Results)
The most critical flow—closing the loop between student effort and their final certificate.

### Step 1: The "Ready to Publish" Queue
*   **UI Screen**: A specialized list of **Graded** sessions.
*   **Action**: Admin reviews the scores given by the **Examiner** and the auto-scores from **MCQs**.

### Step 2: One-Click Publication
*   **Action**: Admin clicks the **"Publish & Notify"** button.
*   **API**: `POST /api/admin/results/publish/:resultId`
*   **Backend Automation Chain**:
    1.  **Verify Scores**: Consolidates all 4 scores into a Final aggregate Band.
    2.  **Generate Certificate**: Backend `pdfkit` utility creates the "Statement of Results" PDF.
    3.  **Fire Notification**: `nodemailer` sends a styled email to the student with their result summary and a download link.

---

## ⚙️ 5. SYSTEM SETTINGS
*   **UI Screen**: Management of environment variables (SMTP, AWS Keys, Cloudinary).
*   **Action**: Update API credentials without restarting the server.

---

## Annex: Master API Commands (Admin cURL)

### A. Publish a Test Result
```bash
curl -X POST http://localhost:5000/api/admin/results/publish/65f1234567890 \
     -H "Authorization: Bearer <ADMIN_JWT>"
```

### B. Create a new Speaking Prompt (Task 3 - Scene Description)
```bash
curl -X POST http://localhost:5000/api/admin/question \
     -H "Authorization: Bearer <ADMIN_JWT>" \
     -H "Content-Type: application/json" \
     -d '{
       "module": "speaking",
       "testSetNumber": 1,
       "taskNumber": 3,
       "prompt": "Describe the scene you see in the park.",
       "imageUrl": "https://cloudinary-lce.com/scene-park.jpg"
     }'
```

### C. Create a Reading MCQ Set
```bash
curl -X POST http://localhost:5000/api/admin/question \
     -H "Authorization: Bearer <ADMIN_JWT>" \
     -H "Content-Type: application/json" \
     -d '{
       "module": "reading",
       "testSetNumber": 1,
       "taskNumber": 1,
       "passageText": "The climate change impact in Canada...",
       "mcqs": [
         {
           "questionText": "What is the main topic?",
           "options": ["Climate", "Food", "History", "Sports"],
           "correctOption": 0
         }
       ]
     }'
```
鼓
