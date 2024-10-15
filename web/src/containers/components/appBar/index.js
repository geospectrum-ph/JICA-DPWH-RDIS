import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";

import "./index.css";
import { ArcGISMapContext } from "../map";

export default function HeaderBar () {
  const { setModuleTitle, moduleSelect, setModuleSelect } = React.useContext(MainContext);
  const {clear_map, recenter_map} = React.useContext(ArcGISMapContext);

  const navigate = useNavigate();
  const location = useLocation();

  function setModule (moduleName, module) {
    setModuleTitle(moduleName);
    setModuleSelect(module);
    navigate(`/home/${module}`);
  }

  React.useEffect(function () {
    var splitLoc = location.pathname.split("/");
    // console.log(splitLoc);
    // ssetModuleTitle(moduleName);
    setModuleSelect(splitLoc[2]);
  }, []);

  const coordinates = [[121.7740, 12.8797], [121.7740, 12.8797], [121.7740, 12.8797], [121.7740, 12.8797]];

  return (
    <div className = "headerbar-container">
      <div className = "appbar">
        <div className = { moduleSelect === "dashboard" ? "appbar-button-selected" : "appbar-button" } onClick = { function () { setModule("Dashboard", "dashboard"); clear_map(); recenter_map(coordinates, 6); }}>Main Dashboard</div>
        <div className = { moduleSelect === "slope" ? "appbar-button-selected" : "appbar-button" } onClick = { function () { setModule("Slope Inventory and Countermeasure", "slope"); clear_map(); recenter_map(coordinates, 6); }}>Slope Inventory and Countermeasure</div>
        <div className = { moduleSelect === "emergency" ? "appbar-button-selected" : "appbar-button" } onClick = { function () { setModule("Emergency Response", "emergency"); clear_map(); recenter_map(coordinates, 6); }}>Emergency Response</div>
        <div className = { moduleSelect === "hazard" ? "appbar-button-selected" : "appbar-button" } onClick = { function () { setModule( "Hazard Map", "hazard"); clear_map(); recenter_map(coordinates, 6); }}>Hazard Map</div>
        <div style = {{ flexGrow: 1 }}></div>
        <div className = { moduleSelect === "user" ? "appbar-button-selected" : "appbar-button"} onClick = {function () { setModule("User Management", "user"); }}>User Management</div>
        <div className = "appbar-button" onClick = { function () { navigate("/"); }}>
          <span className = "material-symbols-outlined">logout</span>
        </div>
      </div>
    </div>
  );
}