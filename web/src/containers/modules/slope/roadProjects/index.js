import React from "react";

import { MainContext } from "../../../../contexts/MainContext";
import { ArcGISMapContext } from "../../../components/map";

import "./index.css";

export default function SlopeSegmentList() {
  const { selectedSection, setSelectedInventory, roadProjects } = React.useContext(MainContext);
  const { add_layer } = React.useContext(ArcGISMapContext);

  return (
    <div className = "hazard-roadsections-container">
      <div className = "hazard-roadsections-header">
        <b>LIST OF ROAD PROJECTS</b>
      </div>
      <div className = "hazard-roadsections-search">
        <input type = "text" placeholder = "Type to search..."/>
        <span className = "material-symbols-outlined">search</span>
      </div>
      <div className = "hazard-roadsections-list">
        {
          selectedSection && roadProjects.length > 0 ?
            roadProjects.map(function (section, index) {
              return (
                <div className = "hazard-list-item" key = { index } onClick = { function () { setSelectedInventory(section); add_layer(section, "inventory"); }}>
                  <div className = "hazard-list-id">{ section.properties.program }</div>
                  <div>{ section.properties.start_lrp } to { section.properties.end_lrp }</div>
                </div>
              );
            })
          :
            <div className = "hazard-list-select">Select a road section</div>
        }
      </div>
    </div>
  );
}