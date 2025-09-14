const { sendEmail } = require('../config/emailConfig');

const sendVideoCallReminder = async ({ user, doctor, appointment }) => {
  const callLink = `${process.env.APP_BASE_URL}/video-call/${appointment._id}`;

  // User email
  await sendEmail({
    to: user.email,
    subject: `Upcoming Video Call with Dr. ${doctor.name}`,
    html: `<p>Hello ${user.name},</p>
           <p>Your video call with Dr. ${doctor.name} is scheduled at <strong>${appointment.time}</strong>.</p>
           <p>Click here to join: <a href="${callLink}">${callLink}</a></p>`,
  });

  // Doctor email
  await sendEmail({
    to: doctor.email,
    subject: `Upcoming Video Call with ${user.name}`,
    html: `<p>Hello Dr. ${doctor.name},</p>
           <p>You have an upcoming video call with ${user.name} at <strong>${appointment.time}</strong>.</p>
           <p>Join link: <a href="${callLink}">${callLink}</a></p>`,
  });
};

module.exports = sendVideoCallReminder;
