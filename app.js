const express = require('express');
const cors = require('cors');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const connectToDatabase = require('./config/database');
const path = require('path');

const User = require('./models/user');
const propertyRoutes = require('./routes/api/propertyRoutes');
const userRoutes = require('./routes/api/userRoutes');

const app = express();

// Connect to the database
connectToDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use property routes
app.use('/api', propertyRoutes);

// Use user routes
app.use('/api', userRoutes);

// Set up session handling
app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Use the User model for Passport
passport.use(User.createStrategy());
// Serialize and deserialize user for sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Create an HTTP server and pass the Express app as a callback
const server = http.createServer(app);

// Other middleware and routes go here

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
