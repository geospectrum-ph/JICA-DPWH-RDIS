import * as React from "react";
import { Outlet } from "react-router-dom";

import { MapContext } from "../../contexts/MapContext";

import MenuComponent from "./menu-component";
import FilterComponent from "./filter-component";
import LoadingComponent from "./loading-component";

import "./index.css";

function HomePage () {
  const {
    MapComponent
  } = React.useContext(MapContext);

  return (
    <div id = "home-container">
      <div><MenuComponent/></div>
      <div><Outlet/></div>
      <div>
        <div><FilterComponent/></div>
        <div><MapComponent/></div>
      </div>
      <div><LoadingComponent/></div>
    </div>
  );
}

export default HomePage;