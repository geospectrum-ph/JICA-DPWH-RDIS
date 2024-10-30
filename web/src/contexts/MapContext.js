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
  // const url_kilometer_posts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/kilometer_posts/FeatureServer";
  // const url_potential_structures = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/rsm_mobile/FeatureServer";
  // const url_existing_sructures
  // const url_hazard_map = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/hazard_map/FeatureServer";
  // const url_hazard_data
  // const url_road_closures = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/sample_disire_road_closure/FeatureServer";
  // const url_potential_projects
  // const url_existing_projects = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/sample_road_projects/FeatureServer";


  // const layer_kilometer_posts = new FeatureLayer({
  //   title: "Kilometer Posts",
  //   url: url_kilometer_posts,
  //   renderer: {
  //     type: "simple",
  //     symbol: {
  //       type: "simple-marker",
  //       size: "2px",
  //       outline: {
  //         width: 1,
  //         color: [255, 255, 255, 1.00]
  //       }
  //     }
  //   },
  //   defaultPopupTemplateEnabled: true,
  //   visible: false
  // });

  // const base_layers = new GroupLayer({
  //   title: "Base Layers",
  //   visible: true,
  //   visibilityMode: "independent",
  //   layers: [
  //     layer_regions,
  //     layer_terrain,
  //     layer_roads, 
  //     layer_kilometer_posts
  //   ],
  //   opacity: 1.00
  // });

  // const layer_road_inventory = new FeatureLayer({
  //   title: "Road Classifications",
  //   url: url_roads,
  //   renderer: {
  //     type: "unique-value",
  //     field: "ROAD_SEC_C",
  //     defaultSymbol: {
  //       type: "simple-line",
  //       width: 1,
  //       color: [255, 255, 255, 1.00]
  //     },
  //     uniqueValueInfos: [
  //       {
  //         value: "Primary",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [255, 255, 0, 1.00]
  //         }
  //       }, 
  //       {
  //         value: "Secondary",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [255, 0, 0, 1.00]
  //         }
  //       },
  //       {
  //         value: "Tertiary",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [0, 0, 255, 1.00]
  //         }
  //       }
  //     ]
  //   },
  //   defaultPopupTemplateEnabled: true,
  //   visible: true
  // });

  // const layer_potential_structures = new FeatureLayer({
  //   title: "Potential Structures",
  //   url: url_potential_structures,
  //   renderer: {
  //     type: "simple",
  //     symbol: {
  //       type: "simple-line",
  //       width: 1,
  //       color: [255, 255, 255, 1.00]
  //     }
  //   },
  //   defaultPopupTemplateEnabled: true,
  //   visible: true
  // });

  // const layer_hazard_map = new FeatureLayer({
  //   title: "Hazard Map",
  //   url: url_hazard_map,
  //   renderer: {
  //     type: "unique-value",
  //     field: "hazard_risk_select",
  //     defaultSymbol: {
  //       type: "simple-line",
  //       width: 1,
  //       color: [255, 255, 255, 1.00]
  //     },
  //     uniqueValueInfos: [
  //       {
  //         value: "risk_low",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [255, 255, 0, 1.00]
  //         }
  //       }, 
  //       {
  //         value: "risk_middle",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [255, 155, 55, 1.00]
  //         }
  //       },
  //       {
  //         value: "risk_high",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [255, 0, 0, 1.00]
  //         }
  //       }
  //     ]
  //   },
  //   defaultPopupTemplateEnabled: true,
  //   visible: true
  // });

  // const layer_road_closures = new FeatureLayer({
  //   title: "Road Closures",
  //   url: url_road_closures,
  //   renderer: {
  //     type: "unique-value",
  //     field: "situation",
  //     defaultSymbol: {
  //       type: "simple-line",
  //       width: 1,
  //       color: [255, 255, 255, 1.00]
  //     },
  //     uniqueValueInfos: [
  //       {
  //         value: "passable",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [0, 255, 0, 1.00]
  //         }
  //       }, 
  //       {
  //         value: "notpassable",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [255, 0, 0, 1.00]
  //         }
  //       },
  //       {
  //         value: "limitedaccess",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [255, 255, 0, 1.00]
  //         }
  //       }
  //     ]
  //   },
  //   defaultPopupTemplateEnabled: true,
  //   visible: true
  // });

  // const layer_existing_projects = new FeatureLayer({
  //   title: "Existing Projects",
  //   url: url_existing_projects,
  //   renderer: {
  //     type: "simple",
  //     symbol: {
  //       type: "simple-line",
  //       width: 1,
  //       color: [255, 255, 255, 1.00]
  //     },
  //     visualVariables: [
  //       {
  //         type: "color",
  //         field: "approved_amount",
  //         stops: [
  //           {
  //             value: 0,
  //             color: "rgba(255, 255, 255, 0, 1.00)"
  //           },
  //           {
  //             value: 500000000,
  //             color: "rgba(255, 255, 0, 1.00)"
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   defaultPopupTemplateEnabled: true,
  //   visible: true
  // });

  // const active_layers = new GroupLayer({
  //   title: "Active Layers",
  //   visible: true,
  //   visibilityMode: "independent",
  //   layers: [],
  //   opacity: 1.00
  // });

  const url_regions = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/region_rdis/FeatureServer";
  const url_legislative_districts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Congressional_Districts/FeatureServer";
  const url_engineering_districts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/engineering_district_rdis/FeatureServer";
  const url_sample_data = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer";
  const url_terrain = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer";

  const layer_regions = new FeatureLayer({
    url: url_regions
  });

  const layer_engineering_districts = new FeatureLayer({
    url: url_engineering_districts
  });

  const layer_legislative_districts = new FeatureLayer({
    url: url_legislative_districts
  });

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
            fieldName: "SECTION_ID",
            label: "Section ID"
          },
          {
            fieldName: "ROAD_NAME",
            label: "Road Name"
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
            fieldName: "END_LRP",
            label: "End Station Limit"
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
            fieldName: "ROAD_SIDE",
            label: "Side of the Road"
          },
          {
            fieldName: "TERRAIN",
            label: "Terrain"
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

  const layer_sample_data = new FeatureLayer({
    title: "Sample Data",
    url: url_sample_data,
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
    url: url_sample_data,
    definitionExpression: "DIRECTION = 'BOTTOM LEFT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [0, 255, 0, 1.00]
      }
    },
    popupTemplate: template_slope_inventory,
    visible: true
  });

  const layer_fair = new FeatureLayer({
    title: "Fair",
    url: url_sample_data,
    definitionExpression: "DIRECTION = 'BOTTOM RIGHT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [100, 200, 0, 1.00]
      }
    },
    popupTemplate: template_slope_inventory,
    visible: true
  });

  const layer_poor = new FeatureLayer({
    title: "Poor",
    url: url_sample_data,
    definitionExpression: "DIRECTION = 'TOP LEFT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [200, 100, 0, 1.00]
      }
    },
    popupTemplate: template_slope_inventory,
    visible: true
  });

  const layer_bad = new FeatureLayer({
    title: "Bad",
    url: url_sample_data,
    definitionExpression: "DIRECTION = 'TOP RIGHT'",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 0, 0, 1.00]
      }
    },
    popupTemplate: template_slope_inventory,
    visible: true
  });

  const group_road_slope_condition = new GroupLayer({
    title: "Road Slope Condition",
    layers: [layer_bad, layer_poor, layer_fair, layer_good],
    visible: true,
    visibilityMode: "independent",
    opacity: 1.00
  });
  //   title: "Roads",
  //   url: url_roads,
  //   renderer: {
  //     type: "unique-value",
  //     field: "ROAD_SEC_C",
  //     defaultSymbol: {
  //       type: "simple-line",
  //       width: 1,
  //       color: [255, 255, 255, 1.00]
  //     },
  //     uniqueValueInfos: [
  //       {
  //         value: "Primary",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [200, 200, 200, 1.00]
  //         }
  //       }, 
  //       {
  //         value: "Secondary",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [150, 150, 150, 1.00]
  //         }
  //       },
  //       {
  //         value: "Tertiary",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [100, 100, 100, 1.00]
  //         }
  //       }
  //     ]
  //   },
  //   defaultPopupTemplateEnabled: true,
  //   visible: false
  // });

  const layer_primary = new FeatureLayer({
    title: "Primary",
    url: url_sample_data,
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
    url: url_sample_data,
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
    url: url_sample_data,
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

  var view;

  function MapComponent () {
    // esriConfig.apiKey = STRING_KEY;

    React.useEffect(function () {
      view = new MapView({
        container: "map-container",
        map: new Map({
          basemap: "dark-gray",
          layers: []
        }),
        center: [121.7740, 12.8797],
        zoom: 6,
        popup: {
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            position: "bottom-left",
            breakpoint: false
          }
        }
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
          filter: false,
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

      const widget_info = document.createElement("map-info");

      widget_info.innerText = "Please select a feature.";

      view.ui.add(widget_info, {
        position: "bottom-left"
      });

      const widget_scale_bar = new ScaleBar({
        view: view,
        container: document.createElement("map-scale-bar")
      });

      view.ui.add(widget_scale_bar, {
        position: "bottom-right",
        index: 0
      });

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

              if (module === "existing-road-slopes") {
                view.map.layers.push(group_volume_of_traffic);
                view.map.layers.push(group_terrain);
                view.map.layers.push(group_road_classification);
                view.map.layers.push(group_road_slope_condition);
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

  function open_popup (feature_array) {
    // view
    //   .when(function () {
    //     view.popup.open({
    //       location: feature_array[0].geometry.centroid,
    //       features: feature_array
    //     });
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
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

  return (
    <MapContext.Provider value = {
      {
        layer_regions, layer_engineering_districts, layer_legislative_districts, 
        layer_sample_data,
        group_road_slope_condition, group_road_classification,
        MapComponent,
        view_layer, recenter_map
      } 
    }>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContextProvider;