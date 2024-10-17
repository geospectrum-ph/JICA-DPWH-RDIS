import React from "react";

import logo_DPWH from "../../../assets/logos/logo_DPWH.png";
import logo_BP from "../../../assets/logos/logo_BP.png";

import "./index.css";

export default function TitleBar() {
  return (
    <div className = "titlebar-container">
      <img src = { logo_DPWH } alt = "DPWH Logo"/>
      <img src = { logo_BP } alt = "Bagong Pilipinas Logo"/>
      <span>{ "ROAD DISASTER INFORMATION SYSTEM" }</span>
    </div>
  );
}