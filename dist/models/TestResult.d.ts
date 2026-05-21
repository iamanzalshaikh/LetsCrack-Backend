import mongoose from 'mongoose';
declare const TestResultSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    studentId: mongoose.Types.ObjectId;
    testSetNumber?: number | null | undefined;
    overallBand?: string | null | undefined;
    scoredAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    certificateUrl?: string | null | undefined;
    testSessionId?: mongoose.Types.ObjectId | null | undefined;
    writingBand?: {
        finalBand?: string | null | undefined;
        task1Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
        task2Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    speakingBand?: {
        taskScores: mongoose.Types.DocumentArray<{
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }> & {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }>;
        finalBand?: string | null | undefined;
    } | null | undefined;
    readingBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    listeningBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    examinerAssigned?: mongoose.Types.ObjectId | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    studentId: mongoose.Types.ObjectId;
    testSetNumber?: number | null | undefined;
    overallBand?: string | null | undefined;
    scoredAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    certificateUrl?: string | null | undefined;
    testSessionId?: mongoose.Types.ObjectId | null | undefined;
    writingBand?: {
        finalBand?: string | null | undefined;
        task1Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
        task2Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    speakingBand?: {
        taskScores: mongoose.Types.DocumentArray<{
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }> & {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }>;
        finalBand?: string | null | undefined;
    } | null | undefined;
    readingBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    listeningBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    examinerAssigned?: mongoose.Types.ObjectId | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    studentId: mongoose.Types.ObjectId;
    testSetNumber?: number | null | undefined;
    overallBand?: string | null | undefined;
    scoredAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    certificateUrl?: string | null | undefined;
    testSessionId?: mongoose.Types.ObjectId | null | undefined;
    writingBand?: {
        finalBand?: string | null | undefined;
        task1Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
        task2Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    speakingBand?: {
        taskScores: mongoose.Types.DocumentArray<{
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }> & {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }>;
        finalBand?: string | null | undefined;
    } | null | undefined;
    readingBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    listeningBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    examinerAssigned?: mongoose.Types.ObjectId | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const TestResult: mongoose.Model<{
    createdAt: NativeDate;
    studentId: mongoose.Types.ObjectId;
    testSetNumber?: number | null | undefined;
    overallBand?: string | null | undefined;
    scoredAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    certificateUrl?: string | null | undefined;
    testSessionId?: mongoose.Types.ObjectId | null | undefined;
    writingBand?: {
        finalBand?: string | null | undefined;
        task1Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
        task2Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    speakingBand?: {
        taskScores: mongoose.Types.DocumentArray<{
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }> & {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }>;
        finalBand?: string | null | undefined;
    } | null | undefined;
    readingBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    listeningBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    examinerAssigned?: mongoose.Types.ObjectId | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    studentId: mongoose.Types.ObjectId;
    testSetNumber?: number | null | undefined;
    overallBand?: string | null | undefined;
    scoredAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    certificateUrl?: string | null | undefined;
    testSessionId?: mongoose.Types.ObjectId | null | undefined;
    writingBand?: {
        finalBand?: string | null | undefined;
        task1Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
        task2Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    speakingBand?: {
        taskScores: mongoose.Types.DocumentArray<{
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }> & {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }>;
        finalBand?: string | null | undefined;
    } | null | undefined;
    readingBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    listeningBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    examinerAssigned?: mongoose.Types.ObjectId | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    createdAt: NativeDate;
    studentId: mongoose.Types.ObjectId;
    testSetNumber?: number | null | undefined;
    overallBand?: string | null | undefined;
    scoredAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    certificateUrl?: string | null | undefined;
    testSessionId?: mongoose.Types.ObjectId | null | undefined;
    writingBand?: {
        finalBand?: string | null | undefined;
        task1Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
        task2Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    speakingBand?: {
        taskScores: mongoose.Types.DocumentArray<{
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }> & {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }>;
        finalBand?: string | null | undefined;
    } | null | undefined;
    readingBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    listeningBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    examinerAssigned?: mongoose.Types.ObjectId | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    studentId: mongoose.Types.ObjectId;
    testSetNumber?: number | null | undefined;
    overallBand?: string | null | undefined;
    scoredAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    certificateUrl?: string | null | undefined;
    testSessionId?: mongoose.Types.ObjectId | null | undefined;
    writingBand?: {
        finalBand?: string | null | undefined;
        task1Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
        task2Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    speakingBand?: {
        taskScores: mongoose.Types.DocumentArray<{
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }> & {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }>;
        finalBand?: string | null | undefined;
    } | null | undefined;
    readingBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    listeningBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    examinerAssigned?: mongoose.Types.ObjectId | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    studentId: mongoose.Types.ObjectId;
    testSetNumber?: number | null | undefined;
    overallBand?: string | null | undefined;
    scoredAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    certificateUrl?: string | null | undefined;
    testSessionId?: mongoose.Types.ObjectId | null | undefined;
    writingBand?: {
        finalBand?: string | null | undefined;
        task1Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
        task2Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    speakingBand?: {
        taskScores: mongoose.Types.DocumentArray<{
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }> & {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }>;
        finalBand?: string | null | undefined;
    } | null | undefined;
    readingBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    listeningBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    examinerAssigned?: mongoose.Types.ObjectId | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    studentId: mongoose.Types.ObjectId;
    testSetNumber?: number | null | undefined;
    overallBand?: string | null | undefined;
    scoredAt?: NativeDate | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    certificateUrl?: string | null | undefined;
    testSessionId?: mongoose.Types.ObjectId | null | undefined;
    writingBand?: {
        finalBand?: string | null | undefined;
        task1Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
        task2Scores?: {
            readability?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            content?: number | null | undefined;
            vocab?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    speakingBand?: {
        taskScores: mongoose.Types.DocumentArray<{
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }> & {
            taskNumber?: number | null | undefined;
            coherence?: number | null | undefined;
            vocabulary?: number | null | undefined;
            taskFulfillment?: number | null | undefined;
            listenability?: number | null | undefined;
            examinerFeedback?: string | null | undefined;
        }>;
        finalBand?: string | null | undefined;
    } | null | undefined;
    readingBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    listeningBand?: {
        finalBand?: string | null | undefined;
        score?: number | null | undefined;
        total?: number | null | undefined;
        percentage?: number | null | undefined;
    } | null | undefined;
    examinerAssigned?: mongoose.Types.ObjectId | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default TestResult;
export { TestResultSchema };
