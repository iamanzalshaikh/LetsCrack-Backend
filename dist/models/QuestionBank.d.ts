import mongoose from 'mongoose';
declare const QuestionBankSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "writing" | "speaking" | "reading" | "listening";
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }>;
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    prompt?: string | null | undefined;
    imageUrl?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    sampleTranscript?: string | null | undefined;
    passageText?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "writing" | "speaking" | "reading" | "listening";
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }>;
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    prompt?: string | null | undefined;
    imageUrl?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    sampleTranscript?: string | null | undefined;
    passageText?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "writing" | "speaking" | "reading" | "listening";
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }>;
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    prompt?: string | null | undefined;
    imageUrl?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    sampleTranscript?: string | null | undefined;
    passageText?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const QuestionBank: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "writing" | "speaking" | "reading" | "listening";
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }>;
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    prompt?: string | null | undefined;
    imageUrl?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    sampleTranscript?: string | null | undefined;
    passageText?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "writing" | "speaking" | "reading" | "listening";
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }>;
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    prompt?: string | null | undefined;
    imageUrl?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    sampleTranscript?: string | null | undefined;
    passageText?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "writing" | "speaking" | "reading" | "listening";
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }>;
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    prompt?: string | null | undefined;
    imageUrl?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    sampleTranscript?: string | null | undefined;
    passageText?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "writing" | "speaking" | "reading" | "listening";
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }>;
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    prompt?: string | null | undefined;
    imageUrl?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    sampleTranscript?: string | null | undefined;
    passageText?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "writing" | "speaking" | "reading" | "listening";
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }>;
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    prompt?: string | null | undefined;
    imageUrl?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    sampleTranscript?: string | null | undefined;
    passageText?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "writing" | "speaking" | "reading" | "listening";
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
    }>;
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    prompt?: string | null | undefined;
    imageUrl?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    sampleTranscript?: string | null | undefined;
    passageText?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default QuestionBank;
export { QuestionBankSchema };
