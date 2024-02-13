const express = require("express");
const router = express.Router();
const requireAuth = require('../Middleware/auth')

const userController = require("../controllers/userController");



router.post('/register', userController.registerUser);
router.post('/login', userController.userlogin);



router.get('/allusers', userController.getDetails);
router.get('/users', requireAuth, userController.getUserDetails);



  
  


module.exports = router;