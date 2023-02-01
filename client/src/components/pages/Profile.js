import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import SingleStat from "../modules/SingleStat.js";
import "../../utilities.css";
import "./Profile.css";
import { get } from "../../utilities";

const GOOGLE_CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";

function getProfileData(userid) {
  get("/api/profile", { userid: userid }).then((profile) => {
    console.log(profile);
    return profile;
  });
}

//USE THIS TO GO FROM "queue_name" to "Queue Name"
function style_name(name) {
  let splitted = name.split("_");
  for (var i = 0; i < splitted.length; i++) {
    splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
  }
  return splitted.join(" ");
}

const Profile = (props) => {
  const [profileData, updateProfileData] = useState(null);

  useEffect(() => {
    document.title = "Profile";
  }, []);

  useEffect(() => {
    if (props.userId !== undefined) {
      get("/api/profile", { userid: props.userId }).then((profile) => {
        updateProfileData(profile);
      });
    } else updateProfileData(null);
  }, []);

  useEffect(() => {
    if (props.userId !== undefined) {
      get("/api/profile", { userid: props.userId }).then((profile) => {
        updateProfileData(profile);
      });
    } else updateProfileData(null);
  }, [props.userId]);

  if (profileData === null) return <div>Log in before viewing Profile</div>;
  return (
    <div className="Profile-container">
      <div className="Profile-header">{profileData.name}</div>
      {/* <h1>{JSON.stringify(profileData.wins, null, 2)}</h1> */}
      <div className="Profile-statContainer">
        <SingleStat name={"Game Type"} wins={"Wins"} total={"Games Played"}/>
        {Array.from(Object.entries(profileData.wins)).map(([i, obj]) => (
            <SingleStat key={i} name={i} wins={obj} total={obj + profileData.losses.i}/>
            // <SingleStat key={i} name={i} wins={obj} total={TODO}/>
        ))}
      </div>
      {/* <table className="Profile-statContainer">
        <tr>
          <th>Game Type</th>
          <th>Wins</th>
          <th>Total</th>
        </tr>
        {Array.from(Object.entries(profileData.wins)).map(([i, obj]) => (
            <SingleStat key={i} name={i} wins={obj}/>
            // <SingleStat key={i} name={i} wins={obj} total={TODO}/>
        ))}
      </table> */}
    </div>
  );
};

export default Profile;
