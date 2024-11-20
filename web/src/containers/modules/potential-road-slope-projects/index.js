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
    function ({ attributes }) { return (attributes.SCOPE_OF_WORK || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.ROAD_SEC_C); },
    function ({ attributes }) { return (attributes.ROAD_NAME); },
    function ({ attributes }) { return (attributes.SECTION_ID); },
    function ({ attributes }) { return (attributes.SURVEY_SIDE || "Unclassified Roads"); }
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

            const imported_data = [];

            const expression = "rsm_category = 'Inventory of Road Slope' AND section_id = '" + item[1].attributes.SECTION_ID + "'";

            layer_road_slopes_and_countermeasures
              .queryFeatures({
                where: expression || "1 = 0",
                returnGeometry: true,
                outFields: ["*"]
              })
              .then(function (response) {
                if (response && response.features && response.features.length > 0) {
                  response.features.map(function (item) {
                    imported_data.push(item);
                  })
                }
              })
              .catch(function (error) {
                console.log(error);
              });

            return (
              <div key = { key } className = { "data-container data-container-details"}>
                {
                  imported_data && imported_data.length > 0 ? 
                    imported_data.map(function (item, key) {
                      return (
                        <span key = { key } className = { dataSelected === item.attributes.globalid ? "selected" : null } onClick = { function () { find_road(item.attributes.globalid); } }>
                          { parse_limits(item.attributes.start_lrp) + " to " + parse_limits(item.attributes.end_lrp) }
                        </span>
                      );
                    })
                    :
                    <span>{ "No available data. "}</span>
                }
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