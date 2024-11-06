import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

import TitleBar from "./title-bar";
import ModuleBar from "./module-bar";
import Photos from "./photos";
import Status from "./status";

import "./index.css";

function HomePage () {
  const {
    moduleSelected
  } = React.useContext(MainContext);
  
  const {
    MapComponent
  } = React.useContext(MapContext);

  return (
    <div id = "home-container">
      <div>
        <TitleBar/>
      </div>
      <div>
        <ModuleBar/>
      </div>
      <div>
        <div>
          <Outlet/>
        </div>
        <div>
          <div>
            <Photos/>
          </div>
          <div>
            <Status/>
          </div>
        </div>
        <div>
          <MapComponent/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;