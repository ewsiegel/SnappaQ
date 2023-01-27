import React, { useState, useEffect } from "react";
import SingleQueue from "../modules/SingleQueue.js";

import "./SingleQueue.css";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {UserObject[]} queues to display
 * @param {UserObject} active queue in chat
 * @param {string} userId id of current logged in user (DO WE NEED TO KEEP TRACK OF THIS? DIDNT GET PASSED THRU IN CHATBOOK)
 * @param {(UserObject) => ()} setActiveQueue function that takes in queue, sets it to active
 */
const QueueList = (props) => {
  return (
    <>
      <h3 className={"SingleQueue-header"}>Open Queues</h3>
      {/* i will be key denoting something?? */}
      {props.queues.map((queue, i) => (
        <SingleQueue
          key={i}
          setActiveQueue={props.setActiveQueue}
          name={queue}
          active={queue === props.active}
        />
      ))}
      <button
        type="addNewQueue"
        className="SingleQueue-button u-pointer"
        value="Add New Queue"
        // onClick={INSERT FUNC TO EXECUTE ON CLICK}
        // will need to pass in setActiveQueues 
      >
        Add New Queue
      </button>
    </>
  );
};

export default QueueList;
