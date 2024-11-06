import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function ModuleBar () {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    modules,
    moduleSelected, setModuleSelected
  } = React.useContext(MainContext);

  const {
    view_layer, close_popup
  } = React.useContext(MapContext);

  function set_module (index) {
    close_popup();

    view_layer(modules[index].path);

    setModuleSelected(index);
  }

  React.useEffect(function () {
    const path = location.pathname.split("/")[2];
    const index = modules.findIndex(function (module) { return (module.path === path); });

    if (index > -1) {
      set_module(index);
    }
  }, []);
  
  return (
    <div id = "module-bar-container">
      {
        modules ? 
          modules.map(function (module, index) {
            return (
              <div key = { index } className = { moduleSelected === index ? "selected" : null } onClick = { function () { set_module(index); navigate(`/home/${modules[index].path}`); } }>
                { module.name }
              </div>
            );
          })
          :
          null
      }
      <div onClick = { function () { navigate("/"); } }>
        <span>{ "EXIT" }</span>
        <span className = "material-symbols-outlined">logout</span>
      </div>
    </div>
  );
}