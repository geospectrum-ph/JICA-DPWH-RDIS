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
    layer_hazard_risk_surveys,
        
    recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);
  
  function find_road (level, value) {
    console.log(level, value)
    const expression =
      level === 0 ? "road_id = '" + value + "'" :
      level === 1 ? "section_id = '" + value + "'" :
      null;

    layer_hazard_risk_surveys
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

  return (
    <div id = "hazard-map-container">
      <div>{ "List of Road Sections" }</div>
      <div>
        {
          dataArray ?
            dataArray
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
                        { road[1][0].attributes.road_name || "No available data." }
                      </div>
                    </div>
                    <div>
                      {
                        road[1]
                          .sort(function (base, next) {
                            if (base.attributes.section_id && next.attributes.section_id) { return (base.attributes.section_id.localeCompare(next.attributes.section_id)); }
                            else { return (1); }
                          })
                          .map(function (section, key) {
                            return (
                              <div key = { key }>
                                <div onClick = { function () { find_road(1, section.attributes.section_id); } }>
                                  <div></div>
                                  <div>{ section.attributes.section_id || "No available data." }</div>
                                </div>
                                <div>
                                  <div></div>
                                  <div>
                                    <div>Start LRP: {section.attributes.start_lrp}</div>
                                    <div>End LRP: {section.attributes.end_lrp}</div>
                                  </div>
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