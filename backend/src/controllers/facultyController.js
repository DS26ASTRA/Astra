const Team = require('../models/Team');
const Evaluation = require('../models/Evaluation');
const Classroom = require('../models/Classroom');
const User = require('../models/User');
const demoStore = require('../config/demoStore');

exports.getFacultyProfile = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const facultyUser = await User.findById(req.user._id).select('-password');
      if (facultyUser) return res.json({ success: true, data: facultyUser });
    }
    const facultyUser = demoStore.faculty.find(f => f._id === req.user._id) || demoStore.faculty[0];
    res.json({ success: true, data: facultyUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignedTeams = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const teams = await Team.find({ assignedFaculty: req.user._id }).populate('classroomId');
      return res.json({ success: true, data: teams });
    }
    // Demo fallback - return demo teams
    res.json({ success: true, data: demoStore.teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkInTeam = async (req, res) => {
  const { teamId } = req.body;
  try {
    if (global.isMongoConnected) {
      const team = await Team.findOne({
        $or: [{ _id: teamId.length === 24 ? teamId : null }, { teamId: teamId }],
        assignedFaculty: req.user._id
      });

      if (team) {
        if (team.checkInStatus === 'CHECKED_IN') return res.status(400).json({ success: false, message: 'Team is already checked in' });
        team.checkInStatus = 'CHECKED_IN';
        team.checkInTime = Date.now();
        await team.save();
        return res.json({ success: true, message: 'Team checked in successfully', data: team });
      }
    }

    const t = demoStore.teams.find(tm => tm._id === teamId || tm.teamId === teamId) || demoStore.teams[0];
    t.checkInStatus = 'CHECKED_IN';
    t.checkInTime = Date.now();
    res.json({ success: true, message: 'Team checked in successfully (Demo Mode)', data: t });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitEvaluation = async (req, res) => {
  const { teamId, roundId, criteria, remarks } = req.body;
  try {
    let totalScore = 0;
    if (criteria) {
      for (const score of Object.values(criteria)) {
        totalScore += (Number(score) || 0);
      }
    }

    if (global.isMongoConnected) {
      const team = await Team.findById(teamId);
      if (team) {
        const evaluationData = {
          teamId,
          facultyId: req.user._id,
          criteria,
          totalScore,
          remarks
        };
        const evaluation = await Evaluation.create(evaluationData);
        team.evaluationStatus = 'EVALUATED';
        await team.save();
        return res.status(201).json({ success: true, data: evaluation });
      }
    }

    const t = demoStore.teams.find(tm => tm._id === teamId) || demoStore.teams[0];
    t.score = totalScore;
    t.evaluationStatus = 'EVALUATED';
    res.status(201).json({ 
      success: true, 
      data: {
        teamId: t._id,
        totalScore,
        remarks: remarks || 'Excellent ancient civilization engineering proposal.'
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
