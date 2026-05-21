import mongoose from 'mongoose';
declare const TestSetSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    version: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    testSetNumber: number;
    status: "draft" | "published";
    title: string;
    modeSupport: ("practice" | "simulation")[];
    modules: ("listening" | "reading" | "writing" | "speaking")[];
    estimatedTimeMinutes: number;
    publishedAt?: NativeDate | null | undefined;
    instructions?: {
        practice: string;
        simulation: string;
        writingInstructionText: string;
        writingInstructionVideoUrl: string;
        speakingInstructionText: string;
        speakingInstructionVideoUrl: string;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    version: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    testSetNumber: number;
    status: "draft" | "published";
    title: string;
    modeSupport: ("practice" | "simulation")[];
    modules: ("listening" | "reading" | "writing" | "speaking")[];
    estimatedTimeMinutes: number;
    publishedAt?: NativeDate | null | undefined;
    instructions?: {
        practice: string;
        simulation: string;
        writingInstructionText: string;
        writingInstructionVideoUrl: string;
        speakingInstructionText: string;
        speakingInstructionVideoUrl: string;
    } | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    version: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    testSetNumber: number;
    status: "draft" | "published";
    title: string;
    modeSupport: ("practice" | "simulation")[];
    modules: ("listening" | "reading" | "writing" | "speaking")[];
    estimatedTimeMinutes: number;
    publishedAt?: NativeDate | null | undefined;
    instructions?: {
        practice: string;
        simulation: string;
        writingInstructionText: string;
        writingInstructionVideoUrl: string;
        speakingInstructionText: string;
        speakingInstructionVideoUrl: string;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const TestSet: mongoose.Model<{
    version: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    testSetNumber: number;
    status: "draft" | "published";
    title: string;
    modeSupport: ("practice" | "simulation")[];
    modules: ("listening" | "reading" | "writing" | "speaking")[];
    estimatedTimeMinutes: number;
    publishedAt?: NativeDate | null | undefined;
    instructions?: {
        practice: string;
        simulation: string;
        writingInstructionText: string;
        writingInstructionVideoUrl: string;
        speakingInstructionText: string;
        speakingInstructionVideoUrl: string;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    version: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    testSetNumber: number;
    status: "draft" | "published";
    title: string;
    modeSupport: ("practice" | "simulation")[];
    modules: ("listening" | "reading" | "writing" | "speaking")[];
    estimatedTimeMinutes: number;
    publishedAt?: NativeDate | null | undefined;
    instructions?: {
        practice: string;
        simulation: string;
        writingInstructionText: string;
        writingInstructionVideoUrl: string;
        speakingInstructionText: string;
        speakingInstructionVideoUrl: string;
    } | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    version: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    testSetNumber: number;
    status: "draft" | "published";
    title: string;
    modeSupport: ("practice" | "simulation")[];
    modules: ("listening" | "reading" | "writing" | "speaking")[];
    estimatedTimeMinutes: number;
    publishedAt?: NativeDate | null | undefined;
    instructions?: {
        practice: string;
        simulation: string;
        writingInstructionText: string;
        writingInstructionVideoUrl: string;
        speakingInstructionText: string;
        speakingInstructionVideoUrl: string;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    version: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    testSetNumber: number;
    status: "draft" | "published";
    title: string;
    modeSupport: ("practice" | "simulation")[];
    modules: ("listening" | "reading" | "writing" | "speaking")[];
    estimatedTimeMinutes: number;
    publishedAt?: NativeDate | null | undefined;
    instructions?: {
        practice: string;
        simulation: string;
        writingInstructionText: string;
        writingInstructionVideoUrl: string;
        speakingInstructionText: string;
        speakingInstructionVideoUrl: string;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    version: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    testSetNumber: number;
    status: "draft" | "published";
    title: string;
    modeSupport: ("practice" | "simulation")[];
    modules: ("listening" | "reading" | "writing" | "speaking")[];
    estimatedTimeMinutes: number;
    publishedAt?: NativeDate | null | undefined;
    instructions?: {
        practice: string;
        simulation: string;
        writingInstructionText: string;
        writingInstructionVideoUrl: string;
        speakingInstructionText: string;
        speakingInstructionVideoUrl: string;
    } | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    version: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    testSetNumber: number;
    status: "draft" | "published";
    title: string;
    modeSupport: ("practice" | "simulation")[];
    modules: ("listening" | "reading" | "writing" | "speaking")[];
    estimatedTimeMinutes: number;
    publishedAt?: NativeDate | null | undefined;
    instructions?: {
        practice: string;
        simulation: string;
        writingInstructionText: string;
        writingInstructionVideoUrl: string;
        speakingInstructionText: string;
        speakingInstructionVideoUrl: string;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default TestSet;
export { TestSetSchema };
