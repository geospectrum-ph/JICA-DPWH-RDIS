import * as React from "react";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function RoadInventory() {
  const {
    regionSelected,
    congressionalDistrictSelected,
    engineeringDistrictSelected,
    roads
  } = React.useContext(MainContext);

  const {
    layer_roads,
    recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);
  
  function handle_click (feature) {
    layer_roads
      .queryFeatures({
        where: "SECTION_ID = '" + feature.attributes.SECTION_ID + "'",
        returnGeometry: true,
        outFields: ["*"]
      })
      .then(function (response) {
        close_popup();

        recenter_map(response.features[0].geometry.extent.expand(1.50));

        open_popup(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div id = "road-inventory-container">
      <div>
        <div>
          <div>{ "Road Classification: " }</div>
          <div>
            <div><div></div></div>
            <div>{ "Primary" }</div>
          </div>
          <div>
            <div><div></div></div>
            <div>{ "Secondary" }</div>
          </div>
          <div>
            <div><div></div></div>
            <div>{ "Tertiary" }</div>
          </div>
        </div>
      </div>
      <div>
        {
          roads ? 
            roads
              .filter(function (road) {
                if (regionSelected === "" && congressionalDistrictSelected === "" && engineeringDistrictSelected === "") {
                  return (true);
                }
                else if (regionSelected !== "" && congressionalDistrictSelected === "" && engineeringDistrictSelected === "") {
                  return (road.attributes.REGION === regionSelected);
                }
                else if (regionSelected !== "" && congressionalDistrictSelected !== "" && engineeringDistrictSelected === "") {
                  return (road.attributes.CONG_DIST === congressionalDistrictSelected);
                }
                else if (regionSelected !== "" && congressionalDistrictSelected === "" && engineeringDistrictSelected !== "") {
                  return (road.attributes.DEO === engineeringDistrictSelected);
                }
                else {
                  return (false);
                }
              })
              .sort(function (base, next) {
                return (base.attributes.ROAD_ID.localeCompare(next.attributes.ROAD_ID));
              })
              .map(function (road, key) {
                return (
                  <div key = { key } onClick = { function () { handle_click(road); } }>
                    <div className = { road.attributes.ROAD_SEC_C.toLowerCase() || "" }></div>
                    <div>{ road.attributes.ROAD_ID || "" }</div>
                    <div>{ road.attributes.ROAD_NAME || "" }</div>
                  </div>
                );
              })
            :
            <div className = "loading">{ "Loading data..." }</div>
        }
      </div>
    </div>
  );
}