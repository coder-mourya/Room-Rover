const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
  },
  location: {
    type: String,
    required: true
    
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
