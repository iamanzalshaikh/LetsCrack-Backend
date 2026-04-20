import mongoose from 'mongoose';
declare const TestSessionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }>;
    mcqScore: number;
    completedAt?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }>;
    mcqScore: number;
    completedAt?: NativeDate | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }>;
    mcqScore: number;
    completedAt?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const TestSession: mongoose.Model<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }>;
    mcqScore: number;
    completedAt?: NativeDate | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }>;
    mcqScore: number;
    completedAt?: NativeDate | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }>;
    mcqScore: number;
    completedAt?: NativeDate | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }>;
    mcqScore: number;
    completedAt?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }>;
    mcqScore: number;
    completedAt?: NativeDate | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    studentId: mongoose.Types.ObjectId;
    testSetNumber: number;
    startedAt: NativeDate;
    status: "in_progress" | "submitted" | "graded";
    writingResponses: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        responseText?: string | null | undefined;
        wordCount?: number | null | undefined;
        selectedOption?: string | null | undefined;
        autoSavedAt?: NativeDate | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        timeTakenSeconds?: number | null | undefined;
    }>;
    speakingRecordings: mongoose.Types.DocumentArray<{
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }> & {
        taskNumber?: number | null | undefined;
        submittedAt?: NativeDate | null | undefined;
        audioUrl?: string | null | undefined;
        audioDuration?: number | null | undefined;
        recordedAt?: NativeDate | null | undefined;
        transcript?: string | null | undefined;
        aiBand?: number | null | undefined;
        aiAnalysis?: {
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            listenability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            feedback?: string | null | undefined;
        } | null | undefined;
    }>;
    mcqResponses: mongoose.Types.DocumentArray<{
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }> & {
        selectedOption?: number | null | undefined;
        questionId?: mongoose.Types.ObjectId | null | undefined;
        isCorrect?: boolean | null | undefined;
    }>;
    mcqScore: number;
    completedAt?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default TestSession;
export { TestSessionSchema };
