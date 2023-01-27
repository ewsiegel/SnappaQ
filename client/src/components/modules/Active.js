import React, { useState, useEffect } from "react";

import ActiveQueue from "../modules/ActiveQueue.js";
import ActiveGame from "../modules/ActiveGame.js";

import "./Active.css";
import "./SingleItem.css";
import { post } from "../../utilities.js";


const Active = (props) => {

  // const handleEndGame = (event) => {
  //   console.log("game over");
  //   event.preventDefault();
  //   post("/api/completegame");
  //   props.callback();
  // };

  const handleTeam1Wins = (event) => {
    console.log("game over");
    event.preventDefault();
    post("/api/completegame");
    props.callback();
  }

  const handleTeam2Wins = (event) => {
    console.log("game over");
    event.preventDefault();
    post("/api/completegame");
    props.callback();
  }

  const handleClearAll = (event) => {
    console.log("clearing all");
    event.preventDefault();
    post("/api/clearqueue");
    props.callback();
  }

  return (
    <div className="u-flexColumn u-flex-alignCenter ActiveQueue-container">
      <h3>Snappa</h3>
      <ActiveGame data={props.activeData} />
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
      <ActiveQueue data={props.data} callback={props.callback} />
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
