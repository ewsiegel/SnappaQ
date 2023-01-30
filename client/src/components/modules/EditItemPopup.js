import React, { useState, useEffect } from "react";
import "./Popup.css";
import "./NewItem.css";
import { post } from "../../utilities";
import NewItemInput from "./NewItemInput";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {QueueObject} queue in which item is being edited
 * @param {UserObj} userId of logged-in user
 * @param {} active
 * @param {} profiles
 * @param {} setDisplayEditItem
 */

const EditItemPopup = (props) => {
  let default1, default2;
  if (props.currentPlayers === null) {
    default1 = {value: "", label: "Need 1"};
    default2 = {value: "", label: "Need 1"};
  }
  else {
    if (props.currentPlayers[0] !== "") default1 = props.profiles.find((obj) => obj.value === props.currentPlayers[0])
    else default1 = {value: "", label: "Need 1"}

    if (props.currentPlayers[1] !== "") default2 = props.profiles.find((obj) => obj.value === props.currentPlayers[1])
    else default2 = {value: "", label: "Need 1"}
  }
  return props.trigger ? (
    <div className="u-flex u-relative Popup-container">
      <div className="Popup-inner">
        <h3>Edit item</h3>
        <button
          className="close-btn"
          onClick={() => {
            props.setDisplayEditItem(false);
          }}
        >
          close
        </button>
        <NewItemInput 
          onSubmit={(players) => {
            // console.log(players);
            // console.log({active: props.active, gametype: props.gametype, index: props.index, team: players});
            post("/api/edititem", {active: props.active, gametype: props.gametype, index: props.index, team: players});
            props.setDisplayEditItem(false);
          }} 
          profiles={props.profiles} 
          default1={default1} 
          default2={default2}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditItemPopup;
