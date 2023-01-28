import React, { useState, useEffect } from "react";

import "./Queues.css";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";

const GOOGLE_CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";

const DelQueue = (props) => {
    return (
        <div className="u-flex u-relative Queues-container">
            <h3>Choose a queue to delete</h3>
        </div>
    )
};

export default DelQueue;
