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
    layer_road_slopes_and_countermeasures,

    recenter_map, view_layer, open_popup, close_popup
  } = React.useContext(MapContext);

  React.useEffect(function () {
    view_layer("potential-road-slope-projects");
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

    if (toggle_panel.className === "data-container-hidden") {
      toggle_panel.className = "data-container";
      toggle_icon.innerText = "keyboard_arrow_down";
    }
    else {
      toggle_panel.className = "data-container-hidden";
      toggle_icon.innerText = "keyboard_arrow_right";
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
            close_popup();
  
            var extent = response.features[0].geometry.extent;
  
            response.features.forEach(function(feature) {
              extent = extent.union(feature.geometry.extent);
            });
  
            recenter_map(extent);
  
            setDataSelected(response.features[0].attributes.globalid);
  
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
              <div key = { key } className = { "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
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

                  return (string_array[0] + " + (-" + string_array[1] + ")");
                }
                else if (string.includes("+")) {
                  const string_array = string.split(/[+]/);

                  return (string_array[0] + " + " + string_array[1]);
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
              <div key = { key } className = { "data-container data-container-details"}>
                <span className = { dataSelected === item[1].attributes.GlobalID ? "selected" : null } onClick = { function () { find_road(item[1].attributes.GlobalID); } }>
                  { item[1].attributes.START_LRP && item[1].attributes.END_LRP ? parse_limits(item[1].attributes.START_LRP) + " to " + parse_limits(item[1].attributes.END_LRP) : "No available data." }
                </span>
              </div>
            );
          }
        })
    );
  }

  return (
    <div id = "potential-road-slope-projects-container">
      <div>
        <div>
          <span>{ "List of Road Sections" }</span>
        </div>
      </div>
      {
        dataArray ?
          <div className = "data-array-container">
            <div className = { "data-container" }>
              <div onClick = { function (event) { change_visibility(event); } }>
                <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                <span>{ "Scope of Work" }</span>
              </div>
              <div className = { "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                  <span>{ "Rehabilitation / Major Repair" }</span>
                </div>
                <DataRenderer data = { nest_groups_by(filter_data_work_scope(dataArray, ["Rehabilitation"]), sublevels) }/>
              </div>
              <div className = { "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                  <span>{ "Reconstruction" }</span>
                </div>
                <DataRenderer data = { nest_groups_by(filter_data_work_scope(dataArray, ["Reconstruction"]), sublevels) }/>
              </div>
              <div className = { "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                  <span>{ "Construction" }</span>
                </div>
                <DataRenderer data = { nest_groups_by(filter_data_work_scope(dataArray, ["Construction"]), sublevels) }/>
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
  );
}