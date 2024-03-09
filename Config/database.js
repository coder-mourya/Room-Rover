
const mongoose = require('mongoose');


const connectToDatabase = async (uri) => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(uri,
     {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1); // Exit the process if unable to connect  
  }
};

module.exports = connectToDatabase;
