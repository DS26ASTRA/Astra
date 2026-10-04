const Team = require('../models/Team');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');

const generateTeamId = async () => {
  const count = await Team.countDocuments();
  const year = new Date().getFullYear();
  return `TEAM-AC-${year}-${String(count + 1).padStart(3, '0')}`;
};

// Register Team
exports.registerTeam = async (req, res) => {
  const { participationType, college, department, year, leader, members, email, password } = req.body;
  if (leader && !leader.email) leader.email = email;
  try {
    const existingTeam = await Team.findOne({ email });
    if (existingTeam) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Default prices, though we can fetch from DB later
    let amount = 0;
    if (participationType === 'AVINYOTSAV') amount = 150;
    else if (participationType === 'HACKATHON') amount = 500;
    else if (participationType === 'BOTH') amount = 650;

    const teamId = await generateTeamId();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const teamName = leader.name + "'s Team"; // Or from body if provided

    const team = await Team.create({
      teamId,
      teamName: req.body.teamName || teamName,
      participationType,
      college,
      department: department || leader.department,
      year: year || leader.year,
      leader,
      members,
      email,
      password: hashedPassword,
      registrationStatus: 'PAYMENT_COMPLETED',
      paymentStatus: 'PAID'
    });

    res.status(201).json({
      success: true,
      data: {
        _id: team._id,
        teamId: team.teamId,
        teamName: team.teamName,
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
    const team = await Team.findById(req.user._id).select('-password').populate('classroomId assignedFaculty');
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    res.json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
