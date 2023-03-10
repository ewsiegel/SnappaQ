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
  //console.log("props: ", props.profiles);
  return (
    <>
      <br></br>
      <h3 className="Active-sectionHeader">Queue</h3>
      <div className="Active-oldItemContainer">
        {Array.from(props.data.items.entries()).map(([i, obj]) => (
          <SingleItem key={i} position={obj.position} players={obj.players} isActiveGame={false} active={props.active} profiles={props.profiles} setDisplayEditItem={props.setDisplayEditItem} setItemToEdit={props.setItemToEdit}/>
        ))}
      </div>
      <div className="Active-newItemContainer">
        <NewItem active={props.active} profiles={props.profiles} playersPerTeam={props.playersPerTeam} />
      </div>
    </>
  );
};

export default ActiveQueue;
