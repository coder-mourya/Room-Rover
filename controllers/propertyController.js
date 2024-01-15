const Property = require('../models/property');

// Function to get all properties
const getAllProperties = async (req, res) => {
  console.log('Request to get all properties received.');

  try {
    const properties = await Property.find({});
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error('Error getting properties:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Function to get a specific property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error('Error getting property by ID:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Function to create a new property
const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Function to update a property by ID
const updatePropertyById = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error('Error updating property by ID:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Function to delete a property by ID
const deletePropertyById = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error('Error deleting property by ID:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updatePropertyById,
  deletePropertyById,
};
