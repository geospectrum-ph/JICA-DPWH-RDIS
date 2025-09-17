import * as React from "react";

import { view_layer } from "../../home/map-component";

import { MainContext } from "../../../contexts/MainContext";

import "./index.css";

export default function Settings () {
  const {
    yearDefault,
    regionDefault,
    engineeringDistrictDefault
  } = React.useContext(MainContext);

  React.useEffect(function () {
    view_layer("settings", yearDefault, regionDefault, engineeringDistrictDefault);
  }, []);

  return (
    <div id = "settings-container">
      <div>
        <span>{ "Settings" }</span>
      </div>
      <div>
        <button className = "admin-button">{ "Create User" }</button>
        <button className = "admin-button">{ "User Management" }</button>
        <button className = "admin-button">{ "Data and Storage Management" }</button>
      </div>
    </div>
  );
}
