import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

// import TitleBar from "./title-bar";
// import ModuleBar from "./module-bar";

// import LoadingModal from "./loading-modal";

import LoadingModal from "./loading-modal";

import logo_DPWH from "../../assets/logos/logo_DPWH.png";

import "./index.css";

function HomePage () {
  const {
    dataArray,
    dataLoading
  } = React.useContext(MainContext);

  const {
    MapComponent
  } = React.useContext(MapContext);
  
  // return (
  //   <div id = "home-container" className = { dataLoading ? null : "home-container-interactive" }>
  //     <div><TitleBar/></div>
  //     <div><ModuleBar/></div>
  //     <div>
  //       <div><Outlet/></div>
  //       <div><MapComponent/></div>
  //     </div>
  //     <div className = { !dataArray && dataLoading ? "loading-modal-active" : "loading-modal-hidden" }><LoadingModal/></div>
  //   </div>
  // );

  function MenuPanel () {
    const [expanded, setExpanded] = React.useState("not-expanded");

    return (
      <div className = { expanded }>
        <div className = "toggle-button" onClick = { () => { expanded === "expanded" ? setExpanded("not-expanded") : setExpanded("expanded") }}>
          {
            expanded === "expanded" ?
              <span class = "material-symbols-outlined">arrow_circle_left</span> :
              <span class = "material-symbols-outlined">arrow_circle_right</span>
          }
        </div>
        <div> {/* Not Expanded Container  */}
          <div>
            <a href = "https://www.dpwh.gov.ph/dpwh/" target = "_blank" rel = "noreferrer"><img src = { logo_DPWH } alt = "DPWH Logo"/></a>
          </div>
          <div>
            <div>
              <span class="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <span class="material-symbols-outlined">warning</span>
            </div>
            <div>
              <span class="material-symbols-outlined">list</span>
            </div>
            <div>
              <span class="material-symbols-outlined">search_check</span>
            </div>
            <div>
              <span class="material-symbols-outlined">local_atm</span>
            </div>
            <div>
              <span class="material-symbols-outlined">approval_delegation</span>
            </div>
            <div>
              <span class="material-symbols-outlined">content_paste_search</span>
            </div>
          </div>
          <div>
            <div>
              <span class="material-symbols-outlined">settings</span>
            </div>
            <div>
              <span class="material-symbols-outlined">move_item</span>
            </div>
          </div>
        </div>
        <div> {/* Expanded Container  */}
          <div>
            <a href = "https://www.dpwh.gov.ph/dpwh/" target = "_blank" rel = "noreferrer"><img src = { logo_DPWH } alt = "DPWH Logo"/></a>
            <span>ROAD DISASTER INFORMATION SYSTEM</span>
          </div>
          <div>
            <div>
              <span class="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <span class="material-symbols-outlined">warning</span>
            </div>
            <div>
              <span class="material-symbols-outlined">list</span>
            </div>
            <div>
              <span class="material-symbols-outlined">search_check</span>
            </div>
            <div>
              <span class="material-symbols-outlined">local_atm</span>
            </div>
            <div>
              <span class="material-symbols-outlined">approval_delegation</span>
            </div>
            <div>
              <span class="material-symbols-outlined">content_paste_search</span>
            </div>
          </div>
          <div>
            <div>
              <span class="material-symbols-outlined">settings</span>
            </div>
            <div>
              <span class="material-symbols-outlined">move_item</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function SidePanel () {
    return (
      <div>{ "Side Panel" }</div>
    );
  }

  function FilterComponent () {
    return (
      <div>
        <div>
          <input></input>
        </div>
        <div>
          <div>
            <div>
              <div>Mouse over me</div>
              <div>Hello World!</div>
            </div>
          </div>
          <div>
            <div>
              <div>Mouse over me</div>
              <div>Hello World!</div>
            </div>
          </div>
          <div>
            <div >
              <div>Mouse over me</div>
              <div>Hello World!</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id = "home-container" className = { dataLoading ? null : "home-container-interactive" }>
      <div><MenuPanel/></div>
      <div><Outlet/></div>
      <div>
        <div><FilterComponent/></div>
        <div><MapComponent/></div>
      </div>
      <div className = { !dataArray && dataLoading ? "loading-modal-active" : "loading-modal-hidden" }><LoadingModal/></div>
    </div>
  );
}

export default HomePage;