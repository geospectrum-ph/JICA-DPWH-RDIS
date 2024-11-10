import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

import TitleBar from "./title-bar";
import ModuleBar from "./module-bar";
import LoadingModal from "./loading-modal";

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
      <div>
        <TitleBar/>
      </div>
      <div>
        <ModuleBar/>
      </div>
      <div>
        <div><Outlet/></div>
        <div><MapComponent/></div>
      </div>
      <div className = { !dataArray && dataLoading ? "loading-modal-active" : "loading-modal-hidden" }>
        <LoadingModal/>
      </div>
    </div>
  );
}

export default HomePage;