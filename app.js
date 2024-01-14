const express = require('express');
const cors = require('cors');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const connectToDatabase = require('./Config/database');
const path = require('path');

const User = require('./models/user');
const propertyRoutes = require('./routes/propertyRoutes');
//const userRoutes = require('./routes/api/userRoutes');

const app = express();

// Connect to the database
connectToDatabase();



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>{
  res.send("Hello this is room rover app")
})
// Use property routes
app.use('/api/properties', propertyRoutes);

// Use user routes
//app.use('/api', userRoutes);

// Set up session handling
app.use(session({
  secret: 'Ajaykk', // Replace with a strong secret
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

/*
app.get('/api/checkLoggedIn', (req, res) =>{

  const loggedIn = req.isAuthenticated();

  res.json({loggedIn});
})*/


const server = http.createServer(app);



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
