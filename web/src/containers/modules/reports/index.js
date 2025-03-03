import * as React from "react";

import { MapContext } from "../../../contexts/MapContext";

import "./index.css";
import ExcelExport from "./excel-export";

export default function Reports() {
  const {
    view_layer,
    layer_hazard_map,
    layer_road_slopes_and_countermeasures
  } = React.useContext(MapContext);

  const [arrayHM, setArrayHM] = React.useState([])
  const [arrayRSM, setArrayRSM] = React.useState([])


  React.useEffect(function () {

    layer_hazard_map
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      }).then(function (response) {
        // console.log(response?.features)
        if (response?.features) {
          let arrayHMBuffer = []
          for (const feature of response.features) {
            arrayHMBuffer = [...arrayHMBuffer, JSON.parse(JSON.stringify(feature.attributes))]
            setArrayHM([...arrayHMBuffer])
          }
        }
      })

    layer_road_slopes_and_countermeasures
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      }).then(function (response) {
        // console.log(response?.features)
        if (response?.features) {
          let arrayRSMBuffer = []
          for (const feature of response.features) {
            arrayRSMBuffer = [...arrayRSMBuffer, JSON.parse(JSON.stringify(feature.attributes))]
            setArrayRSM([...arrayRSMBuffer])
          }
        }
      })
  }, []);

  // console.log(arrayHM, arrayRSM)
  return (
    <div id = "report-container">
      <div>
        <span>{ "Reports" }</span>
      </div>
      <div >
        <ExcelExport data={arrayHM} fileName="Hazard Map"/>
        <br/>
        <ExcelExport data={arrayRSM} fileName="Road Slope Inventory"/>
      </div>
    </div>
  );
}