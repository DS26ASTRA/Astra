const express = require('express');
const router = express.Router();
const { getAssignedTeams, submitEvaluation, getFacultyProfile, checkInTeam } = require('../controllers/facultyController');
const { protect, faculty } = require('../middleware/authMiddleware');

router.get('/profile', protect, faculty, getFacultyProfile);
router.get('/teams', protect, faculty, getAssignedTeams);
router.post('/check-in', protect, faculty, checkInTeam);
router.post('/evaluation', protect, faculty, submitEvaluation);

module.exports = router;
