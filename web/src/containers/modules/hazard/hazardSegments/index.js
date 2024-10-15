import React from "react";

import { MainContext } from "../../../../contexts/MainContext";
import { ArcGISMapContext } from "../../../components/map";

import "./index.css";

export default function HazardSegmentList() {
  const {selectedSection, setSelectedHazard, hazardList} = React.useContext(MainContext);
  const {add_layer} = React.useContext(ArcGISMapContext);

  const convertTime = (date) => {
    var new_date = new Date(date).toLocaleDateString("en-US");

    return (new_date);
  }

  const checkHazard = (situation) => {
    switch (situation) {
      case "Low": return ("#329632");
      case "Medium": return ("#E27728");
      case "High": return ("#ff0000");
      default: return ("#808080'");
    }
  }

  return (
    <div className = "hazard-roadsections-container">
      <div className = "hazard-roadsections-header">
        <b>LIST OF SURVEYS</b>
      </div>
      <div className = "hazard-roadsections-search">
        <input type = "text" placeholder = "Type to search..."/>
        <span className = "material-symbols-outlined">search</span>
      </div>
      <div className = "hazard-roadsections-list">
        {
          selectedSection && hazardList.length > 0 ?
            hazardList.map(function (section, index) {
              return (
                <div className = "hazard-list-item" key = { index } style = {{ color: checkHazard(section.properties.HAZARD) }} onClick = { function () { setSelectedHazard(section); add_layer(section, "hazard"); }}>
                  <div className = "hazard-list-id">{ convertTime(section.properties.created_da) }</div>
                  <div>{ section.properties.LRP_DISP1 } to { section.properties.LRP_DISP2 }</div>
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