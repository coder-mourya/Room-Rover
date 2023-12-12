// backend/app.js

const express = require('express');
const http  = require('http')
const passport = require('passport');
const session = require('express-session');
const connectToDatabase = require('./config/database');
const User = require('./models/user'); // Adjust the path based on your project structure
const propertyRoutes = require('./routes/propertyRoutes')
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to the database
connectToDatabase();

// Middleware and other configurations go here

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
