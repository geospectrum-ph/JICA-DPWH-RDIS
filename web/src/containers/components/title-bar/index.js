import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import logo_DPWH from "../../../assets/logos/logo_DPWH.png";
import logo_BP from "../../../assets/logos/logo_BP.png";

import "./index.css";

export default function TitleBar() {
  const { setModuleTitle, moduleSelect, setModuleSelect, clear_selected } = React.useContext(MainContext);
  const { clear_map, recenter_map } = React.useContext(MapContext);

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
    <div className = "title-bar-container">
      <div>
        <img src = { logo_DPWH } alt = "DPWH Logo"/>
      </div>
      <div>
        <img src = { logo_BP } alt = "Bagong Pilipinas Logo"/>
      </div>
      <div>
        <span>{ "ROAD DISASTER INFORMATION SYSTEM" }</span>
      </div>
      <div>
        <div className = { moduleSelect === "dashboard" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule("Dashboard", "dashboard"); } }>{ "DASHBOARD" }</div>
        <div className = { moduleSelect === "road-inventory" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule("Road Inventory", "road-inventory"); } }>{ "Road Inventory" }</div>
        <div className = { moduleSelect === "road-slope-and-countermeasures" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule("Road Slope and Countermeasures", "road-slope-and-countermeasures"); } }>{ "Road Slope and Countermeasures" }</div>
        <div className = { moduleSelect === "evaluation-for-funding-proposal" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule( "Evaluation for Funding Proposal", "evaluation-for-funding-proposal"); } }>{ "Evaluation for Funding Proposal" }</div>
        <div className = { moduleSelect === "status-reports" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule( "Status Reports", "status-reports"); } }>{ "Status Reports" }</div>
        <div className = { moduleSelect === "hazards-and-road-closures" ? "appbar-button selected" : "appbar-button" } onClick = { function () { setModule( "Hazards and Road Closures", "hazards-and-road-closures"); } }>{ "Hazards and Road Closures" }</div>
        <div className = { moduleSelect === "user-management" ? "appbar-button selected" : "appbar-button" } onClick = {function () { setModule("User Management", "user-management"); } }>{ "User Management" }</div>
      </div>
      <div onClick = { function () { navigate("/"); } }>
        <span className = "material-symbols-outlined">logout</span>
      </div>
    </div>
  );
}