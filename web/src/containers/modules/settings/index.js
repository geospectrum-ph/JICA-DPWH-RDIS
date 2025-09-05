import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";

import { view_layer, layer_road_slopes_and_countermeasures, close_popup, recenter_map, open_popup } from "../../home/map-component";

import "./index.css";

export default function Settings () {
  React.useEffect(function () {
    view_layer("settings");
  }, []);

  return (
    <div id = "settings-container">
      <div>
        <div>
          <span>{ "settings" }</span>
        </div>
      </div>
      <div>
        <div className = "export-button-container">
          <button className = "export-button">{ "Data Management" }</button>
        </div>
        <div className = "export-button-container">
          <button className = "export-button">{ "User Management" }</button>
        </div>
      </div>
    </div>
  );
}