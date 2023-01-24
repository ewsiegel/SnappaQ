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

const state = require('./state');

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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
