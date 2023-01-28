import React, { useState, useEffect } from "react";
import SingleItem from "../modules/SingleItem.js";
import { NewItem } from "../modules/NewItem.js";

import "./Active.css";

/**
 * @typedef UserObject
 * @property {string} _id
 * @property {string} name
 */
/**
 * @typedef ItemObject
 * @property {number} position
 * @property {string[]} players
 */
/**
 * @typedef QueueData
 * @property {ItemObject[]} items
 */

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 *
 * Proptypes
 * @param {QueueData} data
 */
const ActiveQueue = (props) => {
  // console.log("props: ", props.data.items);
  return (
    <>
      <h3>Queue</h3>
      <div className="Active-oldItemContainer">
        {Array.from(props.data.items.entries()).map(([i, obj]) => (
          <SingleItem key={i} position={obj.position} players={obj.players} isActiveGame={false} active={props.active} />
        ))}
      </div>
      <div className="Active-newItemContainer">
        <NewItem players={props.data} active={props.active} />
      </div>
    </>
  );
};

export default ActiveQueue;
