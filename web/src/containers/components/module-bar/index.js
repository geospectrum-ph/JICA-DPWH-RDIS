import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function ModuleBar() {
  const { moduleSelected, setModuleSelected, clear_selected } = React.useContext(MainContext);
  const { recenter_map, clear_map } = React.useContext(MapContext);

  const navigate = useNavigate();
  const location = useLocation();

  function setClass (module) {
    var className;

    moduleSelected === module ? className = "appbar-button selected" : className = "appbar-button";

    return (className);
  }

  function setModule (moduleName) {
    clear_map();

    const coordinates = [121.7740, 12.8797];
    const coordinate_array = [coordinates, coordinates, coordinates, coordinates];

    recenter_map(coordinate_array, 6);

    clear_selected();

    const module = moduleName.replace(/\s+/g, "-").toLowerCase();

    setModuleSelected(module);

    navigate(`/home/${module}`);
  }

  React.useEffect(function () {
    const splitLoc = location.pathname.split("/");

    setModuleSelected(splitLoc[2]);
  }, []);
  
  return (
    <div id = "module-bar-container">
      <div>
        <div className = { setClass("dashboard") } onClick = { function () { setModule("Dashboard"); } }>
          { "DASHBOARD" }
        </div>
        <div className = { setClass("road-inventory") } onClick = { function () { setModule("Road Inventory"); } }>
          { "Road Inventory" }
        </div>
        <div className = { setClass("road-slope-and-countermeasures") } onClick = { function () { setModule("Road Slope and Countermeasures"); } }>
          { "Road Slope and Countermeasures" }
        </div>
        <div className = { setClass("hazards-and-road-closures") } onClick = { function () { setModule("Hazards and Road Closures"); } }>
          { "Hazards and Road Closures" }
        </div>
        <div className = { setClass("projects") } onClick = { function () { setModule("Projects"); } }>
          { "Projects" }
        </div>
        <div className = { setClass("status-reports") } onClick = { function () { setModule( "Status Reports"); } }>
          { "Status Reports" }
        </div>
        <div className = { setClass("user-management") } onClick = {function () { setModule("User Management"); } }>
          { "User Management" }
        </div>
      </div>
      <div onClick = { function () { navigate("/"); } }>
        <span>{ "EXIT" }</span>
        <span className = "material-symbols-outlined">logout</span>
      </div>
    </div>
  );
}