const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const Profile = require("./models/profile");
const socketManager = require("./server-socket");

// create a new OAuth client used to verify google sign-in
const CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
    });

    return newUser.save();
  });
}

function createProfileIfNew(user) {
  Profile.findOne({id: user._id}).then((profile) => {
    if (!profile) {
      const new_profile = new Profile({
        id: user._id,
        name: user.name,
        wins: {"snappa": 0, "die": 0, "darts": 0, "pool": 0},
        losses: {"snappa": 0, "die": 0, "darts": 0, "pool": 0},
        elo: 0,
        rankedGamesPlayed: 0
      });
      new_profile.save().then(() => {
        Profile.find({}).then((profiles) => {
          socketManager.getIo().emit("profiles", profiles);
        });
      });
    }
    return;
  });
}

function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      res.send(user);
      return user;
    })
    .then((user) => createProfileIfNew(user))
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
