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
import Editor from "@arcgis/core/widgets/Editor.js";

import Print from "@arcgis/core/widgets/Print.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const MapContext = React.createContext();

function MapContextProvider (props) {
  const url_kilometer_posts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/kilometer_posts/FeatureServer"; // TEMPORARY_DATA_SOURCE
  const url_road_sections = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer"; // TEMPORARY_DATA_SOURCE
  const url_terrain = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer"; // TEMPORARY_DATA_SOURCE
  const url_regions = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/region_rdis/FeatureServer"; // TEMPORARY_DATA_SOURCE

  const url_hazard_map = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/hazard_map_ver4/FeatureServer";
  const url_road_slopes_and_countermeasures = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/rsm_mobile_ver2/FeatureServer";

  const url_storm_surge_map_noah = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Storm_Surge_Hazard_Map/FeatureServer";

  /* Symbology Colors */

  const color_black = [0, 0, 0, 1.00];
  const color_white = [255, 255, 255, 1.00];
  
  const color_yellow = [255, 255, 0, 1.00];
  const color_red = [255, 0, 0, 1.00];
  const color_green = [0, 255, 0, 1.00];
  const color_blue = [0, 0, 255, 1.00];

  /* Reference Data */

  function content_road_sections (target) {
    const container = document.createElement("div");

    container.innerHTML = `
      <table className = "attribute-table" cellpadding = "8">
        <tbody>
          <tr>
            <td><b>Region</b></td>
            <td>${ target.graphic.attributes.REGION || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Engineering District</b></td>
            <td>${ target.graphic.attributes.DEO || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Legislative District</b></td>
            <td>${ target.graphic.attributes.CONG_DIST || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Road Name</b></td>
            <td>${ target.graphic.attributes.ROAD_NAME || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Section ID</b></td>
            <td>${ target.graphic.attributes.SECTION_ID || "No available data" }</td>
          </tr>
        </tbody>
      </table>
    `;

    return ([
      {
        type: "custom",
        creator: function () {
          return (container);
        }
      },
      {
        type: "attachments",
        displayType: "list"
      }
    ]);
  }

  const layer_road_sections = new FeatureLayer({
    title: "Road Sections",
    url: url_road_sections,
    renderer: {
      type: "simple",
      label: "Road Section",
      symbol: {
        type: "simple-line",
        width: 1,
        color: color_black
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {SECTION_ID} ({ROAD_NAME})",
      outFields: ["*"],
      content: content_road_sections
    },
    visible: true
  });

  const group_road_sections = new GroupLayer({
    title: "Road Sections",
    layers: [
      layer_road_sections
    ],
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  /* Common Data */

  function content_kilometer_posts (target) {
    const container = document.createElement("div");

    container.innerHTML = `
      <table className = "attribute-table" cellpadding = "8">
        <tbody>
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
            <td><b>Road Name</b></td>
            <td>${ target.graphic.attributes.ROAD_NAME || "No available data" }</td>
          </tr>
          <tr style = "background-color: #393939;">
            <td><b>Section ID</b></td>
            <td>${ target.graphic.attributes.SECTION_ID || "No available data" }</td>
          </tr>
          <tr style = "background-color: #2d2d2d;">
            <td><b>Kilometer Post</b></td>
            <td>${ target.graphic.attributes.KM_POST || "No available data" }</td>
          </tr>
          <tr style = "background-color: #393939;">
            <td><b>Chainage</b></td>
            <td>${ target.graphic.attributes.LOCATION || "No available data" }</td>
          </tr>
          <tr style = "background-color: #2d2d2d;">
            <td><b>Road Side</b></td>
            <td>${ target.graphic.attributes.XSP || "No available data" }</td>
          </tr>
        </tbody>
      </table>
    `;

    return ([
      {
        type: "custom",
        creator: function (target) {
          return (container);
        }
      },
      {
        type: "attachments",
        displayType: "list"
      }
    ]);
  }

  const layer_kilometer_posts = new FeatureLayer({
    title: "Kilometer Posts",
    url: url_kilometer_posts,
    renderer: {
      type: "simple",
      label: "Kilometer Post",
      symbol: {
        type: "simple-marker",
        size: "8px",
        color: [255, 255, 255, 1.00],
        outline: {
          color: [0, 0, 0, 1.00],
          width: "1px"
        }
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Kilometer Post: {KM_POST}",
      outFields: ["*"],
      content: content_kilometer_posts
    },
    visible: true
  });

  const group_kilometer_posts = new GroupLayer({
    title: "Kilometer Posts",
    layers: [
      layer_kilometer_posts
    ],
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  function generate_volume (proxy_data) {
    return (
      proxy_data >= 0 && proxy_data <= 10 ? "0 - 9,000" :
      proxy_data > 10 && proxy_data <= 100 ? "9,001 - 18,000" :
      proxy_data > 100 && proxy_data <= 1000 ? "18,001 - 27,000" :
      proxy_data > 1000 && proxy_data <= 10000 ? "27,001 - 36,000" :
      proxy_data > 10000 && proxy_data <= 50000 ? "36,001 - 45,000" :
      proxy_data > 50000 && proxy_data <= 100000 ? "45,001 - 54,000" :
      proxy_data >= 100000 && proxy_data <= 500000 ? "54,001 - 63,000" :
      "No available data"
    );
  }

  function content_volume_of_traffic (target) {
    return ([
      {
        type: "custom",
        creator: function (target) {
          return (document.createElement("attribute-table").innerHTML = `
            <table cellpadding = "8">
              <tbody>
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
                  <td><b>Section ID</b></td>
                  <td>${ target.graphic.attributes.SECTION_ID || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td><b>Road Name</b></td>
                  <td>${ target.graphic.attributes.ROAD_NAME || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Traffic Volume</b></td>
                  <td>${ generate_volume(target.graphic.attributes.SEC_LENGTH) || "No available data" }</td>
                </tr>
              </tbody>
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

  const layer_traffic_volume_level_01 = new FeatureLayer({
    title: "Level 01 Traffic Volume",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH >= 0 AND SEC_LENGTH <= 10",
    renderer: {
      type: "simple",
      label: "0 - 9,000",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [232, 20, 22, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Traffic Volume: Level 01",
      outFields: ["*"],
      content: content_volume_of_traffic
    },
    visible: true
  });

  const layer_traffic_volume_level_02 = new FeatureLayer({
    title: "Level 02 Traffic Volume",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10 AND SEC_LENGTH <= 100",
    renderer: {
      type: "simple",
      label: "9,001 - 18,000",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 165, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Traffic Volume: Level 02",
      outFields: ["*"],
      content: content_volume_of_traffic
    },
    visible: true
  });

  const layer_traffic_volume_level_03 = new FeatureLayer({
    title: "Level 03 Traffic Volume",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100 AND SEC_LENGTH <= 1000",
    renderer: {
      type: "simple",
      label: "18,001 - 27,000",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [250, 235, 54, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Traffic Volume: Level 03",
      outFields: ["*"],
      content: content_volume_of_traffic
    },
    visible: true
  });

  const layer_traffic_volume_level_04 = new FeatureLayer({
    title: "Level 04 Traffic Volume",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 1000 AND SEC_LENGTH <= 10000",
    renderer: {
      type: "simple",
      label: "27,001 - 36,000",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [121, 195, 20, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Traffic Volume: Level 04",
      outFields: ["*"],
      content: content_volume_of_traffic
    },
    visible: true
  });

  const layer_traffic_volume_level_05 = new FeatureLayer({
    title: "Level 05 Traffic Volume",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 10000 AND SEC_LENGTH <= 50000",
    renderer: {
      type: "simple",
      label: "36,001 - 45,000",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [72, 125, 231, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Traffic Volume: Level 05",
      outFields: ["*"],
      content: content_volume_of_traffic
    },
    visible: true
  });

  const layer_traffic_volume_level_06 = new FeatureLayer({
    title: "Level 06 Traffic Volume",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 50000 AND SEC_LENGTH <= 100000",
    renderer: {
      type: "simple",
      label: "45,001 - 54,000",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [75, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Traffic Volume: Level 07",
      outFields: ["*"],
      content: content_volume_of_traffic
    },
    visible: true
  });

  const layer_traffic_volume_level_07 = new FeatureLayer({
    title: "Level 07 Traffic Volume",
    url: url_road_sections,
    definitionExpression: "SEC_LENGTH > 100000 AND SEC_LENGTH <= 500000",
    renderer: {
      type: "simple",
      label: "54,001 - 63,000",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [112, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Traffic Volume: Level 07",
      outFields: ["*"],
      content: content_volume_of_traffic
    },
    visible: true
  });

  const group_volume_of_traffic = new GroupLayer({
    title: "Volume of Traffic",
    layers: [
      layer_traffic_volume_level_07,
      layer_traffic_volume_level_06,
      layer_traffic_volume_level_05,
      layer_traffic_volume_level_04,
      layer_traffic_volume_level_03,
      layer_traffic_volume_level_02,
      layer_traffic_volume_level_01
    ],
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  function content_road_classification (target) {
    return ([
      {
        type: "custom",
        creator: function (target) {
          return (document.createElement("attribute-table").innerHTML = `
            <table cellpadding = "8">
              <tbody>
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
                  <td><b>Road Name</b></td>
                  <td>${ target.graphic.attributes.ROAD_NAME || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td><b>Section ID</b></td>
                  <td>${ target.graphic.attributes.SECTION_ID || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Road Classification</b></td>
                  <td>${ target.graphic.attributes.ROAD_SEC_C || "No available data" }</td>
                </tr>
              </tbody>
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

  const layer_primary_roads = new FeatureLayer({
    title: "Primary Roads",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'PRIMARY'",
    renderer: {
      type: "simple",
      label: "Primary Road",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Classification: {ROAD_SEC_C}",
      outFields: ["*"],
      content: content_road_classification
    },
    visible: true
  });

  const layer_secondary_roads = new FeatureLayer({
    title: "Secondary Roads",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'SECONDARY'",
    renderer: {
      type: "simple",
      label: "Secondary Road",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 255, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Classification: {ROAD_SEC_C}",
      outFields: ["*"],
      content: content_road_classification
    },
    visible: true
  });

  const layer_tertiary_roads = new FeatureLayer({
    title: "Tertiary Roads",
    url: url_road_sections,
    definitionExpression: "ROAD_SEC_C = 'TERTIARY'",
    renderer: {
      type: "simple",
      label: "Tertiary Road",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 0, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Classification: {ROAD_SEC_C}",
      outFields: ["*"],
      content: content_road_classification
    },
    visible: true
  });

  const group_road_classification = new GroupLayer({
    title: "Road Classification",
    layers: [
      layer_tertiary_roads,
      layer_secondary_roads,
      layer_primary_roads
    ],
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  function content_terrain (target) {
    return ([
      {
        type: "custom",
        creator: function (target) {
          return (document.createElement("attribute-table").innerHTML = `
            <table cellpadding = "8">
              <tbody>
                <tr style = "background-color: #393939;">
                  <td><b>Region</b></td>
                  <td>${ target.graphic.attributes.region_nam || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Engineering District</b></td>
                  <td>${ target.graphic.attributes.district_n || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td><b>Legislative District</b></td>
                  <td>${ target.graphic.attributes.CONG_DIST || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Road Name</b></td>
                  <td>${ target.graphic.attributes.road_name || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td><b>Section ID</b></td>
                  <td>${ target.graphic.attributes.section_id || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Terrain Type</b></td>
                  <td>${ target.graphic.attributes.terrain_ty || "No available data" }</td>
                </tr>
              </tbody>
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

  const layer_flat_terrain = new FeatureLayer({
    title: "Flat Terrain",
    url: url_terrain,
    definitionExpression: "terrain_ty = 'Flat'",
    renderer: {
      type: "simple",
      label: "Flat Terrain",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 50, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Terrain Type: {terrain_ty}",
      outFields: ["*"],
      content: content_terrain
    },
    visible: true
  });

  const layer_rolling_terrain = new FeatureLayer({
    title: "Rolling Terrain",
    url: url_terrain,
    definitionExpression: "terrain_ty = 'Rolling'",
    renderer: {
      type: "simple",
      label: "Rolling Terrain",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 150, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Terrain Type: {terrain_ty}",
      outFields: ["*"],
      content: content_terrain
    },
    visible: true
  });

  const layer_mountainous_terrain = new FeatureLayer({
    title: "Mountainous Terrain",
    url: url_terrain,
    definitionExpression: "terrain_ty = 'Mountainous'",
    renderer: {
      type: "simple",
      label: "Mountainous Terrain",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 250, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Terrain Type: {terrain_ty}",
      outFields: ["*"],
      content: content_terrain
    },
    visible: true
  });

  const group_terrain = new GroupLayer({
    title: "Terrain",
    layers: [
      layer_mountainous_terrain,
      layer_rolling_terrain,
      layer_flat_terrain
    ],
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  function content_regions (target) {
    return ([
      {
        type: "custom",
        creator: function (target) {
          return (document.createElement("attribute-table").innerHTML = `
            <table cellpadding = "8">
              <tbody>
                <tr style = "background-color: #393939;">
                  <td><b>Region</b></td>
                  <td>${ target.graphic.attributes.REGION || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Region Name</b></td>
                  <td>${ target.graphic.attributes.VAR_NAME || "No available data" }</td>
                </tr>
              </tbody>
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

  const layer_regions = new FeatureLayer({
    title: "Regions",
    url: url_regions,
    renderer: {
      type: "simple",
      label: "Region",
      symbol: {
        type: "simple-fill",
        color: [255, 255, 255, 0.10],
        outline: { 
          color: [255, 255, 255, 1.00],
          width: "1px"
        }
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Region: {REGION}",
      outFields: ["*"],
      content: content_regions
    },
    visible: true
  });

  const group_regions = new GroupLayer({
    title: "Regions",
    layers: [
      layer_regions
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  /* Summary Data */

  const disaster_codes = {
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
              <tbody>
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
                  <td><b>Hazard Risk</b></td>
                  <td>${ target.graphic.attributes.hazard_risk || "No available data" }</td>
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
                  <td>${ disaster_codes[target.graphic.attributes.disaster_type] || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Slope Type Left</b></td>
                  <td>${ target.graphic.attributes.slope_type_left || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td><b>Slope Type Right</b></td>
                  <td>${ target.graphic.attributes.slope_type_right || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Survey Side</b></td>
                  <td>${ target.graphic.attributes.survey_side || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td colspan="2" style="text-align: center;"><b>Hazard Scores</b></td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Profile Slope Height Score</b></td>
                  <td>${ target.graphic.attributes.profile_slope_height_score || "0" }</td>
                </tr><tr style = "background-color: #393939;">
                  <td><b>Profile Slope Angle Score</b></td>
                  <td>${ target.graphic.attributes.profile_slope_angle_score || "0" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Topography G1 Score</b></td>
                  <td>${ target.graphic.attributes.topography_g1_score || "0" }</td>
                </tr><tr style = "background-color: #393939;">
                  <td><b>Topography G2 Score</b></td>
                  <td>${ target.graphic.attributes.topography_g2_score || "0" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Geological Soil Score</b></td>
                  <td>${ target.graphic.attributes.geological_soil_score || "0" }</td>
                </tr><tr style = "background-color: #393939;">
                  <td><b>Geological Rock Score</b></td>
                  <td>${ target.graphic.attributes.geological_rock_score || "0" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Geological Slope Score</b></td>
                  <td>${ target.graphic.attributes.geological_slope_score || "0" }</td>
                </tr><tr style = "background-color: #393939;">
                  <td><b>Geological Sediment Score</b></td>
                  <td>${ target.graphic.attributes.geological_sediment_score || "0" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Surface Vegetation Score</b></td>
                  <td>${ target.graphic.attributes.surface_vegetation_score || "0" }</td>
                </tr><tr style = "background-color: #393939;">
                  <td><b>Surface Soil Score</b></td>
                  <td>${ target.graphic.attributes.surface_soil_score || "0" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Surface Water Score</b></td>
                  <td>${ target.graphic.attributes.surface_water_score || "0" }</td>
                </tr><tr style = "background-color: #393939;">
                  <td><b>Anomaly Score</b></td>
                  <td>${ target.graphic.attributes.anomaly_score || "0" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Total Score (A)</b></td>
                  <td>${ target.graphic.attributes.total_score_a || "0" }</td>
                </tr><tr style = "background-color: #393939;">
                  <td><b>Total Score (B)</b></td>
                  <td>${ target.graphic.attributes.total_score_b || "0" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Disaster History Score</b></td>
                  <td>${ target.graphic.attributes.disaster_history_score || "0" }</td>
                </tr><tr style = "background-color: #393939;">
                  <td><b>Score (D)</b></td>
                  <td>${ target.graphic.attributes.score_d || "0" }</td>
                </tr>
              </tbody>
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
      field: "hazard_risk",
      defaultLabel: "Unclassified Risk",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00],
        marker: {
          style: "x",
          color: [255, 255, 255, 1.00],
          placement: "begin-end"
       }
      },
      uniqueValueInfos: [
        {
          value: "Low",
          label: "Low Risk",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 255, 0, 1.00],
            marker: {
              style: "x",
              color: [255, 255, 0, 1.00],
              placement: "begin-end"
           }
          },
        }, 
        {
          value: "Middle",
          label: "Middle Risk",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 155, 55, 1.00],
            marker: {
              style: "x",
              color: [255, 155, 55, 1.00],
              placement: "begin-end"
           }
          }
        },
        {
          value: "High",
          label: "High Risk",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 0, 0, 1.00],
            marker: {
              style: "x",
              color: [255, 0, 0, 1.00],
              placement: "begin-end"
           }
          }
        }
      ]
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  function content_road_slopes_and_countermeasures (target) {
    return ([
      {
        type: "custom",
        creator: function (target) {
          return (document.createElement("attribute-table").innerHTML = `
            <table cellpadding = "8">
              <tbody>
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
                  <td><b>Hazard Risk</b></td>
                  <td>${ target.graphic.attributes.hazard_risk || "No available data" }</td>
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
                  <td><b>Slope Type Right</b></td>
                  <td>${ target.graphic.attributes.rsm_category || "No available data" }</td>
                </tr>
              </tbody>
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

  const layer_road_slopes_and_countermeasures = new FeatureLayer({
    title: "Road Slopes and Countermeasures",
    url: url_road_slopes_and_countermeasures,
    renderer: {
      type: "simple",
      label: "Road Slopes and Countermeasures Data",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {SECTION_ID} ({ROAD_NAME})",
      outFields: ["*"],
      content: content_road_slopes_and_countermeasures
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
              <tbody>
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
                  <td><b>Volume of Traffic</b> (AADT)</td>
                  <td>${ target.graphic.attributes.aadt || "No available data" }</td>
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
                  <td>${ target.graphic.attributes.disaster_type || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>With Slope Disaster Failure?</b></td>
                  <td>${ target.graphic.attributes.past_failure || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td><b>Date of Occurence</b></td>
                  <td>${ target.graphic.attributes.date_of_occurence || "No available data" }</td>
                </tr>
              </tbody>
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
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope'",
    renderer: {
      type: "simple",
      label: "Inventory of Road Slopes",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
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
              <tbody>
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
                  <td><b>Volume of Traffic</b> (AADT)</td>
                  <td>${ target.graphic.attributes.aadt || "No available data" }</td>
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
                  <td><b>Existing Type of Road Slope Structure</b></td>
                  <td>${ target.graphic.attributes.road_slope_structure_type || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Length</b> (meters)</td>
                  <td>${ target.graphic.attributes.road_length || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td><b>Height</b> (meters)</td>
                  <td>${ target.graphic.attributes.road_height || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Area</b> (sq. meters)</td>
                  <td>${ target.graphic.attributes.target_area || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td><b>Slope Angle / Gradient</b> (degrees)</td>
                  <td>${ target.graphic.attributes.road_angle || "No available data" }</td>
                </tr>
                <tr style = "background-color: #2d2d2d;">
                  <td><b>Type of Disaster</b></td>
                  <td>${ target.graphic.attributes.disaster_type || "No available data" }</td>
                </tr>
                <tr style = "background-color: #393939;">
                  <td><b>Condition</b></td>
                  <td>${ target.graphic.attributes.road_condition || "No available data" }</td>
                </tr>
              </tbody>
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
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures'",
    renderer: {
      type: "simple",
      label: "Inventory of Road Slope Structures",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 155, 55, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  /* Hazard Map Data */

  const layer_hazard_map_slope_hazard_risk_low = new FeatureLayer({
    title: "Low Risk",
    url: url_hazard_map,
    definitionExpression: "hazard_risk = 'Low'",
    renderer: {
      type: "simple",
      label: "Low Risk",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 0, 1.00],
        marker: {
          style: "x",
          color: [255, 255, 0, 1.00],
          placement: "begin-end"
       }
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Slope Hazard Risk Level: {hazard_risk}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_hazard_map_slope_hazard_risk_medium = new FeatureLayer({
    title: "Medium Risk",
    url: url_hazard_map,
    definitionExpression: "hazard_risk = 'Middle'",
    renderer: {
      type: "simple",
      label: "Medium Risk",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 155, 55, 1.00],
        marker: {
          style: "x",
          color: [255, 155, 55, 1.00],
          placement: "begin-end"
       }
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Slope Hazard Risk Level: {hazard_risk}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const layer_hazard_map_slope_hazard_risk_high = new FeatureLayer({
    title: "High Risk",
    url: url_hazard_map,
    definitionExpression: "hazard_risk = 'High'",
    renderer: {
      type: "simple",
      label: "High Risk",
      symbol: {
        type: "simple-line",
        width: 5,
        color: [255, 0, 0, 1.00],
        marker: {
          style: "square",
          color: [255, 0, 0, 1.00],
          placement: "begin-end"
       }
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Slope Hazard Risk Level: {hazard_risk}",
      outFields: ["*"],
      content: content_hazard_map
    },
    visible: true
  });

  const group_hazard_map_slope_hazard_risks = new GroupLayer({
    title: "Slope Hazard Risks",
    layers: [
      layer_hazard_map_slope_hazard_risk_high,
      layer_hazard_map_slope_hazard_risk_medium,
      layer_hazard_map_slope_hazard_risk_low
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  function generate_storm_surge (proxy_data) {
    return (
      proxy_data === 1 ? "Low Risk" :
      proxy_data === 2 ? "Medium Risk" :
      proxy_data === 3 ? "High Risk" :
      "No available data"
    );
  }

  function content_storm_surge (target) {
    return ([
      {
        type: "custom",
        creator: function (target) {
          return (document.createElement("attribute-table").innerHTML = `
            <table cellpadding = "8">
              <tbody>
                <tr style = "background-color: #393939;">
                  <td><b>Storm Surge Hazard Level</b></td>
                  <td>${ generate_storm_surge(target.graphic.attributes.HAZ) || "No available data" }</td>
                </tr>
              </tbody>
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

  const layer_hazard_map_storm_surge_risk_low = new FeatureLayer({
    title: "Low Risk",
    url: url_storm_surge_map_noah,
    definitionExpression: "HAZ = 1",
    renderer: {
      type: "simple",
      label: "Low Risk",
      symbol: {
        type: "simple-fill",
        color: [255, 255, 0, 1.00],
        outline: { 
          color: [255, 255, 0, 0.50],
          width: "1px"
        }
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Storm Surge Hazard Risk Level: {HAZ}",
      outFields: ["*"],
      content: content_storm_surge
    },
    visible: true
  });

  const layer_hazard_map_storm_surge_risk_medium = new FeatureLayer({
    title: "Medium Risk",
    url: url_storm_surge_map_noah,
    definitionExpression: "HAZ = 2",
    renderer: {
      type: "simple",
      label: "Medium Risk",
      symbol: {
        type: "simple-fill",
        color: [255, 155, 55, 1.00],
        outline: { 
          color: [255, 155, 55, 0.50],
          width: "1px"
        }
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Storm Surge Hazard Risk Level: {HAZ}",
      outFields: ["*"],
      content: content_storm_surge
    },
    visible: true
  });

  const layer_hazard_map_storm_surge_risk_high = new FeatureLayer({
    title: "High Risk",
    url: url_storm_surge_map_noah,
    definitionExpression: "HAZ = 3",
    renderer: {
      type: "simple",
      label: "High Risk",
      symbol: {
        type: "simple-fill",
        color: [255, 0, 0, 1.00],
        outline: { 
          color: [255, 0, 0, 0.50],
          width: "1px"
        }
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Storm Surge Hazard Risk Level: {HAZ}",
      outFields: ["*"],
      content: content_storm_surge
    },
    visible: true
  });

  const group_hazard_map_storm_surge_map_noah = new GroupLayer({
    title: "Storm Surge Hazard Map (NOAH)",
    layers: [
      layer_hazard_map_storm_surge_risk_low,
      layer_hazard_map_storm_surge_risk_medium,
      layer_hazard_map_storm_surge_risk_high
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  /* Inventory of Road Slopes Data */
  
  const layer_inventory_of_road_slopes_soil_slope_collapse = new FeatureLayer({
    title: "Soil Slope Collapse (SSC)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND disaster_type = 'Soil Slope Collapse'",
    renderer: {
      type: "simple",
      label: "Road Affected by Soil Slope Collapse",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [232, 20, 22, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_rock_slope_collapse = new FeatureLayer({
    title: "Rock Slope Collapse (RSC) / Rock Fall (RF)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND disaster_type = 'Rock Slope Collapse/Rock Fall'",
    renderer: {
      type: "simple",
      label: "Road Affected by Rock Slope Collapse or Rock Fall",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 165, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  // const layer_inventory_of_road_slopes_rock_fall = new FeatureLayer({
  //   title: "Rock Fall (RF)",
  //   url: url_road_slopes_and_countermeasures,
  //   definitionExpression: "rsm_category = 'Inventory of Road Slope' AND disaster_type = 'Rock Slope Collapse/Rock Fall'",
  //   renderer: {
  //     type: "simple",
  //     label: "Road Affected by Rock Fall",
  //     symbol: {
  //       type: "simple-line",
  //       width: 1,
  //       color: [255, 165, 0, 1.00]
  //     }
  //   },
  //   popupEnabled: true,
  //   popupTemplate: {
  //     title: "Road Section: {section_id} ({road_name})",
  //     outFields: ["*"],
  //     content: content_inventory_of_road_slopes
  //   },
  //   visible: true
  // });

  const layer_inventory_of_road_slopes_landslide = new FeatureLayer({
    title: "Landslide (LS)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND disaster_type = 'Landslide'",
    renderer: {
      type: "simple",
      label: "Road Affected by Landslide",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [250, 235, 54, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_road_slip = new FeatureLayer({
    title: "Road Slip (RS)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND disaster_type = 'Road Slip'",
    renderer: {
      type: "simple",
      label: "Road Affected by Road Slip",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [121, 195, 20, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_river_erosion = new FeatureLayer({
    title: "River Erosion (RE)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND disaster_type = 'River Erosion'",
    renderer: {
      type: "simple",
      label: "Road Affected by River Erosion",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [72, 125, 231, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_debris_flow = new FeatureLayer({
    title: "Debris Flow (DF)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND disaster_type = 'Debris Flow'",
    renderer: {
      type: "simple",
      label: "Road Affected by Debris Flow",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [75, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_coastal_erosion = new FeatureLayer({
    title: "Coastal Erosion (CE)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND disaster_type = 'Coastal Erosion'",
    renderer: {
      type: "simple",
      label: "Road Affected by Coastal Erosion",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [112, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const group_inventory_of_road_slopes_type_of_disaster = new GroupLayer({
    title: "Inventory of Road Slopes - Types of Disaster",
    layers: [
      layer_inventory_of_road_slopes_soil_slope_collapse,
      layer_inventory_of_road_slopes_rock_slope_collapse,
      // layer_inventory_of_road_slopes_rock_fall,
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

  const layer_inventory_of_road_slopes_structure_type_01 = new FeatureLayer({
    title: "Grouted Riprap",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Grouted Riprap'",
    renderer: {
      type: "simple",
      label: "Grouted Riprap",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_02 = new FeatureLayer({
    title: "Grouted Riprap with Steel Sheet Pile Foundation",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Grouted Riprap with Steel Sheet Pile Foundation'",
    renderer: {
      type: "simple",
      label: "Grouted Riprap with Steel Sheet Pile Foundation",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_03 = new FeatureLayer({
    title: "Grouted Riprap with Concrete Sheet Pile Foundation",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Grouted Riprap with Concrete Sheet Pile Foundation'",
    renderer: {
      type: "simple",
      label: "Grouted Riprap with Concrete Sheet Pile Foundation",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_04 = new FeatureLayer({
    title: "Rubble Concrete Revetment (Spread Type I)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Rubble Concrete Revetment (Spread Type I)'",
    renderer: {
      type: "simple",
      label: "Rubble Concrete Revetment (Spread Type I)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_05 = new FeatureLayer({
    title: "Stone Masonry",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Stone Masonry'",
    renderer: {
      type: "simple",
      label: "Stone Masonry",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_06 = new FeatureLayer({
    title: "Concrete Slope Protection (Reinforced Concrete Type II)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Concrete Slope Protection (Reinforced Concrete Type II)'",
    renderer: {
      type: "simple",
      label: "Concrete Slope Protection (Reinforced Concrete Type II)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_07 = new FeatureLayer({
    title: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)'",
    renderer: {
      type: "simple",
      label: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_08 = new FeatureLayer({
    title: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)'",
    renderer: {
      type: "simple",
      label: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_09 = new FeatureLayer({
    title: "Gravity Wall (Type I)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Gravity Wall (Type I)'",
    renderer: {
      type: "simple",
      label: "Gravity Wall (Type I)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_10 = new FeatureLayer({
    title: "Gabion / Mattress Slope Protection",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Gabion/Mattress Slope Protection'",
    renderer: {
      type: "simple",
      label: "Gabion / Mattress Slope Protection",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_11 = new FeatureLayer({
    title: "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Hydroseeding)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)'",
    renderer: {
      type: "simple",
      label: "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Hydroseeding)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_12 = new FeatureLayer({
    title: "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Vetiver Grass)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Bio-Engineering Solutions (Coco-Net, Coco-Log & Vetiver Grass)'",
    renderer: {
      type: "simple",
      label: "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Vetiver Grass)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_13 = new FeatureLayer({
    title: "Earthfill Dike (Type I)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Earthfill Dike (Type I)'",
    renderer: {
      type: "simple",
      label: "Earthfill Dike (Type I)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_14 = new FeatureLayer({
    title: "Boulder Spur Dike (Type II)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Boulder Spur Dike (Type II)'",
    renderer: {
      type: "simple",
      label: "Boulder Spur Dike (Type II)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_inventory_of_road_slopes_structure_type_15 = new FeatureLayer({
    title: "Gabions Revetment (Pile-Up Type)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = 'Gabions Revetment (Pile-Up Type)'",
    renderer: {
      type: "simple",
      label: "Gabions Revetment (Pile-Up Type)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const group_inventory_of_road_slopes_type_of_road_slope_structures = new GroupLayer({
    title: "Inventory of Road Slopes - Type of Road Slope Structures",
    layers: [
      layer_inventory_of_road_slopes_structure_type_01,
      layer_inventory_of_road_slopes_structure_type_02,
      layer_inventory_of_road_slopes_structure_type_03,
      layer_inventory_of_road_slopes_structure_type_04,
      layer_inventory_of_road_slopes_structure_type_05,
      layer_inventory_of_road_slopes_structure_type_06,
      layer_inventory_of_road_slopes_structure_type_07,
      layer_inventory_of_road_slopes_structure_type_08,
      layer_inventory_of_road_slopes_structure_type_09,
      layer_inventory_of_road_slopes_structure_type_10,
      layer_inventory_of_road_slopes_structure_type_11,
      layer_inventory_of_road_slopes_structure_type_12,
      layer_inventory_of_road_slopes_structure_type_13,
      layer_inventory_of_road_slopes_structure_type_14,
      layer_inventory_of_road_slopes_structure_type_15
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  /* Inventory of Road Slope Structures Data */
  
  const layer_inventory_of_road_slope_structures_good = new FeatureLayer({
    title: "Roads in Good Condition",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_condition = 'Good'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        label: "Road in Good Condition",
        width: 1,
        color: [0, 145, 173, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_fair = new FeatureLayer({
    title: "Roads in Fair Condition",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_condition = 'Fair'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        label: "Road in Fair Condition",
        width: 1,
        color: [69, 94, 137, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_poor = new FeatureLayer({
    title: "Roads in Poor Condition",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_condition = 'Poor'",
    renderer: {
      type: "simple",
      label: "Road in Poor Condition",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [137, 43, 100, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_bad = new FeatureLayer({
    title: "Roads in Bad Condition",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_condition = 'Bad'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        label: "Road in Bad Condition",
        width: 1,
        color: [183, 9, 76, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const group_inventory_of_road_slope_structures_road_slope_condition = new GroupLayer({
    title: "Inventory of Road Slopes - Road Slope Condition",
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

  const layer_inventory_of_road_slope_structures_soil_slope_collapse = new FeatureLayer({
    title: "Soil Slope Collapse (SSC)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND disaster_type = 'Soil Slope Collapse'",
    renderer: {
      type: "simple",
      label: "Road Affected by Soil Slope Collapse",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [232, 20, 22, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_rock_slope_collapse = new FeatureLayer({
    title: "Rock Slope Collapse (RSC) / Rock Fall (RF)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND disaster_type = 'Rock Slope Collapse/Rock Fall'",
    renderer: {
      type: "simple",
      label: "Road Affected by Rock Slope Collapse or Rock Fall",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 165, 0, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  // const layer_inventory_of_road_slope_structures_rock_fall = new FeatureLayer({
  //   title: "Rock Fall (RF)",
  //   url: url_road_slopes_and_countermeasures,
  //   definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND disaster_type = 'Rock Slope Collapse/Rock Fall'",
  //   renderer: {
  //     type: "simple",
  //     label: "Road Affected by Rock Fall",
  //     symbol: {
  //       type: "simple-line",
  //       width: 1,
  //       color: [255, 165, 0, 1.00]
  //     }
  //   },
  //   popupEnabled: true,
  //   popupTemplate: {
  //     title: "Road Section: {section_id} ({road_name})",
  //     outFields: ["*"],
  //     content: content_inventory_of_road_slope_structures
  //   },
  //   visible: true
  // });

  const layer_inventory_of_road_slope_structures_landslide = new FeatureLayer({
    title: "Landslide (LS)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND disaster_type = 'Landslide'",
    renderer: {
      type: "simple",
      label: "Road Affected by Landslide",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [250, 235, 54, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_road_slip = new FeatureLayer({
    title: "Road Slip (RS)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND disaster_type = 'Road Slip'",
    renderer: {
      type: "simple",
      label: "Road Affected by Road Slip",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [121, 195, 20, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_river_erosion = new FeatureLayer({
    title: "River Erosion (RE)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND disaster_type = 'River Erosion'",
    renderer: {
      type: "simple",
      label: "Road Affected by River Erosion",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [72, 125, 231, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_debris_flow = new FeatureLayer({
    title: "Debris Flow (DF)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND disaster_type = 'Debris Flow'",
    renderer: {
      type: "simple",
      label: "Road Affected by Debris Flow",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [75, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_coastal_erosion = new FeatureLayer({
    title: "Coastal Erosion (CE)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND disaster_type = 'Coastal Erosion'",
    renderer: {
      type: "simple",
      label: "Road Affected by Coastal Erosion",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [112, 54, 157, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const group_inventory_of_road_slope_structures_type_of_disaster = new GroupLayer({
    title: "Inventory of Road Slope Structures - Type of Disaster",
    layers: [
      layer_inventory_of_road_slope_structures_soil_slope_collapse,
      layer_inventory_of_road_slope_structures_rock_slope_collapse,
      // layer_inventory_of_road_slope_structures_rock_fall,
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

  const layer_inventory_of_road_slope_structures_structure_type_01 = new FeatureLayer({
    title: "Grouted Riprap",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Grouted Riprap'",
    renderer: {
      type: "simple",
      label: "Grouted Riprap",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_02 = new FeatureLayer({
    title: "Grouted Riprap with Steel Sheet Pile Foundation",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Grouted Riprap with Steel Sheet Pile Foundation'",
    renderer: {
      type: "simple",
      label: "Grouted Riprap with Steel Sheet Pile Foundation",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_03 = new FeatureLayer({
    title: "Grouted Riprap with Concrete Sheet Pile Foundation",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Grouted Riprap with Concrete Sheet Pile Foundation'",
    renderer: {
      type: "simple",
      label: "Grouted Riprap with Concrete Sheet Pile Foundation",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_04 = new FeatureLayer({
    title: "Rubble Concrete Revetment (Spread Type I)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Rubble Concrete Revetment (Spread Type I)'",
    renderer: {
      type: "simple",
      label: "Rubble Concrete Revetment (Spread Type I)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_05 = new FeatureLayer({
    title: "Stone Masonry",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Stone Masonry'",
    renderer: {
      type: "simple",
      label: "Stone Masonry",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_06 = new FeatureLayer({
    title: "Concrete Slope Protection (Reinforced Concrete Type II)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Concrete Slope Protection (Reinforced Concrete Type II)'",
    renderer: {
      type: "simple",
      label: "Concrete Slope Protection (Reinforced Concrete Type II)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_07 = new FeatureLayer({
    title: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)'",
    renderer: {
      type: "simple",
      label: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_08 = new FeatureLayer({
    title: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)'",
    renderer: {
      type: "simple",
      label: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_09 = new FeatureLayer({
    title: "Gravity Wall (Type I)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Gravity Wall (Type I)'",
    renderer: {
      type: "simple",
      label: "Gravity Wall (Type I)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_10 = new FeatureLayer({
    title: "Gabion / Mattress Slope Protection",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Gabion/Mattress Slope Protection'",
    renderer: {
      type: "simple",
      label: "Gabion / Mattress Slope Protection",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_11 = new FeatureLayer({
    title: "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Hydroseeding)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)'",
    renderer: {
      type: "simple",
      label: "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Hydroseeding)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_12 = new FeatureLayer({
    title: "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Vetiver Grass)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Bio-Engineering Solutions (Coco-Net, Coco-Log & Vetiver Grass)'",
    renderer: {
      type: "simple",
      label: "Bio-Engineering Solutions (Coco-Net, Coco-Log, & Vetiver Grass)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_13 = new FeatureLayer({
    title: "Earthfill Dike (Type I)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Earthfill Dike (Type I)'",
    renderer: {
      type: "simple",
      label: "Earthfill Dike (Type I)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_14 = new FeatureLayer({
    title: "Boulder Spur Dike (Type II)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Boulder Spur Dike (Type II)'",
    renderer: {
      type: "simple",
      label: "Boulder Spur Dike (Type II)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const layer_inventory_of_road_slope_structures_structure_type_15 = new FeatureLayer({
    title: "Gabions Revetment (Pile-Up Type)",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = 'Gabions Revetment (Pile-Up Type)'",
    renderer: {
      type: "simple",
      label: "Gabions Revetment (Pile-Up Type)",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  const group_inventory_of_road_slope_structures_type_of_road_slope_structures = new GroupLayer({
    title: "Inventory of Road Slope Structures - Type of Road Slope Structures",
    layers: [
      layer_inventory_of_road_slope_structures_structure_type_01,
      layer_inventory_of_road_slope_structures_structure_type_02,
      layer_inventory_of_road_slope_structures_structure_type_03,
      layer_inventory_of_road_slope_structures_structure_type_04,
      layer_inventory_of_road_slope_structures_structure_type_05,
      layer_inventory_of_road_slope_structures_structure_type_06,
      layer_inventory_of_road_slope_structures_structure_type_07,
      layer_inventory_of_road_slope_structures_structure_type_08,
      layer_inventory_of_road_slope_structures_structure_type_09,
      layer_inventory_of_road_slope_structures_structure_type_10,
      layer_inventory_of_road_slope_structures_structure_type_11,
      layer_inventory_of_road_slope_structures_structure_type_12,
      layer_inventory_of_road_slope_structures_structure_type_13,
      layer_inventory_of_road_slope_structures_structure_type_14,
      layer_inventory_of_road_slope_structures_structure_type_15
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  /* Potential Road Slope Projects Data */

  const layer_potential_road_slope_projects_rehabilitation = new FeatureLayer({
    title: "Rehabilitation / Major Repair",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND type_of_work = 'Rehabilitation'",
    renderer: {
      type: "simple",
      label: "Rehabilitation / Major Repair",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_potential_road_slope_project_reconstruction = new FeatureLayer({
    title: "Reconstruction",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND type_of_work = 'Reconstruction'",
    renderer: {
      type: "simple",
      label: "Reconstruction",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slopes
    },
    visible: true
  });

  const layer_potential_road_slope_project_construction = new FeatureLayer({
    title: "Construction",
    url: url_road_slopes_and_countermeasures,
    definitionExpression: "rsm_category = 'Inventory of Road Slope' AND type_of_work = 'Construction'",
    renderer: {
      type: "simple",
      label: "Construction",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupEnabled: true,
    popupTemplate: {
      title: "Road Section: {section_id} ({road_name})",
      outFields: ["*"],
      content: content_inventory_of_road_slope_structures // To change
    },
    visible: true
  });

  const group_potential_road_slope_projects = new GroupLayer({
    title: "Potential Road Slope Projects",
    layers: [
      layer_potential_road_slope_projects_rehabilitation,
      layer_potential_road_slope_project_reconstruction,
      layer_potential_road_slope_project_construction
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
          basemap: "osm",
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

      const widget_info_container = document.createElement("div");

      widget_info_container.id = "widget-info-container";
      widget_info_container.innerText = "Please select a feature.";

      view.ui.add(widget_info_container, {
        position: "top-left"
      });

      const widget_search_container = document.createElement("div");

      widget_search_container.id = "widget-search-container";

      const widget_search = new Search({
        view: view,
        container: widget_search_container
      });

      view.ui.add(widget_search, {
        position: "top-right",
        index: 0
      });

      const widget_home_container = document.createElement("div");

      widget_home_container.id = "widget-home-container";

      const widget_home = new Home({
        view: view,
        container: widget_home_container
      });

      view.ui.add(widget_home, {
        position: "top-right",
        index: 1
      });

      const widget_legend_container = document.createElement("div");

      widget_legend_container.id = "widget-legend-container";

      const widget_legend = new Legend({
        view: view,
        container: widget_legend_container,
        style: {
          type: "classic",
          layout: "stack"
        }
      });
      
      const expand_legend_container = document.createElement("div");

      expand_legend_container.id = "expand-legend-container";

      const expand_legend = new Expand({
        view: view,
        group: "widgets",
        container: expand_legend_container,
        content: widget_legend,
        placement: "bottom-end",
        autoCollapse: true
      });

      view.ui.add(expand_legend, {
        position: "top-right",
        index: 2
      });
      
      const widget_layer_list_container = document.createElement("div");

      widget_layer_list_container.id = "widget-layer-list-container";

      const widget_layer_list = new LayerList({
        view: view,
        container: widget_layer_list_container,
        visibleElements: {
          catalogLayerList: true,
          closeButton: false,
          collapseButton: true,
          errors: false,
          filter: true,
          heading: true,
          statusIndicators: false
        },
        dragEnabled: true
      });
      
      const expand_layer_list_container = document.createElement("div");

      expand_layer_list_container.id = "expand-layer-list-container";

      const expand_layer_list = new Expand({
        view: view,
        group: "widgets",
        container: expand_layer_list_container,
        content: widget_layer_list,
        placement: "bottom-end",
        autoCollapse: true,
        expanded: true
      });

      view.ui.add(expand_layer_list, {
        position: "top-right",
        index: 3
      });

      const widget_basemap_gallery_container = document.createElement("div");

      widget_basemap_gallery_container.id = "widget-basemap-gallery-container";

      const widget_basemap_gallery = new BasemapGallery({
        view: view,
        container: widget_basemap_gallery_container
      });

      const expand_basemap_gallery_container = document.createElement("div");

      expand_basemap_gallery_container.id = "expand-basemap-gallery-container";

      const expand_basemap_gallery = new Expand({
        view: view,
        group: "widgets",
        container: expand_basemap_gallery_container,
        content: widget_basemap_gallery,
        placement: "bottom-end",
        autoCollapse: true
      });

      view.ui.add(expand_basemap_gallery, {
        position: "top-right",
        index: 4
      });

      const widget_editor_container = document.createElement("div");

      widget_editor_container.id = "widget-editor-container";

      const widget_editor = new Editor({
        view: view,
        container: widget_editor_container
      });

      const expand_editor_container = document.createElement("div");

      expand_editor_container.id = "expand-editor-container";

      const expand_editor = new Expand({
        view: view,
        group: "widgets",
        container: expand_editor_container,
        content: widget_editor,
        placement: "bottom-end",
        autoCollapse: true
      });

      view.ui.add(expand_editor, {
        position: "top-right",
        index: 5
      });

      const widget_print_container = document.createElement("div");

      widget_print_container.id = "widget-print-container";

      const widget_print = new Print({
        view: view,
        container: widget_print_container
      });

      const expand_print_container = document.createElement("div");

      expand_print_container.id = "expand-print-container";

      const expand_print = new Expand({
        view: view,
        group: "widgets",
        container: expand_print_container,
        content: widget_print,
        placement: "bottom-end",
        autoCollapse: true
      });

      view.ui.add(expand_print, {
        position: "top-right",
        index: 6
      });

      const widget_scale_container = document.createElement("div");

      widget_scale_container.id = "widget-scale-container";

      const widget_scale_bar = new ScaleBar({
        view: view,
        container: widget_scale_container,
        unit: "dual"
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
                if (selectedFeature.geometry.extent) { view.goTo(selectedFeature.geometry.extent); }
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

  function recenter_map (extent) {
    reactiveUtils.watch(
      function () {
        if (view && extent) {
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

  function view_layer (module) {
    reactiveUtils.watch(
      function () {
        if (view && module) {
          view
            .when(function () {
              while (view.map.layers.length > 0) {
                view.map.layers.pop(); 
              }

              view.map.layers.push(group_regions);
              view.map.layers.push(group_terrain);
              view.map.layers.push(group_road_sections);
              view.map.layers.push(group_road_classification);
              view.map.layers.push(group_volume_of_traffic);
              view.map.layers.push(group_kilometer_posts);

              if (module === "summary") {
                view.map.layers.push(layer_inventory_of_road_slope_structures);
                view.map.layers.push(layer_inventory_of_road_slopes);
                view.map.layers.push(layer_hazard_map);
              }
              if (module === "hazard-map") {
                view.map.layers.push(group_hazard_map_storm_surge_map_noah);
                view.map.layers.push(group_hazard_map_slope_hazard_risks);
              }
              if (module === "road-slope-inventory") {
                view.map.layers.push(group_inventory_of_road_slope_structures_type_of_disaster);
                view.map.layers.push(group_inventory_of_road_slope_structures_type_of_road_slope_structures);
                view.map.layers.push(group_inventory_of_road_slope_structures_road_slope_condition);

                view.map.layers.push(group_inventory_of_road_slopes_type_of_disaster);
                view.map.layers.push(group_inventory_of_road_slopes_type_of_road_slope_structures);
              }
              if (module === "potential-road-slope-projects"){
                view.map.layers.push(group_potential_road_slope_projects);
              }
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
        if (view && features) {
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
        layer_road_slopes_and_countermeasures,

        layer_inventory_of_road_slopes,
        layer_inventory_of_road_slope_structures,
        // layer_potential_road_slope_projects,

        MapComponent,

        recenter_map, view_layer, open_popup, close_popup
      } 
    }>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContextProvider;