# LET'S CRACK ENGLISH - End-to-End Master User Flow (UI & API)

This document serves as the absolute source of truth for the platform's lifecycle, covering **User Experience (UI Screens)**, **API Logic**, and **Platform Roles**.

---

## 🟢 1. STUDENT FLOW (End-to-End)

### Step 1: Landing & Auth Page
*   **UI Screen**: Premium landing page with a hero section ("Crack CELPIP Today"). Navbar has "Login" and "Register" buttons.
*   **Visuals**: Clean, white/navy theme with high-quality icons.
*   **Action**: User clicks "Register," fills out a multi-step form (Name, Email, Password, Country).
*   **API**: `POST /api/auth/register` and `POST /api/auth/login`.

### Step 2: Student Dashboard (The Launchpad)
*   **UI Screen**: Sidebar navigation (Dashboard, My Tests, Progress, Settings).
*   **Main Section**: A grid of **Test Cards** showing available Practice Sets (Set 1, Set 2...).
*   **Progress Section**: Horizontal bars showing current status of ongoing tests (e.g., "Set 1 - 25% Completed").
*   **Action**: User clicks "Start Test" on a card.
*   **API**: `POST /api/student/start-test/:setNumber`.

### Step 3: Writing Module Screen
*   **UI Screen**: Clean, distraction-free split layout.
    *   **Header**: Timer (27:00), "Task 1 of 2", Word Count (Live), "Next" button.
    *   **Left (30%)**: The Scenario/Email Prompt.
    *   **Right (70%)**: Large typing area with auto-focus.
*   **Action**: Student types their response.
*   **API**: Automatic background `POST /api/writing/autosave` every 30s. Manual `POST /api/writing/submit` on Finish.

### Step 4: Speaking Module Screen
*   **UI Screen**: Sequential task-based interface.
*   **Visual Sequence**:
    1.  **Instruction Card**: Shows Task # (1 to 8), Question image, and text prompt.
    2.  **Prep Mode**: "Preparation Time" circle countdown (60s).
    3.  **Record Mode**: Screen highlights green/red with a pulse animation. "Recording Now..." indicator. Waveform visualizer.
*   **Action**: Student speaks; audio captures automatically.
*   **API**: `POST /api/speaking/save-recording` (Streams to Cloudinary).

### Step 5: Reading/Listening Module (MCQ)
*   **UI Screen**: Split-view specifically for comprehension.
    *   **Left**: The Reading passage or the Listening audio player (Sticky on scroll).
    *   **Right**: List of Multiple-Choice questions (Radio buttons).
*   **Action**: Select answers and click "Submit Answers."
*   **API**: `POST /api/mcq/submit` -> Backend auto-grades and shows "Module Complete" badge.

### Step 6: Progress & Results Page
*   **UI Screen**: List of completed tests with their final bands.
*   **Final Report Screen**:
    *   Big circular gauge showing the Final CLB Band (e.g., 9).
    *   Criterion Table: Shows scores for Content, Vocab, etc., provided by the Examiner.
    *   **Action**: Click "Download Statement of Results" (PDF).
*   **API**: `GET /api/student/results/:setNumber` and `GET /api/student/certificate/:id`.

---

## 🟡 2. EXAMINER FLOW (Review & Scoring)

### Step 1: Examiner Dashboard
*   **UI Screen**: Simple dashboard with a "Pending Evaluation Queue."
*   **Action**: Table showing Student Name, Test Set, and "Review" button.
*   **API**: `GET /api/examiner/submissions?status=submitted`.

### Step 2: Evaluation Console (The Dual Panel)
*   **UI Screen**: Specialized grading environment.
    *   **Left Module View**: Shows the Student's writing text or plays back their audio recording.
    *   **Right Scoring Panel**: 
        *   Vertical Sliders/Dropdowns (1-12) for the 4 CELPIP criteria.
        *   Feedback Text Area ("Tips for Student").
*   **Action**: Examiner submits grades.
*   **API**: `POST /api/examiner/score`.

---

## 🔴 3. ADMIN FLOW (Platform Strategy)

### Step 1: Command Center Dashboard
*   **UI Screen**: High-level overview: Total Users, Revenue, Pending Results.
*   **Question Bank Management**:
    *   Forms to upload new test sets (Text prompts, Audio files, MCQ keys).
    *   **API**: `POST /api/admin/question`.

### Step 2: Review & Publish Workflow
*   **UI Screen**: Admin views tests that have been graded by examiners but NOT yet published.
*   **Action**: Clicks "Publish Result" to lock the score.
*   **API**: `POST /api/admin/results/publish/:resultId`.
*   **Logic**: Triggers the **Auto-Email Service** and generates the **Student Certificate**.

---

## Annex: API cURL Samples for Developers

### 1. Register Student
```bash
curl -X POST http://localhost:5000/api/auth/register \
     -d '{"email":"stud@lce.com","password":"pass","firstName":"Anzal"}'
```

### 2. Auto-save Writing Draft
```bash
curl -X POST http://localhost:5000/api/writing/autosave \
     -d '{"testSetNumber":1,"taskNumber":1,"responseText":"Dear Sir..."}'
```

### 3. Examiner Score Submission
```bash
curl -X POST http://localhost:5000/api/examiner/score \
     -d '{"submissionId":"123","scores":{"content":10,"vocab":9},"feedback":"Good job"}'
```
