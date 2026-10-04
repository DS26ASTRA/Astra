const express = require('express');
const router = express.Router();
const { loginTeam, registerFaculty, loginFaculty, loginAdmin } = require('../controllers/authController');

router.post('/team/login', loginTeam);
router.post('/faculty/register', registerFaculty);
router.post('/faculty/login', loginFaculty);
router.post('/admin/login', loginAdmin);

module.exports = router;
