const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  id: {type: String, unique: true, required: true},
  name: String,
  wins: Number,
  losses: Number,
});

// compile model from schema
module.exports = mongoose.model("profile", ProfileSchema);