import * as React from "react";

import axios from "axios";

import "STRING_CSS_PATH";
import header from "STRING_IMAGE_PATH";

export default function SignInPage() {
  const [loginNote, setLoginNote] = React.useState("Please enter your username and password.");

  function handleLogin() {
    axios
    .post("STRING_LOGIN_URL", {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password")
    })
    .then((response) => {
      switch (response.data) {
        case "username_error":
        case "password_error":
          setLoginNote("Please enter a valid username and password.");
          break;
        case "request_success":
          setLoginNote("Successful user authentication!");
          // FUNC_NAVIGATE_LOGIN();
          break;
        default: return null;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
  }

  return (
    <div className = "container column-center">
      <div className = "container row-center">
        <div className = "container row-center">
          <img id = "image-login" src = { header } title = "RDIS" alt = "Header"/>
        </div>
        <div className = "container column-center">
          <div className = "container column-center">
            <div className = "container row-center">
              <span className = "type-header">Sign In to <b>RDIS</b></span>
            </div>
            <div className = "container row-center form-field">
              <label htmlFor = "sign-in-username"><span className = "type-body">Username</span></label>
              <input id = "sign-in-username" name = "username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" onChange = { (event) => { localStorage.setItem("username", event.target.value); } } required/>
            </div>
            <div className = "container row-center form-field">
              <label htmlFor = "sign-in-password"><span className = "type-body">Password</span></label>
              <input id = "sign-in-password" name = "password" type = "password" minLength = "8" maxLength = "24" placeholder = "Password" onChange = { (event) => { localStorage.setItem("password", event.target.value); } } required/>
            </div>
            <div className = "form-note">
              <span className = "type-footer">{ loginNote }</span>
            </div>
            <div className = "button" onClick = { () => { handleLogin(); } }>
              <span className = "type-button">Sign In</span>
            </div>
            <div className = "button" onClick = { () => { {/*FUNC_NAVIGATE_SECURITY();*/} } }>
              <span className = "type-button">Forgot password?</span>
            </div>
          </div>
          <div className = "container column-center">
            <div className = "container row-center">
              <span className = "type-footer">
                <a href = "STRING_TERMS_URL" target = "_blank" rel = "noreferrer">Terms</a>
              </span>
              <span className = "type-bullet">•</span>
              <span className = "type-footer">
                <a href = "STRING_PRIVACY_URL" target = "_blank" rel = "noreferrer">Privacy</a>
              </span>
              <span className = "type-bullet">•</span>
              <span className = "type-footer">
                <a href = "STRING_DOCUMENTATION_URL" target = "_blank" rel = "noreferrer">Documentation</a>
              </span>
              <span className = "type-bullet">•</span>
              <span className = "type-footer">
                <a href = "STRING_SUPPORT_URL" target = "_blank" rel = "noreferrer">Support</a>
              </span>
            </div>
            <div className = "container row-center">
              <span className = "type-footer">RDIS © 2024 by Geospectrum Analytics Services, Inc.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}