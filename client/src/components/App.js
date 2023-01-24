import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Queues from "./pages/Queues.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      />
      <div className="App-container">
        <Router>
          <Queues path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;

// ETHAN: Runner I used to test api
//
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
// post("/api/clearqueue").then((out) => {console.log(JSON.stringify(out, null, 2))});
// sleep(1000);
// post("/api/appendqueue", {team: ["63c9ef918b80c1f5836ec2cc", "63c9ef918b80c1f5836ec2cc"]})
//   .then((out) => {console.log(JSON.stringify(out, null, 2))});
// sleep(1000);
// post("/api/appendqueue", {team: ["63c9ef918b80c1f5836ec2cc", "63c9ef918b80c1f5836ec2cc"]})
// .then((out) => {console.log(JSON.stringify(out, null, 2))});
// sleep(1000);
// post("/api/appendqueue", {team: ["63c9ef918b80c1f5836ec2cc", "63c9ef918b80c1f5836ec2cc"]})
// .then((out) => {console.log(JSON.stringify(out, null, 2))});
// sleep(1000);
// post("/api/appendqueue", {team: ["63c9ef918b80c1f5836ec2cc", "63c9ef918b80c1f5836ec2cc"]})
// .then((out) => {console.log(JSON.stringify(out, null, 2))});
// sleep(1000);
// post("/api/completegame")
// .then((out) => {console.log(JSON.stringify(out, null, 2))});
// sleep(1000);
// post("/api/completegame")
// .then((out) => {console.log(JSON.stringify(out, null, 2))});
// sleep(1000);
// post("/api/completegame")
// .then((out) => {console.log(JSON.stringify(out, null, 2))});
// sleep(1000);
// post("/api/completegame")
// .then((out) => {console.log(JSON.stringify(out, null, 2))});
// sleep(1000);