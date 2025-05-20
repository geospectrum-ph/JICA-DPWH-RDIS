import * as React from "react";

import { useNavigate } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import logo_DPWH from "../../../assets/logo_dpwh.png";

import "./index.css";

export default function MenuComponent () {
  const navigate = useNavigate();
  
  const {
    menuComponentOpen, setMenuComponentOpen,
    modules,
    moduleSelected, setModuleSelected
  } = React.useContext(MainContext);

  const {
    view_layer, close_popup
  } = React.useContext(MapContext);

  function set_module (index) {
    close_popup();
    
    setModuleSelected(index);

    navigate(`/home/${ modules[index].name.toLowerCase().split(" ").join("-") }`);
  }

  React.useEffect(function () {
    set_module(0);

    view_layer("summary");
  }, []);

  return (
    <div id = "menu-component" className = { menuComponentOpen ? "menu-component-open" : "menu-component-closed" }>
      <div className = "toggle-button" onClick = { function () { setMenuComponentOpen(!menuComponentOpen); } }>
        {
          menuComponentOpen ?
            <span className = "material-symbols-outlined">{ "arrow_left" }</span> :
            <span className = "material-symbols-outlined">{ "arrow_right" }</span>
        }
      </div>
      <div>
        <div onClick = { function () { setMenuComponentOpen(!menuComponentOpen); } }>
          <div>
            <img src = { logo_DPWH } alt = "DPWH Logo"/>
          </div>
          { menuComponentOpen ? <span>{ "Road Disaster Information System" }</span> : null }
        </div>
        <div>
          {
            modules?.map(function (module, index) {
              return (
                <div key = { index } className = { moduleSelected === index ? "selected" : null } onClick = { function () { set_module(index); } }>
                  <span className = "material-symbols-outlined">{ module.logo }</span>
                  { menuComponentOpen ? <span>{ module.name }</span> : null }
                </div>
              );
            })
          }
        </div>
        <div>
          <div>
            <span className = "material-symbols-outlined">{ "settings" }</span>
            { menuComponentOpen ? <span>{ "Settings" }</span> : null }
          </div>
          <div onClick = { function () { navigate("/"); } }>
            <span className = "material-symbols-outlined">{ "move_item" }</span>
            { menuComponentOpen ? <span>{ "Log Out" }</span> : null }
          </div>
        </div>
      </div>
    </div>
  );
}