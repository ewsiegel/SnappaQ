import React, { useState, useEffect } from "react";

import "./DelQueuePopup.css";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
// import { useLocation } from "react-router-dom";

import DelQueueList from "./DelQueueList";
import Queues from "../pages/Queues.js";

const GOOGLE_CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {QueueObject[]} queues to display
 * @param {() => void} setDisplayDelQueue function to trigger DelQueuePopup
 */

const DelQueuePopup = (props) => {
  // const queues = useLocation();
  // const { from } = location.state;
  return props.trigger ? (
    <div className="u-flex u-relative DelQueuePopup-container">
      <div className="DelQueuePopup-inner">
        <h3>Choose a queue to delete</h3>
        <button 
          className="close-btn"
          onClick={() => {props.setDisplayDelQueue(false)}}
        >
          close
        </button>
        {/* prolly a good idea to not be able to delete the original snappa queue  */}
        <DelQueueList
          setDisplayDelQueue={props.setDisplayDelQueue}
          userId={props.userId}
          queues={props.queues} // uncomment once I can properly pass this down
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default DelQueuePopup;
