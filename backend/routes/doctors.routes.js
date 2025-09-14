const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const { auth } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');
const Doctor = require('../models/doctor.model');

// Register doctor 
router.post('/register', doctorController.registerDoctor);

// Login
router.post('/login', doctorController.loginDoctor);

// Doctor profile 
router.get('/profile', auth, restrictTo('doctor'), doctorController.doctorProfile);

// Admin fetches unverified doctors
router.get('/unverified', auth, restrictTo('admin'), doctorController.getUnverifiedDoctors);


router.put('/update-profile', auth, doctorController.updateDoctorProfile);
router.get('/getdoctor', doctorController.getDoctors);

router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password"); 
    

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
