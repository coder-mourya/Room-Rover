require("dotenv").config();
const connectDb = require("./Config/database");
const properties = require("./models/property");
const multer = require('multer');
const propertyJson = require("./property.json");

const start = async () =>{
try {
    await connectDb(process.env.MONGODB_URL);
    await properties.deleteMany();
    await properties.create(propertyJson)
    console.log("sussess")
} catch (error) {
    console.log(error);
}
}

start();
