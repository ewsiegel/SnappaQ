import React, { useState, useEffect, useRef } from "react";
import PlayerDropdown from "./Dropdown";

/**
 * New Item is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewItemInput = (props) => {
    const [player1, setPlayer1] = useState(props.default1.value);
    const [player2, setPlayer2] = useState(props.default2.value);
  
    let ref1 = useRef(null);
    let ref2 = useRef(null);
  
    // called whenever the user types in the new item input box
    // pretty sure this can remain unchanged
    const handleChange1 = (select) => {
      setPlayer1(select.value);
    };
    const handleChange2 = (select) => {
      setPlayer2(select.value);
    };
  
    // called when the user hits "Submit" for a new item
    // pretty sure this can remain unchanged
    const handleSubmit = (event) => {
      event.preventDefault();
      props.onSubmit && props.onSubmit([player1, player2]);
      ref1.current.setValue(props.default1);
      ref2.current.setValue(props.default2);
    };
    return (
      <>
      <div className="u-flex">
        <PlayerDropdown innerRef={ref1} handler={handleChange1} profiles={props.profiles} default={props.default1}/>
        <PlayerDropdown innerRef={ref2} handler={handleChange2} profiles={props.profiles} default={props.default2}/>
        <button
          type="submit"
          className="NewItemInput-button u-pointer"
          value="Submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      </>
    );
  };

  export default NewItemInput;