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

// Hash password before save (Mongoose 8+: async hooks should not mix with next().)
UserSchema.pre('save', async function hashPasswordBeforeSave() {
  if (!this.isModified('password')) return;
  const plain = this.get('password') as string | undefined;
  if (typeof plain !== 'string' || !plain) {
    throw new Error('Password is required');
  }
  this.set('password', await bcrypt.hash(plain, 10));
});



const User = mongoose.model('User', UserSchema);

export default User;
export { UserSchema };
