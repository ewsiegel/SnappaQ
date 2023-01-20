const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  gameType: String,
  gameId: String,
  players: {
    team1: [String], // list of player IDs
    team2: [String], // list of player IDs
  },
  winners: [String],
  losers: [String],
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
