const express = require('express');
const router = express.Router();
const { getDashboardStats, getTeams, getFaculty, verifyFaculty, updateFacultyStatus, createClassroom, createClassroomsBulk, assignTeamToClassroom, getClassrooms, getAdminProfile, assignFacultyToTeam } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/profile', protect, admin, getAdminProfile);
router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/teams', protect, admin, getTeams);
router.get('/faculty', protect, admin, getFaculty);
router.put('/faculty/:id/verify', protect, admin, verifyFaculty);
router.put('/faculty/:id/status', protect, admin, updateFacultyStatus);
router.get('/classrooms', protect, admin, getClassrooms);
router.post('/classrooms', protect, admin, createClassroom);
router.post('/classrooms/bulk', protect, admin, createClassroomsBulk);
router.post('/assign-team', protect, admin, assignTeamToClassroom);
router.post('/assign-faculty', protect, admin, assignFacultyToTeam);

module.exports = router;
