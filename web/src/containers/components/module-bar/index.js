import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function ModuleBar () {
  const navigate = useNavigate();
  const location = useLocation();

  const { modules, moduleSelected, setModuleSelected, clear_selected } = React.useContext(MainContext);
  const { hide_layer, view_layer, recenter_map, close_popup } = React.useContext(MapContext);

  function set_module (index) {
    // hide_layer();

    recenter_map({ center: [121.7740, 12.8797], zoom: 6 });

    // close_popup();

    view_layer(modules[index].path);

    clear_selected();

    setModuleSelected(index);

    navigate(`/home/${modules[index].path}`);
  }

  React.useEffect(function () {
    const path = location.pathname.split("/")[2];
    const index = modules.findIndex(function (module) { return (module.path === path); });

    if (index > -1) {
      setModuleSelected(index);
      view_layer(modules[index].path);
    }
  }, []);
  
  return (
    <div id = "module-bar-container">
      <div>
        <div>
          {
            modules ? 
              modules.map(function (module, index) {
                return (
                  <div key = { index } className = { moduleSelected === index ? "selected" : null } onClick = { function () { set_module(index); } }>
                    { module.name }
                  </div>
                );
              })
              :
              null
          }
        </div>
      </div>
      <div onClick = { function () { navigate("/"); } }>
        <span>{ "EXIT" }</span>
        <span className = "material-symbols-outlined">logout</span>
      </div>
    </div>
  );
}