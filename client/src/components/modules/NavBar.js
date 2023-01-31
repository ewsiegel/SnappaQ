import React from "react";
import { Link } from "@reach/router";
// import GoogleLogin, { GoogleLogout } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import die_image from '../../public/logos/SnappaQ-black.png'


import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";

const NavBar = (props) => {
  return (
    <nav className="NavBar-container u-flex">
      {/* <img className="NavBar-logo" src={die_image} alt="die" /> */}
      <div className="NavBar-titleContainer">
        <div className="NavBar-title">Snappa</div>
        {/* <div className="NavBar-title u-inlineBlock">Snappa</div> */}
        <div className="NavBar-title-yellow">Q</div>
        {/* <div className="NavBar-title-yellow u-inlineBlock">Q</div> */}
        <div className="NavBar-linkContainer">
      </div>
      
      {/* <div className="NavBar-linkContainer u-inlineBlock"> */}
        <Link to="/" className="NavBar-link" >
          Queues
        </Link>
        <Link to="/profile/" className="NavBar-link" >
          Profile
        </Link>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {props.userId ? (
            <button
              className="NavBar-logoutButton"
              onClick={() => {
                googleLogout();
                props.handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
          )}
        </GoogleOAuthProvider>
      </div>
    </nav>
  );
};

export default NavBar;
