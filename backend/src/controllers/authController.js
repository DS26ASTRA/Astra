const User = require('../models/User');
const Team = require('../models/Team');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const demoStore = require('../config/demoStore');

// Register Team
exports.registerTeam = async (req, res) => {
  res.status(501).json({ success: false, message: 'Use team registration endpoint at /api/teams/register.' });
};

// Login Team
exports.loginTeam = async (req, res) => {
  const { email, password } = req.body;
  try {
    const cleanEmail = (email || '').trim().toLowerCase();

    // 1. Check Demo Store first
    const demoTeam = demoStore.teams.find(t => t.email.toLowerCase() === cleanEmail);
    if (demoTeam) {
      const isMatch = password === demoTeam.passwordPlain || (await bcrypt.compare(password, demoTeam.passwordPlain).catch(() => false));
      if (isMatch) {
        return res.json({
          success: true,
          data: {
            _id: demoTeam._id,
            teamId: demoTeam.teamId,
            teamName: demoTeam.teamName,
            email: demoTeam.email,
            participationType: demoTeam.participationType,
            paymentStatus: demoTeam.paymentStatus,
            token: generateToken(demoTeam._id, 'TEAM'),
          }
        });
      }
    }

    // 2. Check MongoDB if connected
    if (global.isMongoConnected) {
      const team = await Team.findOne({ email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } });
      if (team && (await bcrypt.compare(password, team.password))) {
        return res.json({
          success: true,
          data: {
            _id: team._id,
            teamId: team.teamId,
            teamName: team.teamName,
            email: team.email,
            participationType: team.participationType,
            paymentStatus: team.paymentStatus,
            token: generateToken(team._id, 'TEAM'),
          }
        });
      }
    }

    return res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password. Use demo credentials: team.demo@ancientcivilization.test / Team@123' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Register Faculty
exports.registerFaculty = async (req, res) => {
  const { name, email, password, facultyId, department, designation } = req.body;
  try {
    const cleanEmail = (email || '').trim().toLowerCase();

    if (global.isMongoConnected) {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: cleanEmail,
        password: hashedPassword,
        role: 'FACULTY',
        facultyId,
        department,
        designation,
        status: 'VERIFIED'
      });

      return res.status(201).json({
        success: true,
        message: 'Registration submitted successfully. Your account is activated.',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          status: user.status
        }
      });
    } else {
      // In-memory registration
      const newFac = {
        _id: '66200000000000000000000' + (demoStore.faculty.length + 1),
        name,
        email: cleanEmail,
        passwordPlain: password,
        role: 'FACULTY',
        facultyId: facultyId || 'FAC-' + Date.now(),
        department,
        designation,
        status: 'VERIFIED'
      };
      demoStore.faculty.push(newFac);
      return res.status(201).json({
        success: true,
        message: 'Faculty registered successfully (Demo Mode Active).',
        data: {
          _id: newFac._id,
          name: newFac.name,
          email: newFac.email,
          status: newFac.status
        }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login Faculty
exports.loginFaculty = async (req, res) => {
  const { email, password } = req.body;
  try {
    const cleanEmail = (email || '').trim().toLowerCase();

    // 1. Check Demo Store
    const demoFac = demoStore.faculty.find(f => f.email.toLowerCase() === cleanEmail);
    if (demoFac) {
      const isMatch = password === demoFac.passwordPlain || (await bcrypt.compare(password, demoFac.passwordPlain).catch(() => false));
      if (isMatch) {
        return res.json({
          success: true,
          data: {
            _id: demoFac._id,
            name: demoFac.name,
            email: demoFac.email,
            role: demoFac.role,
            facultyId: demoFac.facultyId,
            token: generateToken(demoFac._id, demoFac.role)
          }
        });
      }
    }

    // 2. Check MongoDB if connected
    if (global.isMongoConnected) {
      const user = await User.findOne({ email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') }, role: 'FACULTY' });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          if (user.status !== 'VERIFIED' && user.status !== 'ACTIVE') {
            return res.status(403).json({ success: false, message: 'Account pending physical verification by Admin or rejected.' });
          }
          return res.json({
            success: true,
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: generateToken(user._id, user.role)
            }
          });
        }
      }
    }

    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials. Use demo credentials: faculty.demo@ancientcivilization.test / Faculty@123' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const cleanEmail = (email || '').trim().toLowerCase();

    // 1. Check Demo Store
    const demoAdmin = demoStore.admins.find(a => a.email.toLowerCase() === cleanEmail);
    if (demoAdmin) {
      const isMatch = password === demoAdmin.passwordPlain || (await bcrypt.compare(password, demoAdmin.passwordPlain).catch(() => false));
      if (isMatch) {
        return res.json({
          success: true,
          data: {
            _id: demoAdmin._id,
            name: demoAdmin.name,
            email: demoAdmin.email,
            role: demoAdmin.role,
            token: generateToken(demoAdmin._id, demoAdmin.role)
          }
        });
      }
    }

    // 2. Check MongoDB if connected
    if (global.isMongoConnected) {
      const user = await User.findOne({ email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') }, role: 'ADMIN' });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return res.json({
            success: true,
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: generateToken(user._id, user.role)
            }
          });
        }
      }
    }

    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials. Use demo credentials: admin@astra.com / admin123 or admin.demo@ancientcivilization.test / Admin@123' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
