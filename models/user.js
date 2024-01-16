const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
    
   email: {
      type: String,
      required: true,
   },
   
   number: {
      type: Number,
      required: true,
   },
   
   
   password: {
      type: String,
      required: true
   },

   role: {
      type: String,
      enum: ['owner', 'tenant'],
      default: 'tenant'
   },
});


const User = mongoose.model('User', userSchema);

module.exports = User;

