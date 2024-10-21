import React from "react";

import { useNavigate } from "react-router-dom";

import logo_DPWH from "../../../assets/logos/logo_DPWH.png";
import logo_BP from "../../../assets/logos/logo_BP.png";

import "./index.css";

export default function TitleBar() {
  const navigate = useNavigate();

  return (
    <div className = "title-bar-container">
      <div onClick = { function () { navigate("/home/dashboard/"); } }>
        <span>{ "ROAD DISASTER INFORMATION SYSTEM" }</span>
      </div>
      <div>
        <div>
          <a href = "https://www.dpwh.gov.ph/dpwh/" target = "_blank" rel = "noreferrer"><img src = { logo_DPWH } alt = "DPWH Logo"/></a>
        </div>
        <div>
          <a href = "https://www.bagongpilipinastayo.com/" target = "_blank" rel = "noreferrer"><img src = { logo_BP } alt = "Bagong Pilipinas Logo"/></a>
        </div>
      </div>
    </div>
  );
}