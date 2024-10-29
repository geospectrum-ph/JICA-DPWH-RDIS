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
    setRoadInventory, setHazardMap, setRoadClosures,
    modules, moduleSelected
  } = React.useContext(MainContext);

  const {
    layer_road_inventory, layer_hazard_map, layer_road_closures,
    MapComponent
  } = React.useContext(MapContext);

  function query_road_inventory () {
    layer_road_inventory
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setRoadInventory(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_hazard_map () {
    layer_hazard_map
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setHazardMap(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_road_closures () {
    layer_road_closures
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setRoadClosures(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  React.useEffect(function () {
    query_road_inventory();
    query_hazard_map();
    query_road_closures();
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