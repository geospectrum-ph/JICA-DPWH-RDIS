import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function InventoryOfRoadSlopes () {
  const {
    dataArray,
    dataLoading,

    dataSelected, setDataSelected
  } = React.useContext(MainContext);

  const {
    layer_inventory_of_road_slopes,

    recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);
  
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
            setDataSelected(response.features[0].attributes.GlobalID);

            open_popup(response.features);
          }
          else {
            setDataSelected(null);

            close_popup();
          }

          console.log(response.features[0]);
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
                  if (base && next) {
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
                    <span>{ road[0] + " (" + road[1][0].attributes.ROAD_NAME + ")" || "No available data." }</span>
                  </div>
                  <div>
                    {
                      sections_array
                        .map(function (section, key) {
                          return (
                            <div key = { key }>
                              <div onClick = { function () { find_road(1, section[0]); } }>
                                <span>{ section[0] || "No available data." }</span>
                              </div>
                              <div>
                                {
                                  section[1]
                                    .sort(function (base, next) {
                                      if (base.attributes.GlobalID && next.attributes.GlobalID) {
                                        return (base.attributes.GlobalID.localeCompare(next.attributes.GlobalID));
                                      }
                                      else {
                                        return (0);
                                      }
                                    })
                                    .map(function (chainage, key) {
                                      return (
                                        <div key = { key } className = { dataSelected === chainage.attributes.GlobalID ? "data-selected" : null } onClick = { function () { find_road(2, chainage.attributes.GlobalID); } }>
                                          <div>
                                            <span>{ "Type of Disaster" }</span>
                                            <span>{ chainage.attributes.DISASTER_TYPE || "No available data." }</span>
                                          </div>
                                          <div>
                                            <span>{ "With Slope Disaster Failure?" }</span>
                                            <span>{ chainage.attributes.PAST_FAILURE || "No available data." }</span>
                                          </div>
                                          <div>
                                            <span>{ "Dates of Occurence" }</span>
                                            <span>{ chainage.attributes.DATES_OF_OCCURENCE || "No available data." }</span>
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
                </div>
              );
            })
        }
      </div>
    );
  }

  return (
    <div id = "inventory-of-road-slopes-container">
      <div>
        <span>{ "List of Road Sections" }</span>
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