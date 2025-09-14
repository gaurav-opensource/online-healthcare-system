// backend/routes/emailRoute.js
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// Configure transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "projectemail500023@gmail.com", // your Gmail
    pass: "xums tjfw cter sbix",          // App password
  },
});

// sendEmail function
const sendEmail = async ({ to, subject, text, html }) => {
  try {
   
    const info = await transporter.sendMail({
      from: '"HealthMate AI" <projectemail500023@gmail.com>',
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("Email send error:", err);
    return false;
  }
};

// Single test route
router.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;
   console.log(message)

  if (!to || !subject )
    return res.status(400).json({ success: false, message: "Missing fields" });
  
  const success = await sendEmail({
    to,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  });


  if (success) {
    res.json({ success: true, message: "Email sent successfully" });
  } else {
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;



// // Function to send video call reminder to user and doctor
// export const sendVideoCallReminder = async ({ user, doctor, appointment }) => {
//   const callLink = `https://your-app.com/video-call/${appointment._id}`;

//   // User email
//   await sendEmail({
//     to: user.email,
//     subject: `Upcoming Video Call with Dr. ${doctor.name}`,
//     html: `<p>Hello ${user.name},</p>
//            <p>Your video call with Dr. ${doctor.name} is scheduled at <strong>${appointment.time}</strong>.</p>
//            <p>Click here to join: <a href="${callLink}">${callLink}</a></p>`
//   });

//   // Doctor email
//   await sendEmail({
//     to: doctor.email,
//     subject: `Upcoming Video Call with ${user.name}`,
//     html: `<p>Hello Dr. ${doctor.name},</p>
//            <p>You have an upcoming video call with ${user.name} at <strong>${appointment.time}</strong>.</p>
//            <p>Join link: <a href="${callLink}">${callLink}</a></p>`
//   });
// };



// module.exports = router;
