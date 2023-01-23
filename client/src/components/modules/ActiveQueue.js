import React, { useState, useEffect } from "react";
import SingleItem from "../modules/SingleItem.js";
// import { NewItem } from "../modules/NewItem.js";

import "./ActiveQueue.css";

// Game Schema
// const GameSchema = new mongoose.Schema({
//     gameType: String,
//     gameId: String,
//     state: String,
//     players: {
//       team1: [String], // list of player IDs
//       team2: [String], // list of player IDs
//     },
//     winners: [String],
//     losers: [String],
//     timestamp: { type: Date, default: null }, // date & time that a game began, set this when game state becomes active
//   });

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
  console.log("props: ", props.data.items)
  return (
    <div className="u-flexColumn ActiveQueue-container">
      <h3>Snappa</h3>
      <div className="ActiveQueue-oldItemContainer">
        {props.data.items.map((obj) => (
          <SingleItem position={obj.position} players={obj.players} />
        ))}
      </div>
      {/* <div className="ActiveQueue-newItemContainer">
        <NewMessage recipient={props.data.recipient} />
      </div> */}
    </div>
  );
};

export default ActiveQueue;
