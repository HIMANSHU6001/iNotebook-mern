require('dotenv').config()
const mongoose = require('mongoose');

async function connectToMongo() {
    console.log("Connecting to Mongo.....", process.env.URI);
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
  })
    console.log("Connected to Mongo");
    }

module.exports = connectToMongo;