import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function PotentialRoadSlopeProjects () {
  const {
    dataArray,
    dataLoading,

    dataSelected, setDataSelected
  } = React.useContext(MainContext);

  const {
    layer_hazard_map,

    view_layer, recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);

  React.useEffect(function () {
    view_layer("hazard-map");
  }, []);

  const sublevels = [
    function ({ attributes }) { return (attributes.road_classification || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.road_name); },
    function ({ attributes }) { return (attributes.section_id); }
  ];

  function nest_groups_by(array, properties) {
    properties = Array.from(properties);

    if (properties.length === 1) {
      return (Object.groupBy(array, properties[0]));
    }

    const property = properties.shift();
    
    var grouped = Object.groupBy(array, property);

    for (let key in grouped) {
      grouped[key] = nest_groups_by(grouped[key], Array.from(properties));
    }

    return (grouped);
  }

  function change_visibility (element) {          
    const toggle_panel = element.target.tagName === "DIV" ? element.target.parentElement : element.target.parentElement.parentElement;
    const toggle_icon = element.target.tagName === "DIV" ? element.target.firstElementChild : element.target.parentElement.firstElementChild;

    if (toggle_panel.className === "data-container-hidden") {
      toggle_panel.className = "data-container";
      toggle_panel.firstElementChild.className.includes("header") ? toggle_icon.innerText = "remove" : toggle_icon.innerText = "keyboard_arrow_down";
    }
    else {
      toggle_panel.className = "data-container-hidden";
      toggle_panel.firstElementChild.className.includes("header") ? toggle_icon.innerText = "add" : toggle_icon.innerText = "keyboard_arrow_right";
    }
  }

  function changeSelected (element) {
    const list = document.getElementById("hazard-map-container").getElementsByClassName("data-container-details");

    if (list) {
      for (let item of list) {
        if (item.firstElementChild) item.firstElementChild.className = "data-container data-container-details";
      }

      if (element.target) element.target.className = "data-container data-container-details selected";
    }
  }


  function DataRenderer ({ data, depth }) {
    if (typeof depth === "number") { depth++; }
    else { depth = 0; }

    function find_road (value) {
      const expression = "globalid = '" + value + "'";
  
      layer_hazard_map
        .queryFeatures({
          where: expression || "1 = 0",
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          if (response && response.features && response.features.length > 0) {
            close_popup();
  
            var extent = response.features[0].geometry.extent;
  
            response.features.forEach(function(feature) {
              extent = extent.union(feature.geometry.extent);
            });
  
            recenter_map(extent);
    
            open_popup(response.features);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      Object
        .entries(data)
        .sort(function (base, next) {
          if (base && next) {
            return (base[0].localeCompare(next[0]));
          }
          else {
            return (0);
          }
        })
        .map(function (item, key) {
          if (Object.keys(item[1]).length) {
            return (
              <div key = { key } className = { depth > 0 ? "data-container" : "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_down" }</span>
                  <span>{ item[0] }</span>
                </div>
                <DataRenderer data = { item[1] } depth = { depth }/>
              </div>
            )
          }
          else {
            function parse_limits (string) {
              if (string) {
                if (string.includes("-")) {
                  const string_array = string.split(/[-]/);

                  return (string_array[0] + " + (-" + string_array[1].padStart(3, "0") + ")");
                }
                else if (string.includes("+")) {
                  const string_array = string.split(/[+]/);

                  return (string_array[0] + " + " + string_array[1].padStart(3, "0"));
                }
                else {
                  return (string);
                }                              
              }
              else {
                return (null);
              }
            }

            return (
              <div key = { key } className = { "data-container data-container-details"} onClick = { function (event) { changeSelected(event); } }>
                <span onClick = { function () { find_road(item[1].attributes.globalid); } }>
                  { parse_limits(item[1].attributes.start_lrp) + " - " + parse_limits(item[1].attributes.end_lrp) }
                </span>
              </div>
            );
          }
        })
    );
  }

  return (
    <div id = "hazard-map-container">
      <div>
        <div>
          <span>{ "Hazard Survey Inventory" }</span>
        </div>
      </div>
      {
        dataArray ?
          // <div className = "data-array-container">
          //   <DataRenderer data = { nest_groups_by(dataArray, sublevels) }/>
          // </div>
            <div className = "data-array-container">
              <div className = { "data-container" }>
                <div className = "inventory-section-header" onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "remove" }</span>
                  <span>{ "Road Slope Hazard Risk Level" }</span>
                </div>
                <DataRenderer data = { nest_groups_by(dataArray, sublevels) }/>
              </div>
            </div>
          :
          dataLoading ?
            <div className = "data-array-placeholder">
              <span>{ "Loading data..." }</span>
            </div>
            :
            <div className = "data-array-placeholder">
              <span>{ "No available data." }</span>
            </div>
      }
    </div>
  );
}