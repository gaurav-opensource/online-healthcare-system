const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth'); 
const { restrictTo } = require('../middleware/role');
const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');


router.post('/pay-appointment', async (req, res) => {
  const { appointmentId, userId, doctorId, userCardNumber, expiry, cvv, amount } = req.body;

  const user = await User.findById(userId);
  const doctor = await Doctor.findById(doctorId);
  const appointment = await Appointment.findById(appointmentId);

  if (!user || !doctor || !appointment) return res.status(404).json({ success:false, message:"Data not found" });

  // mock payment logic
  let paymentStatus;
  let transactionId = 'txn_' + Date.now();

  // simulate user card check
  if (!userCardNumber || !expiry || !cvv) {
    paymentStatus = "Failed";
  } else {
    // if doctor token exists → payment "succeeds"
    if (doctor.savedCardToken) {
      paymentStatus = "Success";

      // optional: update doctor balance
      doctor.mockCardBalance = (doctor.mockCardBalance || 0) + amount;
      await doctor.save();
    } else {
      paymentStatus = "Failed";
    }
  }

  // update appointment
  appointment.payment = {
    amount,
    method: "Card",
    status: paymentStatus,
    transactionId
  };
  if (paymentStatus === "Success") appointment.status = "Confirmed";
  await appointment.save();

  // user history
  user.paymentHistory.push({ appointment: appointment._id, amount, method:"Card", paymentStatus, date: new Date() });
  await user.save();

  res.json({ success: paymentStatus==="Success", paymentStatus, transactionId, doctorBalance: doctor.mockCardBalance });
});

router.post('/doctor/add-card', async (req, res) => {
  const { doctorId, cardNumber, expiry, cvv } = req.body;
  if (!cardNumber || !expiry || !cvv) return res.status(400).json({ success:false, message:"Invalid card" });

  // generate mock token
  const token = 'doc_tok_' + Date.now();

  await Doctor.findByIdAndUpdate(doctorId, { savedCardToken: token });

  res.json({ success:true, message:"Doctor card added", cardToken: token });
});


module.exports = router;