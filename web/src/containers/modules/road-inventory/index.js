import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function RoadSlopeInventory () {
  const {
    dataArray,
    dataLoading,

    dataSelected, setDataSelected
  } = React.useContext(MainContext);

  const {
    layer_road_sections,
    layer_road_slopes_and_countermeasures,
    layer_inventory_of_road_slopes,
    layer_inventory_of_road_slope_structures,

    view_layer, recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);

  const [roadSlopesActive, setRoadSlopesActive] = React.useState(true);
  const [roadSlopeStructuresActive, setRoadSlopeStructuresActive] = React.useState(true);

  React.useEffect(function () {
    if (roadSlopesActive && roadSlopeStructuresActive) {
      view_layer("road-slope-inventory");
    }
    else if (roadSlopesActive) {
      view_layer("inventory-of-road-slopes");
    }
    else if (roadSlopeStructuresActive) {
      view_layer("inventory-of-road-slope-structures");
    }
    else {
      view_layer(" ");
    }
  }, [roadSlopesActive, roadSlopeStructuresActive]);
  
  React.useEffect(function () {
    setRoadSlopesActive(true);
    setRoadSlopeStructuresActive(true);
  }, []);

  const sublevels = [
    function ({ attributes }) { return (attributes.DISASTER_TYPE || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.ROAD_SEC_C); },
    function ({ attributes }) { return (attributes.ROAD_NAME); },
    function ({ attributes }) { return (attributes.SECTION_ID); },
    function ({ attributes }) { return (attributes.SURVEY_SIDE || "Unclassified Roads"); }
  ];

  function nest_groups_by (array, properties) {
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

            return (
              <div key = { key } className = { "data-container" }>
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
                  { parse_limits(item[1].attributes.START_LRP) + " to " + parse_limits(item[1].attributes.END_LRP) }
                </span>
              </div>
            );
          }
        })
    );
  }

  return (
    <div id = "road-slope-inventory-container">
      <div>
        <div>
          <span>{ "List of Road Sections" }</span>
        </div>
        <div>
          <span>{ "Please choose an active inventory: " }</span>
        </div>
        <div>
          <div>
            <input type = "checkbox" checked = { roadSlopesActive } onChange = { function () { setRoadSlopesActive(!roadSlopesActive); } }/>
            <span>{ "Inventory of Road Slopes" }</span>
          </div>
          <div>
            <input type = "checkbox" checked = { roadSlopeStructuresActive } onChange = { function () { setRoadSlopeStructuresActive(!roadSlopeStructuresActive); } }/>
            <span>{ "Inventory of Road Slope Structures" }</span>
          </div>
        </div>
      </div>
      {
        dataArray ?
          <div className = "data-array-container">
            <DataRenderer data = { nest_groups_by(dataArray, sublevels) }/>
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