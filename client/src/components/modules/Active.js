import React, { useState, useEffect } from "react";

import ActiveQueue from "../modules/ActiveQueue.js";
import ActiveGame from "../modules/ActiveGame.js";

import "./Active.css";
import "./SingleItem.css";
import { post } from "../../utilities.js";

function style_name(name) {
  let splitted = name.split("_");
  for (var i = 0; i < splitted.length; i++) {
    splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
  }
  return splitted.join(" ");
}

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {} name of queue to displey
 * @param {() => {}} setDisplayEditItem function to trigger Edit Item popup
 * @param {}
 */

const Active = (props) => {
  const handleTeam1Wins = (event) => {
    console.log("game over");
    event.preventDefault();
    post("/api/completegame", { gametype: props.name.toLowerCase(), winner: 1 });
  };

  const handleTeam2Wins = (event) => {
    console.log("game over");
    event.preventDefault();
    post("/api/completegame", { gametype: props.name.toLowerCase(), winner: 2 });
  };

  const handleClearAll = (event) => {
    console.log("clearing all");
    event.preventDefault();
    post("/api/clearqueue", { gametype: props.name.toLowerCase() });
  };

  return (
    <div className="u-flexColumn u-flex-alignCenter ActiveQueue-container">
      {/* <div className="ActiveQueue-container"> */}
      <h3>{style_name(props.name)}</h3>
      <ActiveGame
        data={props.activeData}
        active={props.name}
        profiles={props.profiles}
        setDisplayEditItem={props.setDisplayEditItem}
        setItemToEdit={props.setItemToEdit}
      />
      <div className="Active-endGameButtonContainer">
        <button
          type="endGame"
          className="Active-endGameButton u-pointer u-flex-alignCenter"
          value="END GAME"
          onClick={handleTeam1Wins}
        >
          Team 1 Wins
        </button>
        <button
          type="endGame"
          className="Active-endGameButton u-pointer u-flex-alignCenter"
          value="END GAME"
          onClick={handleTeam2Wins}
        >
          Team 2 Wins
        </button>
      </div>
      <ActiveQueue 
        data={props.data}
        active={props.name}
        profiles={props.profiles}
        setDisplayEditItem={props.setDisplayEditItem}
        setItemToEdit={props.setItemToEdit}
        playersPerTeam={props.playersPerTeam}
      />
      <div className="Active-clearQueueButtonContainer">
        <button
          type="clearAll"
          className="Active-clearQueueButton u-pointer u-flex-alignCenter"
          value="CLEAR ALL"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Active;
