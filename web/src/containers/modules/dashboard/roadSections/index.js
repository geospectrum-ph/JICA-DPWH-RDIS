import React from "react";

import { MainContext } from "../../../../contexts/MainContext";
import { ArcGISMapContext } from "../../../components/map";

import "./index.css";

export default function RoadsLists() {
  const { roadSection } = React.useContext(MainContext);
  const { recenter_map } = React.useContext(ArcGISMapContext);

  return (
    <div className = "md-roadsections-container">
      <div className = "md-roadsections-header">
        <b>LIST OF ROADS</b>
      </div>
      <div className = "md-roadsections-search">
        <input type = "text" placeholder = "Type to search..."/>
        <span className = "material-symbols-outlined">search</span>
      </div>
      <div className = "md-roadsections-list">
        {
          roadSection.length > 0 ?
            roadSection.map(function (section, index) {
              return (
                <div className = "md-list-item" key = { index } onClick = { function () { recenter_map(section.geometry.coordinates[0], 12); }}>
                  <div className = "md-list-id">{ section.properties.SECTION_ID }</div>
                  <div>{ section.properties.ROAD_NAME }</div>
                </div>
              );
            })
          :
            null
        }
      </div>
    </div>
  );
}