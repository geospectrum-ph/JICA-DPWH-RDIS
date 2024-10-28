import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

import TitleBar from "../components/title-bar";
import ModuleBar from "../components/module-bar";
import FilterMenu from "../components/filter-menu";

import "./index.css";

function HomePage () {
  const {
    setRoads,
    modules, moduleSelected
  } = React.useContext(MainContext);

  const {
    layer_roads,
    MapComponent
  } = React.useContext(MapContext);

  function query_roads (expression) {
    layer_roads
      .queryFeatures({
        where: expression || "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setRoads(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  React.useEffect(function () {
    query_roads("1 = 1");
  }, []);

  function set_class (index) {
    if (index === 0) {
      return ("map-dashboard");
    }
    else if (!modules[index].map_visible) {
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
      <div className = { set_class(moduleSelected) }>
        <div>
          <div>{ modules[moduleSelected].name }</div>
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