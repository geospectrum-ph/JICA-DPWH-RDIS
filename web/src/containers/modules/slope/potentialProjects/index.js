import React from "react";

import { MainContext } from "../../../../contexts/MainContext";
import { ArcGISMapContext } from "../../../components/map";

import "./index.css";

export default function SlopeRoadsPotentialList() {
  const { roadSection, origDataHazard, terrain, setMapCenter, setTerrainList, annex2 } = React.useContext(MainContext);
  const { recenter_map } = React.useContext(ArcGISMapContext);
  
  function filterTerrainSegments (section) {
    setTerrainList(annex2.filter(function (road) {
      return (road.section_id === section.properties.SECTION_ID);
    }));

    recenter_map(section.geometry.coordinates[0], 12);
  }

  return (
    <div className = "hazard-roadsections-container">
      <div className = "hazard-roadsections-header">
        <b>LIST OF ROAD SECTIONS</b>
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
                <div className = "hazard-list-item" key = { index } onClick = { function () { filterTerrainSegments(section); }}>
                  <div className = "hazard-list-id">{ section.properties.SECTION_ID }</div>
                  <div>{ section.properties.ROAD_NAME }</div>
                </div>
              );
            })
          : 
            null
        }
      </div>
      <br/>
      <div className = "slope-potential-legend">        
      </div>
    </div>
  );
}