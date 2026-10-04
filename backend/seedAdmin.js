require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if admin exists
    let admin = await User.findOne({ email: 'admin@astra.com' });
    if (admin) {
      console.log('Admin already exists.');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      admin = await User.create({
        name: 'Super Admin',
        email: 'admin@astra.com',
        password: hashedPassword,
        role: 'ADMIN',
        status: 'ACTIVE'
      });
      console.log('Admin user created successfully.');
    }
    
    console.log('CREDENTIALS:');
    console.log('Email: admin@astra.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
