import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

import TitleBar from "../components/title-bar";
import ModuleBar from "../components/module-bar";
import FilterMenu from "../components/filter-menu";

import "./index.css";

function HomePage () {
  const { moduleSelected } = React.useContext(MainContext);
  const { MapComponent } = React.useContext(MapContext);

  function setClass (module) {
    const modules_without_maps = ["status-reports", "user-management"];
    const mapHidden = modules_without_maps.includes(module);

    if (module === "dashboard") {
      return ("map-dashboard");
    }
    else if (mapHidden) {
      return ("map-hidden");
    }
    else {
      return (null);
    }
  }

  return (
    <div id = "home-container">
      <TitleBar/>
      <ModuleBar/>
      <div className = { setClass(moduleSelected) }>
        <div>
          <FilterMenu/>
          <Outlet/>
        </div>
        <div >
          <MapComponent/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;