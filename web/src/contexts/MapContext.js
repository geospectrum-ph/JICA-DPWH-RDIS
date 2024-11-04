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
  const url_terrain = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer";
  const url_hazard_risks = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/hazard_map/FeatureServer";
  const url_road_closures = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/sample_disire_road_closure/FeatureServer";

  const template_summary = {
    title: "{ROAD_NAME}",
    outFields: ["*"],
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "REGION",
            label: "Region"
          },
          {
            fieldName: "DEO",
            label: "Engineering District"
          },
          {
            fieldName: "CONG_DIST",
            label: "Legislative District"
          },
          {
            fieldName: "ROAD_NAME",
            label: "Road Name"
          },
          {
            fieldName: "SECTION_ID",
            label: "Section ID"
          },
          {
            fieldName: "TERRAIN",
            label: "Terrain"
          },
          {
            fieldName: "ROAD_SEC_C",
            label: "Road Classification"
          },
          {
            fieldName: "AADT",
            label: "Volume of Traffic (AADT)"
          },
          {
            fieldName: "START_LRP",
            label: "Start Station Limit"
          },
          {
            fieldName: "END_LRP",
            label: "End Station Limit"
          },
          {
            fieldName: "START_CHAINAGE",
            label: "Start Chainage"
          },
          {
            fieldName: "END_CHAINAGE",
            label: "End Chainage"
          },
          {
            fieldName: "END_LRP",
            label: "Start Coordinates"
          },
          {
            fieldName: "END_LRP",
            label: "End Coordinates"
          },
          {
            fieldName: "SEC_LENGTH",
            label: "Length"
          },
          {
            fieldName: "SEC_HEIGHT",
            label: "Height"
          },
          {
            fieldName: "SEC_AREA",
            label: "Area"
          },
          {
            fieldName: "SEC_SLOPE",
            label: "Slope Angle / Gradient (degrees)"
          },
          {
            fieldName: "DISASTERS",
            label: "Type of Disaster"
          },
          {
            fieldName: "SCOPE",
            label: "Scope of Work"
          },
          {
            fieldName: "STRUCTURE_NAME",
            label: "Structure Name"
          },
          {
            fieldName: "STRUCTURE_TYPE",
            label: "Structure Type"
          },
          {
            fieldName: "ROAD_SIDE",
            label: "Side of the Road"
          },
          {
            fieldName: "HAZARD",
            label: "Hazard Risk"
          },
          {
            fieldName: "ROAD_CLOSURES",
            label: "Road Closure Dates"
          },
          {
            fieldName: "SOURCE",
            label: "Source of Funds"
          },
          {
            fieldName: "SEC_LATITUDE",
            label: "Latitude"
          },          {
            fieldName: "SEC_LONGITUDE",
            label: "Longitude"
          },
          {
            fieldName: "REMARKS",
            label: "Remarks"
          },
        ]
      }
    ]
  }

  
  const template_slope_inventory = {
    title: "{ROAD_NAME}",
    outFields: ["*"],
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "REGION",
            label: "Region"
          },
          {
            fieldName: "DEO",
            label: "Engineering District"
          },
          {
            fieldName: "CONG_DIST",
            label: "Legislative District"
          },
          {
            fieldName: "ROAD_NAME",
            label: "Road Name"
          },
          {
            fieldName: "SECTION_ID",
            label: "Section ID"
          },
          {
            fieldName: "TERRAIN",
            label: "Terrain"
          },
          {
            fieldName: "ROAD_SEC_C",
            label: "Road Classification"
          },
          {
            fieldName: "AADT",
            label: "Volume of Traffic (AADT)"
          },
          {
            fieldName: "START_LRP",
            label: "Start Station Limit"
          },
          {
            fieldName: "END_LRP",
            label: "End Station Limit"
          },
          {
            fieldName: "START_CHAINAGE",
            label: "Start Chainage"
          },
          {
            fieldName: "END_CHAINAGE",
            label: "End Chainage"
          },
          {
            fieldName: "END_LRP",
            label: "Start Coordinates"
          },
          {
            fieldName: "END_LRP",
            label: "End Coordinates"
          },
          {
            fieldName: "SEC_LENGTH",
            label: "Length"
          },
          {
            fieldName: "SEC_HEIGHT",
            label: "Height"
          },
          {
            fieldName: "SEC_AREA",
            label: "Area"
          },
          {
            fieldName: "SEC_SLOPE",
            label: "Slope Angle / Gradient (degrees)"
          },
          {
            fieldName: "DISASTERS",
            label: "Type of Disaster"
          },
          {
            fieldName: "SCOPE",
            label: "Scope of Work"
          },
          {
            fieldName: "STRUCTURE_NAME",
            label: "Structure Name"
          },
          {
            fieldName: "STRUCTURE_TYPE",
            label: "Structure Type"
          },
          {
            fieldName: "ROAD_SIDE",
            label: "Side of the Road"
          },
          {
            fieldName: "HAZARD",
            label: "Hazard Risk"
          },
          {
            fieldName: "ROAD_CLOSURES",
            label: "Road Closure Dates"
          },
          {
            fieldName: "SOURCE",
            label: "Source of Funds"
          },
          {
            fieldName: "SEC_LATITUDE",
            label: "Latitude"
          },          {
            fieldName: "SEC_LONGITUDE",
            label: "Longitude"
          },
          {
            fieldName: "REMARKS",
            label: "Remarks"
          },
        ]
      }
    ]
  }

  const layer_inventory_of_road_slope_structures = new FeatureLayer({
    title: "Inventory of Road Slope Structures",
    url: url_road_sections,
    renderer: {
      type: "unique-value",
      field: "DIRECTION",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      },
      uniqueValueInfos: [
        {
          value: "Top Right",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 0, 0, 1.00]
          }
        }, 
        {
          value: "Top Left",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [200, 100, 0, 1.00]
          }
        },
        {
          value: "Bottom Right",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [100, 200, 0, 1.00]
          }
        },
        {
          value: "Bottom Left",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 255, 0, 1.00]
          }
        }
      ]
    },
    popupEnabled: true,
    popupTemplate: template_slope_inventory,
    visible: true
  });

  const layer_inventory_of_road_slopes = new FeatureLayer({
    title: "Inventory of Road Slopes",
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
            color: [200, 200, 200, 1.00]
          }
        }, 
        {
          value: "Secondary",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [150, 150, 150, 1.00]
          }
        },
        {
          value: "Tertiary",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [100, 100, 100, 1.00]
          }
        }
      ]
    },
    // popupTemplate: template_summary,
    visible: true
  });

  const layer_terrain = new FeatureLayer({
    title: "Terrain",
    url: url_terrain,
    renderer: {
      type: "unique-value",
      field: "terrain_ty",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      },
      uniqueValueInfos: [
        {
          value: "Flat",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 100, 0, 1.00]
          }
        }, 
        {
          value: "Rolling",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 150, 0, 1.00]
          }
        },
        {
          value: "Mountainous",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 100, 0, 1.00]
          }
        }
      ]
    },
    // popupTemplate: template_summary,
    visible: true
  });

  const layer_hazard_risks = new FeatureLayer({
    title: "Hazard Risks",
    url: url_hazard_risks,
    renderer: {
      type: "unique-value",
      field: "hazard_risk_select",
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
    // popupTemplate: template_summary,
    visible: true
  });

  const layer_road_closures = new FeatureLayer({
    title: "Road Closures",
    url: url_road_closures,
    renderer: {
      type: "unique-value",
      field: "situation",
      defaultSymbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      },
      uniqueValueInfos: [
        {
          value: "passable",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [0, 255, 0, 1.00]
          }
        }, 
        {
          value: "notpassable",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 0, 0, 1.00]
          }
        },
        {
          value: "limitedaccess",
          symbol: {
            type: "simple-line",
            width: 1,
            color: [255, 255, 0, 1.00]
          }
        }
      ]
    },
    // popupTemplate: template_summary,
    visible: true
  });

  const group_hazard_map = new GroupLayer({
    title: "Hazard Map",
    layers: [layer_hazard_risks, layer_road_closures],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });


  const layer_road_sections = new FeatureLayer({
    title: "Sample Data",
    url: url_road_sections,
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    visible: true
  });

  const layer_good = new FeatureLayer({
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
    // popupTemplate: template_slope_inventory,
    visible: true
  });

  const layer_fair = new FeatureLayer({
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
    // popupTemplate: template_slope_inventory,
    visible: true
  });

  const layer_poor = new FeatureLayer({
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
    // popupTemplate: template_slope_inventory,
    visible: true
  });

  const layer_bad = new FeatureLayer({
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
    // popupTemplate: template_slope_inventory,
    visible: true
  });

  const group_road_slope_condition = new GroupLayer({
    title: "Road Slope Condition",
    layers: [layer_bad, layer_poor, layer_fair, layer_good],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_primary = new FeatureLayer({
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
    visible: true
  });

  const layer_secondary = new FeatureLayer({
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
    visible: true
  });

  const layer_tertiary = new FeatureLayer({
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
    visible: true
  });

  const group_road_classification = new GroupLayer({
    title: "Road Classification",
    layers: [layer_tertiary, layer_secondary, layer_primary],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_flat = new FeatureLayer({
    title: "Flat",
    url: url_terrain,
    definitionExpression: "TERRAIN_TY = 'FLAT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 100, 0, 1.00]
      }
    },
    visible: true
  });

  const layer_rolling = new FeatureLayer({
    title: "Rolling",
    url: url_terrain,
    definitionExpression: "TERRAIN_TY = 'ROLLING'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 150, 0, 1.00]
      }
    },
    visible: true
  });

  const layer_mountainous = new FeatureLayer({
    title: "Mountainous",
    url: url_terrain,
    definitionExpression: "TERRAIN_TY = 'MOUNTAINOUS'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 200, 0, 1.00]
      }
    },
    visible: true
  });

  const group_terrain = new GroupLayer({
    title: "Terrain",
    layers: [layer_flat, layer_rolling, layer_mountainous],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const group_volume_of_traffic = new GroupLayer({
    title: "Volume of Traffic",
    layers: [],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const layer_soil_slope_collapse = new FeatureLayer({
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
    visible: true
  });

  const layer_rock_slope_collapse = new FeatureLayer({
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
    visible: true
  });

  const layer_landslide = new FeatureLayer({
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
    visible: true
  });

  const layer_road_slip = new FeatureLayer({
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
    visible: true
  });

  const layer_river_erosion = new FeatureLayer({
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
    visible: true
  });

  const layer_debris_flow = new FeatureLayer({
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
    visible: true
  });

  const layer_coastal_erosion = new FeatureLayer({
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
    visible: true
  });

  const group_type_of_disaster = new GroupLayer({
    title: "Type of Disaster",
    layers: [
      layer_soil_slope_collapse,
      layer_rock_slope_collapse,
      layer_landslide,
      layer_road_slip,
      layer_river_erosion,
      layer_debris_flow,
      layer_coastal_erosion
    ],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  const group_type_of_road_slope_structures = new GroupLayer({
    title: "Type of Road Slope Structures",
    layers: [layer_road_sections],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });

  function open_popup (event) {
    view
      .when(function () {
        const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
      
        view.openPopup({
          // Set the popup's title to the coordinates of the clicked location
          title: "Test",
          location: event.mapPoint // Set the location of the popup to the clicked location
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function close_popup() {
    // view
    //   .when(function () {
    //     view.popup.visible = false;
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  }

  var view;

  function MapComponent () {
    // esriConfig.apiKey = STRING_KEY;

    React.useEffect(function () {
      view = new MapView({
        container: "map-container",
        map: new Map({
          basemap: "osm/standard",
          layers: []
        }),
        center: [121.7740, 12.8797],
        zoom: 6,
        popup: {
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            position: "top-left",
            breakpoint: false
          }
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
        group: "widgets",
        pointerDisabled: false
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
          type: "card",
          layout: "side-by-side"
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
        heading: "Test",
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
              while (view.map.layers.length > 0) { view.map.layers.pop(); }

              
              if (module === "summary") {
                view.map.layers.push(layer_terrain);
                view.map.layers.push(group_hazard_map);
                view.map.layers.push(layer_inventory_of_road_slopes);
                view.map.layers.push(layer_inventory_of_road_slope_structures);
              }
              if (module === "inventory-of-road-slope-structures") {
                view.map.layers.push(group_type_of_road_slope_structures);
                view.map.layers.push(group_type_of_disaster);
                view.map.layers.push(group_volume_of_traffic);
                view.map.layers.push(group_terrain);
                view.map.layers.push(group_road_classification);
                view.map.layers.push(group_road_slope_condition);
              }
              if (module === "inventory-of-road-slopes") {
                view.map.layers.push(group_type_of_road_slope_structures);
                view.map.layers.push(group_type_of_disaster);
                view.map.layers.push(group_volume_of_traffic);
                view.map.layers.push(group_terrain);
                view.map.layers.push(group_road_classification);
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

  return (
    <MapContext.Provider value = {
      {
        layer_road_sections,
        MapComponent,
        view_layer, recenter_map
      } 
    }>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContextProvider;