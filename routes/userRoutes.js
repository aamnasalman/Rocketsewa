const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// User registration
router.post('/register', userController.registerUser);

// Hospital User registration
router.post('/registerHospitalUser', userController.registerHospitalUser);


// User login
router.post('/login', userController.loginUser);

// Get the total number of users
router.get('/totalUsers', userController.getTotalUsers);

// Route to get the total number of hospital users
router.get('/totalHospitalUsers', userController.getTotalHospitalUsers);

// Route to get the total number of subscribers
router.get('/totalSubscribers', userController.getTotalSubscribers);

// Add more user-related routes as needed

module.exports = router;

