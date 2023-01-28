import React, { useState, useEffect } from "react";
import SingleItem from "../modules/SingleItem.js";

import "./Active.css";

const ActiveGame = (props) => {
  return (
    <>
      <h3>Active Game</h3>
      <div className="Active-oldItemContainer">
        {Array.from(props.data.items.entries()).map(([i,obj]) => (
          <SingleItem key={i} position={obj.position} players={obj.players} />
        ))}
      </div>
    </>
  );
};

export default ActiveGame;
