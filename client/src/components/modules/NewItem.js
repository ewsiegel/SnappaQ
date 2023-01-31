import React, { useState, useEffect, useRef } from "react";

import "./NewItem.css";
import { post } from "../../utilities";

import NewItemInput from "./NewItemInput";

/**
 * New Item is a New Item component for messages
 *
 * Proptypes
 * @param {} players
 * @param {QueueObj} active queue
 * @param {} profiles
 * @param {}
 */
const NewItem = (props) => {
  const addItem = (players) => {
    const body = {
      team: players.map((elm => {
        return elm;
      })),
      gametype: props.active.toLowerCase()
    };
    post("/api/appendqueue", body);
  };

  const [defaults, setDefaults] = useState(null);

  useEffect(() => {
    setDefaults(new Array(props.playersPerTeam).fill({value: "", label: "Need 1"}));
  }, [props.playersPerTeam]);

  if (defaults === null) {
    return <div>Loading</div>;
  }
  return <NewItemInput defaultText="Enter Player Name" 
                       onSubmit={addItem} 
                       profiles={props.profiles} 
                       defaults={defaults} 
                       playersPerTeam={props.playersPerTeam}
                       active={props.active}
          />;
};

export { NewItem };