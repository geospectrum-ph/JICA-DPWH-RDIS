import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";

import { view_layer } from "../../home/map-component";

import "./index.css";

export default function Settings () {
  const { filterLevel05Selected } = React.useContext(MainContext);

  React.useEffect(function () {
    view_layer("settings", filterLevel05Selected);
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
