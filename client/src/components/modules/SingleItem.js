import React, { useState, useEffect } from "react";

import "./SingleItem.css";
import { post } from "../../utilities";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {ItemObject} item
 */
const SingleItem = (props) => {

  const handleItemEdit = (event) => {
    event.preventDefault();
    console.log("handleItemEdit not implemented");
  };

  const handleItemDel = (event) => {
    event.preventDefault();
    post("/api/delitem", {active: props.isActiveGame, index: Number(props.position)-1, gametype: props.active});
  };

  return (
    <div className={"u-flex u-flex-alignCenter SingleItem-container"}>
      <span className="SingleItem-position u-bold">{props.position + ":"}</span>
      <span className="SingleItem-players">
        {(() => {
          if (props.players !== null) return props.players.map((u) => u).join(", ");
          return "Game Not Active";
        })()}
      </span>
      <button
        type="edit"
        className="SingleItem-button u-pointer u-flex-alignCenter"
        value="Edit"
        onClick={handleItemEdit}
      >
        Edit
      </button>
      <button
        type="del"
        className="SingleItem-button u-pointer u-flex-alignCenter"
        value="Del"
        onClick={handleItemDel}
      >
        Del
      </button>
    </div>
  );
};

export default SingleItem;
