import React, { useState, useEffect } from "react";

import "./SingleItem.css";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {ItemObject} item
 */
const SingleItem = (props) => {
  // console.log(props);
  return (
    <div className={"u-flex u-flex-alignCenter SingleItem-container"}>
      <span className="SingleItem-position u-bold">{props.position + ":"}</span>
      <span className="SingleItem-players">{(() => {
        if (props.players !== null)
          return props.players.map((u) => u).join(", ");
        return "Game Not Active";
      })()}</span>
      <span className="SingleItem-edit">{"Edit"}</span>
      <span className="SingleItem-del">{"Del"}</span>
    </div>
  );
};

export default SingleItem;
