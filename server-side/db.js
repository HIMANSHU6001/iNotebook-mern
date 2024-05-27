require('dotenv').config()
const mongoose = require('mongoose');

async function connectToMongo() {
    console.log("Connecting to Mongo.....");
    await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
    console.log("Connected to Mongo");
    }

module.exports = connectToMongo;