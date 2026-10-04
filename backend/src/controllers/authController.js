const User = require('../models/User');
const Team = require('../models/Team');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// Register Team (Basic logic, detailed in team routes later)
exports.registerTeam = async (req, res) => {
  // To be implemented in team controller, routing to auth for login/reg consistency
  res.status(501).json({ success: false, message: 'Not implemented here. Use team registration endpoint.' });
};

// Login Team
exports.loginTeam = async (req, res) => {
  const { email, password } = req.body;
  try {
    const team = await Team.findOne({ email });
    if (team && (await bcrypt.compare(password, team.password))) {
      res.json({
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
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Register Faculty
exports.registerFaculty = async (req, res) => {
  const { name, email, password, facultyId, department, designation } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'FACULTY',
      facultyId,
      department,
      designation,
      status: 'PENDING_VERIFICATION'
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: 'Registration submitted successfully. Your account will be activated after Admin verifies your physical presence.',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          status: user.status
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
    const user = await User.findOne({ email, role: 'FACULTY' });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.status !== 'VERIFIED' && user.status !== 'ACTIVE') {
      return res.status(403).json({ success: false, message: 'Account pending physical verification by Admin or rejected.' });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: 'ADMIN' });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
