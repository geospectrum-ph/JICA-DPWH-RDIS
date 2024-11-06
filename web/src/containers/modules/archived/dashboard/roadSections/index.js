import React from "react";

import { MainContext } from "../../../../../contexts/MainContext";
import { MapContext } from "../../../../../contexts/MapContext";

import "./index.css";

export default function RoadsLists() {
  const { roadSection } = React.useContext(MainContext);
  const { recenter_map } = React.useContext(MapContext);


  const identifyClass = (sec_c) => {
    if (sec_c === "Primary"){
      return '#c43920'
    } else if (sec_c === "Secondary") {
      return '#4ab615'
    } else if (sec_c === "Tertiary") {
      return '#1555b6'
    } else {
      return '#808080'
    }
  }

  return (
    <div className = "md-roadsections-container">
      <div className = "md-roadsections-header">
        <b>LIST OF ROADS</b>
      </div>
      <div className = "md-roadsections-search">
        <input type = "text" placeholder = "Type to search..."/>
        <span className = "material-symbols-outlined">search</span>
      </div>
      <div className='roadsections-legend'>
        <div>Legend:</div> 
        <div style={{color: '#c43920'}}>Primary</div> 
        <div style={{color: '#4ab615'}}>Secondary</div>
        <div style={{color: '#1555b6'}}>Tertiary</div>
      </div>
      <div className = "md-roadsections-list">
        {
          roadSection.length > 0 ?
            roadSection.map(function (section, index) {
              return (
                <div className = "md-list-item" key = { index } onClick = { function () { recenter_map(section.geometry.coordinates[0], 12); }}
                  style={{color: identifyClass(section.properties.ROAD_SEC_C)}}>
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