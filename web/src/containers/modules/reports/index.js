import * as React from "react";

import ExcelExport from "./excel-export";

// import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

import { layer_road_slope_hazards, layer_road_slopes_and_countermeasures } from "../../home/map-component";

export default function Reports() {
  // const {
  //   layer_road_slope_hazards,
  //   layer_road_slopes_and_countermeasures
  // } = React.useContext(MapContext);

  const [arrayRoadSlopeHazards, setArrayRoadSlopeHazards] = React.useState([]);
  const [arrayRoadSlopesAndCountermeasures, setArrayRoadSlopesAndCountermeasures] = React.useState([]);

  React.useEffect(function () {
    layer_road_slope_hazards
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          let arrayRoadSlopeHazardsBuffer = [];

          for (const feature of response.features) {
            arrayRoadSlopeHazardsBuffer = [...arrayRoadSlopeHazardsBuffer, JSON.parse(JSON.stringify(feature.attributes))];
            setArrayRoadSlopeHazards([...arrayRoadSlopeHazardsBuffer]);
          }
        }
      })

    layer_road_slopes_and_countermeasures
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          let arrayRoadSlopesAndCountermeasuresBuffer = [];

          for (const feature of response.features) {
            arrayRoadSlopesAndCountermeasuresBuffer = [...arrayRoadSlopesAndCountermeasuresBuffer, JSON.parse(JSON.stringify(feature.attributes))];
            setArrayRoadSlopesAndCountermeasures([...arrayRoadSlopesAndCountermeasuresBuffer]);
          }
        }
      })
  }, []);

  return (
    <div id = "reports-container">
      <div>
        <span>{ "Reports" }</span>
      </div>
      <div >
        <ExcelExport data = { arrayRoadSlopeHazards } fileName = "Road Slope Hazards"/>
        <ExcelExport data = { arrayRoadSlopesAndCountermeasures } fileName = "Road Slope Inventory"/>
      </div>
    </div>
  );
}