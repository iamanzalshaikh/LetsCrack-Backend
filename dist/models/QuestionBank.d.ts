import mongoose from 'mongoose';
declare const QuestionBankSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "listening" | "reading" | "writing" | "speaking";
    mediaType: "none" | "audio" | "video" | "image";
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }>;
    layoutType: "split" | "single";
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
    sampleTranscript?: string | null | undefined;
    mediaUrl?: string | null | undefined;
    instructionVideoUrl?: string | null | undefined;
    prompt?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    passageText?: string | null | undefined;
    title?: string | null | undefined;
    instructions?: string | null | undefined;
    instructionsPage2?: string | null | undefined;
    partInstructionsText?: string | null | undefined;
    timerSeconds?: number | null | undefined;
    questionPoolId?: string | null | undefined;
    leftPanel?: {
        type: "none" | "audio" | "image" | "markdown";
        contentBlocks: string[];
        mediaUrl?: string | null | undefined;
    } | null | undefined;
    rightPanel?: {
        sections: mongoose.Types.DocumentArray<{
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }> & {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }>;
    } | null | undefined;
    metadata?: {
        difficulty: "easy" | "medium" | "hard";
        tags: string[];
        source?: string | null | undefined;
        estimatedTime?: number | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "listening" | "reading" | "writing" | "speaking";
    mediaType: "none" | "audio" | "video" | "image";
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }>;
    layoutType: "split" | "single";
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
    sampleTranscript?: string | null | undefined;
    mediaUrl?: string | null | undefined;
    instructionVideoUrl?: string | null | undefined;
    prompt?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    passageText?: string | null | undefined;
    title?: string | null | undefined;
    instructions?: string | null | undefined;
    instructionsPage2?: string | null | undefined;
    partInstructionsText?: string | null | undefined;
    timerSeconds?: number | null | undefined;
    questionPoolId?: string | null | undefined;
    leftPanel?: {
        type: "none" | "audio" | "image" | "markdown";
        contentBlocks: string[];
        mediaUrl?: string | null | undefined;
    } | null | undefined;
    rightPanel?: {
        sections: mongoose.Types.DocumentArray<{
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }> & {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }>;
    } | null | undefined;
    metadata?: {
        difficulty: "easy" | "medium" | "hard";
        tags: string[];
        source?: string | null | undefined;
        estimatedTime?: number | null | undefined;
    } | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "listening" | "reading" | "writing" | "speaking";
    mediaType: "none" | "audio" | "video" | "image";
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }>;
    layoutType: "split" | "single";
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
    sampleTranscript?: string | null | undefined;
    mediaUrl?: string | null | undefined;
    instructionVideoUrl?: string | null | undefined;
    prompt?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    passageText?: string | null | undefined;
    title?: string | null | undefined;
    instructions?: string | null | undefined;
    instructionsPage2?: string | null | undefined;
    partInstructionsText?: string | null | undefined;
    timerSeconds?: number | null | undefined;
    questionPoolId?: string | null | undefined;
    leftPanel?: {
        type: "none" | "audio" | "image" | "markdown";
        contentBlocks: string[];
        mediaUrl?: string | null | undefined;
    } | null | undefined;
    rightPanel?: {
        sections: mongoose.Types.DocumentArray<{
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }> & {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }>;
    } | null | undefined;
    metadata?: {
        difficulty: "easy" | "medium" | "hard";
        tags: string[];
        source?: string | null | undefined;
        estimatedTime?: number | null | undefined;
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
    module: "listening" | "reading" | "writing" | "speaking";
    mediaType: "none" | "audio" | "video" | "image";
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }>;
    layoutType: "split" | "single";
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
    sampleTranscript?: string | null | undefined;
    mediaUrl?: string | null | undefined;
    instructionVideoUrl?: string | null | undefined;
    prompt?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    passageText?: string | null | undefined;
    title?: string | null | undefined;
    instructions?: string | null | undefined;
    instructionsPage2?: string | null | undefined;
    partInstructionsText?: string | null | undefined;
    timerSeconds?: number | null | undefined;
    questionPoolId?: string | null | undefined;
    leftPanel?: {
        type: "none" | "audio" | "image" | "markdown";
        contentBlocks: string[];
        mediaUrl?: string | null | undefined;
    } | null | undefined;
    rightPanel?: {
        sections: mongoose.Types.DocumentArray<{
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }> & {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }>;
    } | null | undefined;
    metadata?: {
        difficulty: "easy" | "medium" | "hard";
        tags: string[];
        source?: string | null | undefined;
        estimatedTime?: number | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "listening" | "reading" | "writing" | "speaking";
    mediaType: "none" | "audio" | "video" | "image";
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }>;
    layoutType: "split" | "single";
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
    sampleTranscript?: string | null | undefined;
    mediaUrl?: string | null | undefined;
    instructionVideoUrl?: string | null | undefined;
    prompt?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    passageText?: string | null | undefined;
    title?: string | null | undefined;
    instructions?: string | null | undefined;
    instructionsPage2?: string | null | undefined;
    partInstructionsText?: string | null | undefined;
    timerSeconds?: number | null | undefined;
    questionPoolId?: string | null | undefined;
    leftPanel?: {
        type: "none" | "audio" | "image" | "markdown";
        contentBlocks: string[];
        mediaUrl?: string | null | undefined;
    } | null | undefined;
    rightPanel?: {
        sections: mongoose.Types.DocumentArray<{
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }> & {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }>;
    } | null | undefined;
    metadata?: {
        difficulty: "easy" | "medium" | "hard";
        tags: string[];
        source?: string | null | undefined;
        estimatedTime?: number | null | undefined;
    } | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "listening" | "reading" | "writing" | "speaking";
    mediaType: "none" | "audio" | "video" | "image";
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }>;
    layoutType: "split" | "single";
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
    sampleTranscript?: string | null | undefined;
    mediaUrl?: string | null | undefined;
    instructionVideoUrl?: string | null | undefined;
    prompt?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    passageText?: string | null | undefined;
    title?: string | null | undefined;
    instructions?: string | null | undefined;
    instructionsPage2?: string | null | undefined;
    partInstructionsText?: string | null | undefined;
    timerSeconds?: number | null | undefined;
    questionPoolId?: string | null | undefined;
    leftPanel?: {
        type: "none" | "audio" | "image" | "markdown";
        contentBlocks: string[];
        mediaUrl?: string | null | undefined;
    } | null | undefined;
    rightPanel?: {
        sections: mongoose.Types.DocumentArray<{
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }> & {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }>;
    } | null | undefined;
    metadata?: {
        difficulty: "easy" | "medium" | "hard";
        tags: string[];
        source?: string | null | undefined;
        estimatedTime?: number | null | undefined;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "listening" | "reading" | "writing" | "speaking";
    mediaType: "none" | "audio" | "video" | "image";
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }>;
    layoutType: "split" | "single";
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
    sampleTranscript?: string | null | undefined;
    mediaUrl?: string | null | undefined;
    instructionVideoUrl?: string | null | undefined;
    prompt?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    passageText?: string | null | undefined;
    title?: string | null | undefined;
    instructions?: string | null | undefined;
    instructionsPage2?: string | null | undefined;
    partInstructionsText?: string | null | undefined;
    timerSeconds?: number | null | undefined;
    questionPoolId?: string | null | undefined;
    leftPanel?: {
        type: "none" | "audio" | "image" | "markdown";
        contentBlocks: string[];
        mediaUrl?: string | null | undefined;
    } | null | undefined;
    rightPanel?: {
        sections: mongoose.Types.DocumentArray<{
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }> & {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }>;
    } | null | undefined;
    metadata?: {
        difficulty: "easy" | "medium" | "hard";
        tags: string[];
        source?: string | null | undefined;
        estimatedTime?: number | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "listening" | "reading" | "writing" | "speaking";
    mediaType: "none" | "audio" | "video" | "image";
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }>;
    layoutType: "split" | "single";
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
    sampleTranscript?: string | null | undefined;
    mediaUrl?: string | null | undefined;
    instructionVideoUrl?: string | null | undefined;
    prompt?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    passageText?: string | null | undefined;
    title?: string | null | undefined;
    instructions?: string | null | undefined;
    instructionsPage2?: string | null | undefined;
    partInstructionsText?: string | null | undefined;
    timerSeconds?: number | null | undefined;
    questionPoolId?: string | null | undefined;
    leftPanel?: {
        type: "none" | "audio" | "image" | "markdown";
        contentBlocks: string[];
        mediaUrl?: string | null | undefined;
    } | null | undefined;
    rightPanel?: {
        sections: mongoose.Types.DocumentArray<{
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }> & {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }>;
    } | null | undefined;
    metadata?: {
        difficulty: "easy" | "medium" | "hard";
        tags: string[];
        source?: string | null | undefined;
        estimatedTime?: number | null | undefined;
    } | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    testSetNumber: number;
    module: "listening" | "reading" | "writing" | "speaking";
    mediaType: "none" | "audio" | "video" | "image";
    allowReplay: boolean;
    allowSeek: boolean;
    playLimit: number;
    mcqs: mongoose.Types.DocumentArray<{
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }> & {
        options: string[];
        questionText?: string | null | undefined;
        correctOption?: number | null | undefined;
        questionAudioUrl?: string | null | undefined;
        sectionAudioUrl?: string | null | undefined;
        sectionImage?: string | null | undefined;
        sectionIntroText?: string | null | undefined;
        sectionScript?: string | null | undefined;
    }>;
    layoutType: "split" | "single";
    taskNumber?: number | null | undefined;
    audioUrl?: string | null | undefined;
    wordCountTarget?: string | null | undefined;
    optionA?: string | null | undefined;
    optionB?: string | null | undefined;
    imageUrl?: string | null | undefined;
    sampleResponse?: string | null | undefined;
    scenario?: {
        taskInstructions: string[];
        subheading?: string | null | undefined;
        backgroundParagraph?: string | null | undefined;
    } | null | undefined;
    sampleTranscript?: string | null | undefined;
    mediaUrl?: string | null | undefined;
    instructionVideoUrl?: string | null | undefined;
    prompt?: string | null | undefined;
    prepTime?: number | null | undefined;
    speakingTime?: number | null | undefined;
    passageText?: string | null | undefined;
    title?: string | null | undefined;
    instructions?: string | null | undefined;
    instructionsPage2?: string | null | undefined;
    partInstructionsText?: string | null | undefined;
    timerSeconds?: number | null | undefined;
    questionPoolId?: string | null | undefined;
    leftPanel?: {
        type: "none" | "audio" | "image" | "markdown";
        contentBlocks: string[];
        mediaUrl?: string | null | undefined;
    } | null | undefined;
    rightPanel?: {
        sections: mongoose.Types.DocumentArray<{
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }> & {
            questions: mongoose.Types.DocumentArray<{
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }> & {
                options: string[];
                id?: string | null | undefined;
                type?: "single_select" | "inline_select" | "multi_select" | "text_input" | null | undefined;
                label?: string | null | undefined;
                correctAnswer?: any;
                order?: number | null | undefined;
            }>;
            matchingQuestions: mongoose.Types.DocumentArray<{
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }> & {
                id?: string | null | undefined;
                order?: number | null | undefined;
                statement?: string | null | undefined;
                correctParagraph?: string | null | undefined;
            }>;
            type?: "standalone_dropdown" | "inline_dropdown" | "paragraph_match" | "mcq" | null | undefined;
            template?: string | null | undefined;
        }>;
    } | null | undefined;
    metadata?: {
        difficulty: "easy" | "medium" | "hard";
        tags: string[];
        source?: string | null | undefined;
        estimatedTime?: number | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default QuestionBank;
export { QuestionBankSchema };
