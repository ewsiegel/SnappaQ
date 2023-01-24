import React from "react";
import { Link } from "@reach/router";
// import GoogleLogin, { GoogleLogout } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import die_image from '../../public/logos/SnappaQ-black.png'


import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "421107140891-uodmhhbac912d2ns75u0npip3geh3t4d.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      {/* <img className="NavBar-logo" src={die_image} alt="die" /> */}
      <div className="NavBar-title u-inlineBlock">Snappa</div>
      <div className="NavBar-title-red u-inlineBlock">Q</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        {/* <Link to="/" className="NavBar-link">
          Home
        </Link> */}
        {/* {props.userId && (
          <Link to={`/profile/${props.userId}`} className="NavBar-link">
            Profile
          </Link>
        )} */}
        <Link to="/" className="NavBar-link">
          Queues
        </Link>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {props.userId ? (
            <button
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
        {/* {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )} */}
      </div>
    </nav>
  );
};

export default NavBar;
