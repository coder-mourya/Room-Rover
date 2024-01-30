const Property = require('../models/property');
const multer = require('multer');

// Function to get all properties
const getAllProperties = async (req, res) => {
  console.log('Request to get all properties received.');

  try {
    const properties = await Property.find(req.query);
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error('Error getting properties:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Function to get a specific property by ID
const getPropertyByOwner = async (req, res) => {
  try {
    
    const property = await Property.find({});

    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.status(200).json({ success: true, data: property });

  } catch (error) {
    console.error('Error getting property by ID:', error);
    res.status(500).json({ success: false, error: 'Internal server error 15' });
  }
};


// Function to create a new property
const createProperty = async (req, res) => {
  console.log('Request to create new property received.');
  try {
    const {owner, description, title, location, price} = req.body;
    const imagePath = req.file.path;
    const newProperty = new Property({
      owner,
      title,
      description,
      location,
      price,
      image: imagePath,
      
    })

    await newProperty.save();

    res.status(201).json({ success: true, data: Property });

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
    console.log("request to delete proprty by id");
    const property = req.params.id;

    await Property.findByIdAndDelete(property);

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
  getPropertyByOwner,
  createProperty,
  updatePropertyById,
  deletePropertyById,
};
