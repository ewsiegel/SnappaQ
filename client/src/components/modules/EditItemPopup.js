import React, { useState, useEffect } from "react";
import "./Popup.css";
import "./NewItem.css";
import { post } from "../../utilities";
import { NewItem } from "../modules/NewItem.js";

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
        {/* <NewItem
                players={props.data}
                active={props.active}
                profiles={props.profiles}
            /> */}
      </div>
    </div>
  ) : (
    ""
  );
};

export default EditItemPopup;
