const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
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
  images: {
    type: [String],
    required: true,
  }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
