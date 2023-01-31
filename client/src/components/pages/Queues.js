import React, { useState, useEffect, createContext } from "react";

import Active from "../modules/Active.js";
import QueueList from "../modules/QueueList.js";
import DelQueuePopup from "../modules/DelQueuePopup.js";
import EditItemPopup from "../modules/EditItemPopup.js";
import "../../utilities.css";
import "./Queues.css";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";

const GOOGLE_CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */

const Queues = (props) => {
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

  function queueDataToProp(queuedata) {
    let queuesDataObj = {
      activeData: {
        items: [
          { position: 1, players: queuedata.activeGame.team1 },
          { position: 2, players: queuedata.activeGame.team2 },
        ],
      },
      data: {
        items: queuedata.queue.map((players) => {
          return { position: queuedata.queue.indexOf(players) + 1, players: players };
        }),
      },
      playersPerTeam: queuedata.playersPerTeam
    };
    return queuesDataObj;
  }

  function formatProfiles(profiles) {
    return profiles.map((obj) => {
      return { value: obj.id, label: obj.name /*wins: obj.wins, losses: obj.losses*/ };
    });
  }

  const [activeQueues, setActiveQueues] = useState(null);
  // const activeQueuesContext = createContext(activeQueues);

  function queryActiveQueues() {
    get("/api/queues").then((queues) => {
      setActiveQueues(queues);
    });
  }

  function updateProfiles(profiles) {
    setProfiles(formatProfiles(profiles));
  }

  function queryProfiles() {
    get("/api/profiles").then((profiles) => {
      updateProfiles(profiles);
    });
  }

  const [activeQueue, setActiveQueue] = useState("snappa");
  const [queuesData, setQueuesData] = useState(null);
  const [profiles, setProfiles] = useState(null);

  const [displayDelQueue, setDisplayDelQueue] = useState(false);
  const [displayEditItem, setDisplayEditItem] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  function updateActiveQueueData(queuedata) {
    setQueuesData(queueDataToProp(queuedata));
  }

  function loadActiveQueueHistory(gametype) {
    get("/api/queue", { gametype: gametype }).then((queuedata) => {
      updateActiveQueueData(queuedata);
    });
  }

  useEffect(() => {
    if (props.userId) {
      loadActiveQueueHistory(activeQueue);
      socket.on("gameState", updateActiveQueueData);
      return () => {
        socket.off("gameState", updateActiveQueueData);
      };
    }
  }, [activeQueue, props.userId]);

  useEffect(() => {
    queryActiveQueues();
    socket.on("queues", setActiveQueues);
    return () => {
      socket.off("queues", setActiveQueues);
    };
  }, []);

  useEffect(() => {
    queryProfiles();
    socket.on("profiles", updateProfiles);
    return () => {
      socket.off("queues", updateProfiles);
    };
  }, []);

  if (!props.userId) {
    return <div>Log in before using SnappaQ</div>;
  }
  if (queuesData === null || activeQueues == null || profiles == null) {
    return <div>Loading</div>;
  }
  return displayDelQueue ? (
    <DelQueuePopup
      trigger={displayDelQueue}
      setDisplayDelQueue={setDisplayDelQueue}
      userId={props.userID}
      queues={activeQueues}
    >
      <h3>Del Queue Popup</h3>
    </DelQueuePopup>
  ) : displayEditItem ? (
    <EditItemPopup
      trigger={displayEditItem}
      setDisplayEditItem={setDisplayEditItem}
      userId={props.userId}
      profiles={profiles}
      index={itemToEdit.index}
      active={itemToEdit.active}
      currentPlayers={itemToEdit.currentPlayers}
      gametype={activeQueue}
      playersPerTeam={queuesData.playersPerTeam}
    >
      <h3>Edit Item Popup</h3>
    </EditItemPopup>
  ) : (
    <div className="u-flex u-relative Queues-container">
      <div className="Queues-queueList">
        <QueueList
          setActiveQueue={setActiveQueue}
          setDisplayDelQueue={setDisplayDelQueue}
          displayDelQueue={displayDelQueue}
          userId={props.userId}
          queues={activeQueues}
          active={activeQueue}
        />
      </div>
      <div className="Queues-queueContainer u-relative">
        <Active
          name={activeQueue}
          activeData={queuesData.activeData}
          data={queuesData.data}
          profiles={profiles}
          setDisplayEditItem={setDisplayEditItem}
          setItemToEdit={setItemToEdit}
          playersPerTeam={queuesData.playersPerTeam}
        />
      </div>
    </div>
  );
};

export default Queues;
// HOW TF DO I EXPORT ActiveQueues SO I CAN USE IN DelQueues
