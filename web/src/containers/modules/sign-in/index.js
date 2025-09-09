import * as React from "react";

import { useNavigate } from "react-router-dom";

// import axios from "axios";

import logo_DPWH from "../../../assets/logo_dpwh.png";

import "./index.css";

// const URL = process.env.NODE_ENV === "production" ? process.env.PROD_URL : process.env.DEV_URL;

export default function SignInPage () {
  const navigate = useNavigate();

  const [usernameBuffer, setUsernameBuffer] = React.useState("");
  const [passwordBuffer, setPasswordBuffer] = React.useState("");

  async function handleSignIn (event) {
    event.preventDefault();

    // await axios
    //   .post(
    //     URL + "/api/user/tokenize",
    //     {
    //       username: usernameBuffer,
    //       password: passwordBuffer,
    //     },
    //   )
    //   .then(function (response) {
        sessionStorage.setItem("username", usernameBuffer);
        sessionStorage.setItem("password", passwordBuffer);

        // sessionStorage.setItem("token", response.data);

        navigate("/home");
      // })
      // .catch(function (error) {
      //   navigate("/");
      // });
  }

  return (
    <div id = "login-container">
      <div>
        <div>
          <div>
            <img src = { logo_DPWH } alt = "DPWH Logo"/>
          </div>
          <div>
            <div>
              <span>{ "Project for Road Disaster Preventions and Other Countermeasures on Mountainous Roads" }</span>
            </div>
            <div>
              <span>{ "ROAD DISASTER INFORMATION SYSTEM" }</span>
            </div>
          </div>
        </div>
        <form onSubmit = { function (event) { handleSignIn(event); } }>
          <div>
            <label htmlFor = "sign-in-username"><span>{ "Username" }</span></label>
            <input id = "sign-in-username" name = "username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" value = { usernameBuffer } onChange = { function (event) { setUsernameBuffer(event.target.value); } } required/>
          </div>
          <div>
            <label htmlFor = "sign-in-password"><span className = "type-body">{ "Password" }</span></label>
            <input id = "sign-in-password" name = "password" type = "password" minLength = "8" maxLength = "24" placeholder = "Password" value = { passwordBuffer } onChange = { function (event) { setPasswordBuffer(event.target.value); } } autoComplete = "true" required/>
          </div>
          <div>
            <input type = "submit" value = "Sign In"/>
          </div>
        </form>
      </div>
      <div>
        <div>
          <span><a href = "/#" target = "_blank" rel = "noopener noreferrer">{ "Terms" }</a></span>
          <span>{ "•" }</span>
          <span><a href = "/#" target = "_blank" rel = "noopener noreferrer">{ "Privacy" }</a></span>
          <span>{ "•" }</span>
          <span><a href = "/#" target = "_blank" rel = "noopener noreferrer">{ "Documentation" }</a></span>
          <span>{ "•" }</span>
          <span><a href = "mailto:dpwhitsd@dpwh.gov.ph" target = "_blank" rel = "noopener noreferrer">{ "Support" }</a></span>
        </div>
        <div>
          <span>{ "RDIS © 2025" }</span>
        </div>
      </div>
    </div>
  );
}
