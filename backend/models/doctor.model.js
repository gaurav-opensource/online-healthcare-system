const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['doctor'],
    default: 'doctor',
    required: true,
  },
  profilePhoto: {
    type: String, // Path to local profile photo
  },
  // Doctor-specific fields
  licenseNumber: {
    type: String,
    required:true,
  },
  phoneNumber: {
    type: String,
    match: /^\+?[1-9]\d{9,14}$/,
    required:true,
  },
  
  fees: {
    type: Number,
    min: 1,
    required:true,
  },
  specialization: {
    type: String,
    enum: ['Cardiology', 'General Physician', 'Orthopedics', 'Pediatrics', 'Neurology', 'Dermatology', 'Other'],
    required: true,
  },
  certification: {
    type: String, // Path to local certification PDF
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
    
  },
  availability: [{
    date: Date,
    startTime: String, // e.g., "10:00"
    endTime: String,   // e.g., "11:00"
  }],

   // New fields
  about: { type: String, default: "" },
  experience: { type: String, default: "" },
  achievements: { type: String, default: "" },
  rating: { type: Number, default: 0 }, // Optional: for system-generated
  other: { type: String, default: "" },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);