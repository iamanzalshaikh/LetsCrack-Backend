import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/database.js';
dotenv.config();
const seedUsers = async () => {
    try {
        await connectDB();
        console.log('🧹 Cleaning existing users...');
        await User.deleteMany({});
        console.log('🌱 Seeding Admin...');
        const admin = await User.create({
            email: 'admin@letscrack.com',
            password: 'Admin123!', // Will be hashed by pre-save hook
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            subscriptionStatus: 'active'
        });
        console.log('🌱 Seeding Student...');
        const student = await User.create({
            email: 'student@letscrack.com',
            password: 'Student123!', // Will be hashed by pre-save hook
            firstName: 'Student',
            lastName: 'One',
            role: 'user',
            subscriptionStatus: 'active'
        });
        console.log('\n✅ Seeding Complete!');
        console.log('Admin: admin@letscrack.com / Admin123!');
        console.log('Student: student@letscrack.com / Student123!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};
seedUsers();
//# sourceMappingURL=seed-users.js.map