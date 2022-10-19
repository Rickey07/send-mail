const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mailuserDb"

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