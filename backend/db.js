const mongoose = require('mongoose');

const mongoURI="mongodb://localhost:27017/"

const connectToMongo =async () =>{
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected To Mongo successfully");
    } catch (error) {
        console.error("Error connecting to Mongo:", error);
    }
}
module.exports=connectToMongo; 