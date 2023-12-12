// database.js

const mongoose = require('mongoose');

// Replace 'your_database_url' and 'your_database_name' with your actual MongoDB URL and database name
const dbUrl = "mongodb+srv://ajaykumarshakya560:Se5hK7YFqNxBPLfm@roomapp1.nmgflcs.mongodb.net/?retryWrites=true&w=majority"

const connectToDatabase = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(dbUrl, {
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
