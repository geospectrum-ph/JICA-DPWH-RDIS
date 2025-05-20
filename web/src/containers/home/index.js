import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

import MenuComponent from "./menu-component";
import FilterComponent from "./filter-component";
import LoadingComponent from "./loading-component";

import "./index.css";

function HomePage () {
  const {
    dataLoading,
    menuComponentOpen
  } = React.useContext(MainContext);

  const {
    MapComponent
  } = React.useContext(MapContext);

  return (
    <div id = "home-container">
      <div>
        <MenuComponent/>
      </div>
      <div className = { menuComponentOpen ? "outlet-hidden" : "outlet-visible" }>
        <Outlet/>
      </div>
      <div>
        <div>
          <FilterComponent/>
        </div>
        <div>
          <MapComponent/>
        </div>
      </div>
      <div className = { dataLoading ? "loading-component-visible" : "loading-component-hidden" }>
        <LoadingComponent/>
      </div>
    </div>
  );
}

export default HomePage;