import React, { useState, useEffect } from "react";

import "./SingleQueue.css";

function style_name(name) {
  let splitted = name.split("_");
  for (var i = 0; i < splitted.length; i++) {
    splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
  }
  return splitted.join(" ");
}

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
      {style_name(props.name)}
    </div>
  );
}

export default SingleQueue;