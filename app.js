require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser")
const connectToDatabase = require('./Config/database');
//const path = require('path');
const User = require('./models/user');
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');


const PORT = process.env.PORT || 5000;





app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(bodyParser.json());

app.get("/", (req, res) =>{
  res.send("Hello this is room rover app")
})

// Use property routes
 app.use('/api/properties', propertyRoutes);
// Use user routes
app.use('/auth', userRoutes);


const start = async() =>{
  try {
    await connectToDatabase(process.env.MONGODB_URL);
    app.listen(PORT, () =>{
      console.log(`${PORT} connected to db` );
    })
  } catch (error) {
    console.log(error);
  }
}
start();
