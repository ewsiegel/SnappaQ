import React, { useState, useEffect } from "react";

import ActiveQueue from "../modules/ActiveQueue.js";
import ActiveGame from "../modules/ActiveGame.js";

import "./Active.css";
import "./SingleItem.css";
import { post } from "../../utilities.js";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {} name of queue to displey
 * @param {} 
 * @param {}
 */

const Active = (props) => {

  const handleEndGame = (event) => {
    console.log("game over");
    event.preventDefault();
    // props.onSubmit && props.onSubmit([player1, player2]);
    post("/api/completegame");
    props.callback();
  };

  const handleClearAll = (event) => {
    console.log("clearing all");
    event.preventDefault();
    post("/api/clearqueue");
    props.callback();
  }

  return (
    <div className="u-flexColumn u-flex-alignCenter ActiveQueue-container">
    {/* <div className="ActiveQueue-container"> */}
      <h3>{props.name}</h3>
      <ActiveGame data={props.activeData} />
      <div className="Active-endGameButtonContainer">
        <button
          type="endGame"
          className="Active-endGameButton u-pointer u-flex-alignCenter"
          value="END GAME"
          onClick={handleEndGame}
        >
          End Game
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
