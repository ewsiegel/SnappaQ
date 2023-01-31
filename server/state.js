const GameQueue = require("./gamequeue")

state = {"active": {}, "queues": {"snappa": new GameQueue("snappa", 2), "die": new GameQueue("die", 2), "darts": new GameQueue("darts", 1), "pool": new GameQueue("pool", 1)}}

module.exports = state;