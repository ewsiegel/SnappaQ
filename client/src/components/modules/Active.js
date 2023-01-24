import React, { useState, useEffect } from "react";

import ActiveQueue from "../modules/ActiveQueue.js";
import ActiveGame from "../modules/ActiveGame.js";

import "./Active.css";
import "./SingleItem.css";

const endGame = () => {
    console.log("need to implement endGame function")
}

const clearAll = () => {
    console.log("need to implement clearAll function")
}


const Active = (props) => {

  const handleEndGame = (event) => {
    console.log("game over");
    event.preventDefault();
    // props.onSubmit && props.onSubmit([player1, player2]);
    endGame();
  };

  const handleClearAll = (event) => {
    console.log("clearing all");
    event.preventDefault();
    clearAll();
  }

  return (
    <div className="u-flexColumn u-flex-alignCenter ActiveQueue-container">
    {/* <div className="ActiveQueue-container"> */}
      <h3>Snappa</h3>
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
      <ActiveQueue data={props.data} />
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
