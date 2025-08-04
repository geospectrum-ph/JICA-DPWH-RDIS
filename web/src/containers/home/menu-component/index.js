import * as React from "react";

import { useNavigate } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
// import { MapContext } from "../../../contexts/MapContext";

import logo_DPWH from "../../../assets/logo_dpwh.png";

import "./index.css";

import { ClosePopup, ViewLayer } from "../../../contexts/MapComponent";

export default function MenuComponent () {
  const navigate = useNavigate();
  
  const {
    menuComponentOpen, setMenuComponentOpen,

    modules,
    moduleSelected, setModuleSelected
  } = React.useContext(MainContext);

  // const {
  //   ViewLayer, ClosePopup
  // } = React.useContext(MapContext);

  function set_module (index) {
    ClosePopup();
    
    setModuleSelected(index);

    navigate(`/home/${ modules[index].name.toLowerCase().split(" ").join("-") }`);

    setMenuComponentOpen(!menuComponentOpen);
  }

  React.useEffect(function () {
    set_module(0);

    ViewLayer("summary");
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
          { menuComponentOpen ? <span className = "title-container">{ "Road Disaster Information System" }</span> : null }
        </div>
        <div>
          {
            modules?.map(function (module, index) {
              return (
                <div key = { index } className = { moduleSelected === index ? "selected" : null } onClick = { function () { menuComponentOpen ? set_module(index) : setMenuComponentOpen(!menuComponentOpen) } }>
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