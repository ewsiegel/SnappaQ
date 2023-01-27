import React, { useState, useEffect } from "react";

import "./SingleQueue.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {() => void} setActiveQueues function to change active Queue on button click
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
        props.setActiveQueue(props.name);
      }}
    >
      {props.name}
    </div>
  );
}

export default SingleQueue;