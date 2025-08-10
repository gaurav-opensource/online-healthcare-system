const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const { auth } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

// ✅ Register doctor – receives Cloudinary URLs (no file upload)
router.post('/register', doctorController.registerDoctor);

// ✅ Login
router.post('/login', doctorController.loginDoctor);

// ✅ Doctor profile (protected route)
router.get('/profile', auth, restrictTo('doctor'), doctorController.doctorProfile);

// ✅ Admin fetches unverified doctors
router.get('/unverified', auth, restrictTo('admin'), doctorController.getUnverifiedDoctors);

// ✅ Update doctor profile
router.put('/update-profile', auth, doctorController.updateDoctorProfile);
router.get('/getdoctor', doctorController.getDoctors);

module.exports = router;
