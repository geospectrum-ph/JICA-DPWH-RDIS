import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";

import {
  view_layer,
  layer_road_slope_hazards,
  close_popup,
  open_popup,
  recenter_map
} from "../../home/map-component";

import "./index.css";

export default function RoadSlopeHazards () {
  const {
    dataArray,
    dataLoading,

    totalRoadSlopeHazardsInventory,
    filteredRoadSlopeHazardsInventory
  } = React.useContext(MainContext);

  React.useEffect(function () {
    view_layer("road-slope-hazards");
  }, []);

  const sublevels = [
    function ({ attributes }) { return (attributes.road_classification || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.road_name); },
    function ({ attributes }) { return (attributes.section_id); }
  ];

  const hazard_risk_level_array = ["Low", "Middle", "High"];

  function filter_data_hazard_risk_level (array, filters) {
    return (
      array.filter(function (item) {
        return (hazard_risk_level_array.indexOf(item.attributes.hazard_risk) === filters[0]);
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
    const container = document.getElementById("hazard-map-container");
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
  
      layer_road_slope_hazards
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
          // console.log(error);
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
    <div id = "road-slope-hazards-container">
      <div>
        <div>
          <span>{ "Road Slope Hazards Inventory" }</span>
        </div>
      </div>       
      <div>
        <div className = "summary-section">
          <div className = "summary-section-header"><span>{ "Summary" }</span></div>
          <div className = "summary-header-row">
            <div></div>
            <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
            <div className = "summary-column-header"><span>{ "Total" }</span></div>
          </div>
          <div className = "summary-row">
            <div className = "summary-row-header"><span>{ "Number of Road Slope Hazard Records" }</span></div>
            <div><span>{ filteredRoadSlopeHazardsInventory }</span></div>
            <div><span>{ totalRoadSlopeHazardsInventory }</span></div>
          </div>
        </div>
      </div> 
      <div>
        {
          dataArray ?
              <div className = "data-array-container">
                <div className = { "data-container" }>
                  <div className = "inventory-section-header" onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "remove" }</span>
                    <span>{ "Road Slope Hazards" }</span>
                  </div>
                  <div className = { "data-container-hidden" }>
                    <div className = "inventory-section-subheader" onClick = { function (event) { change_visibility(event); } }>
                      <span className = "material-symbols-outlined">{ "add" }</span>
                      <span>{ "Levels of Road Slope Hazard" }</span>
                    </div>
                    <div className = { "data-container-hidden" }>
                      <div className = "inventory-section-data" onClick = { function (event) { change_visibility(event); } }>
                        <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                        <span>{ "High" }</span>
                      </div>
                      <DataRenderer data = { nest_groups_by(filter_data_hazard_risk_level(dataArray, [2]), sublevels) }/>
                    </div>
                    <div className = { "data-container-hidden" }>
                      <div className = "inventory-section-data" onClick = { function (event) { change_visibility(event); } }>
                        <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                        <span>{ "Middle" }</span>
                      </div>
                      <DataRenderer data = { nest_groups_by(filter_data_hazard_risk_level(dataArray, [1]), sublevels) }/>
                    </div>
                    <div className = { "data-container-hidden" }>
                      <div className = "inventory-section-data" onClick = { function (event) { change_visibility(event); } }>
                        <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                        <span>{ "Low" }</span>
                      </div>
                      <DataRenderer data = { nest_groups_by(filter_data_hazard_risk_level(dataArray, [0]), sublevels) }/>
                    </div>
                    <div className = { "data-container-hidden" }>
                      <div className = "inventory-section-data" onClick = { function (event) { change_visibility(event); } }>
                        <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                        <span>{ "Non-Evaluated" }</span>
                      </div>
                      <DataRenderer data = { nest_groups_by(filter_data_hazard_risk_level(dataArray, [-1]), sublevels) }/>
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
