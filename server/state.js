const GameQueue = require("./gamequeue")

state = {"active": {}, "queues": {"snappa": new GameQueue("snappa", 2), "die": new GameQueue("die", 2), "darts": new GameQueue("darts", 2), "pool": new GameQueue("pool", 2)}}

module.exports = state;