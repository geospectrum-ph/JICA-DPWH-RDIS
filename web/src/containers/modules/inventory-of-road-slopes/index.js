import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function InventoryOfRoadSlopes () {
  const {
    dataArray,
    dataLoading,

    setRoadSelected
  } = React.useContext(MainContext);

  const {
    layer_inventory_of_road_slopes,

    recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);
  
  function find_road (level, value) {
    const expression =
      level === 0 ? "ROAD_ID = '" + value + "'" :
      level === 1 ? "SECTION_ID = '" + value + "'" :
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

          if (level === 1) {
            open_popup(response.features);

            setRoadSelected(response.features[0].attributes.SECTION_ID);
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

  return (
    <div id = "inventory-of-road-slopes-container">
      <div>{ "List of Road Sections" }</div>
      <div>
        {
          dataArray ?
            dataArray
              .sort(function (base, next) {
                if (base[0] && next[0]) { return (base[0].localeCompare(next[0])); }
              })
              .map(function (road, key) {
                return (
                  <div key = { key }>
                    <div onClick = { function () { find_road(0, road[0]); } }>
                      <div>
                        { road[0] }
                      </div>
                      <div>
                        { road[1][0].attributes.ROAD_NAME }
                      </div>
                    </div>
                    <div>
                      {
                        road[1]
                          .sort(function (base, next) {
                            if (base.attributes.SECTION_ID && next.attributes.SECTION_ID) { return (base.attributes.SECTION_ID.localeCompare(next.attributes.SECTION_ID)); }
                          })
                          .map(function (section, key) {
                            return (
                              <div key = { key }>
                                <div onClick = { function () { find_road(1, section.attributes.SECTION_ID); } }>
                                  <div></div>
                                  <div>{ section.attributes.SECTION_ID }</div>
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
            :
            dataLoading ? <div className = "loading">{ "Loading data..." }</div> : <div className = "loading">{ "No data available." }</div>
        }
      </div>
    </div>
  );
}