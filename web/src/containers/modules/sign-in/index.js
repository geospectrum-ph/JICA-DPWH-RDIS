import * as React from "react";

import { useNavigate } from "react-router-dom";

import logo_DPWH from "../../../assets/logo_dpwh.png";
import logo_JICA from "../../../assets/logo_jica.png";

import "./index.css";

export default function SignInPage () {
  const navigate = useNavigate();
 
  return (
    <div id = "login-container">
      <div>
        <div>
          <div>
            <img src = { logo_DPWH } alt = "DPWH Logo"/>
            <img src = { logo_JICA } alt = "JICA Logo"/>
          </div>
          <div>
            <span>{ "ROAD DISASTER INFORMATION SYSTEM" }</span>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor = "sign-in-username"><span>{ "Username" }</span></label>
            <input id = "sign-in-username" name = "username" type = "text" autoComplete = "true" minLength = "8" maxLength = "24" placeholder = "Username" onChange = { function (event) { localStorage.setItem("username", event.target.value); } } required/>
          </div>
          <div>
            <label htmlFor = "sign-in-password"><span className = "type-body">Password</span></label>
            <input id = "sign-in-password" name = "password" type = "password" minLength = "8" maxLength = "24" placeholder = "Password" onChange = { function (event) { localStorage.setItem("password", event.target.value); } } required/>
          </div>
          <div onClick = { function () { navigate(`/home/summary`); } }>
            <span>{ "SIGN IN" }</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span><a href = "/#" target = "_blank" rel = "noreferrer">{ "Terms" }</a></span>
          <span>{ "•" }</span>
          <span><a href = "/#" target = "_blank" rel = "noreferrer">{ "Privacy" }</a></span>
          <span>{ "•" }</span>
          <span><a href = "/#" target = "_blank" rel = "noreferrer">{ "Documentation" }</a></span>
          <span>{ "•" }</span>
          <span><a href = "/#" target = "_blank" rel = "noreferrer">{ "Support" }</a></span>
        </div>
        <div>
          <span>{ "RDIS © 2025" }</span>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div id = "login-container">
  //     <div>
  //       <img src = { logo } alt = "DPWH Logo"/>
  //       <span>{ "Road Disaster Information System" }</span>
  //     </div>
  //   </div>
  // );
}