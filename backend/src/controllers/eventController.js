const Event = require('../models/Event');

exports.getEventDetails = async (req, res) => {
  try {
    let event = await Event.findOne({ status: 'ACTIVE' });
    if (!event) {
      // If no event exists, create a default one (helpful for testing)
      event = await Event.create({
        name: 'ANCIENT CIVILIZATION – AVINYOTSAV & HACKATHON',
        theme: 'Ancient Indian Civilization',
        participationOptions: ['AVINYOTSAV', 'HACKATHON', 'BOTH'],
        prices: {
          AVINYOTSAV: 150,
          HACKATHON: 500,
          BOTH: 650
        }
      });
    }
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const Evaluation = require('../models/Evaluation');
exports.getLeaderboard = async (req, res) => {
  try {
    const evaluations = await Evaluation.find().populate('teamId', 'teamName participationType qualificationStatus');
    
    const teamScores = {};
    evaluations.forEach(ev => {
      if (ev.teamId) {
        if (!teamScores[ev.teamId._id]) {
          teamScores[ev.teamId._id] = {
            _id: ev.teamId._id,
            teamName: ev.teamId.teamName,
            participationType: ev.teamId.participationType,
            status: ev.teamId.qualificationStatus,
            score: 0
          };
        }
        teamScores[ev.teamId._id].score += ev.totalScore;
      }
    });

    const leaderboard = Object.values(teamScores).sort((a, b) => b.score - a.score);

    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
