import * as React from "react";

import { Outlet } from "react-router-dom";

import { MapContext } from "../../contexts/MapContext";

import TitleBar from "./title-bar";
import ModuleBar from "./module-bar";

import "./index.css";

function HomePage () {
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
          <MapComponent/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;