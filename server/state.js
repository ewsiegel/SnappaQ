const GameQueue = require("./gamequeue")

state = new GameQueue("snappa", 2);//{"snappa": new GameQueue(2), "darts": new GameQueue(1), "pool": new GameQueue(1)}

module.exports = state;