import * as React from "react";

import { useNavigate } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";

import "./index.css";

export default function MenuComponent () {
  const navigate = useNavigate();
  
  const {
    menuComponentOpen,
    setMenuComponentOpen,

    modules,
    moduleSelected,
    setModuleSelected
  } = React.useContext(MainContext);

  function set_module (index) {
    setModuleSelected(index);

    sessionStorage.setItem("moduleSelected", modules[index].name.toLowerCase().split(" ").join("-"));

    navigate(`/home/${ modules[index].name.toLowerCase().split(" ").join("-") }`);

    setMenuComponentOpen(!menuComponentOpen);
  }

  React.useEffect(function () {
    set_module(0);
  }, []);

  function handleExit () {
    navigate("/");

    sessionStorage.clear();
  }

  return (
    <div id = "menu-component" className = { menuComponentOpen ? "menu-component-open" : "menu-component-closed" } onClick = { function () { setMenuComponentOpen(!menuComponentOpen); } }>
      <div className = "toggle-button" onClick = { function () { setMenuComponentOpen(!menuComponentOpen); } }>
        {
          menuComponentOpen ?
            <span className = "material-symbols-outlined">{ "arrow_left" }</span> :
            <span className = "material-symbols-outlined">{ "arrow_right" }</span>
        }
      </div>
      <div>
        <div>
          {
            modules
              .filter(function (module, index) {
                return (index < modules.length - 1);
              })
              .map(function (module, index) {
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
          <div className = { moduleSelected === modules.length - 1 ? "selected" : null } onClick = { function () { menuComponentOpen ? set_module(modules.length - 1) : setMenuComponentOpen(!menuComponentOpen) } }>
            <span className = "material-symbols-outlined">{ "settings" }</span>
            { menuComponentOpen ? <span>{ "Settings" }</span> : null }
          </div>
          <div onClick = { function () { handleExit(); } }>
            <span className = "material-symbols-outlined">{ "move_item" }</span>
            { menuComponentOpen ? <span>{ "Log Out" }</span> : null }
          </div>
        </div>
      </div>
    </div>
  );
}
