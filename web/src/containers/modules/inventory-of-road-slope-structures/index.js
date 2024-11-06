import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function InventoryOfRoadSlopeStructures () {
  const {
    dataArray
  } = React.useContext(MainContext);

  const {
    // layer_road_inventory,
    // view_layer, recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);
  
  function handle_click (feature) {
    // layer_sample
      // .queryFeatures({
      //   where: "OBJECTID = '" + feature.attributes.OBJECTID + "'",
      //   returnGeometry: true,
      //   outFields: ["*"]
      // })
      // .then(function (response) {
      //   // close_popup();

      //   recenter_map(response.features[0].geometry.extent.expand(1.50));

      //   // open_popup(response.features);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  }

  return (
    <div id = "inventory-of-road-slope-structures-container">
      <div>
        <div>{ "List of Road Sections" }</div>
      </div>
      <div>
        {
          dataArray ?
            dataArray
              .sort(function (base, next) {
                return (base[0].localeCompare(next[0]));
              })
              .map(function (road, key) {
                return (
                  <div key = { key } onClick = { function () { } }>
                    <div>
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
                            return (base.attributes.SECTION_ID.localeCompare(next.attributes.SECTION_ID));
                          })
                          .map(function (section, key) {
                            return (
                              <div key = { key }>
                                { section.attributes.SECTION_ID }
                              </div>
                            );
                          })
                      }
                    </div>
                  </div>
                );
              })
            :
            <div className = "loading">{ "Loading data..." }</div>
        }
      </div>
    </div>
  );
}