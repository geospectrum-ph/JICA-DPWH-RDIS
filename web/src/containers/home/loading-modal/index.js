import React from "react";

import logo_DPWH from "../../../assets/logos/logo_DPWH.png";
import logo_BP from "../../../assets/logos/logo_BP.png";

import FilterMenu from "../filter-menu";

import "./index.css";

export default function LoadingModal () {
  return (
    <div id = "loading-modal-container">
      <div>
        <div/>
        <div>{ "Loading data. Please wait for a few moments. " }</div>
      </div>
    </div>
  );
}