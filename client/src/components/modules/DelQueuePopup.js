import React, { useState, useEffect } from "react";
import "./Popup.css";
import DelQueueList from "./DelQueueList";

const GOOGLE_CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {QueueObject[]} queues to display
 * @param {() => void} setDisplayDelQueue function to trigger DelQueuePopup
 * @param {UserObj} userId of logged-in user
 * @param {boolean} trigger
 */

const DelQueuePopup = (props) => {

  return props.trigger ? (
    <div className="u-flex u-relative Popup-container">
      <div className="Popup-inner">
        <h3>Choose a queue to delete</h3>
        <button 
          className="close-btn"
          onClick={() => {props.setDisplayDelQueue(false)}}
        >
          close
        </button>
        <DelQueueList
          setDisplayDelQueue={props.setDisplayDelQueue}
          userId={props.userId}
          queues={props.queues}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default DelQueuePopup;
