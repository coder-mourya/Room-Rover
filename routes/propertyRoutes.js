const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/propertyController")


router.get('/', propertyController.getAllProperties);

router.get('/properties/:id', propertyController.getPropertyById);

router.post('/properties', propertyController.createProperty);

module.exports = router;

