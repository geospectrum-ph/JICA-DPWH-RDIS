import React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function Photos () {
  const {
    roadSelected
  } = React.useContext(MainContext);

  const {
    layer_road_section_photos
  } = React.useContext(MapContext);

  React.useEffect(function () {

  }, [roadSelected]);

  return (
    <div id = "photos-container">
      <div>{ "Photos" }</div>
      <div>
        {/* {
          roadSelected ?
            roadSelected
            :
            "Please select a road section."
        } */}
      </div>
    </div>
  );
}