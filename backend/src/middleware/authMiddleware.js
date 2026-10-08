const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Team = require('../models/Team');
const demoStore = require('../config/demoStore');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'astra_super_secret_jwt_key_2026');

      if (global.isMongoConnected) {
        if (decoded.role === 'ADMIN' || decoded.role === 'FACULTY') {
          req.user = await User.findById(decoded.id).select('-password');
          req.userRole = decoded.role;
        } else if (decoded.role === 'TEAM') {
          req.user = await Team.findById(decoded.id).select('-password');
          req.userRole = 'TEAM';
        }
      }

      // Fallback to demo store if MongoDB offline or user not found in Mongo
      if (!req.user) {
        if (decoded.role === 'ADMIN') {
          req.user = demoStore.admins.find(a => a._id === decoded.id) || demoStore.admins[0];
          req.userRole = 'ADMIN';
        } else if (decoded.role === 'FACULTY') {
          req.user = demoStore.faculty.find(f => f._id === decoded.id) || demoStore.faculty[0];
          req.userRole = 'FACULTY';
        } else if (decoded.role === 'TEAM') {
          req.user = demoStore.teams.find(t => t._id === decoded.id) || demoStore.teams[0];
          req.userRole = 'TEAM';
        }
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error('Auth error:', error.message);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.userRole === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as an admin' });
  }
};

const faculty = (req, res, next) => {
  if (req.user && req.userRole === 'FACULTY') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as faculty' });
  }
};

const team = (req, res, next) => {
  if (req.user && req.userRole === 'TEAM') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as team' });
  }
};

module.exports = { protect, admin, faculty, team };
