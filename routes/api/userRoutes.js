const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Route to get user profile by ID
router.get('/users/:id', userController.getUserProfile);

// Route to register a new user
router.post('/register', userController.registerUser);

// Route for user login using Passport local strategy
router.post('/login', userController.userlogin);

// Test route
router.get('/test', (req, res) => {
  res.send('Test route works!');
});

module.exports = router;
