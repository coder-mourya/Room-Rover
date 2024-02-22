const Property = require('../models/property');
const multer = require('multer');
const jwt = require('jsonwebtoken');


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

  console.log("request for owners property ");

  try {
    const token = req.headers.authorization.split(' ')[1];


    const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
  

    const ownerMail = decodedToken.email;

    console.log(ownerMail);
    
    const property = await Property.find({email : ownerMail});

   console.log(property);

    if (!property)  {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    res.status(200).json({ success: true, data: property });

  } catch (error) {
    console.error('Error getting property by ID:', error);
    res.status(500).json({ success: false, error: 'owner Unauthrized' });
  }
};


// Function to create a new property
const createProperty = async (req, res) => {
  console.log('Request to create new property received.');
  try {
    const { owner,number, description, title, location, price} = req.body;
    const images= req.files.map(file => file.path); // multimple image  
    const token = req.headers.authorization.split(' ')[1]; // token from backend 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // veryfiy token 
    const ownerEmail = decodedToken.email; 
    console.log(decodedToken.email);
    const newProperty = new Property({
      
      email : ownerEmail,
      owner,
      number,
      title,
      description,
      location,
      price,
      images: images,
      
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
