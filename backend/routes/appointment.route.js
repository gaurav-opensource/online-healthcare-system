const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointmentsByUser,
  getAppointmentsByDoctor,
  uploadTestReport,
  getAppointmentById,
  getAppointmentByRoomId,
  markAppointmentCompleted,
  uploadPrescription,
} = require('../controllers/appointment.controlle');




const { auth } = require('../middleware/auth'); // Import the auth middleware
const { restrictTo } = require('../middleware/role'); 

// Routes
router.post('/', auth,restrictTo('user'),createAppointment);
router.get('/user/:userId',auth,restrictTo('user'), getAppointmentsByUser);
router.get('/doctor/:doctorId',auth, restrictTo('doctor'), getAppointmentsByDoctor);
router.get('/:appointmentId',auth, restrictTo('user'), getAppointmentById);


router.put( '/:id/test-upload', auth,restrictTo('user'), uploadTestReport);
router.put('/:id/test-prescription',auth,restrictTo('doctor'), uploadPrescription,);
router.get("/:id",auth, restrictTo('user'), getAppointmentByRoomId);
router.put("/:id/complete",auth, restrictTo('user'), markAppointmentCompleted);


module.exports = router;
