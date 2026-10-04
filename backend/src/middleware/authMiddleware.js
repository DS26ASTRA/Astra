const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Team = require('../models/Team');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === 'ADMIN' || decoded.role === 'FACULTY') {
        req.user = await User.findById(decoded.id).select('-password');
        req.userRole = decoded.role;
      } else if (decoded.role === 'TEAM') {
        req.user = await Team.findById(decoded.id).select('-password');
        req.userRole = 'TEAM';
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
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
