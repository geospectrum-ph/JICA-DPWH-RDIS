import React from "react";

import { MainContext } from "../../../../contexts/MainContext";
import { MapContext } from "../../../../contexts/MapContext";

import "./index.css";

export default function HazardRoadsList() {
  const { roadSection, setSelectedSection, setHazardList, origDataHazard, setMapCenter } = React.useContext(MainContext);
  const { recenter_map } = React.useContext(MapContext);
  
  const filterHazardSegments = (section) => {
    setHazardList(
      origDataHazard
        .filter(function (hazard) {
          return (hazard.properties.SECTION_ID === section.properties.SECTION_ID);
        })
        .sort(function (accumulator, element) {
          return (accumulator.properties.LRP_DISP1 - element.properties.LRP_DISP1);
        })
    );

    setSelectedSection(section);

    recenter_map(section.geometry.coordinates[0], 12);
  }

  return (
    <div className = "hazard-roadsections-container">
      <div className = "hazard-roadsections-header">
        <b>LIST OF ROADS</b>
      </div>
      <div className = "hazard-roadsections-search">
        <input type = "text" placeholder = "Type to search..."/>
        <span className = "material-symbols-outlined">search</span>
      </div>
      <div className = "hazard-roadsections-list">
        {
          roadSection.length > 0 ?
            roadSection.map(function (section, index) {
              return (
                <div className = "hazard-list-item" key = { index } onClick = { function () { filterHazardSegments(section); }}>
                  <div className = "hazard-list-id">{ section.properties.SECTION_ID }</div>
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