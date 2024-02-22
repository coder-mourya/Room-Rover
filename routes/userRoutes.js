const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");



router.post('/register', userController.registerUser); // resiter manual 
router.post('/login', userController.userlogin); // login manual 

router.post('/google/register', userController.registerUserWithGoogle) //resiter with google 
router.post('/google/login', userController.userloginWithGoogle) //login with google 



router.get('/allusers', userController.getDetails);
router.get('/users',  userController.getUserDetails); // get current user
router.get('/getUserDetailsWithGoogle', userController.getUserDetailsWithGoogle) // get user with google 





  
  


module.exports = router;