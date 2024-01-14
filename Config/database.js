
const mongoose = require('mongoose');


const connectToDatabase = async (req,res) => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb+srv://ajaykumarshakya560:Se5hK7YFqNxBPLfm@roomapp1.nmgflcs.mongodb.net/roomapp1?retryWrites=true&w=majority",
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
