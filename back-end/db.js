const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const mongoURI = process.env.MONGO_URI;

const dbConnection = async () => {
    try {
       await mongoose.connect(mongoURI, () => {
            console.log("Connected to mongo successfully")
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnection;