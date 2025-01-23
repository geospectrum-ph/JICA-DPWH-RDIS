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
    dataArray,
    dataLoading
  } = React.useContext(MainContext);

  const {
    MapComponent
  } = React.useContext(MapContext);

  return (
    <div id = "home-container" className = { dataLoading ? null : "home-container-interactive" }>
      <div><MenuComponent/></div>
      <div><Outlet/></div>
      <div>
        <div><FilterComponent/></div>
        <div><MapComponent/></div>
      </div>
      <div className = { !dataArray && dataLoading ? "loading-modal-active" : "loading-modal-hidden" }><LoadingComponent/></div>
    </div>
  );
}

export default HomePage;