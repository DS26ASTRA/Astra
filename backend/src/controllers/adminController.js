const User = require('../models/User');
const Team = require('../models/Team');
const Payment = require('../models/Payment');
const Classroom = require('../models/Classroom');
const Evaluation = require('../models/Evaluation');

exports.getAdminProfile = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user._id).select('-password');
    res.json({ success: true, data: adminUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalTeams = await Team.countDocuments();
    const avinyotsavTeams = await Team.countDocuments({ participationType: 'AVINYOTSAV' });
    const hackathonTeams = await Team.countDocuments({ participationType: 'HACKATHON' });
    const bothTeams = await Team.countDocuments({ participationType: 'BOTH' });
    
    const payments = await Payment.find({ status: 'SUCCESS' });
    const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

    const pendingFaculty = await User.countDocuments({ role: 'FACULTY', status: 'PENDING_VERIFICATION' });
    const verifiedFaculty = await User.countDocuments({ role: 'FACULTY', status: 'VERIFIED' });

    res.json({
      success: true,
      data: {
        totalTeams,
        avinyotsavTeams,
        hackathonTeams,
        bothTeams,
        totalRevenue,
        pendingFaculty,
        verifiedFaculty
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('classroomId').populate('assignedFaculty', 'name email');
    res.json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFaculty = async (req, res) => {
  try {
    const faculty = await User.find({ role: 'FACULTY' });
    res.json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyFaculty = async (req, res) => {
  try {
    const faculty = await User.findById(req.params.id);
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    
    faculty.status = 'VERIFIED';
    faculty.verifiedAt = Date.now();
    faculty.verifiedBy = req.user._id;
    await faculty.save();

    res.json({ success: true, message: 'Faculty verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateFacultyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const faculty = await User.findById(req.params.id);
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    
    faculty.status = status;
    if (status === 'VERIFIED') {
      faculty.verifiedAt = Date.now();
      faculty.verifiedBy = req.user._id;
    }
    await faculty.save();
    res.json({ success: true, message: `Faculty status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('assignedTeams', 'teamName teamId');
    res.json({ success: true, data: classrooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.create(req.body);
    res.status(201).json({ success: true, data: classroom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createClassroomsBulk = async (req, res) => {
  try {
    const { classrooms } = req.body;
    if (!classrooms || !Array.isArray(classrooms)) {
      return res.status(400).json({ success: false, message: 'Invalid data format' });
    }
    const created = await Classroom.insertMany(classrooms);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.assignTeamToClassroom = async (req, res) => {
  const { teamId, classroomId } = req.body;
  try {
    const team = await Team.findById(teamId);
    const classroom = await Classroom.findById(classroomId);

    if (!team || !classroom) return res.status(404).json({ success: false, message: 'Not found' });

    team.classroomId = classroomId;
    await team.save();

    if (!classroom.assignedTeams.includes(teamId)) {
      classroom.assignedTeams.push(teamId);
      await classroom.save();
    }

    res.json({ success: true, message: 'Team assigned to classroom' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.assignFacultyToTeam = async (req, res) => {
  const { teamId, facultyId } = req.body;
  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    
    if (!team.assignedFaculty.includes(facultyId)) {
      team.assignedFaculty.push(facultyId);
      await team.save();
    }
    res.json({ success: true, message: 'Faculty assigned to team successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
