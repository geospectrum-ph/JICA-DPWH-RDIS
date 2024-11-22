import React from "react";
import { useNavigate } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function ModuleBar () {
  const navigate = useNavigate();

  const {
    setDataSource,

    modules,
    moduleSelected, setModuleSelected,

    setDataSelected
  } = React.useContext(MainContext);

  const {
    layer_hazard_map,
    layer_road_slopes_and_countermeasures,

    view_layer, close_popup
  } = React.useContext(MapContext);

  function set_module (index) {
    close_popup();
    
    setDataSelected(null);

    switch (index) {
      case 1:
        setDataSource(layer_hazard_map);
        break;
      case 2:
        setDataSource(layer_road_slopes_and_countermeasures);
        break;
      default:
        setDataSource(layer_road_slopes_and_countermeasures);
        break;
    }

    setModuleSelected(index);

    navigate(`/home/${modules[index].path}`);
  }

  React.useEffect(function () {
    set_module(0);

    view_layer("summary");
  }, []);
  
  return (
    <div id = "module-bar-container">
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
        <div onClick = { function () { navigate("/"); } }>
          <span>{ "EXIT" }</span>
          <span className = "material-symbols-outlined">logout</span>
        </div>
      </div>
    </div>
  );
}