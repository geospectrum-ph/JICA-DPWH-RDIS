import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";

import { MapComponent } from "../map-component";

import TitleComponent from "../title-component";
import FilterComponent from "../filter-component";
import MenuComponent from "../menu-component";
import AdminComponent from "../admin-component";

import "./index.css";

function HomeComponent () {
  const {
    menuComponentOpen,

    modules,
    moduleSelected
  } = React.useContext(MainContext);

  return (
    <div id = "home-component">
      <div>
        <div>
          <TitleComponent/>
        </div>
        <div>
          <div>
            <MenuComponent/>
          </div>
          <div className = { menuComponentOpen ? "outlet-hidden" : "outlet-visible" }>
            <Outlet/>
          </div>
        </div>
      </div>
      <div>
        <div className = { modules[moduleSelected].map_visible ? "map-visible" : "map-hidden" }>
          <div>
            <FilterComponent/>
          </div>
          <div>
            <MapComponent/>
          </div>
        </div>
        <div className = { modules[moduleSelected].map_visible ? "admin-hidden" : "admin-visible" }>
          <AdminComponent/>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
