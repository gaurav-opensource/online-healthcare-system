const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { auth } = require('../middleware/auth'); 
const { restrictTo } = require('../middleware/role');

// Admin routes
router.post('/login', adminController.login);
router.get('/profile', auth, restrictTo('admin'), adminController.profile);

// Verify doctor route - only accessible by admin
router.put('/verify-doctor/:id', auth, restrictTo('admin'), adminController.verifyDoctor);
router.get('/stats', adminController.getAdminStats);


module.exports = router;
