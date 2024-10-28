import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function ModuleBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { modules, moduleSelected, setModuleSelected, clear_selected } = React.useContext(MainContext);
  const { recenter_map, close_popup } = React.useContext(MapContext);

  function set_class (index) {
    var className;

    moduleSelected === index ? className = "appbar-button selected" : className = "appbar-button";

    return (className);
  }

  function set_module (index) {
    close_popup();

    recenter_map({ center: [121.7740, 12.8797], zoom: 6 });

    clear_selected();

    setModuleSelected(index);

    navigate(`/home/${modules[index].path}`);
  }

  React.useEffect(function () {
    const path = location.pathname.split("/")[2];
    const index = modules.findIndex(function (module) { return (module.path === path); });

    setModuleSelected(index);
  }, []);
  
  return (
    <div id = "module-bar-container">
      <div>
        {
          modules ? 
            modules.map(function (module, index) {
              return (
                <div key = { index } className = { set_class(index) } onClick = { function () { set_module(index); } }>
                  { module.name }
                </div>
              );
            })
            :
            null
        }
      </div>
      <div onClick = { function () { navigate("/"); } }>
        <span>{ "EXIT" }</span>
        <span className = "material-symbols-outlined">logout</span>
      </div>
    </div>
  );
}