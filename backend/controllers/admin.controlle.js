const User = require('../models/user.model');
const Admin = require('../models/admin.model');
const Doctor = require('../models/doctor.model'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Validation Schemas
const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// Admin Register Component
exports.register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, password } = req.body;

        const existingUser = await Admin.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: 'admin', // ✅ add admin role here
        });

        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Admin Login Component
exports.login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        res.status(200).json({
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Admin Profile  Component
exports.profile = (req, res) => {
    const user = req.user;
    if (!user) return res.status(400).json({ message: 'Admin not found' });

    const baseProfile = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // ✅ role added
    };

    res.status(200).json(baseProfile);
};



// Verify doctor (set isVerified: true)
exports.verifyDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { isVerified: true },
      { new: true }
    );

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.status(200).json({ message: 'Doctor verified successfully', doctor });
  } catch (error) {
    console.error('Doctor Verification Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



// Update Admin Profile
exports.updateProfile = async (req, res) => {
    try {
        const adminId = req.user._id;

        const { name, email, password } = req.body;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            updateFields.password = hashedPassword;
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(
            adminId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({message: "Profile updated successfully"});
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); // total users
    const totalDoctors = await Doctor.countDocuments(); // total doctors
    const pendingVerifications = await Verification.countDocuments({ status: 'pending' }); // pending verification requests
    const systemLogs = await SystemLog.countDocuments(); // total logs

    res.status(200).json({
      totalUsers,
      totalDoctors,
      pendingVerifications,
      systemLogs,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); // total users
    const totalDoctors = await Doctor.countDocuments(); // total doctors
    const pendingVerifications = await Doctor.countDocuments({ isVerified: false }); // doctors pending verification
    // total logs

    res.status(200).json({
      totalUsers,
      totalDoctors,
      pendingVerifications,
    
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
