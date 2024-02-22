const express = require('express');
const router = express.Router();
const contactForm = require('../controllers/contactForm')

router.post('/saveContact' , contactForm.saveContact);


module.exports = router;

