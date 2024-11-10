import * as React from "react";

import esriConfig from "@arcgis/core/config.js";

import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";

import Expand from "@arcgis/core/widgets/Expand.js";
import Editor from "@arcgis/core/widgets/Editor.js";
import Search from "@arcgis/core/widgets/Search.js";
import Home from "@arcgis/core/widgets/Home.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Print from "@arcgis/core/widgets/Print.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const MapContext = React.createContext();

function MapContextProvider (props) {
  window.addEventListener("offline", (e) => {
    console.log("offline");
  });

  const url_road_sections = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer";
  const url_hazard_map = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/hazard_map_ver2/FeatureServer";
  const url_hazard_map_storm_surge_noah = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Storm_Surge_Hazard_Map/FeatureServer";
  const url_terrain = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer";
  const url_kilometer_posts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/kilometer_posts/FeatureServer";
  const url_regions = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/region_rdis/FeatureServer";  

  const layer_kilometer_posts = new FeatureLayer({
    title: "Kilometer Posts",
    url: url_kilometer_posts,
    renderer: {
      type: "simple",
      label: "Kilometer Post",
      symbol: {
        type: "simple-marker",
        size: 6,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: false,
    visible: true
  });

  const layer_regions = new FeatureLayer({
    title: "Regions",
    url: url_regions,
    renderer: {
      type: "simple",
      label: "Region",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: false,
    visible: true
  });

  const layer_road_sections = new FeatureLayer({
    title: "Road Sections",
    url: url_road_sections,
    renderer: {
      type: "simple",
      label: "Road Section",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: false,
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
    return ([
      {
        type: "custom",
        creator: function (target) {
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
      },
      {
        type: "attachments",
        displayType: "list"
      }
    ]);
  }

  const layer_hazard_map = new FeatureLayer({
    title: "Hazard Map",
    url: url_hazard_map,
    renderer: {
      type: "unique-value",
      field: "priority_ranking",
      defaultLabel: "Unclassified Risk",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      },
      uniqueValueInfos: [
        {
          value: "risk_low",
          label: "Low Risk",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 255, 0, 1.00]
          },
        }, 
        {
          value: "risk_middle",
          label: "Middle Risk",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 155, 55, 1.00]
          }
        },
        {
          value: "risk_high",
          label: "High Risk",
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

  const layer_hazard_map_storm_surge_noah = new FeatureLayer({
    title: "Storm Surge Hazard Map (NOAH)",
    url: url_hazard_map_storm_surge_noah,
    renderer: {
      type: "unique-value",
      field: "HAZ",
      defaultLabel: "Unclassified Hazard",
      defaultSymbol: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [255, 255, 255, 1.00],
          outline: { 
            color: [255, 255, 255, 0.50],
            width: "1px"
          }
        }
      },
      uniqueValueInfos: [
        {
          value: "1",
          label: "Low Hazard",
          symbol: {
            type: "simple-fill",
            color: [255, 255, 0, 1.00],
            outline: { 
              color: [255, 255, 0, 0.50],
              width: "1px"
            }
          }
        }, 
        {
          value: "2",
          label: "Medium Hazard",
          symbol: {
            symbol: {
              type: "simple-fill",
              color: [255, 155, 55, 1.00],
              outline: { 
                color: [255, 155, 55, 0.50],
                width: "1px"
              }
            }
          }
        },
        {
          value: "3",
          label: "High Hazard",
          symbol: {
            type: "simple-fill",
            color: [255, 0, 0, 1.00],
            outline: { 
              color: [255, 0, 0, 0.50],
              width: "1px"
            }
          }
        }
      ]
    },
    visible: true
  });
  
  function content_inventory_of_road_slopes (target) {
    return ([
      {
        type: "custom",
        creator: function (target) {
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
      },
      {
        type: "attachments",
        displayType: "list"
      }
    ]);
  }

  const layer_inventory_of_road_slopes = new FeatureLayer({
    title: "Inventory of Road Slopes",
    url: url_road_sections,
    renderer: {
      type: "simple",
      label: "Road Slope",
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

  function content_inventory_of_road_slope_structures (target) {
    return ([
      {
        type: "custom",
        creator: function (target) {
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
      },
      {
        type: "attachments",
        displayType: "list"
      }
    ]);
  }

  const layer_inventory_of_road_slope_structures = new FeatureLayer({
    title: "Inventory of Road Slope Structures",
    url: url_road_sections,
    renderer: {
      type: "simple",
      label: "Road Slope Structure",
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
  
  const layer_terrain = new FeatureLayer({
    title: "Terrain",
    url: url_terrain,
    renderer: {
      type: "unique-value",
      field: "TERRAIN_TY",
      defaultLabel: "Unclassified Terrain",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      },
      uniqueValueInfos: [
        {
          value: "FLAT",
          label: "Flat Terrain",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 100, 0, 1.00]
          }
        }, 
        {
          value: "ROLLING",
          label: "Rolling Terrain",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 150, 0, 1.00]
          }
        },
        {
          value: "MOUNTAINOUS",
          label: "Mountainous Terrain",
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
      defaultLabel: "Unclassified Road Slope Structure",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      },
      uniqueValueInfos: [
        {
          value: "Primary",
          label: "Primary Road",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 255, 0, 1.00]
          }
        }, 
        {
          value: "Secondary",
          label: "Secondary Road",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 0, 0, 1.00]
          }
        },
        {
          value: "Tertiary",
          label: "Tertiary Road",
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

  const layer_inventory_of_road_slope_structures_good = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_fair = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_poor = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_bad = new FeatureLayer({
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

  const group_inventory_of_road_slope_structures_road_slope_condition = new GroupLayer({
    title: "Road Slope Condition",
    layers: [
      layer_inventory_of_road_slope_structures_bad,
      layer_inventory_of_road_slope_structures_poor,
      layer_inventory_of_road_slope_structures_fair,
      layer_inventory_of_road_slope_structures_good
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slope_structures_primary = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_secondary = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_tertiary = new FeatureLayer({
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

  const group_inventory_of_road_slope_structures_road_classification = new GroupLayer({
    title: "Road Classification",
    layers: [
      layer_inventory_of_road_slope_structures_tertiary,
      layer_inventory_of_road_slope_structures_secondary,
      layer_inventory_of_road_slope_structures_primary
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slope_structures_flat = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_rolling = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_mountainous = new FeatureLayer({
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

  const group_inventory_of_road_slope_structures_terrain = new GroupLayer({
    title: "Terrain",
    layers: [
      layer_inventory_of_road_slope_structures_flat,
      layer_inventory_of_road_slope_structures_rolling,
      layer_inventory_of_road_slope_structures_mountainous
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slope_structures_level_01 = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_level_02 = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_level_03 = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_level_04 = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_level_05 = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_level_06 = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_level_07 = new FeatureLayer({
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

  const group_inventory_of_road_slope_structures_volume_of_traffic = new GroupLayer({
    title: "Volume of Traffic",
    layers: [
      layer_inventory_of_road_slope_structures_level_07,
      layer_inventory_of_road_slope_structures_level_06,
      layer_inventory_of_road_slope_structures_level_05,
      layer_inventory_of_road_slope_structures_level_04,
      layer_inventory_of_road_slope_structures_level_03,
      layer_inventory_of_road_slope_structures_level_02,
      layer_inventory_of_road_slope_structures_level_01
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slope_structures_soil_slope_collapse = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_rock_slope_collapse = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_landslide = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_road_slip = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_river_erosion = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_debris_flow = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_coastal_erosion = new FeatureLayer({
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

  const group_inventory_of_road_slope_structures_type_of_disaster = new GroupLayer({
    title: "Type of Disaster",
    layers: [
      layer_inventory_of_road_slope_structures_soil_slope_collapse,
      layer_inventory_of_road_slope_structures_rock_slope_collapse,
      layer_inventory_of_road_slope_structures_landslide,
      layer_inventory_of_road_slope_structures_road_slip,
      layer_inventory_of_road_slope_structures_river_erosion,
      layer_inventory_of_road_slope_structures_debris_flow,
      layer_inventory_of_road_slope_structures_coastal_erosion
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slope_structures_rehabilitation = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_reconstruction = new FeatureLayer({
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

  const layer_inventory_of_road_slope_structures_construction = new FeatureLayer({
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

  const group_inventory_of_road_slope_structures_type_of_road_slope_structures = new GroupLayer({
    title: "Type of Road Slope Structures",
    layers: [
      layer_inventory_of_road_slope_structures_rehabilitation,
      layer_inventory_of_road_slope_structures_reconstruction,
      layer_inventory_of_road_slope_structures_construction
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slopes_primary = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_secondary = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_tertiary = new FeatureLayer({
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

  const group_inventory_of_road_slopes_road_classification = new GroupLayer({
    title: "Road Classification",
    layers: [
      layer_inventory_of_road_slopes_tertiary,
      layer_inventory_of_road_slopes_secondary,
      layer_inventory_of_road_slopes_primary
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slopes_flat = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_rolling = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_mountainous = new FeatureLayer({
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

  const group_inventory_of_road_slopes_terrain = new GroupLayer({
    title: "Terrain",
    layers: [
      layer_inventory_of_road_slopes_flat,
      layer_inventory_of_road_slopes_rolling,
      layer_inventory_of_road_slopes_mountainous
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slopes_level_01 = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_level_02 = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_level_03 = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_level_04 = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_level_05 = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_level_06 = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_level_07 = new FeatureLayer({
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

  const group_inventory_of_road_slopes_volume_of_traffic = new GroupLayer({
    title: "Volume of Traffic",
    layers: [
      layer_inventory_of_road_slopes_level_07,
      layer_inventory_of_road_slopes_level_06,
      layer_inventory_of_road_slopes_level_05,
      layer_inventory_of_road_slopes_level_04,
      layer_inventory_of_road_slopes_level_03,
      layer_inventory_of_road_slopes_level_02,
      layer_inventory_of_road_slopes_level_01
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slopes_soil_slope_collapse = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_rock_slope_collapse = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_landslide = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_road_slip = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_river_erosion = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_debris_flow = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_coastal_erosion = new FeatureLayer({
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

  const group_inventory_of_road_slopes_type_of_disaster = new GroupLayer({
    title: "Type of Disaster",
    layers: [
      layer_inventory_of_road_slopes_soil_slope_collapse,
      layer_inventory_of_road_slopes_rock_slope_collapse,
      layer_inventory_of_road_slopes_landslide,
      layer_inventory_of_road_slopes_road_slip,
      layer_inventory_of_road_slopes_river_erosion,
      layer_inventory_of_road_slopes_debris_flow,
      layer_inventory_of_road_slopes_coastal_erosion
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_inventory_of_road_slopes_rehabilitation = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_reconstruction = new FeatureLayer({
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

  const layer_inventory_of_road_slopes_construction = new FeatureLayer({
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

  const group_inventory_of_road_slopes_type_of_road_slope_structures = new GroupLayer({
    title: "Type of Road Slope Structures",
    layers: [
      layer_inventory_of_road_slopes_rehabilitation,
      layer_inventory_of_road_slopes_reconstruction,
      layer_inventory_of_road_slopes_construction
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_hazard_map_primary = new FeatureLayer({
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

  const layer_hazard_map_secondary = new FeatureLayer({
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

  const layer_hazard_map_tertiary = new FeatureLayer({
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

  const group_hazard_map_road_classification = new GroupLayer({
    title: "Road Classification",
    layers: [
      layer_hazard_map_tertiary,
      layer_hazard_map_secondary,
      layer_hazard_map_primary
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_hazard_map_flat = new FeatureLayer({
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

  const layer_hazard_map_rolling = new FeatureLayer({
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

  const layer_hazard_map_mountainous = new FeatureLayer({
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

  const group_hazard_map_terrain = new GroupLayer({
    title: "Terrain",
    layers: [
      layer_hazard_map_flat,
      layer_hazard_map_rolling,
      layer_hazard_map_mountainous
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_hazard_map_level_01 = new FeatureLayer({
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

  const layer_hazard_map_level_02 = new FeatureLayer({
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

  const layer_hazard_map_level_03 = new FeatureLayer({
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

  const layer_hazard_map_level_04 = new FeatureLayer({
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

  const layer_hazard_map_level_05 = new FeatureLayer({
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

  const layer_hazard_map_level_06 = new FeatureLayer({
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

  const layer_hazard_map_level_07 = new FeatureLayer({
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

  const group_hazard_map_volume_of_traffic = new GroupLayer({
    title: "Volume of Traffic",
    layers: [
      layer_hazard_map_level_07,
      layer_hazard_map_level_06,
      layer_hazard_map_level_05,
      layer_hazard_map_level_04,
      layer_hazard_map_level_03,
      layer_hazard_map_level_02,
      layer_hazard_map_level_01
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_hazard_map_high = new FeatureLayer({
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

  const layer_hazard_map_middle = new FeatureLayer({
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

  const layer_hazard_map_low = new FeatureLayer({
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

  const group_hazard_map_hazard_map = new GroupLayer({
    title: "Hazard Map",
    layers: [
      layer_hazard_map_storm_surge_noah,
      layer_hazard_map_high,
      layer_hazard_map_middle,
      layer_hazard_map_low
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
          basemap: "dark-gray-vector",
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

      const widget_editor = new Editor({
        view: view
      });

      const expand_editor = new Expand({
        view: view,
        content: widget_editor,
        container: document.createElement("map-editor-container"),
        placement: "bottom-end",
        group: "widgets"
      });

      view.ui.add(expand_editor, {
        position: "top-right",
        index: 5
      });

      const widget_print = new Print({
        view: view
      });

      const expand_print = new Expand({
        view: view,
        content: widget_print,
        container: document.createElement("map-print-container"),
        placement: "bottom-end",
        group: "widgets"
      });

      view.ui.add(expand_print, {
        position: "top-right",
        index: 6
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
                if (selectedFeature.geometry.extent) view.goTo(selectedFeature.geometry.extent);
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
                view.map.layers.push(layer_regions);
                view.map.layers.push(layer_kilometer_posts);
                view.map.layers.push(layer_type_of_road_slope_structures);
                view.map.layers.push(layer_terrain);
                view.map.layers.push(layer_hazard_map);
                view.map.layers.push(layer_inventory_of_road_slopes);
                view.map.layers.push(layer_inventory_of_road_slope_structures);
              }
              if (module === "hazard-map") {
                view.map.layers.push(layer_regions);
                view.map.layers.push(layer_kilometer_posts);
                view.map.layers.push(group_hazard_map_volume_of_traffic);
                view.map.layers.push(group_hazard_map_terrain);
                view.map.layers.push(group_hazard_map_road_classification);
                view.map.layers.push(group_hazard_map_hazard_map);
              }
              if (module === "inventory-of-road-slopes") {
                view.map.layers.push(layer_regions);
                view.map.layers.push(layer_kilometer_posts);
                view.map.layers.push(group_inventory_of_road_slopes_type_of_road_slope_structures);
                view.map.layers.push(group_inventory_of_road_slopes_type_of_disaster);
                view.map.layers.push(group_inventory_of_road_slopes_volume_of_traffic);
                view.map.layers.push(group_inventory_of_road_slopes_terrain);
                view.map.layers.push(group_inventory_of_road_slopes_road_classification);
              }
              if (module === "inventory-of-road-slope-structures") {
                view.map.layers.push(layer_regions);
                view.map.layers.push(layer_kilometer_posts);
                view.map.layers.push(group_inventory_of_road_slope_structures_type_of_road_slope_structures);
                view.map.layers.push(group_inventory_of_road_slope_structures_type_of_disaster);
                view.map.layers.push(group_inventory_of_road_slope_structures_volume_of_traffic);
                view.map.layers.push(group_inventory_of_road_slope_structures_terrain);
                view.map.layers.push(group_inventory_of_road_slope_structures_road_classification);
                view.map.layers.push(group_inventory_of_road_slope_structures_road_slope_condition);
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

  function open_popup (features) {
    reactiveUtils.watch(
      function () {
        if (view) {
          view
            .when(function () {
              view.openPopup({
                features: features,
                fetchFeatures: false
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
        layer_hazard_map,
        layer_inventory_of_road_slopes,
        layer_inventory_of_road_slope_structures,
        MapComponent,
        view_layer, recenter_map, open_popup, close_popup
      } 
    }>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContextProvider;