import * as React from "react";

import { useNavigate } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";

import { close_popup, view_layer } from "../map-component";

import logo_DPWH from "../../../assets/logo_dpwh.png";

import "./index.css";


export default function MenuComponent () {
  const navigate = useNavigate();
  
  const {
    menuComponentOpen, setMenuComponentOpen,

    modules,
    moduleSelected, setModuleSelected
  } = React.useContext(MainContext);

  function set_module (index) {
    close_popup();
    
    setModuleSelected(index);

    navigate(`/home/${ modules[index].name.toLowerCase().split(" ").join("-") }`);

    setMenuComponentOpen(!menuComponentOpen);
  }

  React.useEffect(function () {
    set_module(0);

    view_layer("summary");
  }, []);

  function handleSignOut () {
    localStorage.clear();
    sessionStorage.clear();
    
    navigate("/");
  }

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
              if (index < modules.length - 1) {
                return (
                  <div key = { index } className = { moduleSelected === index ? "selected" : null } onClick = { function () { menuComponentOpen ? set_module(index) : setMenuComponentOpen(!menuComponentOpen) } }>
                    <span className = "material-symbols-outlined">{ module.logo }</span>
                    { menuComponentOpen ? <span>{ module.name }</span> : null }
                  </div>
                );
              }
              else {
                return (null);
              }
            })
          }
        </div>
        <div>
          <div className = { moduleSelected === (modules.length - 1) ? "selected" : null } onClick = { function () { menuComponentOpen ? set_module(modules.length - 1) : setMenuComponentOpen(!menuComponentOpen) } }>
            <span className = "material-symbols-outlined">{ modules[modules.length - 1].logo }</span>
            { menuComponentOpen ? <span>{ modules[modules.length - 1].name }</span> : null }
          </div>
          <div onClick = { function () { handleSignOut(); } }>
            <span className = "material-symbols-outlined">{ "move_item" }</span>
            { menuComponentOpen ? <span>{ "Log Out" }</span> : null }
          </div>
        </div>
      </div>
    </div>
  );
}