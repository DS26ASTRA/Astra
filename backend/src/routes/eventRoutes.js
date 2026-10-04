const express = require('express');
const router = express.Router();
const { getEventDetails, getLeaderboard } = require('../controllers/eventController');

router.get('/', getEventDetails);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
