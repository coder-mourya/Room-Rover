require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const connectToDatabase = require('./Config/database');
//const path = require('path');
//const User = require('./models/user');
const propertyRoutes = require('./routes/propertyRoutes');
const userRoutes = require('./routes/userRoutes');
const contact = require("./routes/contact")


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: '*',
  credentials: true
}));


app.use(express.json());

app.get("/", (req, res) =>{
  res.send("Hello this is room rover app")
})

// Use property routes 
 app.use('/properties', propertyRoutes);

app.use('/uploads' , express.static('uploads'));// this path for serve image to the front end 


// Use user routes
app.use('/auth', userRoutes);

app.use('/contact' ,  contact)


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
