import React, { useState, useEffect } from "react";
import SingleItem from "../modules/SingleItem.js";

import "./Active.css";

const ActiveGame = (props) => {
  return (
    <div className="Active-oldItemContainer">
      {props.data.items.map((obj) => (
        <SingleItem position={obj.position} players={obj.players} />
      ))}
    </div>
  );
};

export default ActiveGame;
