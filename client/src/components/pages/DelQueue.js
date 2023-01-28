import React, { useState, useEffect } from "react";

import "./Queues.css";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import DelQueueList from "../modules/DelQueueList";
import ActiveQueues from "./Queues.js"

const GOOGLE_CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";

const DelQueue = (props) => {
    return (
        <div className="u-flex u-relative Queues-queueContainer">
            <h3>Choose a queue to delete</h3>
            {/* prolly a good idea to not be able to delete the original snappa queue  */}
            <DelQueueList             
                userId={props.userId}
                // queues={activeQueues} // uncomment once I can properly pass this down
            />
        </div>
    )
};

export default DelQueue;
