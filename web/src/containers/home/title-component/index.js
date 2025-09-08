import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";


import logo_DPWH from "../../../assets/logo_dpwh.png";

import "./index.css";

export default function TitleComponent () {
  const {
    dataArray,
    dataLoading,
    dataTimestamp,

    filteredRoadSlopeInventory,
    totalRoadSlopeInventory,
    filteredExistingRoadSlopeProtectionStructures,
    totalExistingRoadSlopeProtectionStructures,
    filteredNonExistingRoadSlopeProtectionStructures,
    totalNonExistingRoadSlopeProtectionStructures,
  } = React.useContext(MainContext);

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
      <div>
        <span>{ "Last Updated: " + (dataTimestamp ? dataTimestamp : "") }</span>
      </div>
    </div>
  );
}