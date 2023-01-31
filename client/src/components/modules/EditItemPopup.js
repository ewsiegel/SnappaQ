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
  const [editDefaults, setEditDefaults] = useState(null);

  useEffect(() => {
    if (props.currentPlayers === null) {
      setEditDefaults(new Array(props.playersPerTeam).fill({value: "", label: "Need 1"}));
    }
    else {
      setEditDefaults([...Array(props.playersPerTeam).keys()].map((i) => {
        if (props.currentPlayers[i] !== "")
          return props.profiles.find((obj) => obj.value === props.currentPlayers[i]);
        return {value: "", label: "Need 1"};
      }));
    }
  }, [props.currentPlayers]);

  if (editDefaults === null) {
    return <div>Loading</div>;
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
            post("/api/edititem", {active: props.active, gametype: props.gametype, index: props.index, team: players});
            props.setDisplayEditItem(false);
          }} 
          profiles={props.profiles} 
          defaults={editDefaults}
          playersPerTeam={props.playersPerTeam}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditItemPopup;
