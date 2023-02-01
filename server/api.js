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

const GameQueue = require("./gamequeue")

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

function sendGameState(res, gametype) {
  //res.send({gameType: gametype, activeGame: state.queues[gametype].activeGame, queue: state.queues[gametype].queue.list, playersPerTeam: state.queues[gametype].numPlayersPerTeam});
  res.send(Object.fromEntries(
    Array.from(
      Object.entries(state.queues)
    ).map(([gameName, queue]) => [gameName, {
      gameType: queue.gameName,
      activeGame: queue.activeGame,
      queue: queue.queue.list,
      playersPerTeam: queue.numPlayersPerTeam
    }])
  ));
};

function emitGameState(gametype) {
  // Object.entries(state.active).forEach(([userid, activegame]) => {
  //   if (activegame === gametype)
  //     socketManager.getSocketFromUserID(userid).emit("gameState", {gameType: state.queues[gametype].gameName, 
  //                                                                  activeGame: state.queues[gametype].activeGame, 
  //                                                                  queue: state.queues[gametype].queue.list,
  //                                                                  playersPerTeam: state.queues[gametype].numPlayersPerTeam});
  // });
  socketManager.getIo().emit("gameState", Object.fromEntries(
                                            Array.from(
                                              Object.entries(state.queues)
                                            ).map(([gameName, queue]) => [gameName, {
                                              gameType: queue.gameName,
                                              activeGame: queue.activeGame,
                                              queue: queue.queue.list,
                                              playersPerTeam: queue.numPlayersPerTeam
                                            }])
                                          )
  );
};

function emitQueueState() {
  socketManager.getIo().emit("queues", Object.keys(state.queues));
};

//add to queue
router.post("/appendqueue", (req, res) => {
  state.queues[req.body.gametype].append(req.body.team);
  emitGameState(req.body.gametype);
  res.send({});
});

//complete the current active game
router.post("/completegame", (req, res) => {
  state.queues[req.body.gametype].completeGame(Number(req.body.winner));
  emitGameState(req.body.gametype);
  res.send({});
});

router.post("/clearqueue", (req, res) => {
  state.queues[req.body.gametype].clearQueue();
  emitGameState(req.body.gametype);
  res.send({});
});

router.get("/queue", (req, res) => {
  state.active[req.user._id] = req.query.gametype;
  sendGameState(res, req.query.gametype);
});

router.get("/queues", (req, res) => {
  res.send(Object.keys(state.queues));
});

router.post("/newqueue", (req, res) => {
  if (req.body.name?.trim()) {
    let to_add = req.body.name.toLowerCase().split(' ').join('_');
    if (state.queues[to_add] === undefined) {
      state.queues[to_add] = new GameQueue(to_add, Number(req.body.playersPerTeam));
      //console.log(state);
      emitQueueState();
    }
  }
});

router.post("/delqueue", (req, res) => {
  delete state.queues[req.body.name.toLowerCase().split(' ').join('_')];
  emitQueueState();
});

router.post("/delitem", (req, res) => {
  if (req.body.active)
    state.queues[req.body.gametype].delGameItem(Number(req.body.index));
  else
    state.queues[req.body.gametype].delQueueItem(Number(req.body.index));
  emitGameState(req.body.gametype);
  res.send({});
});

router.post("/edititem", (req, res) => {
  if (req.body.active)
    state.queues[req.body.gametype].editGameItem(Number(req.body.index), req.body.team);
  else
    state.queues[req.body.gametype].editQueueItem(Number(req.body.index), req.body.team);
  emitGameState(req.body.gametype);
  res.send({});
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
