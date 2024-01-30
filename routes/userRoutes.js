const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post('/register', userController.registerUser);
router.post('/login', userController.userlogin);

router.get('/users', userController.getDetails);


module.exports = router;