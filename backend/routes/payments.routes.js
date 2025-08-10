const express = require('express');
const router = express.Router();
const { processMockPayment } = require('../controllers/payment.controller');
const { auth } = require('../middleware/auth'); // Import the auth middleware
const { restrictTo } = require('../middleware/role');
// Route to process mock payment (user only)
router.post('/mock',auth ,restrictTo('user'), processMockPayment);

module.exports = router;