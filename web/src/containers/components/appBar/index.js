import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { ArcGISMapContext } from "../map";

import "./index.css";

export default function HeaderBar () {
  const { setModuleTitle, moduleSelect, setModuleSelect, clear_selected } = React.useContext(MainContext);
  const { clear_map, recenter_map } = React.useContext(ArcGISMapContext);

  const navigate = useNavigate();
  const location = useLocation();

  function setModule (moduleName, module) {
    setModuleTitle(moduleName);
    setModuleSelect(module);

    clear_map();
    clear_selected();

    const coordinates = [121.7740, 12.8797];
    const coordinate_array = [coordinates, coordinates, coordinates, coordinates];

    recenter_map(coordinate_array, 6);

    navigate(`/home/${module}`);
  }

  React.useEffect(function () {
    var splitLoc = location.pathname.split("/");

    setModuleSelect(splitLoc[2]);
  }, []);


  return (
    <div className = "headerbar-container">
      <div className = { moduleSelect === "dashboard" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule("Dashboard", "dashboard"); } }>{ "DASHBOARD" }</div>
      <div className = { moduleSelect === "road" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule("Road Inventory", "road"); } }>{ "Road Inventory" }</div>
      <div className = { moduleSelect === "slope" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule("Road Slope Inventory", "slope"); } }>{ "Road Slope Inventory" }</div>
      <div className = { moduleSelect === "project" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule( "Countermeasure Projects Inventory", "project"); } }>{ "Countermeasure Projects Inventory" }</div>
      <div className = { moduleSelect === "funding" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule( "Evaluation for Funding Proposal", "funding"); } }>{ "Evaluation for Funding Proposal" }</div>
      <div className = { moduleSelect === "status" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule( "Project Status Reports", "status"); } }>{ "Project Status Reports" }</div>
      <div className = { moduleSelect === "hazard" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule( "Hazards and Road Closures", "hazard"); } }>{ "Hazards and Road Closures" }</div>
      <div className = { moduleSelect === "user" ? "appbar-button selected" : "appbar-button" } onClick = {function () { setModule("User Management", "user"); } }>{ "User Management" }</div>
      <div className = "appbar-button" onClick = { function () { navigate("/"); } }>
        <span>{ "EXIT" }</span>
        <span className = "material-symbols-outlined">logout</span>
      </div>
    </div>
  );
}