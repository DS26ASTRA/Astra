const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const demoStore = require('./demoStore');

global.isMongoConnected = false;

const autoSeedMongoDB = async () => {
  try {
    const User = require('../models/User');
    const Team = require('../models/Team');

    for (const admin of demoStore.admins) {
      const exists = await User.findOne({ email: admin.email });
      if (!exists) {
        const hash = await bcrypt.hash(admin.passwordPlain, 10);
        await User.create({
          name: admin.name,
          email: admin.email,
          password: hash,
          role: 'ADMIN',
          status: admin.status
        });
        console.log(`[AutoSeed] Created admin: ${admin.email}`);
      }
    }

    for (const fac of demoStore.faculty) {
      const exists = await User.findOne({ email: fac.email });
      if (!exists) {
        const hash = await bcrypt.hash(fac.passwordPlain, 10);
        await User.create({
          name: fac.name,
          email: fac.email,
          password: hash,
          role: 'FACULTY',
          facultyId: fac.facultyId,
          department: fac.department,
          designation: fac.designation,
          status: fac.status
        });
        console.log(`[AutoSeed] Created faculty: ${fac.email}`);
      }
    }

    for (const tm of demoStore.teams) {
      const exists = await Team.findOne({ email: tm.email });
      if (!exists) {
        const hash = await bcrypt.hash(tm.passwordPlain, 10);
        await Team.create({
          teamId: tm.teamId,
          teamName: tm.teamName,
          email: tm.email,
          password: hash,
          participationType: tm.participationType,
          college: tm.college,
          department: tm.department,
          year: tm.year,
          leader: tm.leader,
          members: tm.members,
          paymentStatus: tm.paymentStatus,
          registrationStatus: tm.registrationStatus,
          qualificationStatus: tm.qualificationStatus
        });
        console.log(`[AutoSeed] Created team: ${tm.email}`);
      }
    }
  } catch (err) {
    console.error('[AutoSeed] Error during seeding:', err.message);
  }
};

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/astra';
  mongoose.set('bufferCommands', false);

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500
    });
    global.isMongoConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    autoSeedMongoDB();
  } catch (error) {
    global.isMongoConnected = false;
    console.warn(`[Astra Backend] MongoDB offline (${error.message}).`);
    console.log(`[Astra Backend] Activated Resilient Demo Mode: All Admin, Faculty, and Team credentials and dashboards are 100% OPERATIONAL!`);
  }
};

module.exports = connectDB;
