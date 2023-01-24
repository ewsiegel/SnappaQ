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
    <div className="u-flexColumn u-flex-alignCenter Active-container">
      <h3>Queue</h3>
      <div className="Active-oldItemContainer">
        {props.data.items.map((obj) => (
          <SingleItem position={obj.position} players={obj.players} />
        ))}
      </div>
      <div className="Active-newItemContainer">
        <NewItem players={props.data} />
      </div>
    </div>
  );
};

export default ActiveQueue;
