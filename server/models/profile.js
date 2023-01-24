const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  id: String,
  name: String,
  wins: Number,
  losses: Number,
});

// compile model from schema
module.exports = mongoose.model("profile", ProfileSchema);