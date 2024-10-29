import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function HazardMap () {
  const {
    regionSelected,
    congressionalDistrictSelected,
    engineeringDistrictSelected,
    hazardMap
  } = React.useContext(MainContext);

  const {
    layer_hazard_map,
    view_layer, recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);

  React.useEffect(function () {
    view_layer("hazard-map");
  }, []);
  
  function handle_click (feature) {
    layer_hazard_map
      .queryFeatures({
        where: "ObjectId = '" + feature.attributes.ObjectId + "'",
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
    <div id = "hazard-map-container">
      <div>
        <div>
          <div>{ "Hazard Risk: " }</div>
          <div>
            <div><div></div></div>
            <div>{ "Low" }</div>
          </div>
          <div>
            <div><div></div></div>
            <div>{ "Middle" }</div>
          </div>
          <div>
            <div><div></div></div>
            <div>{ "High" }</div>
          </div>
        </div>
      </div>
      <div>
        {
          hazardMap ? 
            hazardMap
              .filter(function (hazard) {
                if (regionSelected === "" && congressionalDistrictSelected === "" && engineeringDistrictSelected === "") {
                  return (true);
                }
                else if (regionSelected !== "" && congressionalDistrictSelected === "" && engineeringDistrictSelected === "") {
                  return (hazard.attributes.REGION === regionSelected);
                }
                else if (regionSelected !== "" && congressionalDistrictSelected !== "" && engineeringDistrictSelected === "") {
                  return (hazard.attributes.CONG_DIST === congressionalDistrictSelected);
                }
                else if (regionSelected !== "" && congressionalDistrictSelected === "" && engineeringDistrictSelected !== "") {
                  return (hazard.attributes.DEO === engineeringDistrictSelected);
                }
                else {
                  return (false);
                }
              })
              .sort(function (base, next) {
                return (base.attributes.section_id_select.localeCompare(next.attributes.section_id_select ));
              })
              .map(function (hazard, key) {
                return (
                  <div key = { key } onClick = { function () { handle_click(hazard); } }>
                    <div className = { hazard.attributes.hazard_risk_select || "" }></div>
                    <div>{ hazard.attributes.section_id_select || "" }</div>
                    <div>{ hazard.attributes.globalid || "" }</div>
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