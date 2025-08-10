const Appointment = require('../models/appointment.model');
const path = require('path');
const fs = require('fs/promises');
const Payment = require('../models/payment.model');




// Create Appointment Component
exports.createAppointment = async (req, res) => {
  try {
    const { userId, doctorId, appointmentDate, description, amount } = req.body;

    if (!userId || !doctorId || !appointmentDate || !description || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [date, time] = appointmentDate.split('T');

    // ✅ Check if appointment already exists
    const existingAppointment = await Appointment.findOne({
      user: userId,
      doctor: doctorId,
      date,
      time,
    });

    if (existingAppointment) {
      return res.status(200).json({
        message: 'Appointment already exists',
        appointment: existingAppointment,
      });
    }

    // ✅ Save payment first
    const payment = new Payment({
      user: userId,
      doctor: doctorId,
      amount,
      status: 'completed',
     });

    await payment.save();

    // ✅ Create appointment with linked payment
    const appointment = new Appointment({
      user: userId,
      doctor: doctorId,
      date,
      time,
      description,
      payment: payment._id, // 💡 Link the saved payment here
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment & Payment created successfully', appointment });
  } catch (error) {
     console.error('Appointment creation error:', error);
  res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};


// Get Appointment For User
exports.getAppointmentsByUser = async (req, res) => {
 try {
    const { userId } = req.params;

    const appointments = await Appointment.find({ user: userId })
      .populate('doctor', 'name specialization location') // get doctor details
      .sort({ date: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
};

//Get Appointment for Doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { completed } = req.query; // will be 'true' or 'false' as string

    // Build query object
    const query = { doctor: doctorId };

    // Optional filtering
    if (completed === 'true') query.isCompleted = true;
    else if (completed === 'false') query.isCompleted = false;

    const appointments = await Appointment.find(query)
      .populate('user', 'name email')
      .sort({ date: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ message: 'Error fetching doctor appointments', error: error.message });
  }
};



// Upload Report
exports.uploadTestReport= async (req, res) => {
 try {
    const appointmentId = req.params.id;
    const { testUpload } = req.body; // ✅ this is coming from frontend

    if (!testUpload) {
      return res.status(400).json({
        success: false,
        message: 'Test report URL is required',
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { testReports: testUpload },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Test report uploaded successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload test report',
      error: error.message,
    });
  }
};


//Upload Prescription
exports.uploadPrescription = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { testUpload } = req.body; // expected to be a URL or file path

    // Validation: ensure prescription URL is provided
    if (!testUpload) {
      return res.status(400).json({
        success: false,
        message: 'Prescription URL is required',
      });
    }

    // Update appointment with prescription URL
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { prescription: testUpload },
      { new: true }
    );

    // Check if appointment exists
    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: 'Prescription uploaded successfully',
      appointment: updatedAppointment,
    });

  } catch (err) {
    console.error("Prescription upload error:", err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to upload prescription',
      error: err.message,
    });
  }
};


// 

exports.getAppointmentById = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findById(appointmentId)
      .populate('doctor', 'name _id')
      .populate('user', 'name _id');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error: error.message });
  }
};


exports.getAppointmentByRoomId = async (req, res) => {
  const { roomId } = req.params;
  try {
    const appointment = await Appointment.findOne({ roomId });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error finding appointment" });
  }
};


// PUT /api/appointments/:id/complete
exports.markAppointmentCompleted = async (req, res) => {
  try {
    const {userId} = req.params.id;
    const appointment = await Appointment.findById(userId); // appointment hold mongoose object
    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    appointment.isCompleted = true;
    await appointment.save();
    res.status(200).json({ message: "Marked as completed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


