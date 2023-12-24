// backend/config/passport.js

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { authenticate, serializeUser: _serializeUser, deserializeUser: _deserializeUser } = require('../models/user');

// Use the local strategy with Passport
passport.use(new LocalStrategy((username, password, done) => {
  authenticate(username, password, done);
}));

// Serialize user data for sessions
passport.serializeUser(_serializeUser());
passport.deserializeUser(_deserializeUser());



