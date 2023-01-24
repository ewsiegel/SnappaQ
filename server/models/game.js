const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  gameType: String,
  gameId: String,
  state: String, //active, complete
  players: {
    team1: [String], // list of player IDs
    team2: [String], // list of player IDs
  },
  winners: {type: [String], default: null},
  losers: {type: [String], default: null},
  timestamp: { type: Date, default: null }, // date & time that a game began, set this when game state becomes active
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
