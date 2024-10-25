import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function RoadInventory() {
  const { regionSelected, congressionalDistrictSelected, engineeringDistrictSelected } = React.useContext(MainContext);
  const { layer_roads, clear_map, recenter_map, add_layer } = React.useContext(MapContext);

  const [roads, setRoads] = React.useState(null);
  
  function query_roads (expression) {
    layer_roads
      .queryFeatures({
        where: expression || "1 = 1",
        returnGeometry: true,
        outFields: ["*"]
      })
      .then(function (response) {
        setRoads(response.features);
      });
  }

  React.useEffect(function () {
    query_roads("1 = 1");
  }, []);

  function handleClick (feature) {
    const renderer = {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 2,
        color: [255, 255, 255, 1.00]
      }
    };

    clear_map();

    add_layer(feature, feature.attributes.ROAD_NAME, renderer);

    recenter_map(feature.geometry.extent);
  }

  return (
    <div id = "road-inventory-container">
      <div>
        {
          roads ? 
            roads
              .map(function (road, key) {
                return (
                  <div key = { key } onClick = { function () { handleClick(road); } }>
                    <div className = { road.attributes.ROAD_SEC_C.toLowerCase() }></div>
                    <div>{ road.attributes.ROAD_ID }</div>
                    <div>{ road.attributes.ROAD_NAME }</div>
                  </div>
                );
              })
            :
            null
        }
      </div>
      <div>
        {/* { "Test" } */}
      </div>
    </div>
  );
}