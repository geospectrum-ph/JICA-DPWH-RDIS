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
    layer_national_road_network,
    layer_road_slopes_and_countermeasures,
    layer_inventory_of_road_slopes,
    layer_inventory_of_road_slope_structures,

    view_layer, recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);

  React.useEffect(function () {
    view_layer("road-slope-inventory");
  }, []);

  const sublevels = [
    function ({ attributes }) { return (attributes.road_classification || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.road_name || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.section_id || "Unclassified Roads"); },
    function ({ attributes }) { return (attributes.survey_side || "Unclassified Roads"); }
  ];

  function filter_data_road_condition (array, filters) {
    return (
      array.filter(function (item) {
        return (item.attributes.rsm_category === filters[0] && item.attributes.road_condition === filters[1]);
      })
    );
  }

  function filter_data_disaster_type (array, filters) {
    return (
      array.filter(function (item) {
        return (item.attributes.rsm_category === filters[0] && item.attributes.disaster_type === filters[1]);
      })
    );
  }

  function filter_data_structure_type (array, filters) {
    return (
      array.filter(function (item) {
        return (item.attributes.rsm_category === filters[0] && item.attributes.structure_type === filters[1]);
      })
    );
  }

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
    <div id = "road-slope-inventory-container">
      <div>
        <div>
          <span>{ "Road Slope Inventory" }</span>
        </div>
      </div>
      {
        dataArray ?
          <div className = "data-array-container">
            <div className = { "data-container" }>
              <div onClick = { function (event) { change_visibility(event); } }>
                <span className = "material-symbols-outlined">{ "keyboard_arrow_down" }</span>
                <span>{ "Road Slope Structures" }</span>
              </div>
              <div className = { "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                  <span>{ "Road Condition" }</span>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Good" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_road_condition(dataArray, ["Inventory of Road Slope Structures", "Good"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Fair" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_road_condition(dataArray, ["Inventory of Road Slope Structures", "Fair"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Poor" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_road_condition(dataArray, ["Inventory of Road Slope Structures", "Poor"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Bad" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_road_condition(dataArray, ["Inventory of Road Slope Structures", "Bad"]), sublevels) }/>
                </div>
              </div>
              <div className = { "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                  <span>{ "Type of Disasters" }</span>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Soil Slope Collapse (SSC)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope Structures", "Soil Slope Collapse"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Rock Slope Collapse (RSC) / Rock Fall (RF)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope Structures", "Rock Slope Collapse/Rock Fall"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Landslide (LS)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope Structures", "Landslide"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Road Slip (RS)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope Structures", "Road Slip"]), sublevels) }/>
                </div>                
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "River Erosion (RE)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope Structures", "River Erosion"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Debris Flow (DF)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope Structures", "Debris Flow"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Coastal Erosion (CE)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope Structures", "Coastal Erosion"]), sublevels) }/>
                </div>
              </div>
              <div className = { "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                  <span>{ "Type of Road Slope Structures" }</span>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Grouted Riprap" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Grouted Riprap"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Grouted Riprap with Steel Sheet Pile Foundation" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Grouted Riprap with Steel Sheet Pile Foundation"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Grouted Riprap with Concrete Sheet Pile Foundation" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Grouted Riprap with Concrete Sheet Pile Foundation"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Rubble Concrete Revetment (Spread Type I)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Rubble Concrete Revetment (Spread Type I)"]), sublevels) }/>
                </div>                
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Stone Masonry" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Stone Masonry"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Concrete Slope Protection (Reinforced Concrete Type II)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Concrete Slope Protection (Reinforced Concrete Type II)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Gravity Wall (Type I)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Gravity Wall (Type I)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Gabion / Mattress Slope Protection" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Gabion/Mattress Slope Protection"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Hydroseeding)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)"]), sublevels) }/>
                </div>                
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Vetiver Grass)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Vetiver Grass)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Earthfill Dike (Type I)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Earthfill Dike (Type I)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Boulder Spur Dike (Type II)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Boulder Spur Dike (Type II)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "BGabions Revetment (Pile-Up Type)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope Structures", "Gabions Revetment (Pile-Up Type)"]), sublevels) }/>
                </div>
              </div>
            </div>
            <div className = { "data-container" }>
              <div onClick = { function (event) { change_visibility(event); } }>
                <span className = "material-symbols-outlined">{ "keyboard_arrow_down" }</span>
                <span>{ "Road Slopes" }</span>
              </div>
              <div className = { "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                  <span>{ "Type of Disasters" }</span>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Soil Slope Collapse (SSC)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope", "Soil Slope Collapse"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Rock Slope Collapse (RSC) / Rock Fall (RF)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope", "Rock Slope Collapse/Rock Fall"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Landslide (LS)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope", "Landslide"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Road Slip (RS)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope", "Road Slip"]), sublevels) }/>
                </div>                
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "River Erosion (RE)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope", "River Erosion"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Debris Flow (DF)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope", "Debris Flow"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Coastal Erosion (CE)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_disaster_type(dataArray, ["Inventory of Road Slope", "Coastal Erosion"]), sublevels) }/>
                </div>
              </div>
              <div className = { "data-container-hidden" }>
                <div onClick = { function (event) { change_visibility(event); } }>
                  <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                  <span>{ "Type of Road Slope Structures" }</span>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Grouted Riprap" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Grouted Riprap"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Grouted Riprap with Steel Sheet Pile Foundation" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Grouted Riprap with Steel Sheet Pile Foundation"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Grouted Riprap with Concrete Sheet Pile Foundation" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Grouted Riprap with Concrete Sheet Pile Foundation"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Rubble Concrete Revetment (Spread Type I)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Rubble Concrete Revetment (Spread Type I)"]), sublevels) }/>
                </div>                
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Stone Masonry" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Stone Masonry"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Concrete Slope Protection (Reinforced Concrete Type II)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Concrete Slope Protection (Reinforced Concrete Type II)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Gravity Wall (Type I)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Gravity Wall (Type I)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Gabion / Mattress Slope Protection" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Gabion/Mattress Slope Protection"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Hydroseeding)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)"]), sublevels) }/>
                </div>                
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Vetiver Grass)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Vetiver Grass)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Earthfill Dike (Type I)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Earthfill Dike (Type I)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "Boulder Spur Dike (Type II)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Boulder Spur Dike (Type II)"]), sublevels) }/>
                </div>
                <div className = { "data-container-hidden" }>
                  <div onClick = { function (event) { change_visibility(event); } }>
                    <span className = "material-symbols-outlined">{ "keyboard_arrow_right" }</span>
                    <span>{ "BGabions Revetment (Pile-Up Type)" }</span>
                  </div>
                  <DataRenderer data = { nest_groups_by(filter_data_structure_type(dataArray, ["Inventory of Road Slope", "Gabions Revetment (Pile-Up Type)"]), sublevels) }/>
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
  );
}