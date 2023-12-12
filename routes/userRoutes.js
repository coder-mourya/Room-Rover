//Routes for user-related actions

// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust the path based on your project structure

// Route to get user profile by ID
router.get('/users/:id', userController.getUserProfile);

// Registration route

router.post('/register', userController.registerUser);

module.exports = router;
