const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Doctor = require('../models/doctor.model');

// Joi schema for doctor registration
const doctorRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  location: Joi.string().required(),
  licenseNumber: Joi.string().required(),
  phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{9,14}$/).required(),
  fees: Joi.number().positive().integer().required(),
  specialization: Joi.string().valid(
    'Cardiology', 'General Physician', 'Orthopedics', 'Pediatrics', 'Neurology', 'Dermatology', 'Other'
  ).required(),
  profilePhoto: Joi.string().uri().required(),     // ✅ Required and must be URL
  certification: Joi.string().uri().required(),    // ✅ Required and must be URL
});

// Joi schema for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Doctor registration controller
exports.registerDoctor = async (req, res) => {
  try {
    // 1. Validate request body
    const { error } = doctorRegisterSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const {
      name, email, password, location,
      licenseNumber, phoneNumber, fees,
      specialization, profilePhoto, certification
    } = req.body;

    // 2. Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: 'Email already exists' });

    // 3. Validate Cloudinary URLs
    if (!profilePhoto || !certification) {
      return res.status(400).json({ message: "Photo or certificate missing" });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Create doctor document
    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      location,
      licenseNumber,
      phoneNumber,
      fees,
      specialization,
      profilePhoto,      // ✅ Cloudinary image URL
      certification,     // ✅ Cloudinary file URL (PDF)
      isVerified: false  // Admin approval required
    });

    // 6. Save to database
    await doctor.save();

    res.status(201).json({ message: 'Doctor registered successfully. Awaiting admin verification.' });

  } catch (error) {
    console.error('Doctor Register Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// Doctor login
exports.loginDoctor = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email, role: 'doctor' });
    if (!doctor) return res.status(401).json({ message: 'Invalid credentials' });

    if (!doctor.isVerified) {
      return res.status(403).json({ message: 'Doctor not verified by admin yet' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: doctor._id, role: doctor.role }, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.status(200).json({
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        role: doctor.role,
        fees: doctor.fees,
        profilePhoto: doctor.profilePhoto || null,
      },
    });
  } catch (error) {
    console.error('Doctor Login Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Doctor profile
exports.doctorProfile = (req, res) => {
  const user = req.user;
  if (!user || user.role !== 'doctor') {
    return res.status(403).json({ message: 'Access denied: not a doctor' });
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    location: user.location,
    phoneNumber: user.phoneNumber,
    address: user.address,
    fees: user.fees,
    specialization: user.specialization,
    profilePhoto: user.profilePhoto || null,
    certification: user.certification || null,
    about:user.about,
    experience:user.experience,
    achievements:user.achievements,
    other:user.otherSS,
  });
};

// Admin: Verify Doctor
// Get all unverified doctors (for admin)
exports.getUnverifiedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isVerified: false }).select('-password');  // Find all whose not veerify
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Fetch unverified doctors error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




// Update profile (editable fields for doctor dashboard)
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const {
      name,
      email,
      phoneNumber,
      location,
      specialization,
      fees,
      about,
      experience,
      achievements,
      other,
    } = req.body;

    if (name !== undefined) doctor.name = name;
    if (email !== undefined) doctor.email = email;
    if (phoneNumber !== undefined) doctor.phoneNumber = phoneNumber;
    if (location !== undefined) doctor.location = location;
    if (specialization !== undefined) doctor.specialization = specialization;
    if (fees !== undefined) doctor.fees = fees;
    if (about !== undefined) doctor.about = about;
    if (experience !== undefined) doctor.experience = experience;
    if (achievements !== undefined) doctor.achievements = achievements;
    if (other !== undefined) doctor.other = other;

    await doctor.save();
    res.status(200).json({ message: 'Doctor profile updated successfully', doctor });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const { location, specialization, minFees, maxFees } = req.query;

    // Build dynamic filter
    let filter = {};

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (specialization) {
      filter.specialization = { $regex: specialization, $options: 'i' };
    }

    if (minFees || maxFees) {
      filter.fees = {};
      if (minFees) filter.fees.$gte = Number(minFees);
      if (maxFees) filter.fees.$lte = Number(maxFees);
    }

    const doctors = await Doctor.find({ ...filter, isVerified: true }).select(
      '-password' // Exclude password
    );

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error while fetching doctors' });
  }
};




