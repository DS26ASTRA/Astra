const User = require('../models/User');
const Team = require('../models/Team');
const Payment = require('../models/Payment');
const Classroom = require('../models/Classroom');
const Evaluation = require('../models/Evaluation');
const demoStore = require('../config/demoStore');

exports.getAdminProfile = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const adminUser = await User.findById(req.user._id).select('-password');
      if (adminUser) return res.json({ success: true, data: adminUser });
    }
    const adminUser = demoStore.admins.find(a => a._id === req.user._id) || demoStore.admins[0];
    res.json({ success: true, data: adminUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const totalTeams = await Team.countDocuments();
      const avinyotsavTeams = await Team.countDocuments({ participationType: 'AVINYOTSAV' });
      const hackathonTeams = await Team.countDocuments({ participationType: 'HACKATHON' });
      const bothTeams = await Team.countDocuments({ participationType: 'BOTH' });
      
      const payments = await Payment.find({ status: 'SUCCESS' });
      const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

      const pendingFaculty = await User.countDocuments({ role: 'FACULTY', status: 'PENDING_VERIFICATION' });
      const verifiedFaculty = await User.countDocuments({ role: 'FACULTY', status: 'VERIFIED' });

      return res.json({
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
    }

    // Demo store fallback
    const totalTeams = demoStore.teams.length;
    const avinyotsavTeams = demoStore.teams.filter(t => t.participationType === 'AVINYOTSAV').length;
    const hackathonTeams = demoStore.teams.filter(t => t.participationType === 'HACKATHON').length;
    const bothTeams = demoStore.teams.filter(t => t.participationType === 'BOTH').length;
    const verifiedFaculty = demoStore.faculty.filter(f => f.status === 'VERIFIED').length;

    res.json({
      success: true,
      data: {
        totalTeams,
        avinyotsavTeams,
        hackathonTeams,
        bothTeams,
        totalRevenue: 32500,
        pendingFaculty: 1,
        verifiedFaculty
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const teams = await Team.find().populate('classroomId').populate('assignedFaculty', 'name email');
      return res.json({ success: true, data: teams });
    }
    res.json({ success: true, data: demoStore.teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFaculty = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const faculty = await User.find({ role: 'FACULTY' });
      return res.json({ success: true, data: faculty });
    }
    res.json({ success: true, data: demoStore.faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyFaculty = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const faculty = await User.findById(req.params.id);
      if (faculty) {
        faculty.status = 'VERIFIED';
        faculty.verifiedAt = Date.now();
        faculty.verifiedBy = req.user._id;
        await faculty.save();
        return res.json({ success: true, message: 'Faculty verified successfully' });
      }
    }
    const fac = demoStore.faculty.find(f => f._id === req.params.id);
    if (fac) {
      fac.status = 'VERIFIED';
    }
    res.json({ success: true, message: 'Faculty verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateFacultyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (global.isMongoConnected) {
      const faculty = await User.findById(req.params.id);
      if (faculty) {
        faculty.status = status;
        if (status === 'VERIFIED') {
          faculty.verifiedAt = Date.now();
          faculty.verifiedBy = req.user._id;
        }
        await faculty.save();
        return res.json({ success: true, message: `Faculty status updated to ${status}` });
      }
    }
    const fac = demoStore.faculty.find(f => f._id === req.params.id);
    if (fac) fac.status = status;
    res.json({ success: true, message: `Faculty status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClassrooms = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const classrooms = await Classroom.find().populate('assignedTeams', 'teamName teamId');
      return res.json({ success: true, data: classrooms });
    }
    res.json({ success: true, data: demoStore.classrooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createClassroom = async (req, res) => {
  try {
    if (global.isMongoConnected) {
      const classroom = await Classroom.create(req.body);
      return res.status(201).json({ success: true, data: classroom });
    }
    const newClassroom = { _id: 'room_' + Date.now(), ...req.body };
    demoStore.classrooms.push(newClassroom);
    res.status(201).json({ success: true, data: newClassroom });
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
    if (global.isMongoConnected) {
      const created = await Classroom.insertMany(classrooms);
      return res.status(201).json({ success: true, data: created });
    }
    classrooms.forEach((c, idx) => demoStore.classrooms.push({ _id: 'room_' + idx, ...c }));
    res.status(201).json({ success: true, data: demoStore.classrooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.assignTeamToClassroom = async (req, res) => {
  const { teamId, classroomId } = req.body;
  try {
    if (global.isMongoConnected) {
      const team = await Team.findById(teamId);
      const classroom = await Classroom.findById(classroomId);
      if (team && classroom) {
        team.classroomId = classroomId;
        await team.save();
        if (!classroom.assignedTeams.includes(teamId)) {
          classroom.assignedTeams.push(teamId);
          await classroom.save();
        }
        return res.json({ success: true, message: 'Team assigned to classroom' });
      }
    }
    res.json({ success: true, message: 'Team assigned to classroom' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.assignFacultyToTeam = async (req, res) => {
  const { teamId, facultyId } = req.body;
  try {
    if (global.isMongoConnected) {
      const team = await Team.findById(teamId);
      if (team) {
        if (!team.assignedFaculty.includes(facultyId)) {
          team.assignedFaculty.push(facultyId);
          await team.save();
        }
        return res.json({ success: true, message: 'Faculty assigned to team successfully' });
      }
    }
    res.json({ success: true, message: 'Faculty assigned to team successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
