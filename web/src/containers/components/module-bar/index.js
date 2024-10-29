import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function ModuleBar () {
  const navigate = useNavigate();
  const location = useLocation();

  const { modules, moduleSelected, setModuleSelected, clear_selected } = React.useContext(MainContext);
  const { hide_layer, recenter_map, close_popup } = React.useContext(MapContext);

  const [roadSlopeInventoryTabSelected, setRoadSlopeInventoryTabSelected] = React.useState(0);

  function set_module (index) {
    // hide_layer();

    // recenter_map({ center: [121.7740, 12.8797], zoom: 6 });

    // close_popup();

    clear_selected();

    setModuleSelected(index);

    setRoadSlopeInventoryTabSelected(0);

    if (index !== 1) {
      navigate(`/home/${modules[index].path}`);

    }
    else {
      navigate(`/home/existing-road-slopes`);
    }
  }

  React.useEffect(function () {
    const path = location.pathname.split("/")[2];
    const index = modules.findIndex(function (module) { return (module.path === path); });

    if (index > -1) { setModuleSelected(index); }
    else { setModuleSelected(1); }
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
        <div className = { moduleSelected === 1 ? "active" : null }>
          <div className = { roadSlopeInventoryTabSelected === 0 ? "selected" : null } onClick = { function () { setRoadSlopeInventoryTabSelected(0); navigate(`/home/existing-road-slopes`); } }>{ "Existing Road Slopes" }</div>
          <div className = { roadSlopeInventoryTabSelected === 1 ? "selected" : null } onClick = { function () { setRoadSlopeInventoryTabSelected(1); navigate(`/home/non-existing-road-slopes`); } }>{ "Non-Existing Road Slopes" }</div>
        </div>
      </div>
      <div onClick = { function () { navigate("/"); } }>
        <span>{ "EXIT" }</span>
        <span className = "material-symbols-outlined">logout</span>
      </div>
    </div>
  );
}