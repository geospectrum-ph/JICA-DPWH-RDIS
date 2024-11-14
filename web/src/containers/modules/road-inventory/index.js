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
    const roads_object = Object
      .groupBy(dataArray, function ({ attributes }) {
        return (attributes.ROAD_ID);
      });
    
    const roads_array = Object
      .keys(roads_object)
      .sort(function (base, next) {
        if (base && next) {
          return (base.localeCompare(next));
        }
        else {
          return (0);
        }
      })
      .map(function (road_id) {
        return ([road_id, roads_object[road_id]]);
      });

    return (
      <div className = "data-array-container">
        {
          roads_array
            .map(function (road, key) {
              const sections_object = Object
                .groupBy(road[1], function ({ attributes }) {
                  return (attributes.SECTION_ID);
                });
            
              const sections_array = Object
                .keys(sections_object)
                .sort(function (base, next) {
                  if (base, next) {
                    return (base.localeCompare(next));
                  }
                  else {
                    return (0);
                  }
                })
                .map(function (section_id) {
                  return ([section_id, sections_object[section_id]]);
                });

              return (
                <div key = { key }>
                  <div onClick = { function () { find_road(0, road[0]); } }>
                    <span>{ road[1][0].attributes.ROAD_NAME || "No available data." }</span>
                  </div>
                  <div>
                    {
                      sections_array
                        .map(function (section, key) {
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
                            <div key = { key }>
                              <div onClick = { function () { find_road(1, section[0]); } }>
                                <span>{ section[0] || "No available data." }</span>
                              </div>
                              <div>
                                {
                                  section[1]
                                    .sort(function (base, next) {
                                      if (base.attributes.START_LRP && next.attributes.START_LRP) {
                                        return (base.attributes.START_LRP.localeCompare(next.attributes.START_LRP));
                                      }
                                      else {
                                        return (0);
                                      }
                                    })
                                    .map(function (item, key) {
                                      return (
                                        <div key = { key } className = { dataSelected === item.attributes.GlobalID ? "data-selected" : null } onClick = { function () { find_road(2, item.attributes.GlobalID); } }>
                                          <span>{ parse_limits(item.attributes.START_LRP) + " to " + parse_limits(item.attributes.END_LRP) || "No available data." }</span>
                                        </div>
                                      );
                                    })
                                }
                              </div>
                            </div>
                          );
                        })
                    }
                  </div>
                </div>
              );
            })
        }
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
              <span>{ "No data available." }</span>
            </div>
      }
    </div>
  );
}