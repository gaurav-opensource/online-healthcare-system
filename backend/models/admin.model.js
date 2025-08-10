const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // optional but good to ensure email uniqueness
    },
    password: {
        type: String,
        required: true,
        minLength:6,
    },
    role: {
        type: String,
        enum: ['admin'],
        default: 'admin',
    },
    },
    {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Admin', adminSchema);
