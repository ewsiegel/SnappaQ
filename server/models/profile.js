const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  id: {type: String, unique: true, required: true},
  name: String,
  wins: {type: Object},
  losses: {type: Object},
  elo: Number,
  rankedGamesPlayed: Number
});

// compile model from schema
module.exports = mongoose.model("profile", ProfileSchema);