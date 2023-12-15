//Routes for user-related actions


const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController'); // Adjust the path based on your project structure

// Route to get user profile by ID
router.get('/users/:id', userController.getUserProfile);

// Registration route

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUsers);

router.post('/users', userController.createUser);

module.exports = router;
