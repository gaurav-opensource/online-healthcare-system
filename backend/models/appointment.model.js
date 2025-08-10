const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
    roomId: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
      unique: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    prescription: {
      type: String,
      default: '',
    },
    testReports: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // ✅ Correct placement
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
