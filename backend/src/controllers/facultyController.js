const Team = require('../models/Team');
const Evaluation = require('../models/Evaluation');
const Classroom = require('../models/Classroom');
const User = require('../models/User');

exports.getFacultyProfile = async (req, res) => {
  try {
    const facultyUser = await User.findById(req.user._id).select('-password');
    res.json({ success: true, data: facultyUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignedTeams = async (req, res) => {
  try {
    const teams = await Team.find({ assignedFaculty: req.user._id }).populate('classroomId');
    res.json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkInTeam = async (req, res) => {
  const { teamId } = req.body; // Can be the _id or teamId string
  try {
    const team = await Team.findOne({
      $or: [{ _id: teamId.length === 24 ? teamId : null }, { teamId: teamId }],
      assignedFaculty: req.user._id
    });

    if (!team) return res.status(404).json({ success: false, message: 'Team not found or not assigned to you' });
    if (team.checkInStatus === 'CHECKED_IN') return res.status(400).json({ success: false, message: 'Team is already checked in' });

    team.checkInStatus = 'CHECKED_IN';
    team.checkInTime = Date.now();
    await team.save();

    res.json({ success: true, message: 'Team checked in successfully', data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitEvaluation = async (req, res) => {
  const { teamId, roundId, criteria, remarks } = req.body;
  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    // Ensure faculty is assigned to this team
    if (!team.assignedFaculty.includes(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not authorized to evaluate this team' });
    }

    let totalScore = 0;
    for (const score of Object.values(criteria)) {
      totalScore += (Number(score) || 0);
    }

    const evaluationData = {
      teamId,
      facultyId: req.user._id,
      criteria,
      totalScore,
      remarks
    };

    const mongoose = require('mongoose');
    if (mongoose.Types.ObjectId.isValid(roundId)) {
      evaluationData.round = roundId;
    }

    const evaluation = await Evaluation.create(evaluationData);
    team.evaluationStatus = 'EVALUATED';
    await team.save();

    res.status(201).json({ success: true, data: evaluation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
