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
  
  const array_media_container_visible = [1, 2];

  return (
    <div id = "home-container">
      <div>
        <TitleBar/>
      </div>
      <div>
        <ModuleBar/>
      </div>
      <div className = { array_media_container_visible.findIndex(function (module) { return (module === moduleSelected); }) < 0 ? "media-container-hidden" : "media-container-visible" }>
        <div>
          <Outlet/>
        </div>
        {
          array_media_container_visible.findIndex(function (module) { return (module === moduleSelected); }) < 0 ?
            null
            :
            <div>
              <div>
                <Photos/>
              </div>
              <div>
                <Status/>
              </div>
            </div>
        }
        <div>
          <MapComponent/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;