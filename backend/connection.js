const mongoose = require("mongoose");

async function connectMongoDb(uri) {
  return mongoose.connect(uri);
}

module.exports = { connectMongoDb };

