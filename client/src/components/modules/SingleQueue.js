import React, { useState, useEffect } from "react";

import "./SingleQueue.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user,
 *  sets it to active
 * @param {UserObject} queue
 * @param {boolean} active
 */
const SingleQueue = (props) => {
  return (
    <div
      className={`SingleQueue-container u-pointer ${props.active ?
        "SingleQueue-container--active" : ""
        }`}
      onClick={() => {
        props.setActiveQueue(props.queue);
      }}
    >
      {props.queue}
      {console.log(props)}
    </div>
  );
}

export default SingleQueue;