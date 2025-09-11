import * as React from "react";

import { useNavigate } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";

import logo_DPWH from "../../../assets/logo_dpwh.png";

import "./index.css";

export default function TitleComponent () {
  const navigate = useNavigate();

  const { dataTimestamp } = React.useContext(MainContext);

  return (
    <div id = "title-component">
      <div>
        <div>
          <img src = { logo_DPWH } alt = "DPWH Logo"/>
        </div>
        <div>
          <span className = "title-container">{ "Road Disaster Information System" }</span>
        </div>
      </div>
      <div onClick = { function () { navigate(0); } }>
        <span>{ "Last Updated: " }</span>
        <span><b>{ dataTimestamp ? dataTimestamp.slice(4, 34) : "" }</b></span>
      </div>
    </div>
  );
}
