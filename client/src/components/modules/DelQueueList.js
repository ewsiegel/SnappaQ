import React, { useState, useEffect } from "react";
import DelSingleQueue from "../modules/DelSingleQueue.js";

import "./SingleQueue.css";
import { post } from "../../utilities.js";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {UserObject[]} queues to display
 * @param {() => void} setDisplayDelQueue function to trigger DelQueuePopup
 * @param {string} userId id of current logged in user (DO WE NEED TO KEEP TRACK OF THIS? DIDNT GET PASSED THRU IN CHATBOOK)
 */
const DelQueueList = (props) => {
  return (
    <>
      {/* <h3 className={"SingleQueue-header"}></h3> */}
      {Array.from(props.queues.entries()).map(([i, name]) => (
        (name !== "snappa") ? (
          <DelSingleQueue
            key={i}
            name={name}
            setDisplayDelQueue={props.setDisplayDelQueue}
          />
        ) : ""
      ))}
    </>
  );
};

export default DelQueueList;
