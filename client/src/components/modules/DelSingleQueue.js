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
 * @param {boolean} active
 * @param {string} name of queue
 */
const DelSingleQueue = (props) => {

  const handleDelQueue = (event) => {
    console.log("deleting queue: ", props.name);
    event.preventDefault();
    post("/api/delqueuee", {name: props.name.toLowerCase()});
  };

  return (
    <div className={`SingleQueue-container u-pointer`}>
      {style_name(props.name)}
      <button
        type="delQueue"
        className="SingleQueue-delQueueButton u-pointer u-flex-alignCenter"
        value="DEL QUEUE"
        onClick={handleDelQueue}
      >
        Delete Queue
      </button>
    </div>
  );
};

export default DelSingleQueue;
