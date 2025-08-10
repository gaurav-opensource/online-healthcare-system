const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller');
const { auth } = require('../middleware/auth'); // Import the auth middleware
const { restrictTo } = require('../middleware/role'); // Import the restrictTo middleware

// User routes
router.post('/register', authController.register); // Public route for registration
router.post('/login', authController.login); // Public route for login
router.get('/profile', auth, restrictTo('user'), authController.profile); // Protected route for user profile

module.exports = router;