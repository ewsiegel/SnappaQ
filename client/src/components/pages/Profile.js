import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import {get} from "../../utilities"

const GOOGLE_CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";

function getProfileData(userid) {
    get("/api/profile", {userid: userid}).then((profile) => {
        console.log(profile)
        return profile;
    });
}

const Profile = (props) => {

    const [profileData,updateProfileData] = useState(null);

    useEffect(() => {
        document.title = "Profile";
      }, []);

    useEffect(() => {
        if (props.userId !== undefined) {
            get("/api/profile", {userid: props.userId}).then((profile) => {
                updateProfileData(profile);
            });
        }
        else updateProfileData(null)
    }, []);

    useEffect(() => {
        if (props.userId !== undefined) {
            get("/api/profile", {userid: props.userId}).then((profile) => {
                updateProfileData(profile);
            });
        }
        else updateProfileData(null)
    }, [props.userId]);

    if (profileData === null) return <div>Log in before viewing Profile</div>;
    return (
        <>
        <div className="Profile-container">
            <h1>{profileData.wins}</h1>
        </div>
        </>
    );
};

export default Profile;