import mongoose from 'mongoose';
declare const WritingQuestionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    taskNumber: number;
    module: "writing";
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }> & {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }>;
    wordCountTarget?: string | null | undefined;
    surveyTopic?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    timeLimit?: number | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    taskNumber: number;
    module: "writing";
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }> & {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }>;
    wordCountTarget?: string | null | undefined;
    surveyTopic?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    timeLimit?: number | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    taskNumber: number;
    module: "writing";
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }> & {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }>;
    wordCountTarget?: string | null | undefined;
    surveyTopic?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    timeLimit?: number | null | undefined;
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
declare const WritingQuestion: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    taskNumber: number;
    module: "writing";
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }> & {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }>;
    wordCountTarget?: string | null | undefined;
    surveyTopic?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    timeLimit?: number | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    taskNumber: number;
    module: "writing";
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }> & {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }>;
    wordCountTarget?: string | null | undefined;
    surveyTopic?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    timeLimit?: number | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    taskNumber: number;
    module: "writing";
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }> & {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }>;
    wordCountTarget?: string | null | undefined;
    surveyTopic?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    timeLimit?: number | null | undefined;
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
    taskNumber: number;
    module: "writing";
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }> & {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }>;
    wordCountTarget?: string | null | undefined;
    surveyTopic?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    timeLimit?: number | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    taskNumber: number;
    module: "writing";
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }> & {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }>;
    wordCountTarget?: string | null | undefined;
    surveyTopic?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    timeLimit?: number | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    taskNumber: number;
    module: "writing";
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }> & {
        options: string[];
        questionNumber: number;
        questionText: string;
        questionType: "rating_scale" | "multiple_choice" | "checkbox" | "open_ended";
        wordCountTarget?: string | null | undefined;
    }>;
    wordCountTarget?: string | null | undefined;
    surveyTopic?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    timeLimit?: number | null | undefined;
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
export default WritingQuestion;
export { WritingQuestionSchema };
