import * as React from "react";

import esriConfig from "@arcgis/core/config.js";

import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";

import Expand from "@arcgis/core/widgets/Expand.js";
import Search from "@arcgis/core/widgets/Search.js";
import Home from "@arcgis/core/widgets/Home.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const MapContext = React.createContext();

function MapContextProvider (props) {
  const url_road_sections = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer";
  const url_hazard_map = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/hazard_map_ver2/FeatureServer";
  const url_terrain = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer";

  const layer_road_sections = new FeatureLayer({
    title: "Road Sections",
    url: url_road_sections,
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: false,
    visible: true
  });

  function content_inventory_of_road_slope_structures (target) {
    return (document.createElement("attribute-table").innerHTML = `
      <table cellpadding = "8">
        <tr style = "background-color: #393939;">
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.REGION || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Engineering District</b></td>
          <td>${ target.graphic.attributes.DEO || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Legislative District</b></td>
          <td>${ target.graphic.attributes.CONG_DIST || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Road Classification</b></td>
          <td>${ target.graphic.attributes.ROAD_SEC_C || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Road Name</b></td>
          <td>${ target.graphic.attributes.ROAD_NAME || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Section ID</b></td>
          <td>${ target.graphic.attributes.SECTION_ID || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Terrain</b></td>
          <td>${ target.graphic.attributes.TERRAIN_TYPE || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Volume of Traffic</b> (AADT)</td>
          <td>${ target.graphic.attributes.AADT || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Start Station Limit</b></td>
          <td>${ target.graphic.attributes.START_LRP || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>End Station Limit</b></td>
          <td>${ target.graphic.attributes.END_LRP || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Start Chainage</b></td>
          <td>${ target.graphic.attributes.START_CHAINAGE || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>End Chainage</b></td>
          <td>${ target.graphic.attributes.END_CHAINAGE || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Start Coordinates</b></td>
          <td>${ target.graphic.attributes.START_COORDS || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>End Coordinates</b></td>
          <td>${ target.graphic.attributes.END_COORDS || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Existing Type of Road Slope Structure</b></td>
          <td>${ target.graphic.attributes.STRUCTURE_TYPE || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Length</b> (meters)</td>
          <td>${ target.graphic.attributes.LENGTH || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Height</b> (meters)</td>
          <td>${ target.graphic.attributes.HEIGHT || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Area</b> (sq. meters)</td>
          <td>${ target.graphic.attributes.LENGTH * target.graphic.attributes.HEIGHT || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Slope Angle / Gradient</b> (degrees)</td>
          <td>${ target.graphic.attributes.GRADIENT || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Type of Disaster</b></td>
          <td>${ target.graphic.attributes.DISASTER_TYPE || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Condition</b></td>
          <td>${ target.graphic.attributes.CONDITION || "No available data" }</td>
        </tr>
      </table>
    `);
  }

  const layer_inventory_of_road_slope_structures = new FeatureLayer({
    title: "Inventory of Road Slope Structures",
    url: url_road_sections,
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  function content_inventory_of_road_slopes (target) {
    return (document.createElement("attribute-table").innerHTML = `
      <table cellpadding = "8">
        <tr style = "background-color: #393939;">
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.REGION || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Engineering District</b></td>
          <td>${ target.graphic.attributes.DEO || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Legislative District</b></td>
          <td>${ target.graphic.attributes.CONG_DIST || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Road Classification</b></td>
          <td>${ target.graphic.attributes.ROAD_SEC_C || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Road Name</b></td>
          <td>${ target.graphic.attributes.ROAD_NAME || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Section ID</b></td>
          <td>${ target.graphic.attributes.SECTION_ID || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Terrain</b></td>
          <td>${ target.graphic.attributes.TERRAIN_TYPE || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Volume of Traffic</b> (AADT)</td>
          <td>${ target.graphic.attributes.AADT || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Start Station Limit</b></td>
          <td>${ target.graphic.attributes.START_LRP || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>End Station Limit</b></td>
          <td>${ target.graphic.attributes.END_LRP || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Start Chainage</b></td>
          <td>${ target.graphic.attributes.START_CHAINAGE || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>End Chainage</b></td>
          <td>${ target.graphic.attributes.END_CHAINAGE || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Start Coordinates</b></td>
          <td>${ target.graphic.attributes.START_COORDS || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>End Coordinates</b></td>
          <td>${ target.graphic.attributes.END_COORDS || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Length</b> (meters)</td>
          <td>${ target.graphic.attributes.LENGTH || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Height</b> (meters)</td>
          <td>${ target.graphic.attributes.HEIGHT || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Area</b> (sq. meters)</td>
          <td>${ target.graphic.attributes.LENGTH * target.graphic.attributes.HEIGHT || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Slope Angle / Gradient</b> (degrees)</td>
          <td>${ target.graphic.attributes.GRADIENT || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Type of Disaster</b></td>
          <td>${ target.graphic.attributes.DISASTER_TYPE || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>With Slope Disaster Failure?</b></td>
          <td>${ target.graphic.attributes.FAILURE_BOOL || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Date of Occurence</b></td>
          <td>${ target.graphic.attributes.DATE || "No available data" }</td>
        </tr>
      </table>
    `);
  }

  const layer_inventory_of_road_slopes = new FeatureLayer({
    title: "Inventory of Road Slopes",
    url: url_road_sections,
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const disaster_type_codes = {
    "disaster_ssc": "Soil Slope Collapse",
    "disaster_rsc": "Rock Slope Collapse",
    "disaster_rf": "Rock Fall",
    "disaster_ls": "Landslide",
    "disaster_rs": "Road Slip",
    "disaster_df": "Debris Flow",
    "disaster_re": "River Erosion",
    "disaster_ce": "Coastal Erosion",
  }

  function content_hazard_map (target) {
    return (document.createElement("attribute-table").innerHTML = `
      <table cellpadding = "8">
        <tr style = "background-color: #393939;">
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.region_name || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Engineering District</b></td>
          <td>${ target.graphic.attributes.deo_name || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Legislative District</b></td>
          <td>${ target.graphic.attributes.district_name || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Road Classification</b></td>
          <td>${ target.graphic.attributes.road_classification || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Road Name</b></td>
          <td>${ target.graphic.attributes.road_name || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Section ID</b></td>
          <td>${ target.graphic.attributes.section_id || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Terrain</b></td>
          <td>${ target.graphic.attributes.road_terrain || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Priority ranking</b></td>
          <td>${ target.graphic.attributes.priority_ranking || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Start Station Limit</b></td>
          <td>${ target.graphic.attributes.start_lrp || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>End Station Limit</b></td>
          <td>${ target.graphic.attributes.end_lrp || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Start Chainage</b></td>
          <td>${ target.graphic.attributes.start_chainage || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>End Chainage</b></td>
          <td>${ target.graphic.attributes.end_chainage || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Length</b> (meters)</td>
          <td>${ target.graphic.attributes.road_length || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Height</b> (meters)</td>
          <td>${ target.graphic.attributes.road_height || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Area</b> (sq. meters)</td>
          <td>${ target.graphic.attributes.target_area || "No available data" }</td>
        </tr>
        <tr style = "background-color: #2d2d2d;">
          <td><b>Slope Angle / Gradient</b> (degrees)</td>
          <td>${ target.graphic.attributes.road_angle || "No available data" }</td>
        </tr>
        <tr style = "background-color: #393939;">
          <td><b>Type of Disaster</b></td>
          <td>${ disaster_type_codes[target.graphic.attributes.disaster_type] || "No available data" }</td>
        </tr>
      </table>
    `);
  }

  const layer_hazard_map = new FeatureLayer({
    title: "Hazard Map",
    url: url_hazard_map,
    renderer: {
      type: "unique-value",
      field: "priority_ranking",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      },
      uniqueValueInfos: [
        {
          value: "risk_low",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 255, 0, 1.00]
          }
        }, 
        {
          value: "risk_middle",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 155, 55, 1.00]
          }
        },
        {
          value: "risk_high",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 0, 0, 1.00]
          }
        }
      ]
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_terrain = new FeatureLayer({
    title: "Terrain",
    url: url_terrain,
    renderer: {
      type: "unique-value",
      field: "TERRAIN_TY",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      },
      uniqueValueInfos: [
        {
          value: "FLAT",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 100, 0, 1.00]
          }
        }, 
        {
          value: "ROLLING",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 150, 0, 1.00]
          }
        },
        {
          value: "MOUNTAINOUS",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 200, 0, 1.00]
          }
        }
      ]
    },
    popupEnabled: true,
    visible: true
  });

  const layer_type_of_road_slope_structures = new FeatureLayer({
    title: "Type of Road Slope Structures",
    url: url_road_sections,
    renderer: {
      type: "unique-value",
      field: "ROAD_SEC_C",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      },
      uniqueValueInfos: [
        {
          value: "Primary",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 255, 0, 1.00]
          }
        }, 
        {
          value: "Secondary",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 0, 0, 1.00]
          }
        },
        {
          value: "Tertiary",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 0, 255, 1.00]
          }
        }
      ]
    },
    popupEnabled: true,
    visible: true
  });

  const layer_M01_good = new FeatureLayer({
    title: "Good",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'BOTTOM LEFT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_fair = new FeatureLayer({
    title: "Fair",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'BOTTOM RIGHT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [100, 200, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_poor = new FeatureLayer({
    title: "Poor",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'TOP LEFT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [200, 100, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_bad = new FeatureLayer({
    title: "Bad",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'TOP RIGHT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const group_M01_road_slope_condition = new GroupLayer({
    title: "Road Slope Condition",
    layers: [
      layer_M01_bad,
      layer_M01_poor,
      layer_M01_fair,
      layer_M01_good
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M01_primary = new FeatureLayer({
    title: "Primary",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'PRIMARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_secondary = new FeatureLayer({
    title: "Secondary",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'SECONDARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_tertiary = new FeatureLayer({
    title: "Tertiary",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'TERTIARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 0, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const group_M01_road_classification = new GroupLayer({
    title: "Road Classification",
    layers: [
      layer_M01_tertiary,
      layer_M01_secondary,
      layer_M01_primary
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M01_flat = new FeatureLayer({
    title: "Flat",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'PRIMARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 100, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_rolling = new FeatureLayer({
    title: "Rolling",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'SECONDARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 150, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_mountainous = new FeatureLayer({
    title: "Mountainous",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'TERTIARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 200, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const group_M01_terrain = new GroupLayer({
    title: "Terrain",
    layers: [
      layer_M01_flat,
      layer_M01_rolling,
      layer_M01_mountainous
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M01_level_01 = new FeatureLayer({
    title: "0 - 9,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH >= 0 AND SEC_LENGTH <= 10",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [232, 20, 22, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_level_02 = new FeatureLayer({
    title: "9,001 - 18,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10 AND SEC_LENGTH <= 100",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 165, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_level_03 = new FeatureLayer({
    title: "18,001 - 27,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100 AND SEC_LENGTH <= 1000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [250, 235, 54, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_level_04 = new FeatureLayer({
    title: "27,001 - 36,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 1000 AND SEC_LENGTH <= 10000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [121, 195, 20, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_level_05 = new FeatureLayer({
    title: "36,001 - 45,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10000 AND SEC_LENGTH <= 50000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [72, 125, 231, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_level_06 = new FeatureLayer({
    title: "45,001 - 54,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 50000 AND SEC_LENGTH <= 100000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [75, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_level_07 = new FeatureLayer({
    title: "54,001 - 63,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100000 AND SEC_LENGTH <= 500000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [112, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const group_M01_volume_of_traffic = new GroupLayer({
    title: "Volume of Traffic",
    layers: [
      layer_M01_level_07,
      layer_M01_level_06,
      layer_M01_level_05,
      layer_M01_level_04,
      layer_M01_level_03,
      layer_M01_level_02,
      layer_M01_level_01
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M01_soil_slope_collapse = new FeatureLayer({
    title: "Soil Slope Collapse (SSC)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH >= 0 AND SEC_LENGTH <= 10",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [232, 20, 22, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_rock_slope_collapse = new FeatureLayer({
    title: "Rock Slope Collapse / Rock Fall (RSC)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10 AND SEC_LENGTH <= 100",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 165, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_landslide = new FeatureLayer({
    title: "Landslide (LS)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100 AND SEC_LENGTH <= 1000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [250, 235, 54, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_road_slip = new FeatureLayer({
    title: "Road Slip (RS)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 1000 AND SEC_LENGTH <= 10000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [121, 195, 20, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_river_erosion = new FeatureLayer({
    title: "River Erosion (RE)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10000 AND SEC_LENGTH <= 50000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [72, 125, 231, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_debris_flow = new FeatureLayer({
    title: "Debris Flow (DF)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 50000 AND SEC_LENGTH <= 100000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [75, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_coastal_erosion = new FeatureLayer({
    title: "Coastal Erosion (CE)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100000 AND SEC_LENGTH <= 500000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [112, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const group_M01_type_of_disaster = new GroupLayer({
    title: "Type of Disaster",
    layers: [
      layer_M01_soil_slope_collapse,
      layer_M01_rock_slope_collapse,
      layer_M01_landslide,
      layer_M01_road_slip,
      layer_M01_river_erosion,
      layer_M01_debris_flow,
      layer_M01_coastal_erosion
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M01_rehabilitation = new FeatureLayer({
    title: "Rehabilitation",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'BOTTOM LEFT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_reconstruction = new FeatureLayer({
    title: "Reconstruction",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'BOTTOM RIGHT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_M01_construction = new FeatureLayer({
    title: "Construction",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'TOP LEFT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const group_M01_type_of_road_slope_structures = new GroupLayer({
    title: "Type of Road Slope Structures",
    layers: [
      layer_M01_rehabilitation,
      layer_M01_reconstruction,
      layer_M01_construction
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M02_primary = new FeatureLayer({
    title: "Primary",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'PRIMARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_secondary = new FeatureLayer({
    title: "Secondary",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'SECONDARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_tertiary = new FeatureLayer({
    title: "Tertiary",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'TERTIARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 0, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const group_M02_road_classification = new GroupLayer({
    title: "Road Classification",
    layers: [
      layer_M02_tertiary,
      layer_M02_secondary,
      layer_M02_primary
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M02_flat = new FeatureLayer({
    title: "Flat",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'PRIMARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 100, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_rolling = new FeatureLayer({
    title: "Rolling",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'SECONDARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 150, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_mountainous = new FeatureLayer({
    title: "Mountainous",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'TERTIARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 200, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const group_M02_terrain = new GroupLayer({
    title: "Terrain",
    layers: [
      layer_M02_flat,
      layer_M02_rolling,
      layer_M02_mountainous
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M02_level_01 = new FeatureLayer({
    title: "0 - 9,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH >= 0 AND SEC_LENGTH <= 10",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [232, 20, 22, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_level_02 = new FeatureLayer({
    title: "9,001 - 18,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10 AND SEC_LENGTH <= 100",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 165, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_level_03 = new FeatureLayer({
    title: "18,001 - 27,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100 AND SEC_LENGTH <= 1000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [250, 235, 54, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_level_04 = new FeatureLayer({
    title: "27,001 - 36,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 1000 AND SEC_LENGTH <= 10000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [121, 195, 20, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_level_05 = new FeatureLayer({
    title: "36,001 - 45,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10000 AND SEC_LENGTH <= 50000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [72, 125, 231, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_level_06 = new FeatureLayer({
    title: "45,001 - 54,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 50000 AND SEC_LENGTH <= 100000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [75, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_level_07 = new FeatureLayer({
    title: "54,001 - 63,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100000 AND SEC_LENGTH <= 500000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [112, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const group_M02_volume_of_traffic = new GroupLayer({
    title: "Volume of Traffic",
    layers: [
      layer_M02_level_07,
      layer_M02_level_06,
      layer_M02_level_05,
      layer_M02_level_04,
      layer_M02_level_03,
      layer_M02_level_02,
      layer_M02_level_01
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M02_soil_slope_collapse = new FeatureLayer({
    title: "Soil Slope Collapse (SSC)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH >= 0 AND SEC_LENGTH <= 10",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [232, 20, 22, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_rock_slope_collapse = new FeatureLayer({
    title: "Rock Slope Collapse / Rock Fall (RSC)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10 AND SEC_LENGTH <= 100",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 165, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_landslide = new FeatureLayer({
    title: "Landslide (LS)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100 AND SEC_LENGTH <= 1000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [250, 235, 54, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_road_slip = new FeatureLayer({
    title: "Road Slip (RS)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 1000 AND SEC_LENGTH <= 10000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [121, 195, 20, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_river_erosion = new FeatureLayer({
    title: "River Erosion (RE)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10000 AND SEC_LENGTH <= 50000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [72, 125, 231, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_debris_flow = new FeatureLayer({
    title: "Debris Flow (DF)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 50000 AND SEC_LENGTH <= 100000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [75, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_coastal_erosion = new FeatureLayer({
    title: "Coastal Erosion (CE)",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100000 AND SEC_LENGTH <= 500000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [112, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const group_M02_type_of_disaster = new GroupLayer({
    title: "Type of Disaster",
    layers: [
      layer_M02_soil_slope_collapse,
      layer_M02_rock_slope_collapse,
      layer_M02_landslide,
      layer_M02_road_slip,
      layer_M02_river_erosion,
      layer_M02_debris_flow,
      layer_M02_coastal_erosion
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M02_rehabilitation = new FeatureLayer({
    title: "Rehabilitation",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'BOTTOM LEFT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_reconstruction = new FeatureLayer({
    title: "Reconstruction",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'BOTTOM RIGHT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_M02_construction = new FeatureLayer({
    title: "Construction",
    url: url_road_sections,
    definitionExpression: "DIRECTION = 'TOP LEFT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const group_M02_type_of_road_slope_structures = new GroupLayer({
    title: "Type of Road Slope Structures",
    layers: [
      layer_M02_rehabilitation,
      layer_M02_reconstruction,
      layer_M02_construction
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M06_primary = new FeatureLayer({
    title: "Primary",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'PRIMARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_secondary = new FeatureLayer({
    title: "Secondary",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'SECONDARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_tertiary = new FeatureLayer({
    title: "Tertiary",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'TERTIARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 0, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const group_M06_road_classification = new GroupLayer({
    title: "Road Classification",
    layers: [
      layer_M06_tertiary,
      layer_M06_secondary,
      layer_M06_primary
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M06_flat = new FeatureLayer({
    title: "Flat",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'PRIMARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 100, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_rolling = new FeatureLayer({
    title: "Rolling",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'SECONDARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 150, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_mountainous = new FeatureLayer({
    title: "Mountainous",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'TERTIARY'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 200, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const group_M06_terrain = new GroupLayer({
    title: "Terrain",
    layers: [
      layer_M06_flat,
      layer_M06_rolling,
      layer_M06_mountainous
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M06_level_01 = new FeatureLayer({
    title: "0 - 9,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH >= 0 AND SEC_LENGTH <= 10",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [232, 20, 22, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_level_02 = new FeatureLayer({
    title: "9,001 - 18,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10 AND SEC_LENGTH <= 100",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 165, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_level_03 = new FeatureLayer({
    title: "18,001 - 27,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100 AND SEC_LENGTH <= 1000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [250, 235, 54, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_level_04 = new FeatureLayer({
    title: "27,001 - 36,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 1000 AND SEC_LENGTH <= 10000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [121, 195, 20, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_level_05 = new FeatureLayer({
    title: "36,001 - 45,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10000 AND SEC_LENGTH <= 50000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [72, 125, 231, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_level_06 = new FeatureLayer({
    title: "45,001 - 54,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 50000 AND SEC_LENGTH <= 100000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [75, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_level_07 = new FeatureLayer({
    title: "54,001 - 63,000",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100000 AND SEC_LENGTH <= 500000",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [112, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const group_M06_volume_of_traffic = new GroupLayer({
    title: "Volume of Traffic",
    layers: [
      layer_M06_level_07,
      layer_M06_level_06,
      layer_M06_level_05,
      layer_M06_level_04,
      layer_M06_level_03,
      layer_M06_level_02,
      layer_M06_level_01
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_M06_high = new FeatureLayer({
    title: "High Risk",
    url: url_hazard_map,
    definitionExpression: "priority_ranking = 'risk_high'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_middle = new FeatureLayer({
    title: "Middle Risk",
    url: url_hazard_map,
    definitionExpression: "priority_ranking = 'risk_middle'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 155, 55, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_M06_low = new FeatureLayer({
    title: "Low Risk",
    url: url_hazard_map,
    definitionExpression: "priority_ranking = 'risk_low'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "{SECTION_ID}: {ROAD_NAME}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const group_M06_hazard_map = new GroupLayer({
    title: "Hazards",
    layers: [
      layer_M06_high,
      layer_M06_middle,
      layer_M06_low
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  var view;

  function MapComponent () {
    // esriConfig.apiKey = STRING_KEY;

    React.useEffect(function () {
      view = new MapView({
        container: "map-container",
        map: new Map({
          basemap: "streets",
          layers: []
        }),
        center: [121.7740, 12.8797],
        zoom: 4,
        popup: {
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            position: "top-left",
            breakpoint: false
          },
          highlightEnabled: true
        }
      });

      const widget_info = document.createElement("map-info");

      widget_info.innerText = "Please select a feature.";

      view.ui.add(widget_info, {
        position: "top-left"
      });

      const widget_search = new Search({
        view: view
      });

      const expand_search = new Expand({
        view: view,
        content: widget_search,
        container: document.createElement("map-search-container"),
        placement: "bottom-end",
        group: "widgets"
      });

      view.ui.add(expand_search, {
        position: "top-right",
        index: 0
      });

      const widget_home = new Home({
        view: view,
        container: document.createElement("map-home-container")
      });

      view.ui.add(widget_home, {
        position: "top-right",
        index: 1
      });

      const widget_legend = new Legend({
        view: view,
        style: {
          type: "classic",
          layout: "stack"
        }
      });

      const expand_legend = new Expand({
        view: view,
        content: widget_legend,
        container: document.createElement("map-legend-container"),
        placement: "bottom-end",
        group: "widgets"
      });

      view.ui.add(expand_legend, {
        position: "top-right",
        index: 2
      });

      const widget_layer_list = new LayerList({
        view: view,
        visibleElements: {
          catalogLayerList: true,
          closeButton: true,
          collapseButton: false,
          errors: false,
          filter: true,
          heading: true,
          statusIndicators: false
        }
      });

      const expand_layer_list = new Expand({
        view: view,
        content: widget_layer_list,
        container: document.createElement("map-layer-list-container"),
        placement: "bottom-end",
        group: "widgets",
        expanded: true
      });

      view.ui.add(expand_layer_list, {
        position: "top-right",
        index: 3
      });

      const widget_basemap_gallery = new BasemapGallery({
        view: view
      });

      const expand_basemap_gallery = new Expand({
        view: view,
        content: widget_basemap_gallery,
        container: document.createElement("map-basemap-gallery-container"),
        placement: "bottom-end",
        group: "widgets"
      });

      view.ui.add(expand_basemap_gallery, {
        position: "top-right",
        index: 4
      });

      const widget_scale_bar = new ScaleBar({
        view: view,
        container: document.createElement("map-scale-bar")
      });

      view.ui.add(widget_scale_bar, {
        position: "bottom-left",
        index: 0
      });
     
      view.ui.move("zoom", "bottom-right");

      reactiveUtils.watch(
        function () {
          return (view.popup?.selectedFeature);
        },
        function (selectedFeature) {
          if ((selectedFeature) && (view.popup.visible)) {
            view
              .when(function () {
                view.goTo(selectedFeature.geometry.extent);
              })
              .catch(function (error) {
                console.error(error);
              });
          }
      });
    }, []);

    return (
      // Note: The parent <div> needs its width and height dimensions to be set into a constant value.
      <div id = "map-container" style = { { width: "100%", height: "100%" } }></div>
    );
  }

  function view_layer (module) {
    reactiveUtils.watch(
      function () {
        if (view) {
          view
            .when(function () {
              while (view.map.layers.length > 0) {
                view.map.layers.pop(); 
              }

              if (module === "summary") {
                view.map.layers.push(layer_type_of_road_slope_structures);
                view.map.layers.push(layer_terrain);
                view.map.layers.push(layer_hazard_map);
                view.map.layers.push(layer_inventory_of_road_slopes);
                view.map.layers.push(layer_inventory_of_road_slope_structures);
              }
              if (module === "inventory-of-road-slope-structures") {
                view.map.layers.push(group_M01_type_of_road_slope_structures);
                view.map.layers.push(group_M01_type_of_disaster);
                view.map.layers.push(group_M01_volume_of_traffic);
                view.map.layers.push(group_M01_terrain);
                view.map.layers.push(group_M01_road_classification);
                view.map.layers.push(group_M01_road_slope_condition);
              }
              if (module === "inventory-of-road-slopes") {
                view.map.layers.push(group_M02_type_of_road_slope_structures);
                view.map.layers.push(group_M02_type_of_disaster);
                view.map.layers.push(group_M02_volume_of_traffic);
                view.map.layers.push(group_M02_terrain);
                view.map.layers.push(group_M02_road_classification);
              }
              if (module === "hazard-map") {
                view.map.layers.push(group_M06_hazard_map);
                view.map.layers.push(group_M06_volume_of_traffic);
                view.map.layers.push(group_M06_terrain);
                view.map.layers.push(group_M06_road_classification);
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      });     
  }

  function recenter_map (extent) {
    reactiveUtils.watch(
      function () {
        if (view) {
          view
            .when(function () {
              view.goTo(extent);
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      });     
  }

  function open_popup (center) {
    reactiveUtils.watch(
      function () {
        if (view) {
          view
            .when(function () {
              view.openPopup({
                location: center,
                fetchFeatures: true
              });
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      });     
  }

  function close_popup() {
    reactiveUtils.watch(
      function () {
        if (view) {
          view
            .when(function () {
              view.popup.visible = false;
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      });    
  }

  return (
    <MapContext.Provider value = {
      {
        layer_road_sections,
        layer_inventory_of_road_slope_structures,
        layer_inventory_of_road_slopes,
        layer_hazard_map,
        MapComponent,
        view_layer, recenter_map, open_popup, close_popup
      } 
    }>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContextProvider;