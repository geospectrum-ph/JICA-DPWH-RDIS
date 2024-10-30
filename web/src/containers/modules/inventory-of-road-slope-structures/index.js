import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function InventoryOfRoadSlopeStructures () {
  const {
    regionSelected,
    congressionalDistrictSelected,
    engineeringDistrictSelected,
    inventoryOfRoadSlopeStructuresData,
  } = React.useContext(MainContext);

  const {
    // layer_road_inventory,
    // view_layer, recenter_map, open_popup, close_popup
  } = React.useContext(MapContext);

  React.useEffect(function () {
    console.log(inventoryOfRoadSlopeStructuresData);
  }, [inventoryOfRoadSlopeStructuresData]);
  
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
          inventoryOfRoadSlopeStructuresData ? 
            inventoryOfRoadSlopeStructuresData
              // .filter(function (road) {
              //   if (regionSelected === "" && congressionalDistrictSelected === "" && engineeringDistrictSelected === "") {
              //     return (true);
              //   }
              //   else if (regionSelected !== "" && congressionalDistrictSelected === "" && engineeringDistrictSelected === "") {
              //     return (road.attributes.REGION === regionSelected);
              //   }
              //   else if (regionSelected !== "" && congressionalDistrictSelected !== "" && engineeringDistrictSelected === "") {
              //     return (road.attributes.CONG_DIST === congressionalDistrictSelected);
              //   }
              //   else if (regionSelected !== "" && congressionalDistrictSelected === "" && engineeringDistrictSelected !== "") {
              //     return (road.attributes.DEO === engineeringDistrictSelected);
              //   }
              //   else {
              //     return (false);
              //   }
              // })
              .sort(function (base, next) {
                return (base.attributes.ROAD_ID.localeCompare(next.attributes.ROAD_ID));
              })
              .map(function (road, key) {
                return (
                  <div key = { key } onClick = { function () { handle_click(road); } }>
                    <div className = { road.attributes.ROAD_SEC_C || "" }></div>
                    <div>{ road.attributes.SECTION_ID || "" }</div>
                    <div>{ road.attributes.ROAD_NAME || "" }</div>
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