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

    const [players, setPlayers] = useState(null);
  
    let refs = useRef(new Array(props.playersPerTeam).fill(null));

    useEffect(() => {
      for (var index = 0; index<props.playersPerTeam; index++) {
        if (refs.current[index] != null)
          refs.current[index].setValue(props.defaults[index]);
      }
      setPlayers(props.defaults.map(obj => obj.value))
    }, [props.defaults]);

    const handleChange = (select, index) => {
      let arr = [...players];
      arr[index] = select.value;
      setPlayers(arr);
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      props.onSubmit && props.onSubmit(players);
      for (var index = 0; index<props.playersPerTeam; index++) {
        refs.current[index].setValue(props.defaults[index]);
      }
      setPlayers(props.defaults.map(obj => obj.value));
    };

    if (players === null) {
      return <div>Loading</div>;
    }
    return (
      <>
      <div className="u-flex">
        {[...Array(props.playersPerTeam).keys()].map((index) => {
          return <PlayerDropdown key={index} index={index} innerRef={refs} handler={(select) => handleChange(select, index)} profiles={props.profiles} default={props.defaults[index]}/>
        })}
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