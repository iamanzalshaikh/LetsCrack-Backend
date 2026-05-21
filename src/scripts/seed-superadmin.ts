import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/database.js';

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await connectDB();

    console.log('🔍 Checking if Super Admin already exists...');
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });

    if (existingAdmin) {
      console.log('⚠️ Super Admin already exists. Updating password...');
      existingAdmin.password = '1234';
      existingAdmin.role = 'admin';
      existingAdmin.firstName = 'Super';
      existingAdmin.lastName = 'Admin';
      await existingAdmin.save();
    } else {
      console.log('🌱 Seeding Super Admin...');
      await User.create({
        email: 'admin@gmail.com',
        password: '1234',
        firstName: 'Super',
        lastName: 'Admin',
        role: 'admin',
        subscriptionStatus: 'active'
      });
    }

    console.log('\n✅ Seeding Complete!');
    console.log('Super Admin: admin@gmail.com / 1234');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedSuperAdmin();
