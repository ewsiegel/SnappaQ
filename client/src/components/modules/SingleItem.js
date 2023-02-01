import React, { useState, useEffect } from "react";

import "./SingleItem.css";
import { post } from "../../utilities";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {} itemID WHY NOT WORKING
 * @param {} position
 * @param {} players
 * @param {boolean} isActiveGame
 * @param {} active
 * @param {} profiles
 * @param {} setDisplayEditItem
 * @param {} setItemToEdit
 */
const SingleItem = (props) => {

  const handleItemEdit = (event) => {
    let itemToEdit = {active: props.isActiveGame, index: Number(props.position) - 1, currentPlayers: props.players};
    props.setItemToEdit(itemToEdit)
    props.setDisplayEditItem(true);
    event.preventDefault();
    //console.log("handleItemEdit called");
    //console.log("Item to edit: ", itemToEdit);
  };

  const handleItemDel = (event) => {
    event.preventDefault();
    post("/api/delitem", {active: props.isActiveGame, index: Number(props.position)-1, gametype: props.active});
  };

  function format() {
    if (props.players !== null) {
      return props.players.map(u => {
        if (u === "")
          return "Need 1";
        return props.profiles.find(obj => u === obj.value).label;
      }).join(", ");
    }
    return "Team Not Active";
  }

  return (
    <div className={"u-flex u-flex-alignCenter SingleItem-container"}>
      <span className="SingleItem-position u-bold">{props.position + ":"}</span>
      <span className="SingleItem-players">{format()}</span>
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
