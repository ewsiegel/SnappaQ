import React, { useState, useEffect } from "react";

import "./SingleStat.css";
import { post } from "../../utilities";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {number} name of the game type
 * @param {number} wins
 * @param {number} total games played
 * @param {number}
 */
const SingleStat = (props) => {
  return (
    <div className="SingleStat-container">
      <div className="SingleStat-gameName">{props.name}</div>
      <div className="SingleStat-wins">{props.wins}</div>
      <div className="SingleStat-total">{props.total}</div>
    </div>
    // <tr>
    //     <td>{props.name}</td>
    //     <td>{props.wins}</td>
    //     <td>{props.total}</td>
    // </tr>
  );
};

export default SingleStat;
