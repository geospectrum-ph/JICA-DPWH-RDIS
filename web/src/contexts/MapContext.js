import * as React from "react";

import esriConfig from "@arcgis/core/config.js";

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

export const MapContext = React.createContext();

function MapContextProvider (props) {
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
  const url_cities = "https://apps2.dpwh.gov.ph/server/rest/services/DPWH_Public/Admin_Boundaries_City_Municipality/MapServer/0";

  const url_hazard_map = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/hazard_map_ver4/FeatureServer";
  const url_road_slopes_and_countermeasures = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/rsm_mobile_ver2/FeatureServer";

  const url_storm_surge_hazard_risks = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Storm_Surge_Hazard_Map/FeatureServer";

  /* Reference Data */

  function content_national_expressway (target) {
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
        displayType: "list"
      }
    ]);
  }

  const layer_national_expressways = new FeatureLayer({
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
      labelPlacement: "below-along",
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
      content: content_national_expressway
    },
    visible: true
  });

  function content_national_road (target) {
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
        displayType: "list"
      }
    ]);
  }

  const layer_national_road_network = new FeatureLayer({
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
      labelPlacement: "below-along",
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
      content: content_national_road
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

  /* Common Data */

  function content_kilometer_post (target) {
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
      content: content_kilometer_post
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
        displayType: "list"
      }
    ]);
  }

  const [maxAADT, setMaxAADT] = React.useState(0);

  React.useEffect(function () {
    new FeatureLayer({
      url: url_volume_of_traffic
    })
    .queryFeatures({
      outStatistics: [
        {
          onStatisticField: "AADT",
          outStatisticFieldName: "AADT_max",
          statisticType: "max"
        }
      ]
    })
    .then(function (response) {
      if (response && response.features.length > 0) {
        setMaxAADT(response.features[0].attributes.AADT_max);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  const array_volume_of_traffic = [
    ["Unclassified", [191, 191, 191, 1.00]],
    [7, [128, 15, 47, 1.00]],
    [6, [164, 19, 60, 1.00]],
    [5, [201, 24, 74, 1.00]],
    [4, [255, 77, 109, 1.00]],
    [3, [255, 117, 143, 1.00]],
    [2, [255, 143, 163, 1.00]],
    [1, [255, 179, 193, 1.00]]
  ];

  const group_volume_of_traffic = new GroupLayer({
    title:  "Annual Average Daily Traffic (AADT)",
    layers: array_volume_of_traffic.map(function (category) {
      return (
        new FeatureLayer({
          title: category[0] === "Unclassified" ?
            "Unclassified Volume of Traffic" :
            "Level " + category[0].toString().padStart(2, "0") + " Traffic Volume",
          url: url_terrain,
          definitionExpression: category[0] === "Unclassified" ?
            "AADT < 0.00 OR AADT > " + (maxAADT).toFixed(2) :
            "AADT > " + (maxAADT * category[0] / 7).toFixed(2) + " AND AADT <= " + (maxAADT * (category[0] + 1) / 7).toFixed(2),
          renderer: {
            type: "simple",
            label: category[0] === "Unclassified" ?
              "Unclassified Volume of Traffic" :
              (maxAADT * category[0] / 7).toFixed(2) + " to " + (maxAADT * (category[0] + 1) / 7).toFixed(2),
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
        displayType: "list"
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
          title: `${category[0]} Roads`,
          url: url_terrain,
          definitionExpression: category[0] === "Unclassified" ?
            array_terrain.map(function (category) { return (category[0] === "Unclassified" ? null : `terrain_ty <> '${category[0]}'`); }).join(" AND ") :
            `terrain_ty = '${category[0]}'`,
          renderer: {
            type: "simple",
            label: `${category[0]} Terrain`,
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
        displayType: "list"
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
          title: `${category[0]} Roads`,
          url: url_national_road_network,
          definitionExpression: category[0] === "Unclassified" ?
            array_road_classification.map(function (category) { return (category[0] === "Unclassified" ? null : `ROAD_SEC_CLASS <> '${category[0]}'`); }).join(" AND ") :
            `ROAD_SEC_CLASS = '${category[0]}'`,
          renderer: {
            type: "simple",
            label: `${category[0]} Road`,
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
        displayType: "list"
      }
    ]);
  }

  const layer_municipalities_cities = new FeatureLayer({
    title: "Municipalities / Cities",
    url: url_cities,
    renderer: {
      type: "simple",
      label: "Municipality / City",
      symbol: {
        type: "simple-fill",
        outline: { 
          color: [0, 0, 0, 1.00],
          width: 1.00
        }
      },
      visualVariables: [
        {
          type: "color",
          valueExpression: "$feature.OBJECTID % 4",
          stops: [
            { value: 0, color: "rgba(246, 214, 214, 1.00)" },
            { value: 1, color: "rgba(246, 247, 196, 1.00)" },
            { value: 2, color: "rgba(161, 238, 189, 1.00)" },
            { value: 3, color: "rgba(123, 211, 234, 1.00)" }
          ]
        }
      ]
    },
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
        displayType: "list"
      }
    ]);
  }

  const layer_provinces = new FeatureLayer({
    title: "Provinces",
    url: url_provinces,
    renderer: {
      type: "simple",
      label: "Province",
      symbol: {
        type: "simple-fill",
        outline: { 
          color: [0, 0, 0, 1.00],
          width: 1.00
        }
      },
      visualVariables: [
        {
          type: "color",
          valueExpression: "$feature.OBJECTID % 4",
          stops: [
            { value: 0, color: "rgba(246, 214, 214, 1.00)" },
            { value: 1, color: "rgba(246, 247, 196, 1.00)" },
            { value: 2, color: "rgba(161, 238, 189, 1.00)" },
            { value: 3, color: "rgba(123, 211, 234, 1.00)" }
          ]
        }
      ]
    },
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
        displayType: "list"
      }
    ]);
  }

  const layer_legislative_districts = new FeatureLayer({
    title: "Legislative Districts",
    url: url_legislative_districts,
    renderer: {
      type: "simple",
      label: "Legislative District",
      symbol: {
        type: "simple-fill",
        outline: { 
          color: [0, 0, 0, 1.00],
          width: 1.00
        }
      },
      visualVariables: [
        {
          type: "color",
          valueExpression: "$feature.OBJECTID % 4",
          stops: [
            { value: 0, color: "rgba(246, 214, 214, 1.00)" },
            { value: 1, color: "rgba(246, 247, 196, 1.00)" },
            { value: 2, color: "rgba(161, 238, 189, 1.00)" },
            { value: 3, color: "rgba(123, 211, 234, 1.00)" }
          ]
        }
      ]
    },
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
        displayType: "list"
      }
    ]);
  }

  const layer_engineering_districts = new FeatureLayer({
    title: "Engineering Districts",
    url: url_engineering_districts,
    renderer: {
      type: "simple",
      label: "Engineering District",
      symbol: {
        type: "simple-fill",
        outline: { 
          color: [0, 0, 0, 1.00],
          width: 1.00
        }
      },
      visualVariables: [
        {
          type: "color",
          valueExpression: "$feature.OBJECTID % 4",
          stops: [
            { value: 0, color: "rgba(246, 214, 214, 1.00)" },
            { value: 1, color: "rgba(246, 247, 196, 1.00)" },
            { value: 2, color: "rgba(161, 238, 189, 1.00)" },
            { value: 3, color: "rgba(123, 211, 234, 1.00)" }
          ]
        }
      ]
    },
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
        outline: { 
          color: [0, 0, 0, 1.00],
          width: 1.00
        }
      },
      visualVariables: [
        {
          type: "color",
          valueExpression: "$feature.OBJECTID % 4",
          stops: [
            { value: 0, color: "rgba(246, 214, 214, 1.00)" },
            { value: 1, color: "rgba(246, 247, 196, 1.00)" },
            { value: 2, color: "rgba(161, 238, 189, 1.00)" },
            { value: 3, color: "rgba(123, 211, 234, 1.00)" }
          ]
        }
      ]
    },
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
      layer_provinces,
      layer_engineering_districts,
      layer_legislative_districts,
      layer_municipalities_cities
    ],
    visible: false,
    visibilityMode: "independent"
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
            <td><b>Hazard Risk</b></td>
            <td>${ target.graphic.attributes.hazard_risk || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Start Station Limit</b></td>
            <td>${ target.graphic.attributes.start_lrp || "No available data" }</td>
          </tr>
          <tr>
            <td><b>End Station Limit</b></td>
            <td>${ target.graphic.attributes.end_lrp || "No available data" }</td>
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
            <td><b>Total Score (A)</b></td>
            <td>${ target.graphic.attributes.total_score_a || "0" }</td>
          </tr>
          <tr>
            <td><b>Total Score (B)</b></td>
            <td>${ target.graphic.attributes.total_score_b || "0" }</td>
          </tr>
          <tr>
            <td><b>Disaster History Score</b></td>
            <td>${ target.graphic.attributes.disaster_history_score || "0" }</td>
          </tr>
          <tr>
            <td><b>Score (D)</b></td>
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
        displayType: "list"
      }
    ]);
  }

  const layer_hazard_map = new FeatureLayer({
    title: "Hazard Map",
    url: url_hazard_map,
    renderer: {
      type: "simple",
      label: "Hazard Map Data",
      symbol: {
        type: "simple-line",
        width: 6.00,
        color: [255, 0, 255, 1.00]
      }
    },
    labelsVisible: true,
    labelingInfo: [{
      labelExpressionInfo: { expression: "$feature.hazard_risk" },
      labelPlacement: "below-along",
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
      content: content_hazard_map
    },
    visible: true
  });

  function content_road_slopes_and_countermeasures (target) {
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
            <td><b>Hazard Risk</b></td>
            <td>${ target.graphic.attributes.hazard_risk || "No available data" }</td>
          </tr>
          <tr>
            <td><b>Start Station Limit</b></td>
            <td>${ target.graphic.attributes.start_lrp || "No available data" }</td>
          </tr>
          <tr>
            <td><b>End Station Limit</b></td>
            <td>${ target.graphic.attributes.end_lrp || "No available data" }</td>
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
            <td><b>Slope Type Right</b></td>
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
        width: 3.00,
        color: [13, 59, 102, 1.00]
      }
    },
    labelsVisible: true,
    labelingInfo: [{
      labelExpressionInfo: { expression: "$feature.section_id" },
      labelPlacement: "below-along",
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
            <td>${ target.graphic.attributes.start_lrp || "No available data" }</td>
          </tr>
          <tr>
            <td><b>End Station Limit</b></td>
            <td>${ target.graphic.attributes.end_lrp || "No available data" }</td>
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
      labelPlacement: "below-along",
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

  function content_inventory_of_road_slope_structures (target) {
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
            <td>${ target.graphic.attributes.start_lrp || "No available data" }</td>
          </tr>
          <tr>
            <td><b>End Station Limit</b></td>
            <td>${ target.graphic.attributes.end_lrp || "No available data" }</td>
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
            <td><b>Existing Type of Road Slope Structure</b></td>
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
            <td><b>Condition</b></td>
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
      label: "Inventory of Road Slope Structures Data",
      symbol: {
        type: "simple-line",
        width: 3.00,
        color: [238, 150, 75, 1.00]
      }
    },
    labelsVisible: true,
    labelingInfo: [{
      labelExpressionInfo: { expression: "$feature.section_id" },
      labelPlacement: "below-along",
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
      content: content_inventory_of_road_slope_structures
    },
    visible: true
  });

  /* Hazard Map Data */

  const array_road_slope_hazard_risks = [
    ["Unclassified", [191, 191, 191, 1.00]],
    ["Low", [0, 176, 80, 1.00]],
    ["Middle", [255, 255, 0, 1.00]],
    ["High", [255, 0, 0, 1.00]],
  ];

  const group_road_slope_hazard_risks = new GroupLayer({
    title: "Road Slope Hazard Risks",
    layers: array_road_slope_hazard_risks.map(function (category) {
      return (
        new FeatureLayer({
          title: `Road Sections with ${category[0]} Road Slope Hazard Risk`,
          url: url_hazard_map,
          definitionExpression: category[0] === "Unclassified" ?
            array_road_slope_hazard_risks.map(function (category) { return (category[0] === "Unclassified" ? null : `hazard_risk <> '${category[0]}'`); }).join(" AND ") :
            `hazard_risk = '${category[0]}'`,
          renderer: {
            type: "simple",
            label: `Road Section with ${category[0]} Road Slope Hazard Risk`,
            symbol: {
              type: "simple-line",
              width: 6.00,
              color: category[1]
            }
          },
          popupEnabled: true,
          popupTemplate: {
            title: category[0] === "Unclassified" ?
              "Road Slope Hazard Risk Level: Unclassified" :
              "Road Slope Hazard Risk Level: {hazard_risk}",
            outFields: ["*"],
            content: content_hazard_map
          },
          visible: true
        })
      );
    }),
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  function generate_storm_surge_hazard_risk (proxy_data) {
    return (
      proxy_data === 1 ? "Low Risk" :
      proxy_data === 2 ? "Medium Risk" :
      proxy_data === 3 ? "High Risk" :
      "No available data"
    );
  }

  function content_storm_surge_hazard_risks (target) {
    const container = document.createElement("div");

    container.innerHTML = `
      <table className = "attribute-table">
        <tbody>
          <tr>
            <td><b>Storm Surge Hazard Level</b></td>
            <td>${ generate_storm_surge_hazard_risk(target.graphic.attributes.HAZ) || "No available data" }</td>
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

  const array_storm_surge_hazard_risks = [
    ["Unclassified", "HAZ <> 1 AND HAZ <> 2 AND HAZ <> 3", [191, 191, 191, 1.00], [191, 191, 191, 0.50]],
    ["Low", "HAZ = 1", [130, 192, 204, 1.00], [130, 192, 204, 0.50]],
    ["Medium", "HAZ = 2", [72, 159, 181, 1.00], [72, 159, 181, 0.50]],
    ["High", "HAZ = 3", [22, 105, 122, 1.00], [22, 105, 122, 0.50]],
  ];

  const group_storm_surge_hazard_risks = new GroupLayer({
    title: "Storm Surge Hazard Risks (NOAH)",
    layers: array_storm_surge_hazard_risks.map(function (category) {
      return (
        new FeatureLayer({
          title: `Areas with ${category[0]} Storm Hazard Risk`,
          url: url_storm_surge_hazard_risks,
          definitionExpression: category[1],
          renderer: {
            type: "simple",
            label: `Area with ${category[0]} Storm Surge Hazard Risk`,
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
              "Storm Surge Hazard Risk Level: Unclassified" :
              "Storm Surge Hazard Risk Level: {HAZ}",
            outFields: ["*"],
            content: content_storm_surge_hazard_risks
          },
          visible: true
        })
      );
    }),
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  /* Inventory of Road Slope Structures Data */

  const array_inventory_of_road_slope_structures_road_slope_condition = [
    ["Unclassified", [191, 191, 191, 1.00]],
    ["Bad", [204, 102, 0, 1.00]],
    ["Poor", [255, 153, 51, 1.00]],
    ["Fair", [0, 204, 255, 1.00]],
    ["Good", [153, 255, 153, 1.00]]
  ];

  const group_inventory_of_road_slope_structures_road_slope_condition = new GroupLayer({
    title: "Inventory of Road Slope Structures - Condition of Road Slope Structures",
    layers: array_inventory_of_road_slope_structures_road_slope_condition.map(function (category) {
      return (
        new FeatureLayer({
          title: category[0] === "Unclassified" ?
            "Road Slope Structure in an Unclassified Condition" :
            `Road Slope Structure in ${category[0]} Condition`,
          url: url_road_slopes_and_countermeasures,
          definitionExpression: category[0] === "Unclassified" ?
            "rsm_category = 'Inventory of Road Slope Structures' AND " + array_inventory_of_road_slope_structures_road_slope_condition.map(function (category) { return (category[0] === "Unclassified" ? null : `road_condition <> '${category[0]}'`); }).join(" AND ") :
            `rsm_category = 'Inventory of Road Slope Structures' AND road_condition = '${category[0]}'`,
          renderer: {
            type: "simple",
            label: category[0] === "Unclassified" ?
              "Road Slope Structure in an Unclassified Condition" :
              `Road Slope Structure in ${category[0]} Condition`,
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
            content: content_inventory_of_road_slope_structures
          },
          visible: true
        })
      );
    }),
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const array_inventory_of_road_slope_structures_type_of_disaster = [
    ["Unclassified", [191, 191, 191, 1.00]],
    ["Coastal Erosion", [0, 0, 255, 1.00]],
    ["Debris Flow", [60, 0, 210, 1.00]],
    ["River Erosion", [120, 0, 180, 1.00]],
    ["Road Slip", [150, 0, 150, 1.00]],
    ["Landslide", [180, 0, 120, 1.00]],
    ["Rock Slope Collapse/Rock Fall", [210, 0, 60, 1.00]],
    ["Soil Slope Collapse", [255, 0, 0, 1.00]]    
  ];

  const group_inventory_of_road_slope_structures_type_of_disaster = new GroupLayer({
    title: "Inventory of Road Slope Structures - Types of Disaster",
    layers: array_inventory_of_road_slope_structures_type_of_disaster.map(function (category) {
      return (
        new FeatureLayer({
          title: category[0] === "Unclassified" ?
            "Road Slope Structure Affected by an Unclassified Road Slope Disaster" :
            category[0] === "Landslide" ?
              "Road Slope Structure Affected by Landslide (LS)" :
              "Road Slope Structure Affected by ".concat(category[0].split("/").map(function (words) { return (words.concat(" (", words.split(" ").map(function (word) { return (word[0]); }).join(""), ")")); }).join("/")),
          url: url_road_slopes_and_countermeasures,
          definitionExpression: category[0] === "Unclassified" ?
            "rsm_category = 'Inventory of Road Slope Structures' AND " + array_inventory_of_road_slope_structures_type_of_disaster.map(function (category) { return (category[0] === "Unclassified" ? null : `disaster_type <> '${category[0]}'`); }).join(" AND ") :
            `rsm_category = 'Inventory of Road Slope Structures' AND disaster_type = '${category[0]}'`,
          renderer: {
            type: "simple",
            label: category[0] === "Unclassified" ?
              "Road Slope Structure Affected by an Unclassified Road Slope Disaster" :
              category[0] === "Landslide" ?
                "Road Slope Structure Affected by Landslide (LS)" :
                "Road Slope Structure Affected by ".concat(category[0].split("/").map(function (words) { return (words.concat(" (", words.split(" ").map(function (word) { return (word[0]); }).join(""), ")")); }).join("/")),
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
            content: content_inventory_of_road_slope_structures
          },
          visible: true
        })
      );
    }),
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const array_inventory_of_road_slope_structures_type_of_road_slope_structures = [
    ["Unclassified", [191, 191, 191, 1.00]],
    ["Gabions Revetment (Pile-Up Type)", [255, 255, 0, 1.00]],
    ["Boulder Spur Dike (Type II)", [210, 255, 0, 1.00]],
    ["Earthfill Dike (Type I)", [180, 255, 0, 1.00]],
    ["Bio-Engineering Solutions (Coco-Net, Coco-Log & Vetiver Grass)", [150, 255, 0, 1.00]],
    ["Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)", [120, 255, 0, 1.00]],
    ["Gabion/Mattress Slope Protection", [90, 255, 0, 1.00]],
    ["Gravity Wall (Type I)", [60, 255, 0, 1.00]],
    ["Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)", [0, 255, 0, 1.00]],
    ["Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)", [0, 255, 60, 1.00]],
    ["Concrete Slope Protection (Reinforced Concrete Type II)", [0, 255, 90, 1.00]],
    ["Stone Masonry", [0, 255, 120, 1.00]],
    ["Rubble Concrete Revetment (Spread Type I)", [0, 255, 150, 1.00]],
    ["Grouted Riprap with Concrete Sheet Pile Foundation", [0, 255, 180, 1.00]],
    ["Grouted Riprap with Steel Sheet Pile Foundation", [0, 255, 210, 1.00]],
    ["Grouted Riprap", [0, 255, 255, 1.00]]
  ];

  const group_inventory_of_road_slope_structures_type_of_road_slope_structures = new GroupLayer({
    title: "Inventory of Road Slopes - Type of Road Slope Structures",
    layers: array_inventory_of_road_slope_structures_type_of_road_slope_structures.map(function (category) {
      return (
        new FeatureLayer({
          title: category[0] === "Unclassified" ?
            "Road Slope Structure with an Unclassified Road Slope Structure Type" :
            `Road Slope Structure with ${category[0]}`,
          url: url_road_slopes_and_countermeasures,
          definitionExpression: category[0] === "Unclassified" ?
            "rsm_category = 'Inventory of Road Slope Structures' AND " + array_inventory_of_road_slope_structures_type_of_road_slope_structures.map(function (category) { return (category[0] === "Unclassified" ? null : `road_slope_structure_type <> '${category[0]}'`); }).join(" AND ") :
            `rsm_category = 'Inventory of Road Slope Structures' AND road_slope_structure_type = '${category[0]}'`,
          renderer: {
            type: "simple",
            label: category[0] === "Unclassified" ?
              "Road Slope Structure with an Unclassified Road Slope Structure Type" :
              `Road Slope Structure with ${category[0]}`,
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
            content: content_inventory_of_road_slope_structures
          },
          visible: true
        })
      );
    }),
    visible: false,
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
    ["Rock Slope Collapse/Rock Fall", [243, 114, 44, 1.00]],
    ["Soil Slope Collapse", [249, 65, 68, 1.00]]
  ];

  const group_inventory_of_road_slopes_type_of_disaster = new GroupLayer({
    title: "Inventory of Road Slopes - Types of Disaster",
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
            "rsm_category = 'Inventory of Road Slope' AND " + array_inventory_of_road_slopes_type_of_disaster.map(function (category) { return (category[0] === "Unclassified" ? null : `disaster_type <> '${category[0]}'`); }).join(" AND ") :
            `rsm_category = 'Inventory of Road Slope' AND disaster_type = '${category[0]}'`,
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
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const array_inventory_of_road_slopes_type_of_road_slope_structures = [
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
    ["Grouted Riprap with Steel Sheet Pile Foundation", [138, 22, 177, 1.00]],
    ["Grouted Riprap", [138, 22, 177, 1.00]]
  ];

  const group_inventory_of_road_slopes_type_of_road_slope_structures = new GroupLayer({
    title: "Inventory of Road Slopes - Type of Road Slope Structures",
    layers: array_inventory_of_road_slopes_type_of_road_slope_structures.map(function (category) {
      return (
        new FeatureLayer({
          title: category[0] === "Unclassified" ?
            "Road Slope with an Unclassified Road Slope Structure Type" :
            `Road Slope with ${category[0]}`,
          url: url_road_slopes_and_countermeasures,
          definitionExpression: category[0] === "Unclassified" ?
            "rsm_category = 'Inventory of Road Slope' AND " + array_inventory_of_road_slopes_type_of_road_slope_structures.map(function (category) { return (category[0] === "Unclassified" ? null : `road_slope_structure_type <> '${category[0]}'`); }).join(" AND ") :
            `rsm_category = 'Inventory of Road Slope' AND road_slope_structure_type = '${category[0]}'`,
          renderer: {
            type: "simple",
            label: category[0] === "Unclassified" ?
              "Road Slope with an Unclassified Road Slope Structure Type" :
              `Road Slope with ${category[0]}`,
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
    visible: false,
    visibilityMode: "independent",
    opacity: 1.00
  });
  
  /* Potential Road Slope Projects Data */

  const array_potential_road_slope_projects = [
    ["Unclassified", [191, 191, 191, 1.00]],
    ["Construction", [112, 48, 160, 1.00]],
    ["Reconstruction", [48, 84, 150, 1.00]],
    ["Rehabilitation or Major Repair", [255, 217, 102, 1.00]]
  ];

  const group_potential_road_slope_projects = new GroupLayer({
    title: "Potential Road Slope Projects",
    layers: array_potential_road_slope_projects.map(function (category) {
      return (
        new FeatureLayer({
          title: category[0] === "Unclassified" ?
            "Unclassified Potential Road Slope Project" :
            `Potential Road Slope ${category[0]} Project`,
          url: url_road_slopes_and_countermeasures,
          definitionExpression: category[0] === "Unclassified" ?
            "rsm_category = 'Inventory of Road Slope' AND " + array_potential_road_slope_projects.map(function (category) { return (category[0] === "Unclassified" ? null : `type_of_work <> '${category[0]}'`); }).join(" AND ") :
            category[0] === "Rehabilitation or Major Repair" ? 
              "rsm_category = 'Inventory of Road Slope' AND type_of_work <> 'Reconstruction' AND type_of_work <> 'Construction'" :
              `rsm_category = 'Inventory of Road Slope' AND type_of_work = '${category[0]}'`,
          renderer: {
            type: "simple",
            label: category[0] === "Unclassified" ?
              "Unclassified Potential Road Slope Project" :
              `Potential Road Slope ${category[0]} Project`,
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

  const [viewMode, setViewMode] = React.useState("3D");

  function change_view() {
    if (viewMode === "3D") {
      setViewMode("2D");
    }
    else {
      setViewMode("3D");
    }
  }

  var view;

  const [moduleBuffer, setModuleBuffer] = React.useState("summary");

  function build_view() {
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

        if (item.children.items.length === 0) {
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
            save_file(event.item.title.replace(/ /g,"_") + ".json", response.features);
          })
          .catch(function (error) {
            console.log(error);
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

    view_layer(moduleBuffer);

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

  function MapComponent () {
    // esriConfig.apiKey = STRING_KEY;

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

      build_view();

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
      <div id = "map-container" style = { { width: "100%", height: "100%" } }>
        <div id = "map-switch" onClick = { function () { change_view(); } }>{ viewMode }</div>
        <div id = "map-interface" style = { { width: "100%", height: "100%" } }></div>
      </div>
    );
  }

  function view_layer (module) {
    setModuleBuffer(module);

    reactiveUtils.watch(
      function () {
        if (view && module) {
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
                view.map.layers.push(layer_inventory_of_road_slopes);
                view.map.layers.push(layer_inventory_of_road_slope_structures);

                view.map.layers.push(layer_hazard_map);
              }
              if (module === "hazard-map") {
                view.map.layers.push(group_storm_surge_hazard_risks);
                view.map.layers.push(group_road_slope_hazard_risks);
              }
              if (module === "road-slope-inventory") {                
                view.map.layers.push(group_inventory_of_road_slopes_type_of_road_slope_structures);
                view.map.layers.push(group_inventory_of_road_slopes_type_of_disaster);
                
                view.map.layers.push(group_inventory_of_road_slope_structures_type_of_road_slope_structures);
                view.map.layers.push(group_inventory_of_road_slope_structures_type_of_disaster);
                view.map.layers.push(group_inventory_of_road_slope_structures_road_slope_condition);

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

  function focus_map (type, string) {
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
            layerView.highlightOptions = {
              color: "rgba(255, 0, 255, 1.00)",
              haloOpacity: 1.00,
              fillOpacity: 0.25
            };

            layer_regions.visible = true;
        
            layer_regions
              .queryFeatures({
                where: `REGION = '${string}'`,
                returnGeometry: true,
                outFields: ["OBJECTID"]
              })
              .then(function (result) {
                if (highlighted_feature) {
                  highlighted_feature.remove();
                }

                const feature = result.features[0];

                highlighted_feature = layerView.highlight(feature);

                if (feature?.geometry?.extent) { view?.goTo(feature.geometry.extent); }
              });
          });

        const filter = new FeatureFilter({
          where: `REGION = '${string}'`
        });

        if (view?.layerViews?.items?.length > 0) {
          for (const group of view.layerViews.items) {
            if (group?.layerViews?.items?.length > 0) {
              for (const layer of group.layerViews.items) {
                layer.filter = filter;
              }
            }
          }
        }
      }
      if (type === 2) {
        view
          .whenLayerView(layer_engineering_districts)
          .then(function (layerView) {
            layerView.highlightOptions = {
              color: "rgba(255, 0, 255, 1.00)",
              haloOpacity: 1.00,
              fillOpacity: 0.25
            };

            layer_engineering_districts.visible = true;
        
            layer_engineering_districts
              .queryFeatures({
                where: `DEO = '${string}'`,
                returnGeometry: true,
                outFields: ["OBJECTID"]
              })
              .then(function (result) {
                if (highlighted_feature) {
                  highlighted_feature.remove();
                }

                const feature = result.features[0];

                highlighted_feature = layerView.highlight(feature);

                if (feature?.geometry?.extent) { view?.goTo(feature.geometry.extent); }
              });
          });

        const filter = new FeatureFilter({
          where: `DEO = '${string}'`
        });

        if (view?.layerViews?.items?.length > 0) {
          for (const group of view.layerViews.items) {
            if (group?.layerViews?.items?.length > 0) {
              for (const layer of group.layerViews.items) {
                layer.filter = filter;
              }
            }
          }
        }
      }
      if (type === 3) {
        view
          .whenLayerView(layer_legislative_districts)
          .then(function (layerView) {
            layerView.highlightOptions = {
              color: "rgba(255, 0, 255, 1.00)",
              haloOpacity: 1.00,
              fillOpacity: 0.25
            };

            layer_legislative_districts.visible = true;
        
            layer_legislative_districts
              .queryFeatures({
                where: `CONG_DIST = '${string}'`,
                returnGeometry: true,
                outFields: ["OBJECTID"]
              })
              .then(function (result) {
                if (highlighted_feature) {
                  highlighted_feature.remove();
                }

                const feature = result.features[0];

                highlighted_feature = layerView.highlight(feature);

                if (feature?.geometry?.extent) { view?.goTo(feature.geometry.extent); }
              });
          });

        const filter = new FeatureFilter({
          where: `CONG_DIST = '${string}'`
        });

        if (view?.layerViews?.items?.length > 0) {
          for (const group of view.layerViews.items) {
            if (group?.layerViews?.items?.length > 0) {
              for (const layer of group.layerViews.items) {
                layer.filter = filter;
              }
            }
          }
        }
      }
      if (type === 4) {
        view
          .whenLayerView(layer_national_road_network)
          .then(function (layerView) {
            layerView.highlightOptions = {
              color: "rgba(255, 0, 255, 1.00)",
              haloOpacity: 1.00,
              fillOpacity: 0.25
            };

            layer_national_road_network
              .queryFeatures({
                where: `ROAD_ID LIKE '%${string}%' OR ROAD_NAME LIKE '%${string}%' OR SECTION_ID LIKE '%${string}%'`,
                returnGeometry: true,
                outFields: ["OBJECTID"]
              })
              .then(function (result) {
                if (highlighted_feature) {
                  highlighted_feature.remove();
                }

                var extent = result.features[0].geometry.extent;

                result.features.forEach(function(feature) {
                  extent = extent.union(feature.geometry.extent);
                });

                if (extent) { view?.goTo(extent); }
              });
          });

        const filter = new FeatureFilter({
          where: `ROAD_ID LIKE '%${string}%' OR ROAD_NAME LIKE '%${string}%' OR SECTION_ID LIKE '%${string}%'`
        });

        if (view?.layerViews?.items?.length > 0) {
          for (const group of view.layerViews.items) {
            if (group?.layerViews?.items?.length > 0) {
              for (const layer of group.layerViews.items) {
                layer.filter = filter;
              }
            }
          }
        }
      }
    }
  }

  function refocus_map () {
    group_administrative_boundaries.visible = false;

    for (const layer of group_administrative_boundaries.layers) {
      layer.visible = false;
    }

    const filter = new FeatureFilter({
      where: "1 = 1"
    });

    if (view?.layerViews?.items?.length > 0) {
      for (const group of view.layerViews.items) {
        if (group?.layerViews?.items?.length > 0) {
          for (const layer of group.layerViews.items) {
            layer.filter = filter;
          }
        }
      }
    }

    if (layer_national_road_network.fullExtent) {
      view?.goTo(layer_national_road_network.fullExtent);
    }
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

  function close_popup () {
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
        layer_national_road_network,
        layer_regions,
        layer_engineering_districts,
        layer_legislative_districts,

        layer_hazard_map,
        layer_road_slopes_and_countermeasures,

        layer_inventory_of_road_slopes,
        layer_inventory_of_road_slope_structures,

        MapComponent,

        view_layer, focus_map, refocus_map, recenter_map, open_popup, close_popup
      } 
    }>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContextProvider;