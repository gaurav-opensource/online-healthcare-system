
const Appointment = require('../models/appointment.model.js');
const Payment = require('../models/payment.model');
exports.processMockPayment = async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;
    const userId = req.user.id;

  
    if (!appointmentId || !amount) {
      return res.status(400).json({ message: 'Appointment ID and amount are required' });
    }

    // Verify appointment exists and belongs to user
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment || appointment.user.toString() !== userId) {
      return res.status(404).json({ message: 'Appointment not found or unauthorized' });
    }

    // Check if payment already processed
    if (appointment.status === 'Confirmed') {
      return res.status(400).json({ message: 'Payment already processed' });
    }

    // Create payment record
    const payment = new Payment({
      appointment: appointmentId,
      user: userId,
      amount,
      status: 'Completed',
      transactionId: `MOCK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });

    await payment.save();

    // Update appointment status to Confirmed
    appointment.status = 'Confirmed';
    await appointment.save();

    res.status(200).json({ message: 'Payment successful, appointment confirmed', payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};