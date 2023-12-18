const express = require('express');
const router = express.Router();
const propertyController = require('../../controllers/propertyController'); 

// Route to get all properties
router.get('/properties', propertyController.getAllProperties);

// Route to get a specific property by ID
router.get('/properties/:id', propertyController.getPropertyById);

// Route to create a new property
router.post('/properties', propertyController.createProperty);

// Route to update a property by ID
router.put('/properties/:id', propertyController.updatePropertyById);

// Route to delete a property by ID
router.delete('/properties/:id', propertyController.deletePropertyById);

// Test route
router.get('/test', (req, res) => {
  res.send('Test route works!');
});

module.exports = router;
