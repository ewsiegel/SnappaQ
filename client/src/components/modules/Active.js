import React, { useState, useEffect } from "react";

import ActiveQueue from "../modules/ActiveQueue.js";
import ActiveGame from "../modules/ActiveGame.js";

import "./Active.css";
import "./SingleItem.css";

const Active = (props) => {
  const handleEndGame = (event) => {
    console.log("game over");
    event.preventDefault();
    props.onSubmit && props.onSubmit([player1, player2]);
  };

  return (
    <div className="u-flexColumn u-flex-alignCenter ActiveQueue-container">
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
    </div>
  );
};

export default Active;
