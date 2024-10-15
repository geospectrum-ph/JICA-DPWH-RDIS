import React from "react";

import { MainContext } from "../../../../contexts/MainContext";
import { ArcGISMapContext } from "../../../components/map";

import "./index.css";

export default function ClosureRoadsList() {
  const { roadSegments, setMapCenter, origDataSections, setSelectedSection, setSelectedClosure } = React.useContext(MainContext);
  const { add_layer } = React.useContext(ArcGISMapContext);
  
  function checkSituation (situation) {
    switch (situation) {
      case "passable": return ("#329632");
      case "limitedaccess": return ("#E27728");
      case "notpassable": return ("#ff0000");
      default: return ("#808080");
    }
  }

  function selectRoadClosure (id, section) {
    setSelectedSection(origDataSections.filter(function (section) {
      return (section.properties.SECTION_ID === id);
    })[0]);

    setSelectedClosure(section);

    console.log(section);

    add_layer(section, "emergency");
  }

  return (
    <div className = "closure-roadsections-container">
      <div className = "closure-roadsections-header">
        <b>LIST OF ROAD CLOSURES</b>
      </div>
      <div className = "closure-roadsections-search">
        <input type = "text" placeholder = "Type to search..."/>
        <span className = "material-symbols-outlined">search</span>
      </div>
      <div className = "closure-roadsections-list">
        {
          roadSegments.length > 0 ?
            roadSegments
              .filter(function (section) {
                return (section.properties.situation !== "passable");
              })
              .map(function (section, index) {
                return (
                  <div className = "closure-list-item" key = { index } style = {{ color: checkSituation(section.properties.situation) }} onClick = { function () { selectRoadClosure(section.properties.section_id, section); }}>
                    <div className = "closure-list-id">{ section.properties.section_id }</div>
                    <div>{ section.properties.infrastructure_name }</div>
                  </div>
                );
              })
            :
              null
        }
      </div>
    </div>
  )
}