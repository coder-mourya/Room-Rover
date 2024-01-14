const passport = require('passport');
const User = require('../models/user');

// Function to get user profile by ID
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Function to register a new user
const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log('New User ID:', newUser._id);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// User login using Passport local strategy
const userlogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ success: false, error: 'Authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }
      return res.status(200).json({ success: true, user });
    });
  })(req, res, next);
};

module.exports = {
  getUserProfile,
  registerUser,
  userlogin,
};
