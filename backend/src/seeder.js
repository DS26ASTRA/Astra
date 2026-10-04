require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Team = require('./models/Team');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/avinyotsav_hackathon');
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    // Delete existing demo accounts
    await User.deleteMany({ email: { $in: ['admin.demo@ancientcivilization.test', 'faculty.demo@ancientcivilization.test'] } });
    await Team.deleteMany({ email: 'team.demo@ancientcivilization.test' });

    console.log('Cleared old demo accounts');

    const salt = await bcrypt.genSalt(10);

    // Create Admin
    const adminPassword = await bcrypt.hash('Admin@123', salt);
    await User.create({
      name: 'Demo Admin',
      email: 'admin.demo@ancientcivilization.test',
      password: adminPassword,
      role: 'ADMIN',
      status: 'VERIFIED'
    });

    // Create Faculty
    const facultyPassword = await bcrypt.hash('Faculty@123', salt);
    const faculty = await User.create({
      name: 'Demo Faculty',
      email: 'faculty.demo@ancientcivilization.test',
      password: facultyPassword,
      role: 'FACULTY',
      facultyId: 'FAC-DEMO-001',
      department: 'Computer Science',
      designation: 'Professor',
      status: 'VERIFIED' // Verified so they can login directly
    });

    // Create Team
    const teamPassword = await bcrypt.hash('Team@123', salt);
    await Team.create({
      teamId: 'TEAM-DEMO-001',
      teamName: 'Demo Warriors',
      email: 'team.demo@ancientcivilization.test',
      password: teamPassword,
      participationType: 'BOTH',
      college: 'Demo Institute of Technology',
      department: 'Computer Science',
      year: '3rd Year',
      leader: {
        name: 'John Doe',
        rollNumber: 'CS123',
        email: 'leader@demo.test',
        phone: '1234567890',
        department: 'CS',
        year: '3'
      },
      members: [
        {
          name: 'Jane Smith',
          rollNumber: 'CS124',
          email: 'jane@demo.test',
          phone: '0987654321',
          department: 'CS',
          year: '3'
        }
      ],
      paymentStatus: 'PAID',
      registrationStatus: 'CONFIRMED',
      qualificationStatus: 'QUALIFIED',
      assignedFaculty: [faculty._id] // Assign to our demo faculty
    });

    console.log('Demo accounts seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
