let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const queueToSocketMap = {}; // maps queue ID to socket object
const socketToQueueMap = {}; // maps socket ID to queue object

const getSocketFromQueueID = (queueid) => queueToSocketMap[queueid];
const getQueueFromSocketID = (socketid) => socketToQueueMap[socketid];

// I think this wont matter until we have custom queues
const addQueue = (queue, socket) => {
  const oldSocket = queueToSocketMap[queue._id];
  // if no socket exists, add one
  if (!oldSocket) {
    queueToSocketMap[queue._id] = socket;
    socketToQueueMap[socket.id] = queue;
  }
};

// I think this wont matter until we have custom queues
const removeQueue = (queue, socket) => {
  if (queue) delete queueToSocketMap[queue._id];
  delete socketToQueueMap[socket.id];
};

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // FIXME: is this the behavior you want?
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
};

const removeUser = (user, socket) => {
  if (user) delete userToSocketMap[user._id];
  delete socketToUserMap[socket.id];
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getIo: () => io,
};
