const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,

   },
    
   email: {
      type: String,
      required: true,
   },

   

   role: {
      type: String,
      enum: ['owner', 'tenant'],
      default: 'tenant'
   },
});


const GoogleAuthUser = mongoose.model('GoogleAuthUser', userSchema);

module.exports = GoogleAuthUser;

