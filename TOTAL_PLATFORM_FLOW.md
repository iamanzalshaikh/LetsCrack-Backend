# LET'S CRACK ENGLISH - Total Platform End-to-End Flow

This document defines the absolute lifecycle of the CELPIP Practice Platform, covering every role and automated process.

---

## 🟢 1. THE STUDENT FLOW (User)
The student is the primary consumer of the platform's content.

### A. Onboarding & Access
1.  **Registration**: Student creates an account via `POST /api/auth/register`.
2.  **Authentication**: Student logs in to get a JWT token.
3.  **Subscription (Payment logic)**:
    *   Student selects a practice package.
    *   Payment is processed (Stripe/Razorpay placeholder).
    *   Backend updates `subscriptionStatus` to `active` via a Webhook.

### B. The Testing Experience (4 Modules)
1.  **Initialize**: Student selects "Test Set 1" and clicks **Start Test**. This triggers `POST /api/student/start-test/1`.
2.  **Writing Module**:
    *   **Task 1 & 2**: Student sees the prompt on the left and types on the right.
    *   **Auto-save**: The UI automatically calls `POST /api/writing/autosave` every 30 seconds to prevent data loss.
    *   **Submission**: Once finished, the student clicks Submit, which triggers `POST /api/writing/submit`.
3.  **Speaking Module**:
    *   **Task 1-8**: Student follows the **60s Prep -> 60s Record** sequence.
    *   **Recordings**: Audio is captured and uploaded to **Cloudinary/S3** via `POST /api/speaking/save-recording`.
4.  **Reading & Listening (MCQ)**:
    *   Student reads passages or listens to audio and selects MCQ options.
    *   **Auto-Grading**: On submission (`POST /api/mcq/submit`), the backend instantly compares answers to the correct key and calculates a band.

### C. Results & Certification
1.  **Notification**: Student receives an automated email once their results are published.
2.  **Dashboard**: Student views their Skill-wise Scores and Examiner Feedback.
3.  **Certificate**: Student clicks "Download" to generate a professional **PDF Statement of Results** via `GET /api/student/certificate/:id`.

---

## 🟡 2. THE EXAMINER FLOW (Reviewer)
The examiner is responsible for grading subjective modules (Writing/Speaking).

1.  **Evaluation Queue**: Examiner logs in and sees a list of **Submitted** tests in their dashboard (`GET /api/examiner/submissions`).
2.  **Grading Console**: 
    *   Examiner reads the student's Writing or listens to their Speaking audio.
    *   **Scoring**: Examiner selects scores (1-12) for the 4 core CELPIP criteria (Content, Vocab, etc.).
    *   **Feedback**: Examiner writes personalized improvement tips.
3.  **Completion**: Examiner clicks **Submit Grade**, moving the test into the "Graded" state (`POST /api/examiner/score`).

---

## 🔴 3. THE ADMIN FLOW (Commander)
The admin manages the platform's content and finalizes the student's results.

1.  **User Management**: Admin can promote users to Examiners or manage student accounts.
2.  **Question Bank Management**:
    *   Admin uses the dashboard to upload Writing prompts, Speaking images, and Reading/Listening MCQ sets.
    *   **API**: `POST /api/admin/question` (Universal Upsert).
3.  **Result Publication**:
    *   Admin reviews the Examiner's grades.
    *   **Publishing**: Admin clicks the **"Publish"** button (`POST /api/admin/results/publish/:id`).
    *   **Automated Action**: This trigger finalizes the Final Band, sends the student notification email, and generates the PDF certificate.

---

## ⚙️ 4. AUTOMATED BACKEND PROCESSES
*   **Band Calculation**: Automatically aggregates the 4 module scores into a single CELPIP level (1-12 or M).
*   **Email Service**: Uses `nodemailer` to deliver results to the student's inbox.
*   **PDF Generation**: Uses `pdfkit` to create a formal, secure practice report.
*   **Storage Management**: Handles file uploads to **Cloudinary** for recordings and **S3** for long-term storage.

---

## 🛠️ Summary of APIs Used
| Role | Core API Path | Purpose |
| :--- | :--- | :--- |
| **Common** | `/api/auth` | Login/Register |
| **Student** | `/api/student/start-test` | Initialize Session |
| **Student** | `/api/writing/autosave` | Prevent Data Loss |
| **Student** | `/api/mcq/submit` | Automated Grading |
| **Examiner**| `/api/examiner/score` | Subjective Grading |
| **Admin** | `/api/admin/question` | Content Creation |
| **Admin** | `/api/admin/results/publish`| Finalize & Notify |
鼓
