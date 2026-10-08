const Event = require('../models/Event');
const Evaluation = require('../models/Evaluation');
const demoStore = require('../config/demoStore');

exports.getEventDetails = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      let event = await Event.findOne({ status: 'ACTIVE' });
      if (!event) {
        event = await Event.create(demoStore.event);
      }
      return res.json({ success: true, data: event });
    }
    res.json({ success: true, data: demoStore.event });
  } catch (error) {
    res.json({ success: true, data: demoStore.event });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const evaluations = await Evaluation.find().populate('teamId', 'teamName participationType qualificationStatus');
      if (evaluations.length > 0) {
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
        return res.json({ success: true, data: leaderboard });
      }
    }

    // Demo store fallback with rich elevation and stage climbing ranks
    const demoLeaderboard = demoStore.teams
      .map(t => ({
        _id: t._id,
        teamName: t.teamName,
        teamId: t.teamId,
        participationType: t.participationType,
        status: t.qualificationStatus,
        score: t.score || 85,
        stage: t.stage || 3,
        elevation: t.elevation || '3,600m'
      }))
      .sort((a, b) => b.score - a.score);

    res.json({ success: true, data: demoLeaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
