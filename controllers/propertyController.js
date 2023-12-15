//Controller for property-related actions


const Property = require('../models/property'); // Adjust the path based on your project structure

// Function to get all properties
const getAllProperties = async (req, res) => {


  console.log('Request to get all properties received.');

  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get a specific property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to create a new property
const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Internal server error 3' });
  }
};

// Other property-related functions go here

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  // Add other functions as needed
};
