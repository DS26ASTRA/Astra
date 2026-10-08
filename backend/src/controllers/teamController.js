const Team = require('../models/Team');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');
const demoStore = require('../config/demoStore');

const generateTeamId = async () => {
  const count = demoStore.teams.length;
  const year = new Date().getFullYear();
  return `TEAM-AC-${year}-${String(count + 1).padStart(3, '0')}`;
};

// Register Team
exports.registerTeam = async (req, res) => {
  const { participationType, college, department, year, leader, members, email, password } = req.body;
  if (leader && !leader.email) leader.email = email;
  try {
    const cleanEmail = (email || '').trim().toLowerCase();

    // Default prices
    let amount = 0;
    if (participationType === 'AVINYOTSAV') amount = 150;
    else if (participationType === 'HACKATHON') amount = 500;
    else if (participationType === 'BOTH') amount = 650;

    const teamId = await generateTeamId();
    const teamName = req.body.teamName || (leader ? leader.name + "'s Team" : 'Expedition Team');

    if (global.isMongoConnected) {
      const existingTeam = await Team.findOne({ email: cleanEmail });
      if (existingTeam) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const team = await Team.create({
        teamId,
        teamName,
        participationType,
        college,
        department: department || (leader ? leader.department : ''),
        year: year || (leader ? leader.year : ''),
        leader,
        members,
        email: cleanEmail,
        password: hashedPassword,
        registrationStatus: 'PAYMENT_COMPLETED',
        paymentStatus: 'PAID'
      });

      return res.status(201).json({
        success: true,
        data: {
          _id: team._id,
          teamId: team.teamId,
          teamName: team.teamName,
          amount
        }
      });
    }

    // In-memory registration
    const newTeam = {
      _id: '6630000000000000000000' + String(demoStore.teams.length + 10).padStart(2, '0'),
      teamId,
      teamName,
      participationType,
      college,
      department: department || (leader ? leader.department : ''),
      year: year || (leader ? leader.year : ''),
      leader,
      members,
      email: cleanEmail,
      passwordPlain: password,
      registrationStatus: 'PAYMENT_COMPLETED',
      paymentStatus: 'PAID',
      qualificationStatus: 'QUALIFIED',
      stage: 1,
      elevation: '1,100m Basecamp'
    };
    demoStore.teams.push(newTeam);

    res.status(201).json({
      success: true,
      data: {
        _id: newTeam._id,
        teamId: newTeam.teamId,
        teamName: newTeam.teamName,
        amount
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTeamProfile = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const team = await Team.findById(req.user._id).select('-password').populate('classroomId assignedFaculty');
      if (team) {
        return res.json({ success: true, data: team });
      }
    }
    const team = demoStore.teams.find(t => t._id === req.user._id) || demoStore.teams[0];
    res.json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
