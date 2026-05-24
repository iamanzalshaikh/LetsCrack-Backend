import mongoose from 'mongoose';
declare const TestSessionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    mode: "practice" | "simulation";
    selectedModules: ("listening" | "reading" | "writing" | "speaking")[];
    instructionsAccepted: boolean;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    endedEarly: boolean;
    simulationFocusLossCount: number;
    simulationIntegrityEvents: mongoose.Types.DocumentArray<{
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }> & {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }>;
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }>;
    mcqScore: number;
    mediaRuntime: mongoose.Types.DocumentArray<{
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }> & {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }>;
    completedAt?: NativeDate | null | undefined;
    purgeAt?: NativeDate | null | undefined;
    purgedAt?: NativeDate | null | undefined;
    writingCursorTask?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    mode: "practice" | "simulation";
    selectedModules: ("listening" | "reading" | "writing" | "speaking")[];
    instructionsAccepted: boolean;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    endedEarly: boolean;
    simulationFocusLossCount: number;
    simulationIntegrityEvents: mongoose.Types.DocumentArray<{
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }> & {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }>;
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }>;
    mcqScore: number;
    mediaRuntime: mongoose.Types.DocumentArray<{
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }> & {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }>;
    completedAt?: NativeDate | null | undefined;
    purgeAt?: NativeDate | null | undefined;
    purgedAt?: NativeDate | null | undefined;
    writingCursorTask?: number | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    mode: "practice" | "simulation";
    selectedModules: ("listening" | "reading" | "writing" | "speaking")[];
    instructionsAccepted: boolean;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    endedEarly: boolean;
    simulationFocusLossCount: number;
    simulationIntegrityEvents: mongoose.Types.DocumentArray<{
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }> & {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }>;
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }>;
    mcqScore: number;
    mediaRuntime: mongoose.Types.DocumentArray<{
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }> & {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }>;
    completedAt?: NativeDate | null | undefined;
    purgeAt?: NativeDate | null | undefined;
    purgedAt?: NativeDate | null | undefined;
    writingCursorTask?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const TestSession: mongoose.Model<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    mode: "practice" | "simulation";
    selectedModules: ("listening" | "reading" | "writing" | "speaking")[];
    instructionsAccepted: boolean;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    endedEarly: boolean;
    simulationFocusLossCount: number;
    simulationIntegrityEvents: mongoose.Types.DocumentArray<{
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }> & {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }>;
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }>;
    mcqScore: number;
    mediaRuntime: mongoose.Types.DocumentArray<{
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }> & {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }>;
    completedAt?: NativeDate | null | undefined;
    purgeAt?: NativeDate | null | undefined;
    purgedAt?: NativeDate | null | undefined;
    writingCursorTask?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    mode: "practice" | "simulation";
    selectedModules: ("listening" | "reading" | "writing" | "speaking")[];
    instructionsAccepted: boolean;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    endedEarly: boolean;
    simulationFocusLossCount: number;
    simulationIntegrityEvents: mongoose.Types.DocumentArray<{
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }> & {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }>;
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }>;
    mcqScore: number;
    mediaRuntime: mongoose.Types.DocumentArray<{
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }> & {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }>;
    completedAt?: NativeDate | null | undefined;
    purgeAt?: NativeDate | null | undefined;
    purgedAt?: NativeDate | null | undefined;
    writingCursorTask?: number | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    mode: "practice" | "simulation";
    selectedModules: ("listening" | "reading" | "writing" | "speaking")[];
    instructionsAccepted: boolean;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    endedEarly: boolean;
    simulationFocusLossCount: number;
    simulationIntegrityEvents: mongoose.Types.DocumentArray<{
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }> & {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }>;
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }>;
    mcqScore: number;
    mediaRuntime: mongoose.Types.DocumentArray<{
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }> & {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }>;
    completedAt?: NativeDate | null | undefined;
    purgeAt?: NativeDate | null | undefined;
    purgedAt?: NativeDate | null | undefined;
    writingCursorTask?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    mode: "practice" | "simulation";
    selectedModules: ("listening" | "reading" | "writing" | "speaking")[];
    instructionsAccepted: boolean;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    endedEarly: boolean;
    simulationFocusLossCount: number;
    simulationIntegrityEvents: mongoose.Types.DocumentArray<{
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }> & {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }>;
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }>;
    mcqScore: number;
    mediaRuntime: mongoose.Types.DocumentArray<{
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }> & {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }>;
    completedAt?: NativeDate | null | undefined;
    purgeAt?: NativeDate | null | undefined;
    purgedAt?: NativeDate | null | undefined;
    writingCursorTask?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    mode: "practice" | "simulation";
    selectedModules: ("listening" | "reading" | "writing" | "speaking")[];
    instructionsAccepted: boolean;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    endedEarly: boolean;
    simulationFocusLossCount: number;
    simulationIntegrityEvents: mongoose.Types.DocumentArray<{
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }> & {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }>;
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }>;
    mcqScore: number;
    mediaRuntime: mongoose.Types.DocumentArray<{
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }> & {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }>;
    completedAt?: NativeDate | null | undefined;
    purgeAt?: NativeDate | null | undefined;
    purgedAt?: NativeDate | null | undefined;
    writingCursorTask?: number | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    mode: "practice" | "simulation";
    selectedModules: ("listening" | "reading" | "writing" | "speaking")[];
    instructionsAccepted: boolean;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    endedEarly: boolean;
    simulationFocusLossCount: number;
    simulationIntegrityEvents: mongoose.Types.DocumentArray<{
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }> & {
        at: NativeDate;
        kind: string;
        durationMs?: number | null | undefined;
        focused?: boolean | null | undefined;
    }>;
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            strengths: string[];
            improvements: string[];
            quickTips: string[];
            lineFeedback: mongoose.Types.DocumentArray<{
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }> & {
                original?: string | null | undefined;
                issue?: string | null | undefined;
                fix?: string | null | undefined;
            }>;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            taskAchievement?: number | null | undefined;
            coherenceCohesion?: number | null | undefined;
            lexicalResource?: number | null | undefined;
            grammar?: number | null | undefined;
            modelAnswer?: string | null | undefined;
            overallRemark?: string | null | undefined;
            detailedFeedback?: string | null | undefined;
            categoryBullets?: {
                vocabulary: string[];
                readability: string[];
                taskFulfillment: string[];
                coherenceMeaning: string[];
            } | null | undefined;
        } | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
            modelAnswer?: string | null | undefined;
            listenability?: number | null | undefined;
        } | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        subTask?: string | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
        module?: "listening" | "reading" | null | undefined;
    }>;
    mcqScore: number;
    mediaRuntime: mongoose.Types.DocumentArray<{
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }> & {
        taskNumber: number;
        playCount: number;
        seekCount: number;
        blockedCount: number;
        subTask?: string | null | undefined;
        module?: "listening" | "reading" | "writing" | "speaking" | null | undefined;
        lastEventAt?: NativeDate | null | undefined;
    }>;
    completedAt?: NativeDate | null | undefined;
    purgeAt?: NativeDate | null | undefined;
    purgedAt?: NativeDate | null | undefined;
    writingCursorTask?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default TestSession;
export { TestSessionSchema };
