import React, { useState, useEffect } from "react";
import SingleQueue from "../modules/SingleQueue.js";
import { Link } from "@reach/router";

import "./SingleQueue.css";
import { post } from "../../utilities.js";

const NewQueueInput = (props) => {
  const [text, setText] = useState("");
  const [num, setNum] = useState(1);

  // called whenever the user types in the new item input box
  // pretty sure this can remain unchanged
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleChangeNum = (event) => {
    setNum(event.target.value);
  };

  // called when the user hits "Submit" for a new item
  // pretty sure this can remain unchanged
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(text, num);
    setText("");
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={text}
        onChange={handleChange}
        className="NewQueueInput-input"
      />
      <input
        type="number"
        placeholder={1}
        value={num}
        onChange={handleChangeNum}
        className="NewQueueInput-inputNum"
      />
      <button
        type="submit"
        className="NewQueueInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {() => void} setActiveQueues function to change active Queue on button click
 * @param {QueueObject[]} queues to display
 * @param {QueueObject} active queue in chat
 * @param {string} userId id of current logged in user (DO WE NEED TO KEEP TRACK OF THIS? DIDNT GET PASSED THRU IN CHATBOOK)
 * @param {(QueueObject) => ()} setActiveQueue function that takes in queue, sets it to active
 */
const QueueList = (props) => {
  return (
    <>
      <h3 className={"SingleQueue-header"}>Open Queues</h3>
      {/* i will be key denoting something?? */}
      {Array.from(props.queues.entries()).map(([i, name]) => (
        <SingleQueue
          key={i}
          setActiveQueue={props.setActiveQueue}
          name={name}
          active={name === props.active}
        />
      ))}
      <NewQueueInput
        defaultText="New Queue Name"
        onSubmit={(name, num) => {
          post("/api/newqueue", { name: name, playersPerTeam: Number(num) });
        }}
      />
      
      {/* <Link 
        to="/delqueue/" 
        className="SingleQueue-link"
        state={props.queues}
      >
        Delete Queue
      </Link> */}
    </>
  );
};

export default QueueList;
