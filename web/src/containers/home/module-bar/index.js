import React from "react";

import { useNavigate } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function ModuleBar () {
  const navigate = useNavigate();

  const {
    setDataSource,
    setDataLoading,

    modules,
    moduleSelected, setModuleSelected,

    setDataSelected
  } = React.useContext(MainContext);

  const {
    layer_road_sections,
    layer_hazard_map,
    layer_inventory_of_road_slopes,
    layer_inventory_of_road_slope_structures,

    view_layer,
    close_popup
  } = React.useContext(MapContext);

  function set_module (index) {
    close_popup();
    
    view_layer(modules[index].path);

    setDataSelected(null);

    setDataLoading(true);

    switch (index) {
      case 1:
        setDataSource(layer_hazard_map);
        break;
      case 2:
        // setDataSource(layer_inventory_of_road_slopes);
        setDataSource(null);
        break;
      case 3:
        // setDataSource(layer_inventory_of_road_slope_structures);
        setDataSource(null);
        break;
      default:
        setDataSource(layer_road_sections);
        break;
    }

    setModuleSelected(index);

    navigate(`/home/${modules[index].path}`);
  }

  React.useEffect(function () {
    set_module(0);
  }, []);
  
  return (
    <div id = "module-bar-container">
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
  );
}