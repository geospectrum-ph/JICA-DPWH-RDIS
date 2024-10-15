import * as React from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import "./index.css";
import background from "../../../assets/images/background.jpg";

// import header from "STRING_IMAGE_PATH";

export default function SignInPage() {
  const [loginNote, setLoginNote] = React.useState("Please enter your username and password.");

  const navigate = useNavigate();

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
    <div className = "container column-center" style = {{ height: "100%", width: "100%", padding: "0px",  backgroundColor: "#f06543", backgroundImage: "linear-gradient(315deg, #f06543 0%, #ffbe3d 74%)" }}>
      <div className = "container row-center" style = {{ height: "100%", width: "100%", padding: "0px" }}>
        {/* <div className = "container row-center">
          <img id = "image-login" src = { header } title = "RDIS" alt = "Header"/>
        </div> */}
        <div className = "container column-center" style = {{ height: "100%", width: "100%", padding: "0px" }}>
          <div className = "container column-center" style = {{ flexGrow: "1" }}>
            <div className = "container row-center header" style = {{ height: "auto", fontSize: "64px" }}>
              <span className = "type-header" style = {{marginBottom: "120px"}}><b>ROAD DISASTER INVENTORY SYSTEM (RDIS)</b></span>
            </div>
            <div className = "container row-center form-field"style = {{ width: "50%" }}>
              <label htmlFor = "sign-in-username"><span className = "type-body">Username</span></label>
              <input id = "sign-in-username" name = "username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" onChange = { (event) => { localStorage.setItem("username", event.target.value); } } required/>
            </div>
            <div className = "container row-center form-field"style = {{ width: "50%" }}>
              <label htmlFor = "sign-in-password"><span className = "type-body">Password</span></label>
              <input id = "sign-in-password" name = "password" type = "password" minLength = "8" maxLength = "24" placeholder = "Password" onChange = { (event) => { localStorage.setItem("password", event.target.value); } } required/>
            </div>
            <br/>
            <div className = "form-note">
              <span className = "type-footer">{ loginNote }</span>
            </div>
            <br/>
            <div className = "button" onClick = { () => { {/*handleLogin();*/} navigate(`/home/dashboard`)} }>
              <span className = "type-button">Sign In</span>
            </div>
            <div className = "button" onClick = { () => { {/*FUNC_NAVIGATE_SECURITY();*/} } }>
              <span className = "type-button">Forgot password?</span>
            </div>
          </div>
          <div className = "container column-center" style = {{ height: "auto", padding: "48px" }}>
            <div className = "container row-center" style = {{marginBottom: "24px"}}>
              <span className = "type-footer">
                <a href = "STRING_TERMS_URL" target = "_blank" rel = "noreferrer" style = {{textDecoration: "none", fontSize: "16px"}}>Terms=</a>
              </span>
              <span className = "type-bullet" style = {{margin: "0 24px"}}>•</span>
              <span className = "type-footer">
                <a href = "STRING_PRIVACY_URL" target = "_blank" rel = "noreferrer" style = {{textDecoration: "none", fontSize: "16px"}}>Privacy</a>
              </span>
              <span className = "type-bullet" style = {{margin: "0 24px"}}>•</span>
              <span className = "type-footer">
                <a href = "STRING_DOCUMENTATION_URL" target = "_blank" rel = "noreferrer" style = {{textDecoration: "none", fontSize: "16px"}}>Documentation</a>
              </span>
              <span className = "type-bullet" style = {{margin: "0 24px"}}>•</span>
              <span className = "type-footer">
                <a href = "STRING_SUPPORT_URL" target = "_blank" rel = "noreferrer" style = {{textDecoration: "none", fontSize: "16px"}}>Support</a>
              </span>
            </div>
            <div className = "container row-center">
              <span className = "type-footer">RDIS © 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}