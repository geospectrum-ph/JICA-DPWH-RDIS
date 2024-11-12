import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function HazardMap () {
  const {
    dataArray,
    dataLoading,

    setRoadSelected
  } = React.useContext(MainContext);

  const {
    layer_hazard_map,
        
    recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);
  
  function find_road (level, value) {
    const expression =
      level === 0 ? "road_id = '" + value + "'" :
      level === 1 ? "section_id = '" + value + "'" :
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

          if (level === 1) {
            if (response.features) { open_popup(response.features); }

            setRoadSelected(response.features[0].attributes.section_id);
          }
          else {
            setRoadSelected(null);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function DataArray () {
    const roads_object = Object.groupBy(dataArray, function ({ attributes }) { return (attributes.road_id); });
    const roads_array = Object.keys(roads_object).map((key) => [key, roads_object[key]]);

    return (
      roads_array
        .sort(function (base, next) {
          if (base[0] && next[0]) { return (base[0].localeCompare(next[0])); }
          else { return (1); }
        })
        .map(function (road, key) {
          return (
            <div key = { key }>
              <div onClick = { function () { find_road(0, road[0]); } }>
                <div>
                  { road[0] || "No available data." }
                </div>
                <div>
                  { road[1][0].attributes.ROAD_NAME || "No available data." }
                </div>
              </div>
              <div>
                {
                  road[1]
                    .sort(function (base, next) {
                      if (base.attributes.SECTION_ID && next.attributes.SECTION_ID) { return (base.attributes.SECTION_ID.localeCompare(next.attributes.SECTION_ID)); }
                      else { return (1); }
                    })
                    .map(function (section, key) {
                      return (
                        <div key = { key }>
                          <div onClick = { function () { find_road(1, section.attributes.SECTION_ID); } }>
                            <div></div>
                            <div>{ section.attributes.SECTION_ID || "No available data." }</div>
                          </div>
                          <div>
                            <div></div>
                            <div>{ "No available data." }</div>
                          </div>
                        </div>
                      );
                    })
                }
              </div>
            </div>
          );
        })
    );
  }

  return (
    <div id = "hazard-map-container">
      <div>{ "List of Road Sections" }</div>
      {
        dataArray ?
          <DataArray/>
          :
          dataLoading ?
            <div className = "data-array-placeholder">{ "Loading data..." }</div>
            :
            <div className = "data-array-placeholder">{ "No data available." }</div>
      }
    </div>
  );
}