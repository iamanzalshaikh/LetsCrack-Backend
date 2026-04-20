import mongoose from 'mongoose';
declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    password: string;
    role: "user" | "examiner" | "admin";
    subscriptionStatus: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    country?: string | null | undefined;
    phone?: string | null | undefined;
    profilePicture?: string | null | undefined;
    lastLoginAt?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    password: string;
    role: "user" | "examiner" | "admin";
    subscriptionStatus: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    country?: string | null | undefined;
    phone?: string | null | undefined;
    profilePicture?: string | null | undefined;
    lastLoginAt?: NativeDate | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    email: string;
    password: string;
    role: "user" | "examiner" | "admin";
    subscriptionStatus: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    country?: string | null | undefined;
    phone?: string | null | undefined;
    profilePicture?: string | null | undefined;
    lastLoginAt?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const User: mongoose.Model<{
    email: string;
    password: string;
    role: "user" | "examiner" | "admin";
    subscriptionStatus: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    country?: string | null | undefined;
    phone?: string | null | undefined;
    profilePicture?: string | null | undefined;
    lastLoginAt?: NativeDate | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    password: string;
    role: "user" | "examiner" | "admin";
    subscriptionStatus: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    country?: string | null | undefined;
    phone?: string | null | undefined;
    profilePicture?: string | null | undefined;
    lastLoginAt?: NativeDate | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    email: string;
    password: string;
    role: "user" | "examiner" | "admin";
    subscriptionStatus: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    country?: string | null | undefined;
    phone?: string | null | undefined;
    profilePicture?: string | null | undefined;
    lastLoginAt?: NativeDate | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    password: string;
    role: "user" | "examiner" | "admin";
    subscriptionStatus: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    country?: string | null | undefined;
    phone?: string | null | undefined;
    profilePicture?: string | null | undefined;
    lastLoginAt?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    password: string;
    role: "user" | "examiner" | "admin";
    subscriptionStatus: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    country?: string | null | undefined;
    phone?: string | null | undefined;
    profilePicture?: string | null | undefined;
    lastLoginAt?: NativeDate | null | undefined;
}>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<{
    email: string;
    password: string;
    role: "user" | "examiner" | "admin";
    subscriptionStatus: "active" | "inactive" | "expired";
    createdAt: NativeDate;
    updatedAt: NativeDate;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    country?: string | null | undefined;
    phone?: string | null | undefined;
    profilePicture?: string | null | undefined;
    lastLoginAt?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
export { UserSchema };
