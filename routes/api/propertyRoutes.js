// Routes for property-related actions


const express = require('express');
const router = express.Router();
const propertyController = require('../../controllers/propertyController'); // Adjust the path based on your project structure

// Route to get all properties
router.get('/properties', propertyController.getAllProperties);

// Route to get a specific property by ID
router.get('/properties/:id', propertyController.getPropertyById);

// Route to create a new property
router.post('/properties', propertyController.createProperty);

// Other property-related routes go here


router.get('/test', (req, res) => {
    res.send('Test route works!');
  });

  
module.exports = router;
