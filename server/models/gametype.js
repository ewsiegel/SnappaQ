const mongoose = require("mongoose");

const GameTypeSchema = new mongoose.Schema({
  name: String,
  numPlayersPerTeam: Number,
});

// compile model from schema
module.exports = mongoose.model("gametype", GameTypeSchema);
