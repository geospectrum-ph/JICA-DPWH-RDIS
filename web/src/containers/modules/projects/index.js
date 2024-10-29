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
      <Outlet/>
    </div>
  );
}