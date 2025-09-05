import * as React from "react";

import { useNavigate } from "react-router-dom";

import esriId from "@arcgis/core/identity/IdentityManager.js";

import logo_DPWH from "../../../assets/logo_dpwh.png";

import "./index.css";

export default function SignInPage () {
  const navigate = useNavigate();

  async function authenticate(username, password) {
    const portalUrl = "https://www.arcgis.com";      
    const server = portalUrl + "/sharing/rest";
    const tokenServiceUrl = server + "/generateToken";
    
    const serverInfo = {
      tokenServiceUrl
    };
    
    const userInfo = {
      username,
      password
    };
    
    esriId
      .generateToken(serverInfo, userInfo)
      .then(function (tokenInfo) {
        sessionStorage.clear();
        sessionStorage.setItem("token", tokenInfo);
        console.log(tokenInfo)
        esriId
          .registerToken({
            ...tokenInfo,
            server
          });
      })
      .then(function () {
        navigate("/home/summary");
      })
      .catch(function (error) {
        alert(error);

        navigate("/");
      });
  }

  const [usernameBuffer, setUsernameBuffer] = React.useState("");
  const [passwordBuffer, setPasswordBuffer] = React.useState("");

  function handleSignIn () {
    authenticate(usernameBuffer, passwordBuffer);
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
              <span>{ "Project for Road Disaster Preventions and" }</span>
              <span>{ "Other Countermeasures on Mountainous Roads" }</span>
            </div>
            <div>
              <span>{ "ROAD DISASTER" }</span>
              <span>{ "INFORMATION SYSTEM" }</span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor = "sign-in-username"><span>{ "Username" }</span></label>
            <input id = "sign-in-username" name = "username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" value = { usernameBuffer } onChange = { function (event) { setUsernameBuffer(event.target.value); } } required/>
          </div>
          <div>
            <label htmlFor = "sign-in-password"><span className = "type-body">{ "Password" }</span></label>
            <input id = "sign-in-password" name = "password" type = "password" minLength = "8" maxLength = "24" placeholder = "Password" value = { passwordBuffer } onChange = { function (event) { setPasswordBuffer(event.target.value); } } required/>
          </div>
          <div onClick = { function () { handleSignIn(); } }>
            <span>{ "SIGN IN" }</span>
          </div>
        </div>
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