import * as React from "react";

import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js";
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

/* Data Sources */

const url_national_expressways = "https://apps2.dpwh.gov.ph/server/rest/services/DPWH_Public/RoadNetwork_RoadClassification/MapServer/0";
const url_national_road_network = "https://apps2.dpwh.gov.ph/server/rest/services/DPWH_Public/RoadNetwork_RoadClassification/MapServer/1";

const url_kilometer_posts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Kilometer_Post/FeatureServer";
const url_terrain = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer"; // TEMPORARY_DATA_SOURCE
const url_volume_of_traffic = "https://apps2.dpwh.gov.ph/server/rest/services/RTIA/AADT/MapServer/0"; // Indices are sorted in ascending order according to year.

const url_regions = "https://apps2.dpwh.gov.ph/server/rest/services/DPWH_Public/Admin_Boundaries_Region/MapServer/0";
const url_engineering_districts = "https://apps2.dpwh.gov.ph/server/rest/services/DPWH_Public/Admin_Boundaries_Engineering/MapServer/0";
const url_legislative_districts = "https://apps2.dpwh.gov.ph/server/rest/services/DPWH_Public/Admin_Boundaries_Congressional/MapServer/0";
const url_provinces = "https://apps2.dpwh.gov.ph/server/rest/services/DPWH_Public/Admin_Boundaries_Province/MapServer/0";
const url_municipalities_cities = "https://apps2.dpwh.gov.ph/server/rest/services/DPWH_Public/Admin_Boundaries_City_Municipality/MapServer/0";

const url_road_slope_hazards = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/hazard_map_ver4/FeatureServer";
const url_road_slopes_and_countermeasures = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/rsm_mobile_ver3/FeatureServer";

const url_storm_surge_hazards = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Storm_Surge_Hazard_Map/FeatureServer";

const url_calamities = "https://utility.arcgis.com/usrsvcs/servers/59f6339356534575b4fedb1d467d0d01/rest/services/Disaster_Situational_Report_App_v302_view_RDIS/FeatureServer/0";
const url_situational_reports = "https://utility.arcgis.com/usrsvcs/servers/59f6339356534575b4fedb1d467d0d01/rest/services/Disaster_Situational_Report_App_v302_view_RDIS/FeatureServer/1";

/* Reference Data */

function content_national_expressways (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.REGION || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Name</b></td>
          <td>${ target.graphic.attributes.XPRES_WAY || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Section ID</b></td>
          <td>${ target.graphic.attributes.XPRES_NAME || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_national_expressways = new FeatureLayer({
  title: "National Expressways",
  url: url_national_expressways,
  renderer: {
    type: "simple",
    label: "National Expressway",
    symbol: {
      type: "simple-line",
      width: 1.00,
      color: [0, 0, 0, 1.00]
    }
  },
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.XPRES_NAME" },
    // labelPlacement: "below-along",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "National Expressway: {XPRES_NAME} ({XPRES_WAY})",
    outFields: ["*"],
    content: content_national_expressways
  },
  visible: true
});

function content_national_road_network (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
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
      displayType: "auto"
    }
  ]);
}

export const layer_national_road_network = new FeatureLayer({
  title: "National Road Network",
  url: url_national_road_network,
  renderer: {
    type: "simple",
    label: "National Road",
    symbol: {
      type: "simple-line",
      width: 1.00,
      color: [0, 0, 0, 1.00]
    }
  },
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.ROAD_NAME" },
    // labelPlacement: "below-along",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "National Road: {SECTION_ID} ({ROAD_NAME})",
    outFields: ["*"],
    content: content_national_road_network
  },
  visible: true
});

const group_inventory_of_roads = new GroupLayer({
  title: "Inventory of Roads",
  layers: [
    layer_national_expressways,
    layer_national_road_network
  ],
  visible: true,
  visibilityMode: "independent"
});

/* Administrative Boundaries */

const defaultRenderer = {
  type: "simple",
  symbol: {
    type: "simple-fill",
    color: [191, 191, 191, 0.50],
    outline: {
      color: [0, 0, 0, 1.00],
      width: 1.00
    }
  }
};

