const express = require('express');
const router = express.Router();
const { registerTeam, getTeamProfile } = require('../controllers/teamController');
const { protect, team } = require('../middleware/authMiddleware');

router.post('/register', registerTeam);
router.get('/profile', protect, team, getTeamProfile);

module.exports = router;
