import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function RoadClosures () {
  const {
    regionSelected,
    congressionalDistrictSelected,
    engineeringDistrictSelected,
    roadClosures
  } = React.useContext(MainContext);

  const {
    layer_road_closures,
    view_layer, recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);

  React.useEffect(function () {
    view_layer("road-closures");
  }, []);
  
  function handle_click (feature) {
    layer_road_closures
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
    <div id = "road-closures-container">
      <div>
        <div>
          <div>{ "Road Status: " }</div>
          <div>
            <div><div></div></div>
            <div>{ "Passable" }</div>
          </div>
          <div>
            <div><div></div></div>
            <div>{ "Not Passable" }</div>
          </div>
          <div>
            <div><div></div></div>
            <div>{ "Limited Access" }</div>
          </div>
        </div>
      </div>
      <div>
        {
          roadClosures ? 
            roadClosures
              .filter(function (road_closure) {
                if (regionSelected === "" && congressionalDistrictSelected === "" && engineeringDistrictSelected === "") {
                  return (true);
                }
                else if (regionSelected !== "" && congressionalDistrictSelected === "" && engineeringDistrictSelected === "") {
                  return (road_closure.attributes.REGION === regionSelected);
                }
                else if (regionSelected !== "" && congressionalDistrictSelected !== "" && engineeringDistrictSelected === "") {
                  return (road_closure.attributes.CONG_DIST === congressionalDistrictSelected);
                }
                else if (regionSelected !== "" && congressionalDistrictSelected === "" && engineeringDistrictSelected !== "") {
                  return (road_closure.attributes.DEO === engineeringDistrictSelected);
                }
                else {
                  return (false);
                }
              })
              .sort(function (base, next) {
                return (base.attributes.section_id.localeCompare(next.attributes.section_id));
              })
              .map(function (road_closure, key) {
                return (
                  <div key = { key } onClick = { function () { handle_click(road_closure); } }>
                    <div className = { road_closure.attributes.situation || "" }></div>
                    <div>{ road_closure.attributes.section_id || "" }</div>
                    <div>{ road_closure.attributes.infrastructure_name || "" }</div>
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