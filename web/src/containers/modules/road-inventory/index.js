import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function RoadInventory () {
  const {
    dataArray,
    dataLoading,

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

  function find_road (level, value) {
    const expression =
      level === 0 ? "ROAD_ID = '" + value + "'" :
      level === 1 ? "SECTION_ID = '" + value + "'" :
      level === 2 ? "GlobalID = '" + value + "'" :
      null;

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

          if (level === 2) {
            setDataSelected(response.features[0].attributes.globalid);

            open_popup(response.features);
          }
          else {
            setDataSelected(null);

            close_popup();
          }
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

    function create_tree(container, data, depth) {
      if (typeof depth === "number") { depth++; }
      else { depth = 1; }

      const div = document.createElement("div");

      container.appendChild(div);

      const sorted_data = Object.entries(data).sort(function (base, next) { if (base && next) { return (base[0].localeCompare(next[0])); } else { return (0); } });

      for (const [key, values] of sorted_data) {
        if (Object.keys(values).length) {
          const span = document.createElement("span");

          span.innerHTML = "\t".repeat(depth) + key;

          div.appendChild(span);

          create_tree(values, depth);
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

          values.attributes.START_LRP ?
            console.log("\t".repeat(depth) + parse_limits(values.attributes.START_LRP)) :
            console.log("\t".repeat(depth) + "No available data.");
        }
      }
    }

    return (
      <div className = "data-array-container">
        { create_tree(document.getElementById("data-array-container"), ordered_data) }
      </div>
    );
  }

  return (
    <div id = "road-inventory-container">
      <div>
        <div>
          <span>{ "List of Road Sections" }</span>
        </div>
        <div>
          <div>
            <span>{ "Please choose an active inventory: " }</span>
          </div>
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