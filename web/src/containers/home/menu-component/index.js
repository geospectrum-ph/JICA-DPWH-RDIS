import * as React from "react";

import { useNavigate } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import logo_DPWH from "../../../assets/logos/logo_DPWH.png";

import "./index.css";

export default function MenuComponent () {
  const navigate = useNavigate();
  
  const {
    modules,
    moduleSelected, setModuleSelected
  } = React.useContext(MainContext);

  const {
    view_layer, close_popup
  } = React.useContext(MapContext);

  function set_module (index) {
    close_popup();
    
    setModuleSelected(index);

    navigate(`/home/${modules[index].path}`);
  }

  React.useEffect(function () {
    set_module(0);

    view_layer("summary");
  }, []);

  const [menuComponentExpandedState, setMenuComponentExpandedState] = React.useState(false);

  return (
    <div id = "menu-component">
      <div className = "toggle-button" onClick = { () => { setMenuComponentExpandedState(!menuComponentExpandedState) } }>
        {
          menuComponentExpandedState ?
            <span className = "material-symbols-outlined">{ "arrow_left" }</span> :
            <span className = "material-symbols-outlined">{ "arrow_right" }</span>
        }
      </div>
      <div>
        <div>
          <a><img src = { logo_DPWH } alt = "DPWH Logo"/></a>
          { menuComponentExpandedState ? <span>{ "Road Disaster Information System" }</span> : null }
        </div>
        <div>
          {
            modules?.map(function (module, index) {
              return (
                <div key = { index } className = { moduleSelected === index ? "selected" : null } onClick = { function () { set_module(index); } }>
                  <span className = "material-symbols-outlined">{ module.logo }</span>
                  { menuComponentExpandedState ? <span>{ module.name }</span> : null }
                </div>
              );
            })
          }
        </div>
        <div>
          <div>
            <span className = "material-symbols-outlined">{ "settings" }</span>
            { menuComponentExpandedState ? <span>{ "Settings" }</span> : null }
          </div>
          <div onClick = { function () { navigate("/"); } }>
            <span className = "material-symbols-outlined">{ "move_item" }</span>
            { menuComponentExpandedState ? <span>{ "Log Out" }</span> : null }
          </div>
        </div>
      </div>
    </div>
  );
}