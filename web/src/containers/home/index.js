import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

import TitleBar from "../components/title-bar";
import Filters from "../components/filters";

import "./index.css";

function HomePage () {
  const { moduleSelect } = React.useContext(MainContext);
  const { Map_ } = React.useContext(MapContext);

  return (
    <div className = "layout-container">
      <TitleBar/>
      <div>
        <div>
          <div><Filters/></div>
          <div><Outlet/></div>
        </div>
        <div className = { moduleSelect === "user" || moduleSelect === "status" ? "hidden" : "visible" }>
          <Map_/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;