function content_municipalities_cities (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
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
          <td><b>Province</b></td>
          <td>${ target.graphic.attributes.PROVINCE || "No available data" }</td>
        </tr>
        <tr>
          <td><b>${ target.graphic.attributes.CENTERS || "No available data" }</b></td>
          <td>${ target.graphic.attributes.MUNICIPAL || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_municipalities_cities = new FeatureLayer({
  title: "Municipalities / Cities",
  url: url_municipalities_cities,
  renderer: defaultRenderer,
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.MUNICIPAL" },
    labelPlacement: "always-horizontal",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "{CENTERS}: {MUNICIPAL}",
    outFields: ["*"],
    content: content_municipalities_cities
  },
  visible: true
});

function content_provinces (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.REGION || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Province</b></td>
          <td>${ target.graphic.attributes.PROVINCE || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_provinces = new FeatureLayer({
  title: "Provinces",
  url: url_provinces,
  renderer: defaultRenderer,
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.PROVINCE" },
    labelPlacement: "always-horizontal",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "Province: {PROVINCE}",
    outFields: ["*"],
    content: content_provinces
  },
  visible: true
});

function content_legislative_districts (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.REGION || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Legislative District</b></td>
          <td>${ target.graphic.attributes.CONG_DIST || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_legislative_districts = new FeatureLayer({
  title: "Legislative Districts",
  url: url_legislative_districts,
  renderer: defaultRenderer,
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.CONG_DIST" },
    labelPlacement: "always-horizontal",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "Legislative District: {CONG_DIST}",
    outFields: ["*"],
    content: content_legislative_districts
  },
  visible: true
});

function content_engineering_districts (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.REGION || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Engineering District</b></td>
          <td>${ target.graphic.attributes.DEO || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_engineering_districts = new FeatureLayer({
  title: "Engineering Districts",
  url: url_engineering_districts,
  renderer: defaultRenderer,
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.DEO" },
    labelPlacement: "always-horizontal",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "Engineering District: {DEO}",
    outFields: ["*"],
    content: content_engineering_districts
  },
  visible: true
});

function content_regions (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.REGION || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Region Name</b></td>
          <td>${ target.graphic.attributes.VAR_NAME || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_regions = new FeatureLayer({
  title: "Regions",
  url: url_regions,
  renderer: defaultRenderer,
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.REGION" },
    labelPlacement: "always-horizontal",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "Region: {REGION}",
    outFields: ["*"],
    content: content_regions
  },
  visible: true
});

const group_administrative_boundaries = new GroupLayer({
  title: "Administrative Boundaries",
  layers: [
    layer_regions,
    layer_engineering_districts,
    layer_legislative_districts,
    layer_provinces,
    layer_municipalities_cities
  ],
  visible: false,
  visibilityMode: "independent"
});

/* Summary Data */
  function parse_limit (property) {
    let value;

    if (isNaN(property)) {
      if (property.includes("-")) {
        const string_array = property.split(/[-]/);

        value = string_array[0] + " + (-" + string_array[1].padStart(3, "0") + ")";
      }
      else if (property.includes("+")) {
        const string_array = property.split(/[+]/);

        value = string_array[0] + " + " + string_array[1].padStart(3, "0");
      }
      else {
        value = property;
      }
    }
    else {
      value = property;
    }

    return(value);
  }

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

function content_road_slope_hazards (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Surveyor</b></td>
          <td>${ target.graphic.attributes.survey_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.region_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Engineering District</b></td>
          <td>${ target.graphic.attributes.deo_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Legislative District</b></td>
          <td>${ target.graphic.attributes.district_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Classification</b></td>
          <td>${ target.graphic.attributes.road_classification || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Name</b></td>
          <td>${ target.graphic.attributes.road_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Section ID</b></td>
          <td>${ target.graphic.attributes.section_id || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Terrain</b></td>
          <td>${ target.graphic.attributes.road_terrain || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Hazard Risk</b></td>
          <td>${ target.graphic.attributes.hazard_risk || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Start Station Limit</b></td>
          <td>${ parse_limit(target.graphic.attributes.start_lrp) || "No available data" }</td>
        </tr>
        <tr>
          <td><b>End Station Limit</b></td>
          <td>${ parse_limit(target.graphic.attributes.end_lrp) || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Start Chainage</b></td>
          <td>${ target.graphic.attributes.start_chainage || "No available data" }</td>
        </tr>
        <tr>
          <td><b>End Chainage</b></td>
          <td>${ target.graphic.attributes.end_chainage || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Length</b> (meters)</td>
          <td>${ target.graphic.attributes.road_length || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Height</b> (meters)</td>
          <td>${ target.graphic.attributes.road_height || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Area</b> (sq. meters)</td>
          <td>${ target.graphic.attributes.target_area || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Slope Angle / Gradient</b> (degrees)</td>
          <td>${ target.graphic.attributes.road_angle || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Type of Disaster</b></td>
          <td>${ disaster_codes[target.graphic.attributes.disaster_type] || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Slope Type Left</b></td>
          <td>${ target.graphic.attributes.slope_type_left || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Slope Type Right</b></td>
          <td>${ target.graphic.attributes.slope_type_right || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Survey Side</b></td>
          <td>${ target.graphic.attributes.survey_side || "No available data" }</td>
        </tr>
      </tbody>
    </table>
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td colspan = "2" style = "text-align: center;"><b>Hazard Scores</b></td>
        </tr>
        <tr>
          <td><b>Profile Slope Height Score</b></td>
          <td>${ target.graphic.attributes.profile_slope_height_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Profile Slope Angle Score</b></td>
          <td>${ target.graphic.attributes.profile_slope_angle_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Topography G1 Score</b></td>
          <td>${ target.graphic.attributes.topography_g1_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Topography G2 Score</b></td>
          <td>${ target.graphic.attributes.topography_g2_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Geological Soil Score</b></td>
          <td>${ target.graphic.attributes.geological_soil_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Geological Rock Score</b></td>
          <td>${ target.graphic.attributes.geological_rock_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Geological Slope Score</b></td>
          <td>${ target.graphic.attributes.geological_slope_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Geological Sediment Score</b></td>
          <td>${ target.graphic.attributes.geological_sediment_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Surface Vegetation Score</b></td>
          <td>${ target.graphic.attributes.surface_vegetation_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Surface Soil Score</b></td>
          <td>${ target.graphic.attributes.surface_soil_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Surface Water Score</b></td>
          <td>${ target.graphic.attributes.surface_water_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Anomaly Score</b></td>
          <td>${ target.graphic.attributes.anomaly_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Hazard Score Based on Causes of Road Slope Failure (A)</b></td>
          <td>${ target.graphic.attributes.total_score_a || "0" }</td>
        </tr>
        <tr>
          <td><b>Hazard Score Based on Countermeasures Data (B)</b></td>
          <td>${ target.graphic.attributes.total_score_b || "0" }</td>
        </tr>
        <tr>
          <td><b>Hazard Score Based on History of Disasters (C)</b></td>
          <td>${ target.graphic.attributes.disaster_history_score || "0" }</td>
        </tr>
        <tr>
          <td><b>Road Slope Hazard Score (D)</b></td>
          <td>${ target.graphic.attributes.score_d || "0" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_road_slope_hazards = new FeatureLayer({
  title: "Road Slope Hazards",
  url: url_road_slope_hazards,
  renderer: {
    type: "simple",
    label: "Road Slope Hazards Data",
    symbol: {
      type: "simple-line",
      width: 6.00,
      color: [255, 0, 255, 1.00]
    }
  },
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.hazard_risk" },
    // labelPlacement: "below-along",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "Road Section: {section_id} ({road_name})",
    outFields: ["*"],
    content: content_road_slope_hazards
  },
  visible: true
});

function content_road_slopes_and_countermeasures (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Surveyor</b></td>
          <td>${ target.graphic.attributes.survey_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.region_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Engineering District</b></td>
          <td>${ target.graphic.attributes.deo_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Legislative District</b></td>
          <td>${ target.graphic.attributes.district_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Classification</b></td>
          <td>${ target.graphic.attributes.road_classification || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Name</b></td>
          <td>${ target.graphic.attributes.road_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Section ID</b></td>
          <td>${ target.graphic.attributes.section_id || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Terrain</b></td>
          <td>${ target.graphic.attributes.road_terrain || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Slope Hazard Level</b></td>
          <td>${ target.graphic.attributes.hazard_risk || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Start Station Limit</b></td>
          <td>${ parse_limit(target.graphic.attributes.start_lrp) || "No available data" }</td>
        </tr>
        <tr>
          <td><b>End Station Limit</b></td>
          <td>${ parse_limit(target.graphic.attributes.end_lrp) || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Start Chainage</b></td>
          <td>${ target.graphic.attributes.start_chainage || "No available data" }</td>
        </tr>
        <tr>
          <td><b>End Chainage</b></td>
          <td>${ target.graphic.attributes.end_chainage || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Length</b> (meters)</td>
          <td>${ target.graphic.attributes.road_length || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Height</b> (meters)</td>
          <td>${ target.graphic.attributes.road_height || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Area</b> (sq. meters)</td>
          <td>${ target.graphic.attributes.target_area || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Slope Angle / Gradient</b> (degrees)</td>
          <td>${ target.graphic.attributes.road_angle || "No available data" }</td>
        </tr>
        <tr>
          <td><b>RSM Category</b></td>
          <td>${ target.graphic.attributes.rsm_category || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_road_slopes_and_countermeasures = new FeatureLayer({
  title: "Road Slopes and Countermeasures",
  url: url_road_slopes_and_countermeasures,
  renderer: {
    type: "simple",
    label: "Road Slopes and Countermeasures Data",
    symbol: {
      type: "simple-line",
      width: 3.00,
      color: [13, 59, 102, 1.00]
    }
  },
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.section_id" },
    // labelPlacement: "below-along",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "Road Section: {section_id} ({road_name})",
    outFields: ["*"],
    content: content_road_slopes_and_countermeasures
  },
  visible: true
});

function content_inventory_of_road_slopes (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.region_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Engineering District</b></td>
          <td>${ target.graphic.attributes.deo_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Legislative District</b></td>
          <td>${ target.graphic.attributes.district_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Classification</b></td>
          <td>${ target.graphic.attributes.road_classification || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Name</b></td>
          <td>${ target.graphic.attributes.road_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Section ID</b></td>
          <td>${ target.graphic.attributes.section_id || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Terrain</b></td>
          <td>${ target.graphic.attributes.road_terrain || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Volume of Traffic</b> (AADT)</td>
          <td>${ target.graphic.attributes.aadt || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Start Station Limit</b></td>
          <td>${ parse_limit(target.graphic.attributes.start_lrp) || "No available data" }</td>
        </tr>
        <tr>
          <td><b>End Station Limit</b></td>
          <td>${ parse_limit(target.graphic.attributes.end_lrp) || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Start Chainage</b></td>
          <td>${ target.graphic.attributes.start_chainage || "No available data" }</td>
        </tr>
        <tr>
          <td><b>End Chainage</b></td>
          <td>${ target.graphic.attributes.end_chainage || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Length</b> (meters)</td>
          <td>${ target.graphic.attributes.road_length || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Height</b> (meters)</td>
          <td>${ target.graphic.attributes.road_height || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Area</b> (sq. meters)</td>
          <td>${ target.graphic.attributes.target_area || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Slope Angle / Gradient</b> (degrees)</td>
          <td>${ target.graphic.attributes.road_angle || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Type of Disaster</b></td>
          <td>${ target.graphic.attributes.disaster_type || "No available data" }</td>
        </tr>
        <tr>
          <td><b>With Slope Disaster Failure?</b></td>
          <td>${ target.graphic.attributes.past_failure || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Date of Occurence</b></td>
          <td>${ target.graphic.attributes.date_of_occurence || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_inventory_of_road_slopes = new FeatureLayer({
  title: "Inventory of Road Slopes",
  url: url_road_slopes_and_countermeasures,
  definitionExpression: "rsm_category = 'Inventory of Road Slope'",
  renderer: {
    type: "simple",
    label: "Inventory of Road Slopes Data",
    symbol: {
      type: "simple-line",
      width: 3.00,
      color: [249, 87, 56, 1.00]
    }
  },
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.section_id" },
    // labelPlacement: "below-along",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "Road Section: {section_id} ({road_name})",
    outFields: ["*"],
    content: content_inventory_of_road_slopes
  },
  visible: true
});

function content_inventory_of_road_slope_protection_structures (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.region_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Engineering District</b></td>
          <td>${ target.graphic.attributes.deo_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Legislative District</b></td>
          <td>${ target.graphic.attributes.district_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Classification</b></td>
          <td>${ target.graphic.attributes.road_classification || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Road Name</b></td>
          <td>${ target.graphic.attributes.road_name || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Section ID</b></td>
          <td>${ target.graphic.attributes.section_id || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Terrain</b></td>
          <td>${ target.graphic.attributes.road_terrain || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Volume of Traffic</b> (AADT)</td>
          <td>${ target.graphic.attributes.aadt || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Start Station Limit</b></td>
          <td>${ parse_limit(target.graphic.attributes.start_lrp) || "No available data" }</td>
        </tr>
        <tr>
          <td><b>End Station Limit</b></td>
          <td>${ parse_limit(target.graphic.attributes.end_lrp) || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Start Chainage</b></td>
          <td>${ target.graphic.attributes.start_chainage || "No available data" }</td>
        </tr>
        <tr>
          <td><b>End Chainage</b></td>
          <td>${ target.graphic.attributes.end_chainage || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Type of Existing Road Slope Protection Structure</b></td>
          <td>${ target.graphic.attributes.road_slope_structure_type || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Length</b> (meters)</td>
          <td>${ target.graphic.attributes.road_length || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Height</b> (meters)</td>
          <td>${ target.graphic.attributes.road_height || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Area</b> (sq. meters)</td>
          <td>${ target.graphic.attributes.target_area || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Slope Angle / Gradient</b> (degrees)</td>
          <td>${ target.graphic.attributes.road_angle || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Type of Disaster</b></td>
          <td>${ target.graphic.attributes.disaster_type || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Condition Of Road Slope Protection Structure</b></td>
          <td>${ target.graphic.attributes.road_condition || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

export const layer_inventory_of_road_slope_protection_structures = new FeatureLayer({
  title: "Inventory of Road Slope Protection Structures",
  url: url_road_slopes_and_countermeasures,
  definitionExpression: "rsm_category = 'Inventory of Road Slope Protection Structures'",
  renderer: {
    type: "simple",
    label: "Inventory of Road Slope Protection Structures Data",
    symbol: {
      type: "simple-line",
      width: 3.00,
      color: [238, 150, 75, 1.00]
    }
  },
  labelsVisible: true,
  labelingInfo: [{
    labelExpressionInfo: { expression: "$feature.section_id" },
    // labelPlacement: "below-along",
    symbol: {
      type: "text",
      color: [0, 0, 0, 1.00],
      haloColor: [255, 255, 255, 0.50],
      haloSize: 1,
      font: { family: "Avenir Next LT Pro", size: 8 }
    }
  }],
  popupEnabled: true,
  popupTemplate: {
    title: "Road Section: {section_id} ({road_name})",
    outFields: ["*"],
    content: content_inventory_of_road_slope_protection_structures
  },
  visible: true
});

/* Road Slope Hazards Data */

const array_road_slope_hazards = [
  ["Unclassified", [191, 191, 191, 1.00]],
  ["Low", [0, 176, 80, 1.00]],
  ["Middle", [255, 255, 0, 1.00]],
  ["High", [255, 0, 0, 1.00]],
];

const group_road_slope_hazards = new GroupLayer({
  title: "Road Slope Hazards",
  layers: array_road_slope_hazards.map(function (category) {
    return (
      new FeatureLayer({
        title: `Road Sections with ${ category[0] } Road Slope Hazard Level`,
        url: url_road_slope_hazards,
        definitionExpression: category[0] === "Unclassified" ?
          array_road_slope_hazards.map(function (category) { return (category[0] === "Unclassified" ? null : `hazard_risk <> '${ category[0] }'`); }).join(" AND ") :
          `hazard_risk = '${ category[0] }'`,
        renderer: {
          type: "simple",
          label: `Road Section with ${ category[0] } Road Slope Hazard Level`,
          symbol: {
            type: "simple-line",
            width: 6.00,
            color: category[1]
          }
        },
        popupEnabled: true,
        popupTemplate: {
          title: category[0] === "Unclassified" ?
            "Road Slope Hazard Level: Unclassified" :
            "Road Slope Hazard Level: {hazard_risk}",
          outFields: ["*"],
          content: content_road_slope_hazards
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

function generate_storm_surge_hazards (proxy_data) {
  return (
    proxy_data === 1 ? "Low Risk" :
    proxy_data === 2 ? "Middle Risk" :
    proxy_data === 3 ? "High Risk" :
    "No available data"
  );
}

function content_storm_surge_hazards (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Storm Surge Hazard Level</b></td>
          <td>${ generate_storm_surge_hazards(target.graphic.attributes.HAZ) || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

const array_storm_surge_hazards = [
  ["Unclassified", "HAZ <> 1 AND HAZ <> 2 AND HAZ <> 3", [191, 191, 191, 1.00], [191, 191, 191, 0.50]],
  ["Low", "HAZ = 1", [130, 192, 204, 1.00], [130, 192, 204, 0.50]],
  ["Middle", "HAZ = 2", [72, 159, 181, 1.00], [72, 159, 181, 0.50]],
  ["High", "HAZ = 3", [22, 105, 122, 1.00], [22, 105, 122, 0.50]],
];

const group_storm_surge_hazards = new GroupLayer({
  title: "Storm Surge Hazards (NOAH)",
  layers: array_storm_surge_hazards.map(function (category) {
    return (
      new FeatureLayer({
        title: `Areas with ${ category[0] } Storm Surge Hazard Level`,
        url: url_storm_surge_hazards,
        definitionExpression: category[1],
        renderer: {
          type: "simple",
          label: `Area with ${ category[0] } Storm Surge Hazard Level`,
          symbol: {
            type: "simple-fill",
            color: category[2],
            outline: { 
              color: category[3],
              width: 1.00
            }
          }
        },
        popupEnabled: true,
        popupTemplate: {
          title: category[0] === "Unclassified" ?
            "Storm Surge Hazard Level: Unclassified" :
            "Storm Surge Hazard Level: {HAZ}",
          outFields: ["*"],
          content: content_storm_surge_hazards
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

function content_calamities (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Region</b></td>
          <td>${ target.graphic.attributes.region_note || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Engineering District</b></td>
          <td>${ target.graphic.attributes.deoname_note || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Calamity</b> (AADT)</td>
          <td>${ target.graphic.attributes.calamity_note || "No available data" }</td>
        </tr>
        <tr>
          <td><bCause of Calamity</b></td>
          <td>${ target.graphic.attributes.rain || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Name of Typhoon</b></td>
          <td>${ target.graphic.attributes.typhoonname || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Magnitude of Earthquake</b></td>
          <td>${ target.graphic.attributes.magnitude || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Name of Volcano</b></td>
          <td>${ target.graphic.attributes.volcano || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Infrastructure Type</b></td>
          <td>${ target.graphic.attributes.infra_type || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Infrastructure ID</td>
          <td>${ target.graphic.attributes.SID || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

const array_calamities = [
  ["Unclassified", [191, 191, 191, 1.00]],
  ["Volcanic Eruption", [153, 255, 153, 1.00]],
  ["Super Typhoon (ST)", [87, 117, 144, 1.00]],
  ["Earthquake", [67, 170, 139, 1.00]],
  ["Severe Tropical Storm (STS)", [144, 190, 109, 1.00]],
  ["Tropical Depression (TD)", [249, 199, 79, 1.00]],
  ["Continuous Rain", [248, 150, 30, 1.00]],
  ["Tropical Storm (TS)", [243, 114, 44, 1.00]],
  ["Typhoon (TY)", [249, 65, 68, 1.00]]
];

const group_calamities = new GroupLayer({
  title: "Calamities (DISIRE)",
  layers: array_calamities.map(function (category) {
    return (
      new FeatureLayer({
        title: `Record of ${ category[0] } Calamity`,
        url: url_calamities,
        definitionExpression: `calamity_note = '${ category[0] }'`,
        renderer: {
          type: "simple",
          label: `${ category[0] } Calamity`,
          symbol: {
            type: "simple-marker",
            style: "circle",
            color: category[1],
            outline: {
              color: [0, 0, 0, 1.00],
              width: 1.00
            }
          },
          visualVariables: [{
            type: "size",
            valueExpression: "$view.scale",
            stops: [
              { size: 8, value: 9027.977411 }, // Zoom Level: 16
              { size: 4, value: 144447.638572 }, // Zoom Level: 12
              { size: 1, value: 2311162.217155 } // Zoom Level: 8
            ]
          }]
        },
        popupEnabled: true,
        popupTemplate: {
          title: "Calamity: {calamity_note}",
          outFields: ["*"],
          content: content_calamities
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

function content_situational_reports (target) {
  const container = document.createElement("div");

  container.innerHTML = `
    <table className = "attribute-table">
      <tbody>
        <tr>
          <td><b>Station Limit</b></td>
          <td>${ target.graphic.attributes.Station_Limit || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Situational Report</b></td>
          <td>${ target.graphic.attributes.situation_note_station || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Area Affected</b></td>
          <td>${ target.graphic.attributes.area_concat || "No available data" }</td>
        </tr>
        <tr>
          <td><b>Actions Taken</b></td>
          <td>${ target.graphic.attributes.actionstaken_concat || "No available data" }</td>
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
      displayType: "auto"
    }
  ]);
}

const array_situational_reports = [
  ["Unclassified", [191, 191, 191, 1.00]],
  ["Not Passable", [255, 153, 51, 1.00]],
  ["Limited Access (Passable)", [0, 204, 255, 1.00]],
  ["Passable", [153, 255, 153, 1.00]]
];

const group_situational_reports = new GroupLayer({
  title: "Situational Reports (DISIRE)",
  layers: array_situational_reports.map(function (category) {
    return (
      new FeatureLayer({
        title: `${ category[0] } Road Sections`,
        url: url_situational_reports,
        definitionExpression: `situation_note_station = '${ category[0] }'`,
        renderer: {
          type: "simple",
          label: `${ category[0] } Road Section`,
          symbol: {
            type: "simple-marker",
            style: "circle",
            color: category[1],
            outline: {
              color: [0, 0, 0, 1.00],
              width: 1.00
            }
          },
          visualVariables: [{
            type: "size",
            valueExpression: "$view.scale",
            stops: [
              { size: 8, value: 9027.977411 }, // Zoom Level: 16
              { size: 4, value: 144447.638572 }, // Zoom Level: 12
              { size: 1, value: 2311162.217155 } // Zoom Level: 8
            ]
          }]
        },
        popupEnabled: true,
        popupTemplate: {
          title: "Situational Report: {situation_note_station}",
          outFields: ["*"],
          content: content_situational_reports
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

/* Inventory of Road Slopes Data */

const array_inventory_of_road_slopes_type_of_disaster = [
  ["Unclassified", [191, 191, 191, 1.00]],
  ["Coastal Erosion", [87, 117, 144, 1.00]],
  ["Debris Flow", [67, 170, 139, 1.00]],
  ["River Erosion", [144, 190, 109, 1.00]],
  ["Road Slip", [249, 199, 79, 1.00]],
  ["Landslide", [248, 150, 30, 1.00]],
  ["Rock Slope Collapse or Rock Fall", [243, 114, 44, 1.00]],
  ["Soil Slope Collapse", [249, 65, 68, 1.00]]
];

const group_inventory_of_road_slopes_type_of_disaster = new GroupLayer({
  title: "Inventory of Road Slopes - Type of Disaster",
  layers: array_inventory_of_road_slopes_type_of_disaster.map(function (category) {
    return (
      new FeatureLayer({
        title: category[0] === "Unclassified" ?
          "Road Slope Affected by an Unclassified Road Slope Disaster" :
          category[0] === "Landslide" ?
            "Road Slope Affected by Landslide (LS)" :
            "Road Slope Affected by ".concat(category[0].split("/").map(function (words) { return (words.concat(" (", words.split(" ").map(function (word) { return (word[0]); }).join(""), ")")); }).join("/")),
        url: url_road_slopes_and_countermeasures,
        definitionExpression: category[0] === "Unclassified" ?
          "rsm_category = 'Inventory of Road Slope' AND " + array_inventory_of_road_slopes_type_of_disaster.map(function (category) { return (category[0] === "Unclassified" ? null : `disaster_type <> '${ category[0] }'`); }).join(" AND ") :
          `rsm_category = 'Inventory of Road Slope' AND disaster_type = '${ category[0] }'`,
        renderer: {
          type: "simple",
          label: category[0] === "Unclassified" ?
            "Road Slope Affected by an Unclassified Road Slope Disaster" :
            category[0] === "Landslide" ?
              "Road Slope Affected by Landslide (LS)" :
              "Road Slope Affected by ".concat(category[0].split("/").map(function (words) { return (words.concat(" (", words.split(" ").map(function (word) { return (word[0]); }).join(""), ")")); }).join("/")),
          symbol: {
            type: "simple-line",
            width: 2.00,
            color: category[1]
          }
        },
        popupEnabled: true,
        popupTemplate: {
          title: "Road Section: {section_id} ({road_name})",
          outFields: ["*"],
          content: content_inventory_of_road_slopes
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

const array_inventory_of_road_slopes_type_of_road_slope_protection_structure = [
  ["Unclassified", [191, 191, 191, 1.00]],
  ["Gabions Revetment (Pile-Up Type)", [29, 47, 215, 1.00]],
  ["Boulder Spur Dike (Type II)", [25, 106, 193, 1.00]],
  ["Earthfill Dike (Type I)", [21, 151, 172, 1.00]],
  ["Bio-Engineering Solutions (Coco-Net, Coco-Log & Vetiver Grass)", [38, 225, 167, 1.00]],
  ["Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)", [28, 209, 84, 1.00]],
  ["Gabion/Mattress Slope Protection", [36, 188, 24, 1.00]],
  ["Gravity Wall (Type I)", [87, 166, 20, 1.00]],
  ["Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)", [206, 224, 32, 1.00]],
  ["Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)", [204, 153, 27, 1.00]],
  ["Concrete Slope Protection (Reinforced Concrete Type II)", [182, 75, 23, 1.00]],
  ["Stone Masonry", [161, 19, 24, 1.00]],
  ["Rubble Concrete Revetment (Spread Type I)", [220, 30, 122, 1.00]],
  ["Grouted Riprap with Concrete Sheet Pile Foundation", [199, 26, 176, 1.00]],
  ["Grouted Riprap with Steel Sheet Pile Foundation", [156, 22, 177, 1.00]],
  ["Grouted Riprap", [138, 22, 177, 1.00]]
];

const group_inventory_of_road_slopes_type_of_road_slope_protection_structure = new GroupLayer({
  title: "Inventory of Road Slopes - Type of Road Slope Protection Structure",
  layers: array_inventory_of_road_slopes_type_of_road_slope_protection_structure.map(function (category) {
    return (
      new FeatureLayer({
        title: category[0] === "Unclassified" ?
          "Road Slope with an Unclassified Road Slope Protection Structure Type" :
          `Road Slope with ${ category[0] }`,
        url: url_road_slopes_and_countermeasures,
        definitionExpression: category[0] === "Unclassified" ?
          "rsm_category = 'Inventory of Road Slope' AND " + array_inventory_of_road_slopes_type_of_road_slope_protection_structure.map(function (category) { return (category[0] === "Unclassified" ? null : `road_slope_structure_type <> '${ category[0] }'`); }).join(" AND ") :
          `rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = '${ category[0] }'`,
        renderer: {
          type: "simple",
          label: category[0] === "Unclassified" ?
            "Road Slope with an Unclassified Road Slope Protection Structure Type" :
            `Road Slope with ${ category[0] }`,
          symbol: {
            type: "simple-line",
            width: 2.00,
            color: category[1]
          }
        },
        popupEnabled: true,
        popupTemplate: {
          title: "Road Section: {section_id} ({road_name})",
          outFields: ["*"],
          content: content_inventory_of_road_slopes
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

/* Inventory of Road Slope Protection Structures Data */

const array_inventory_of_road_slope_protection_structures_road_slope_condition = [
  ["Unclassified", [191, 191, 191, 1.00]],
  ["Bad", [204, 102, 0, 1.00]],
  ["Poor", [255, 153, 51, 1.00]],
  ["Fair", [0, 204, 255, 1.00]],
  ["Good", [153, 255, 153, 1.00]]
];

const group_inventory_of_road_slope_protection_structures_road_slope_condition = new GroupLayer({
  title: "Inventory of Road Slope Protection Structures - Condition of Road Slope Protection Structure",
  layers: array_inventory_of_road_slope_protection_structures_road_slope_condition.map(function (category) {
    return (
      new FeatureLayer({
        title: category[0] === "Unclassified" ?
          "Road Slope Protection Structure in an Unclassified Condition" :
          `Road Slope Protection Structure in ${ category[0] } Condition`,
        url: url_road_slopes_and_countermeasures,
        definitionExpression: category[0] === "Unclassified" ?
          "rsm_category = 'Inventory of Road Slope Protection Structures' AND " + array_inventory_of_road_slope_protection_structures_road_slope_condition.map(function (category) { return (category[0] === "Unclassified" ? null : `road_condition <> '${ category[0] }'`); }).join(" AND ") :
          `rsm_category = 'Inventory of Road Slope Protection Structures' AND road_condition = '${ category[0] }'`,
        renderer: {
          type: "simple",
          label: category[0] === "Unclassified" ?
            "Road Slope Protection Structure in an Unclassified Condition" :
            `Road Slope Protection Structure in ${ category[0] } Condition`,
          symbol: {
            type: "simple-line",
            width: 3.00,
            color: category[1]
          }
        },
        popupEnabled: true,
        popupTemplate: {
          title: "Road Section: {section_id} ({road_name})",
          outFields: ["*"],
          content: content_inventory_of_road_slope_protection_structures
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

const array_inventory_of_road_slope_protection_structures_type_of_disaster = [
  ["Unclassified", [191, 191, 191, 1.00]],
  ["Coastal Erosion", [87, 117, 144, 1.00]],
  ["Debris Flow", [67, 170, 139, 1.00]],
  ["River Erosion", [144, 190, 109, 1.00]],
  ["Road Slip", [249, 199, 79, 1.00]],
  ["Landslide", [248, 150, 30, 1.00]],
  ["Rock Slope Collapse or Rock Fall", [243, 114, 44, 1.00]],
  ["Soil Slope Collapse", [249, 65, 68, 1.00]]  
];

const group_inventory_of_road_slope_protection_structures_type_of_disaster = new GroupLayer({
  title: "Inventory of Road Slope Protection Structures - Type of Disaster",
  layers: array_inventory_of_road_slope_protection_structures_type_of_disaster.map(function (category) {
    return (
      new FeatureLayer({
        title: category[0] === "Unclassified" ?
          "Road Slope Protection Structure Affected by an Unclassified Road Slope Disaster" :
          category[0] === "Landslide" ?
            "Road Slope Protection Structure Affected by Landslide (LS)" :
            "Road Slope Protection Structure Affected by ".concat(category[0].split("/").map(function (words) { return (words.concat(" (", words.split(" ").map(function (word) { return (word[0]); }).join(""), ")")); }).join("/")),
        url: url_road_slopes_and_countermeasures,
        definitionExpression: category[0] === "Unclassified" ?
          "rsm_category = 'Inventory of Road Slope Protection Structures' AND " + array_inventory_of_road_slope_protection_structures_type_of_disaster.map(function (category) { return (category[0] === "Unclassified" ? null : `disaster_type <> '${ category[0] }'`); }).join(" AND ") :
          `rsm_category = 'Inventory of Road Slope Protection Structures' AND disaster_type = '${ category[0] }'`,
        renderer: {
          type: "simple",
          label: category[0] === "Unclassified" ?
            "Road Slope Protection Structure Affected by an Unclassified Road Slope Disaster" :
            category[0] === "Landslide" ?
              "Road Slope Protection Structure Affected by Landslide (LS)" :
              "Road Slope Protection Structure Affected by ".concat(category[0].split("/").map(function (words) { return (words.concat(" (", words.split(" ").map(function (word) { return (word[0]); }).join(""), ")")); }).join("/")),
          symbol: {
            type: "simple-line",
            width: 2.00,
            color: category[1]
          }
        },
        popupEnabled: true,
        popupTemplate: {
          title: "Road Section: {section_id} ({road_name})",
          outFields: ["*"],
          content: content_inventory_of_road_slope_protection_structures
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

const array_inventory_of_road_slope_protection_structures_type_of_road_slope_protection_structure = [
  ["Unclassified", [191, 191, 191, 1.00]],
  ["Gabions Revetment (Pile-Up Type)", [29, 47, 215, 1.00]],
  ["Boulder Spur Dike (Type II)", [25, 106, 193, 1.00]],
  ["Earthfill Dike (Type I)", [21, 151, 172, 1.00]],
  ["Bio-Engineering Solutions (Coco-Net, Coco-Log & Vetiver Grass)", [38, 225, 167, 1.00]],
  ["Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)", [28, 209, 84, 1.00]],
  ["Gabion/Mattress Slope Protection", [36, 188, 24, 1.00]],
  ["Gravity Wall (Type I)", [87, 166, 20, 1.00]],
  ["Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)", [206, 224, 32, 1.00]],
  ["Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)", [204, 153, 27, 1.00]],
  ["Concrete Slope Protection (Reinforced Concrete Type II)", [182, 75, 23, 1.00]],
  ["Stone Masonry", [161, 19, 24, 1.00]],
  ["Rubble Concrete Revetment (Spread Type I)", [220, 30, 122, 1.00]],
  ["Grouted Riprap with Concrete Sheet Pile Foundation", [199, 26, 176, 1.00]],
  ["Grouted Riprap with Steel Sheet Pile Foundation", [156, 22, 177, 1.00]],
  ["Grouted Riprap", [138, 22, 177, 1.00]]
];

const group_inventory_of_road_slope_protection_structures_type_of_road_slope_protection_structure = new GroupLayer({
  title: "Inventory of Road Slopes - Type of Road Slope Protection Structure",
  layers: array_inventory_of_road_slope_protection_structures_type_of_road_slope_protection_structure.map(function (category) {
    return (
      new FeatureLayer({
        title: category[0] === "Unclassified" ?
          "Road Slope Protection Structure with an Unclassified Road Slope Protection Structure Type" :
          `Road Slope Protection Structure with ${ category[0] }`,
        url: url_road_slopes_and_countermeasures,
        definitionExpression: category[0] === "Unclassified" ?
          "rsm_category = 'Inventory of Road Slope Protection Structures' AND " + array_inventory_of_road_slope_protection_structures_type_of_road_slope_protection_structure.map(function (category) { return (category[0] === "Unclassified" ? null : `road_slope_structure_type <> '${ category[0] }'`); }).join(" AND ") :
          `rsm_category = 'Inventory of Road Slope Protection Structures' AND road_slope_structure_type = '${ category[0] }'`,
        renderer: {
          type: "simple",
          label: category[0] === "Unclassified" ?
            "Road Slope Protection Structure with an Unclassified Road Slope Protection Structure Type" :
            `Road Slope Protection Structure with ${ category[0] }`,
          symbol: {
            type: "simple-line",
            width: 2.00,
            color: category[1]
          }
        },
        popupEnabled: true,
        popupTemplate: {
          title: "Road Section: {section_id} ({road_name})",
          outFields: ["*"],
          content: content_inventory_of_road_slope_protection_structures
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

/* Potential Road Slope Projects Data */

const array_potential_road_slope_protection_projects = [
  ["Unclassified", [191, 191, 191, 1.00]],
  ["Construction", [112, 48, 160, 1.00]],
  ["Reconstruction", [48, 84, 150, 1.00]],
  ["Rehabilitation or Major Repair", [255, 217, 102, 1.00]]
];

const group_potential_road_slope_protection_projects = new GroupLayer({
  title: "Potential Road Slope Protection Projects",
  layers: array_potential_road_slope_protection_projects.map(function (category) {
    return (
      new FeatureLayer({
        title: category[0] === "Unclassified" ?
          "Unclassified Potential Road Slope Protection Project" :
          `Potential Road Slope ${ category[0] } Project`,
        url: url_road_slopes_and_countermeasures,
        definitionExpression: category[0] === "Unclassified" ?
          "rsm_category = 'Inventory of Road Slope' AND " + array_potential_road_slope_protection_projects.map(function (category) { return (category[0] === "Unclassified" ? null : `type_of_work <> '${ category[0] }'`); }).join(" AND ") :
          category[0] === "Rehabilitation or Major Repair" ? 
            "rsm_category = 'Inventory of Road Slope' AND type_of_work <> 'Reconstruction' AND type_of_work <> 'Construction'" :
            `rsm_category = 'Inventory of Road Slope' AND type_of_work = '${ category[0] }'`,
        renderer: {
          type: "simple",
          label: category[0] === "Unclassified" ?
            "Unclassified Potential Road Slope Protection Project" :
            `Potential Road Slope ${ category[0] } Project`,
          symbol: {
            type: "simple-line",
            width: 3.00,
            color: category[1]
          }
        },
        popupEnabled: true,
        popupTemplate: {
          title: "Road Section: {section_id} ({road_name})",
          outFields: ["*"],
          content: content_inventory_of_road_slopes
        },
        visible: true
      })
    );
  }),
  visible: true,
  visibilityMode: "independent",
  opacity: 1.00
});

var view;

function build_view(viewMode) {
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
    listItemCreatedFunction: async function defineActions(event) {
      const { item } = event;

      await item.layer.when();

      if (item?.children?.items?.length === 0) {
        item.actionsSections = [[
          {
            title: "Export data",
            icon: "export",
            id: "export"
          }
        ]];
      }
    },
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

  widget_layer_list.on("trigger-action", function (event) {
    function save_file(filename, data) {
      const blob = new Blob([JSON.stringify(data)], { type: "text/json" });
      const link = document.createElement("a");
  
      link.download = filename;
      link.href = window.URL.createObjectURL(blob);
      link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");
  
      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
      });
  
      link.dispatchEvent(event);
      link.remove();
    }

    if (event.item.layer) {
      event.item.layer
        .queryFeatures({
          where: "1 = 1",
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          save_file(event.item.title.replace(/ /g, "_") + ".json", response.features);
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
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

  let module = sessionStorage.getItem("module");

  view_layer(module);

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

  if (viewMode === "3D") {
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
  } 
  else {
    view.ui.move(["navigation-toggle", "compass"], "bottom-left");
  }

  view.ui.move("zoom", "bottom-right");
}

export function MapComponent () {
  const [viewMode, setViewMode] = React.useState("3D");

  function change_view() {
    if (viewMode === "3D") {
      setViewMode("2D");
    }
    else {
      setViewMode("3D");
    }
  }

  React.useEffect(function () {
    if (viewMode === "3D") {
      view = new MapView({
        container: "map-interface",
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
        },
      });
    }
    else {
      view = new SceneView({
        container: "map-interface",
        map: new Map({
          basemap: "osm",
          ground: "world-elevation",
          layers: []
        }),
        center: [121.7740, 12.8797],
        zoom: 4,
        heading: 30,
        tilt: 60,
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
    }

    build_view(viewMode);

    reactiveUtils.watch(
      function () {                    
        return (view.popup?.selectedFeature);
      },
      function (selectedFeature) {
        if (selectedFeature && !view.loading && view.popup.visible) {
          view
            .when(function () {
              if (selectedFeature.geometry?.extent) {
                view.goTo(selectedFeature.geometry.extent);
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        }
    });
  }, [viewMode]);

  return (
    // Note: The parent <div> needs its width and height dimensions to be set into a constant value.
    <div id = "map-container" style = { { width: "100%", height: "100%" } }>
      <div id = "map-switch" onClick = { function () { change_view(); } }>{ viewMode }</div>
      <div id = "map-interface" style = { { width: "100%", height: "100%" } }></div>
    </div>
  );
}

export function view_layer (module) {
  sessionStorage.setItem("module", module);
  
  /* Common Data */

  function content_kilometer_posts (target) {
    const container = document.createElement("div");

    container.innerHTML = `
      <table className = "attribute-table">
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
          <tr>
            <td><b>Kilometer Post</b></td>
            <td>${ target.graphic.attributes.KM_POST || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Chainage</b></td>
            <td>${ target.graphic.attributes.LOCATION || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Cross-Section</b></td>
            <td>${ target.graphic.attributes.XSP || "No available data" }</td>
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
        displayType: "auto"
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
        style: "circle",
        color: [255, 255, 255, 1.00],
        outline: {
          color: [0, 0, 0, 1.00],
          width: 1.00
        }
      },
      visualVariables: [{
        type: "size",
        valueExpression: "$view.scale",
        stops: [
          { size: 8, value: 9027.977411 }, // Zoom Level: 16
          { size: 4, value: 144447.638572 }, // Zoom Level: 12
          { size: 1, value: 2311162.217155 } // Zoom Level: 8
        ]
      }]
    },
    labelsVisible: true,
    labelingInfo: [{
      labelExpressionInfo: { expression: "$feature.KM_POST" },
      labelPlacement: "above-center",
      symbol: {
        type: "text",
        color: [0, 0, 0, 1.00],
        haloColor: [255, 255, 255, 0.50],
        haloSize: 1,
        font: { family: "Avenir Next LT Pro", size: 8 }
      }
    }],
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
    visible: true,
    visibilityMode: "independent"
  });

  function content_volume_of_traffic (target) {
    const container = document.createElement("div");

    container.innerHTML = `
      <table className = "attribute-table">
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
            <td><b>Section ID</b></td>
            <td>${ target.graphic.attributes.SECTION_ID || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Road Name</b></td>
            <td>${ target.graphic.attributes.ROAD_NAME || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Annual Average Daily Traffic (AADT)</b></td>
            <td>${ target.graphic.attributes.AADT || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Annual Average Daily Traffic (AADT) Year</b></td>
            <td>${ target.graphic.attributes.YEAR || "No available data" }</td>
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
        displayType: "auto"
      }
    ]);
  }

  const array_volume_of_traffic = [
    ["Unclassified", [191, 191, 191, 1.00]],
    [6, [128, 15, 47, 1.00]],
    [5, [164, 19, 60, 1.00]],
    [4, [201, 24, 74, 1.00]],
    [3, [255, 77, 109, 1.00]],
    [2, [255, 117, 143, 1.00]],
    [1, [255, 143, 163, 1.00]],
    [0, [255, 179, 193, 1.00]]
  ];

  const group_volume_of_traffic = new GroupLayer({
    title:  "Annual Average Daily Traffic (AADT)",
    layers: array_volume_of_traffic.map(function (category, index) {
      return (
        new FeatureLayer({
          title: category[0] === "Unclassified" ?
            "Unclassified Volume of Traffic" :
            "Level " + (category[0] + 1).toString().padStart(2, "0") + " Traffic Volume",
          url: url_volume_of_traffic,
          definitionExpression:
            category[0] === "Unclassified" ?
              "AADT < 0.00" :
            index === 1 ?
              "AADT > " + (10000 * category[0]).toFixed(2) :
              "AADT > " + (10000 * category[0]).toFixed(2) + " AND AADT <= " + (10000 * (category[0] + 1)).toFixed(2),
          renderer: {
            type: "simple",
            label:
              category[0] === "Unclassified" ?
                "Unclassified Volume of Traffic" :
              index === 1 ?
                "> " + (10000 * category[0]).toFixed(2) :
                (10000 * category[0]).toFixed(2) + " to " + (10000 * (category[0] + 1)).toFixed(2),
            symbol: {
              type: "simple-line",
              width: 1.00,
              color: category[1]
            }
          },
          popupEnabled: true,
          popupTemplate: {
            title: "Annual Average Daily Traffic (AADT): {AADT}",
            outFields: ["*"],
            content: content_volume_of_traffic
          },
          visible: true
        })
      );
    }),
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  function content_terrain (target) {
    const container = document.createElement("div");

    container.innerHTML = `
      <table className = "attribute-table">
        <tbody>
          <tr>
            <td><b>Region</b></td>
            <td>${ target.graphic.attributes.region_nam || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Engineering District</b></td>
            <td>${ target.graphic.attributes.district_n || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Legislative District</b></td>
            <td>${ target.graphic.attributes.CONG_DIST || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Road Name</b></td>
            <td>${ target.graphic.attributes.road_name || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Section ID</b></td>
            <td>${ target.graphic.attributes.section_id || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Terrain Type</b></td>
            <td>${ target.graphic.attributes.terrain_ty || "No available data" }</td>
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
        displayType: "auto"
      }
    ]);
  }

  const array_terrain = [
    ["Unclassified", [191, 191, 191, 1.00]],
    ["Flat", [128, 128, 128, 1.00]],
    ["Rolling", [51, 204, 51, 1.00]],
    ["Mountainous", [153, 51, 0, 1.00]],
  ];

  const group_terrain = new GroupLayer({
    title: "Terrain",
    layers: array_terrain.map(function (category) {
      return (
        new FeatureLayer({
          title: `${ category[0] } Roads`,
          url: url_terrain,
          definitionExpression: category[0] === "Unclassified" ?
            array_terrain.map(function (category) { return (category[0] === "Unclassified" ? null : `terrain_ty <> '${ category[0] }'`); }).join(" AND ") :
            `terrain_ty = '${ category[0] }'`,
          renderer: {
            type: "simple",
            label: `${ category[0] } Terrain`,
            symbol: {
              type: "simple-line",
              width: 2.00,
              color: category[1]
            }
          },
          popupEnabled: true,
          popupTemplate: {
            title: category[0] === "Unclassified" ?
              "Terrain Type: Unclassified" :
              "Terrain Type: {terrain_ty}",
            outFields: ["*"],
            content: content_terrain
          },
          visible: true
        })
      );
    }),
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  function content_road_classification (target) {
    const container = document.createElement("div");

    container.innerHTML = `
      <table className = "attribute-table">
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
          <tr>
            <td><b>Road Classification</b></td>
            <td>${ target.graphic.attributes.ROAD_SEC_CLASS || "No available data" }</td>
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
        displayType: "auto"
      }
    ]);
  }

  const array_road_classification = [
    ["Unclassified", [191, 191, 191, 1.00]],
    ["Tertiary", [0, 176, 80, 1.00]],
    ["Secondary", [0, 176, 240, 1.00]],
    ["Primary", [255, 0, 0, 1.00]],
  ];

  const group_road_classification = new GroupLayer({
    title: "Road Section Classifications",
    layers: array_road_classification.map(function (category) {
      return (
        new FeatureLayer({
          title: `${ category[0] } Roads`,
          url: url_national_road_network,
          definitionExpression: category[0] === "Unclassified" ?
            array_road_classification.map(function (category) { return (category[0] === "Unclassified" ? null : `ROAD_SEC_CLASS <> '${ category[0] }'`); }).join(" AND ") :
            `ROAD_SEC_CLASS = '${ category[0] }'`,
          renderer: {
            type: "simple",
            label: `${ category[0] } Road`,
            symbol: {
              type: "simple-line",
              width: 1.00,
              color: category[1]
            }
          },
          popupEnabled: true,
          popupTemplate: {
            title: category[0] === "Unclassified" ?
              "Road Classification: Unclassified" :
              "Road Classification: {ROAD_SEC_CLASS}",
            outFields: ["*"],
            content: content_road_classification
          },
          visible: true
        })
      );
    }),
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  reactiveUtils.watch(
    function () {
      if (view && !view.loading && module) {
        view
          .when(function () {
            while (view.map.layers.length > 0) {
              view.map.layers.pop(); 
            }

            view.map.layers.push(
              group_administrative_boundaries,
              group_inventory_of_roads,
              group_road_classification,
              group_terrain,
              group_volume_of_traffic,
              group_kilometer_posts
            );

            if (module === "summary") {
              view.map.layers.push(layer_inventory_of_road_slope_protection_structures);
              view.map.layers.push(layer_inventory_of_road_slopes);

              view.map.layers.push(layer_road_slope_hazards);
            }
            if (module === "road-slope-hazards") {
              view.map.layers.push(group_situational_reports);
              view.map.layers.push(group_calamities);

              view.map.layers.push(group_storm_surge_hazards);
              view.map.layers.push(group_road_slope_hazards);
            }
            if (module === "road-slope-inventory") {
              view.map.layers.push(group_inventory_of_road_slope_protection_structures_type_of_road_slope_protection_structure);
              view.map.layers.push(group_inventory_of_road_slope_protection_structures_type_of_disaster);
              view.map.layers.push(group_inventory_of_road_slope_protection_structures_road_slope_condition);

              view.map.layers.push(group_inventory_of_road_slopes_type_of_road_slope_protection_structure);
              view.map.layers.push(group_inventory_of_road_slopes_type_of_disaster);
            }
            if (module === "potential-road-slope-protection-projects"){
              view.map.layers.push(group_potential_road_slope_protection_projects);
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });     
}

export function focus_map (type, string) {
  let highlighted_feature;

  group_administrative_boundaries.visible = true;

  for (const layer of group_administrative_boundaries.layers) {
    layer.visible = false;
  }

  if (view) {
    if (type === 1) {
      view
        .whenLayerView(layer_regions)
        .then(function (layerView) {
          layer_regions.visible = true;
      
          layer_regions
            .queryFeatures({
              where: string === "Bangsamoro Autonomous Region in Muslim Mindanao" ? "REGION = 'Region X'" : `REGION = '${ string }'`,
              returnGeometry: true,
              outFields: ["OBJECTID"]
            })
            .then(function (response) {
              if (highlighted_feature) {
                highlighted_feature.remove();
              }

              if (response?.features?.length > 0) {
                const feature = response.features[0];

                highlighted_feature = layerView.highlight(feature);

                if (feature.geometry?.extent) {
                  view.goTo(feature.geometry.extent);
                }
              }
            });
        });

      const filter_upper = new FeatureFilter({
        where: `REGION = '${ string }'`
      });

      const filter_lower = new FeatureFilter({
        where: `region_name = '${ string }'`
      });

      if (view.layerViews?.items?.length > 0) {
        for (const group of view.layerViews.items) {
          if (group?.layerViews?.items?.length > 0) {
            for (const layer of group.layerViews.items) {
              if (layer.layer.fields.map(function (field) { return (field.name); }).indexOf("REGION") < 0) {
                layer.filter = filter_lower;
              }
              else {
                layer.filter = filter_upper;
              }
            }
          }
        }
      }
    }
    if (type === 2) {
      view
        .whenLayerView(layer_engineering_districts)
        .then(function (layerView) {
          layer_engineering_districts.visible = true;
      
          layer_engineering_districts
            .queryFeatures({
              where: `DEO = '${ string }'`,
              returnGeometry: true,
              outFields: ["OBJECTID"]
            })
            .then(function (response) {
              if (highlighted_feature) {
                highlighted_feature.remove();
              }

              if (response?.features?.length > 0) {
                const feature = response.features[0];

                highlighted_feature = layerView.highlight(feature);

                if (feature.geometry?.extent) {
                  view.goTo(feature.geometry.extent);
                }
              }
            });
        });

      const filter_upper = new FeatureFilter({
        where: `DEO = '${ string }'`
      });

      const filter_lower = new FeatureFilter({
        where: `deo_name = '${ string }'`
      })

      if (view.layerViews?.items?.length > 0) {
        for (const group of view.layerViews.items) {
          if (group?.layerViews?.items?.length > 0) {
            for (const layer of group.layerViews.items) {
              if (layer.layer.fields.map(function (field) { return (field.name); }).indexOf("REGION") < 0) {
                layer.filter = filter_lower;
              }
              else {
                layer.filter = filter_upper;
              }
            }
          }
        }
      }
    }
    if (type === 3) {
      view
        .whenLayerView(layer_legislative_districts)
        .then(function (layerView) {
          layer_legislative_districts.visible = true;
      
          layer_legislative_districts
            .queryFeatures({
              where: `CONG_DIST = '${ string }'`,
              returnGeometry: true,
              outFields: ["OBJECTID"]
            })
            .then(function (response) {
              if (highlighted_feature) {
                highlighted_feature.remove();
              }

              if (response?.features?.length > 0) {
                const feature = response.features[0];

                highlighted_feature = layerView.highlight(feature);

                if (feature.geometry?.extent) {
                  view.goTo(feature.geometry.extent);
                }
              }
            });
        });

      const filter_upper = new FeatureFilter({
        where: `CONG_DIST = '${ string }'`
      });

      const filter_lower = new FeatureFilter({
        where: `district_name = '${ string }'`
      });

      if (view.layerViews?.items?.length > 0) {
        for (const group of view.layerViews.items) {
          if (group?.layerViews?.items?.length > 0) {
            for (const layer of group.layerViews.items) {
              if (layer.layer.fields.map(function (field) { return (field.name); }).indexOf("REGION") < 0) {
                layer.filter = filter_lower;
              }
              else {
                layer.filter = filter_upper;
              }
            }
          }
        }
      }
    }
    if (type === 4) {
      view
        .whenLayerView(layer_national_road_network)
        .then(function () {
          layer_national_road_network
            .queryFeatures({
              where: `ROAD_ID LIKE '%${ string }%' OR ROAD_NAME LIKE '%${ string }%' OR SECTION_ID LIKE '%${ string }%'`,
              returnGeometry: true,
              outFields: ["OBJECTID"]
            })
            .then(function (response) {
              if (highlighted_feature) {
                highlighted_feature.remove();
              }

              if (response?.features?.length > 0 && response.features[0].geometry?.extent) {
                var extent = response.features[0].geometry.extent;

                response.features.forEach(function(feature) {
                  extent = extent.union(feature.geometry.extent);
                });

                view.goTo(extent);
              }
            });
        });

      const filter_upper = new FeatureFilter({
        where: `ROAD_ID LIKE '%${ string }%' OR ROAD_NAME LIKE '%${ string }%' OR SECTION_ID LIKE '%${ string }%'`
      });

      const filter_lower = new FeatureFilter({
        where: `road_id LIKE '%${ string }%' OR road_name LIKE '%${ string }%' OR section_id LIKE '%${ string }%'`
      });

      if (view.layerViews?.items?.length > 0) {
        for (const group of view.layerViews.items) {
          if (group?.layerViews?.items?.length > 0) {
            for (const layer of group.layerViews.items) {
              if (layer.layer.fields.map(function (field) { return (field.name); }).indexOf("REGION") < 0) {
                layer.filter = filter_lower;
              }
              else {
                layer.filter = filter_upper;
              }
            }
          }
        }
      }
    }
    if (type === 5) {{
      if (view.layerViews?.items?.length > 0) {
        for (const group of view.layerViews.items) {
          if (group?.layerViews?.items?.length > 0) {
            for (const layer of group.layerViews.items) {
              layer.filter = new FeatureFilter({
                where: `1 = 1`
              });
            }
          }
        }
      }

      layer_national_road_network
        .queryFeatures({
          where: `1 = 1`,
          returnGeometry: true,
        })
        .then(function (response) {
          if (response?.features?.length > 0 && response.features[0].geometry?.extent) {
            var extent = response.features[0].geometry.extent;

            response.features.forEach(function(feature) {
              extent = extent.union(feature.geometry.extent);
            });

            view.goTo(extent);
          }
        });
      }
    }
  }
}

export function recenter_map (extent) {
  reactiveUtils.watch(
    function () {
      if (view && !view.loading && extent) {
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

export function open_popup (features) {
  reactiveUtils.watch(
    function () {
      if (view && !view.loading && features) {
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

export function close_popup () {
  reactiveUtils.watch(
    function () {
      if (view && !view.loading) {
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