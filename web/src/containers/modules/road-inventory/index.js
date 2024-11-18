import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function RoadSlopeInventory () {
  const {
    dataArray,
    dataLoading, setDataLoading,

    dataSelected, setDataSelected
  } = React.useContext(MainContext);

  const {
    layer_inventory_of_road_slopes,

    view_layer, recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);

  const [roadSlopesActive, setRoadSlopesActive] = React.useState(true);
  const [roadSlopeStructuresActive, setRoadSlopeStructuresActive] = React.useState(true);

  React.useEffect(function () {
    if (roadSlopesActive && roadSlopeStructuresActive) {
      view_layer("road-inventory");
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

  function find_road (value) {
    const expression = "GlobalID = '" + value + "'";

    layer_inventory_of_road_slopes
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

          setDataSelected(response.features[0].attributes.GlobalID);

          open_popup(response.features);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function DataArray () {
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

    // Grouping hierarchy, as per DPWH - PS: Inventory Type > Condition / Type of Disaster / Type of Structure > Road Classification > Road Name > Section ID > Survey Side > Limits

    const ordered_data = nest_groups_by(dataArray, [
      function ({ attributes }) { return (attributes.DISASTER_TYPE || "Unclassified Roads"); },
      function ({ attributes }) { return (attributes.ROAD_SEC_C); },
      function ({ attributes }) { return (attributes.ROAD_NAME); },
      function ({ attributes }) { return (attributes.SECTION_ID); },
      function ({ attributes }) { return (attributes.SURVEY_SIDE || "Unclassified Roads"); }
    ]);

    function create_tree(data, depth) {
      if (typeof depth === "number") { depth++; }
      else { depth = 1; }

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
                <div key = { key } className = { "data-container data-container-level-0" + depth }>
                  <div>
                    <span>{ item[0] }</span>
                  </div>
                  { create_tree(item[1], depth) }
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
                <div key = { key } className = { "data-container data-container-level-0" + depth }>
                  <span className = { dataSelected === item[1].attributes.GlobalID ? " selected" : null } onClick = { function () { find_road(item[1].attributes.GlobalID); } }>{ parse_limits(item[1].attributes.START_LRP) + " to " + parse_limits(item[1].attributes.END_LRP) }</span>
                </div>
              );
            }
          })
      );
    }

    return (
      <div className = "data-array-container">
        { create_tree(ordered_data) }
      </div>
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
            <input type = "checkbox" id = "inventory-of-road-slopes-checkbox" checked = { roadSlopesActive } onChange = { function () { setRoadSlopesActive(!roadSlopesActive); } }/>
            <span>{ "Inventory of Road Slopes" }</span>
          </div>
          <div>
            <input type = "checkbox" id = "inventory-of-road-slope-structures-checkbox" checked = { roadSlopeStructuresActive } onChange = { function () { setRoadSlopeStructuresActive(!roadSlopeStructuresActive); } }/>
            <span>{ "Inventory of Road Slope Structures" }</span>
          </div>
        </div>
      </div>
      {
        dataArray ?
          <DataArray/>
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