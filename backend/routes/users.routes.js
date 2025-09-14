const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller');
const { auth } = require('../middleware/auth'); 
const { restrictTo } = require('../middleware/role'); 

// User routes
router.post('/register', authController.register); 
router.post('/login', authController.login); 
router.get('/profile', auth, restrictTo('user'), authController.profile); 

module.exports = router;