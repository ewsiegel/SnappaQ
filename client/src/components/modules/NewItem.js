import React, { useState, useEffect } from "react";

import "./NewItem.css";
import { post } from "../../utilities";

/**
 * New Item is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewItemInput = (props) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  // called whenever the user types in the new item input box
  // pretty sure this can remain unchanged
  const handleChange1 = (event) => {
    setPlayer1(event.target.value);
  };
  const handleChange2 = (event) => {
    setPlayer2(event.target.value);
  };

  // called when the user hits "Submit" for a new item
  // pretty sure this can remain unchanged
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit([player1, player2]);
    setPlayer1("Need 1");
    setPlayer2("Need 1");
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={player1}
        onChange={handleChange1}
        className="NewItemInput-input"
      />
      <input
        type="text"
        placeholder={props.defaultText}
        value={player2}
        onChange={handleChange2}
        className="NewItemInput-input"
      />
      <button
        type="submit"
        className="NewItemInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * New Item is a New Item component for messages
 *
 * Proptypes
 * @param {QueueData} data is the intended recipient
 */
const NewItem = (props) => {
  const addItem = (players) => {
    const body = {
      position: props.length + 1,
      players: players,
    };
    post("/api/appendqueue", body); // PROLLY NEED TO CHANGE THIS ONCE SIEGEL IS DONE WITH BACKEND STUFF
  };

  console.log("props: ", props)
  return <NewItemInput defaultText="Enter Player Name" onSubmit={addItem} />;
};

// export default NewItem;
export { NewItem };