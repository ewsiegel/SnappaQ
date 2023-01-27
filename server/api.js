/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const Profile = require("./models/profile");
// uncomment this when we allow custom queues
// const Queue = require("./models/queue")
const state = require('./state');
const Item = require('./models/game')

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

//get profile info
router.get("/profile", (req, res) => {
  Profile.findOne({id: req.query.userid}).then((profile) => {
    res.send(profile);
  });
});

//get all profiles
//eventually this will take an organization argument
router.get("/profiles", (req, res) => {
  Profile.find({}).then((profiles) => {
    res.send(profiles);
  });
});

function sendGameState(res) {
  res.send({gameType: state.gameName, activeGame: state.activeGame, queue: state.queue.list});
}

//add to queue
router.post("/appendqueue", (req, res) => {
  state.append(req.body.team);
  sendGameState(res);
});

//complete the current active game
router.post("/completegame", (req, res) => {
  state.completeGameLazy();
  sendGameState(res);
});

router.post("/clearqueue", (req, res) => {
  state.clearQueue();
  sendGameState(res);
});

router.get("/queues", (req, res) => {
  sendGameState(res);
});

// uncomment this when we allow custom queues
// router.post("/queues", (req, res) => {
//   console.log(`Received a queue from ${req.user.name}: ${req.body.content}`);

//   // insert queue into the database
//   const queue = new Queue({
//     // insert stuff here
//   })
//   queue.save()
//   socketManager.getIo().emit("queue", queue);
// })

router.post("item", (req, res) => {
  console.log(`Received a new item from ${req.user.name}: ${req.body.content}`);
  
  // insert item into the Queue
  // not entirely sure how this can work without hooking queue up to a database
  // we want the queue to just exist in the server
  const item = new Item({
    gameType: req.body.gameType,
    gameId: null, // how do we make this custom for every item
    state: req.body.state,
    players: {
      team1: req.body.players.team1,
      team2: req.body.players.team2,
    }
  })

  // I think just leaving this out keeps it from saving to a database
  // item.save()
  socketManager.getIo().emit("item", item);
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
