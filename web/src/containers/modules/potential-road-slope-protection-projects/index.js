import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
// import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

import { ViewLayer, layer_road_slopes_and_countermeasures, ClosePopup, RecenterMap, OpenPopup } from "../../../contexts/MapComponent";

export default function PotentialRoadSlopeProtectionProjects () {
  const {
    dataArray,
    dataLoading
  } = React.useContext(MainContext);

  // const {
  //   layer_road_slopes_and_countermeasures,

  //   RecenterMap, ViewLayer, OpenPopup, ClosePopup
  // } = React.useContext(MapContext);

  React.useEffect(function () {
    ViewLayer("potential-road-slope-protection-projects");
  }, []);

  const sublevels = [
    function ({ attributes }) { return (attributes.road_classification || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.road_name || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.section_id || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.survey_side || "Unclassified Roads"); }
  ];

  function filter_data_work_scope (array, filters) {
    return (
      array.filter(function (item) {
        return (item.attributes.type_of_work === filters[0]);
      })
    );
  }

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

    if (toggle_panel.className.includes("data-container-hidden")) {
      toggle_panel.className = "data-container";
      toggle_panel.firstElementChild.className.includes("header") ? toggle_icon.innerText = "remove" : toggle_icon.innerText = "keyboard_arrow_down";
    }
    else {
      toggle_panel.className = "data-container-hidden";
      toggle_panel.firstElementChild.className.includes("header") ? toggle_icon.innerText = "add" : toggle_icon.innerText = "keyboard_arrow_right";
    }
  }

  function changeSelected (element) {
    const container = document.getElementById("potential-road-slope-protection-projects-container");
    const list = container ? container.getElementsByClassName("data-container-details") : null;

    if (list) {
      for (let item of list) {
        if (item.firstElementChild) {
          item.firstElementChild.className = "data-container data-container-details";
        }
      }

      if (element.target) {
        element.target.className = "data-container data-container-details selected";
      }
    }
  }

  function DataRenderer ({ data, depth }) {
    if (typeof depth === "number") { depth++; }
    else { depth = 0; }

    function find_road (value) {
      const expression = "globalid = '" + value + "'";
  
      layer_road_slopes_and_countermeasures
        .queryFeatures({
          where: expression || "1 = 0",
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          if (response && response.features && response.features.length > 0) {
            ClosePopup();
  
            var extent = response.features[0].geometry.extent;
  
            response.features.forEach(function(feature) {
              extent = extent.union(feature.geometry.extent);
            });
  
            RecenterMap(extent);
    
            OpenPopup(response.features);
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
              <div key = { key } className = { depth > 1 ? "data-container" : "data-container-hidden" }>
                <div className = "inventory-section-data" onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ depth > 1 ? "keyboard_arrow_down" : "keyboard_arrow_right" }</span>
                  <span>{ item[0] }</span>
                </div>
                <DataRenderer data = { item[1] } depth = { depth }/>
              </div>
            )
          }
          else {
            function parse_limits (attributes) {
              let start, end;

              if (isNaN(attributes.start_lrp)) {
                if (attributes.start_lrp.includes("-")) {
                  const string_array = attributes.start_lrp.split(/[-]/);

                  start = string_array[0] + " + (-" + string_array[1].padStart(3, "0") + ")";
                }
                else if (attributes.start_lrp.includes("+")) {
                  const string_array = attributes.start_lrp.split(/[+]/);

                  start = string_array[0] + " + " + string_array[1].padStart(3, "0");
                }
                else {
                  start = attributes.start_lrp;
                }
              }
              else {
                start = attributes.start_lrp;
              }

              if (isNaN(attributes.end_lrp)) {
                if (attributes.end_lrp.includes("-")) {
                  const string_array = attributes.end_lrp.split(/[-]/);

                  end = string_array[0] + " + (-" + string_array[1].padStart(3, "0") + ")";
                }
                else if (attributes.end_lrp.includes("+")) {
                  const string_array = attributes.end_lrp.split(/[+]/);
                  
                  end = string_array[0] + " + " + string_array[1].padStart(3, "0");
                }
                else {
                  end = attributes.end_lrp;
                }
              }
              else {
                end = attributes.end_lrp;
              }

              return(start + " - " + end);
            }

            return (
              <div key = { key } className = { "data-container data-container-details"} onClick = { function (event) { changeSelected(event); } }>
                <span onClick = { function () { find_road(item[1].attributes.globalid); } }>
                  { item[1].attributes.start_lrp && item[1].attributes.end_lrp ? parse_limits(item[1].attributes) : "No available data." }
                </span>
              </div>
            );
          }
        })
    );
  }

  return (
    <div id = "potential-road-slope-protection-projects-container">
      <div>
        <div>
          <span>{ "Potential Road Slope Protection Projects Inventory" }</span>
        </div>
      </div>
      <div>
        {
          dataArray ?
            <div className = "data-array-container">
              <div className = { "data-container" }>
                <div className = "inventory-section-header" onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "remove" }</span>
                  <span>{ "Road Slope Protection Projects" }</span>
                </div>
                <div className = { "data-container-hidden" }>
                  <div className = "inventory-section-subheader" onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "add" }</span>
                    <span>{ "Types of Work" }</span>
                  </div>
                  <div className = { "data-container-hidden" }>
                    <div className = "inventory-section-data" onClick = { function (event) { change_visibility(event); } }>
                      <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                      <span>{ "Rehabilitation / Major Repair" }</span>
                    </div>
                    <DataRenderer data = { nest_groups_by(filter_data_work_scope(dataArray, ["Rehabilitation"]), sublevels) }/>
                  </div>
                  <div className = { "data-container-hidden" }>
                    <div className = "inventory-section-data" onClick = { function (event) { change_visibility(event); } }>
                      <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                      <span>{ "Reconstruction" }</span>
                    </div>
                    <DataRenderer data = { nest_groups_by(filter_data_work_scope(dataArray, ["Reconstruction"]), sublevels) }/>
                  </div>
                  <div className = { "data-container-hidden" }>
                    <div className = "inventory-section-data" onClick = { function (event) { change_visibility(event); } }>
                      <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                      <span>{ "Construction" }</span>
                    </div>
                    <DataRenderer data = { nest_groups_by(filter_data_work_scope(dataArray, ["Construction"]), sublevels) }/>
                  </div>
                </div>
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
    </div>
  );
}