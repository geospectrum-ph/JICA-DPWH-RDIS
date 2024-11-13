import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function HazardMap () {
  const {
    dataArray,
    dataLoading,

    dataSelected, setDataSelected
  } = React.useContext(MainContext);

  const {
    layer_hazard_map,
        
    recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);
  
  function find_road (level, value) {
    const expression =
      level === 0 ? "road_id = '" + value + "'" :
      level === 1 ? "section_id = '" + value + "'" :
      level === 2 ? "globalid = '" + value + "'" :
      null;

    layer_hazard_map
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
        return (attributes.road_id);
      });
    
    const roads_array = Object
      .keys(roads_object)
      .sort(function (base, next) {
        return (base.localeCompare(next));
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
                  return (attributes.section_id);
                });
            
              const sections_array = Object
                .keys(sections_object)
                .sort(function (base, next) {
                  return (base.localeCompare(next));
                })
                .map(function (section_id) {
                  return ([section_id, sections_object[section_id]]);
                });

              return (
                <div key = { key }>
                  <div onClick = { function () { find_road(0, road[0]); } }>
                    <span>{ road[0] + " (" + road[1][0].attributes.road_name + ")" || "No available data." }</span>
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
                                      return (base.attributes.start_lrp.localeCompare(next.attributes.start_lrp));
                                    })
                                    .map(function (chainage, key) {
                                      return (
                                        <div key = { key } className = { dataSelected === chainage.attributes.globalid ? "data-selected" : null } onClick = { function () { find_road(2, chainage.attributes.globalid); } }>
                                          <div>
                                            <span>{ "Start Chainage" }</span>
                                            <span>{ chainage.attributes.start_lrp || "No available data." }</span>
                                          </div>
                                          <div>
                                            <span>{ "End Chainage" }</span>
                                            <span>{ chainage.attributes.end_lrp || "No available data." }</span>
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
    <div id = "hazard-map-container">
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