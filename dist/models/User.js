import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    role: { type: String, enum: ['user', 'examiner', 'admin'], default: 'user' },
    country: String,
    phone: String,
    profilePicture: String,
    subscriptionStatus: { type: String, enum: ['active', 'inactive', 'expired'], default: 'inactive' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastLoginAt: Date
});
// Hash password before save
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
const User = mongoose.model('User', UserSchema);
export default User;
export { UserSchema };
//# sourceMappingURL=User.js.map