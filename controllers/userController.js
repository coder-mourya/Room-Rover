//Controller for user-related actions

// backend/controllers/userController.js

const User = require('../models/user'); // Adjust the path based on your project structure

// Function to get user profile by ID
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Other user-related functions go here

// Function to register a new user
const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body); // Assuming you have a User model
    console.log('New User ID:', newUser._id);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error 22222' });
  }
};


module.exports = {
  getUserProfile,
  registerUser
};
