import * as React from "react";

import esriConfig from "@arcgis/core/config.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import Print from "@arcgis/core/widgets/Print.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

import Search from "@arcgis/core/widgets/Search.js";
import Home from "@arcgis/core/widgets/Home.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";

export const MapContext = React.createContext();

function MapContextProvider (props) {


  // const url_terrain = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer";
  // const url_kilometer_posts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/kilometer_posts/FeatureServer";
  // const url_potential_structures = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/rsm_mobile/FeatureServer";
  // const url_existing_sructures
  // const url_hazard_map = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/hazard_map/FeatureServer";
  // const url_hazard_data
  // const url_road_closures = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/sample_disire_road_closure/FeatureServer";
  // const url_potential_projects
  // const url_existing_projects = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/sample_road_projects/FeatureServer";



  // const layer_terrain = new FeatureLayer({
  //   title: "Terrain",
  //   url: url_terrain,
  //   renderer: {
  //     type: "unique-value",
  //     field: "terrain_ty",
  //     defaultSymbol: {
  //       type: "simple-line",
  //       width: 1,
  //       color: [255, 255, 255, 1.00]
  //     },
  //     uniqueValueInfos: [
  //       {
  //         value: "Flat",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [0, 100, 0, 1.00]
  //         }
  //       }, 
  //       {
  //         value: "Rolling",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [0, 150, 0, 1.00]
  //         }
  //       },
  //       {
  //         value: "Mountainous",
  //         symbol: {
  //           type: "simple-line",
  //           width: 1,
  //           color: [0, 200, 0, 1.00]
  //         }
  //       }
  //     ]
  //   },
  //   defaultPopupTemplateEnabled: true,
  //   visible: false
  // });

  // const layer_roads = new FeatureLayer({
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
  const url_sample_roads = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer";

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
            }
          ]
        }
      ]
    }

  const layer_sample_roads = new FeatureLayer({
    title: "Sample Data",
    url: url_sample_roads,
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    popupTemplate: template_slope_inventory,
    visible: true
  });

  const group_existing_road_slope_inventory = new GroupLayer({
    title: "Existing Road Slope Inventory",
    visible: true,
    visibilityMode: "independent",
    layers: [layer_sample_roads],
    opacity: 1.00
  });

  // const group_nonexisting_road_slope_inventory = new GroupLayer({
  //   title: "Non-Existing Road Slope Inventory",
  //   visible: true,
  //   visibilityMode: "independent",
  //   layers: [],
  //   opacity: 1.00
  // });

  // const group_hazard = new GroupLayer({
  //   title: "Hazard",
  //   visible: true,
  //   visibilityMode: "independent",
  //   layers: [],
  //   opacity: 1.00
  // });

  // const group_terrain = new GroupLayer({
  //   title: "Terrain",
  //   visible: true,
  //   visibilityMode: "independent",
  //   layers: [],
  //   opacity: 1.00
  // });

  // const group_type_of_road_slope_structure = new GroupLayer({
  //   title: "Type of Road Slope Structure",
  //   visible: true,
  //   visibilityMode: "independent",
  //   layers: [],
  //   opacity: 1.00
  // });

  var view;

  function MapComponent () {
    // esriConfig.apiKey = STRING_KEY;

    React.useEffect(function () {
      view = new MapView({
        container: "map-container",
        map: new Map({
          basemap: "dark-gray",
          layers: [
            // group_type_of_road_slope_structure,
            // group_terrain,
            // group_hazard,
            // group_nonexisting_road_slope_inventory,
            group_existing_road_slope_inventory
          ]
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
        container: document.createElement("map-search-container"),
        placement: "bottom-end",
        content: widget_search,
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
        view: view
      });

      const expand_legend = new Expand({
        view: view,
        container: document.createElement("map-legend-container"),
        placement: "bottom-end",
        content: widget_legend,
        group: "widgets"
      });

      view.ui.add(expand_legend, {
        position: "top-right",
        index: 2
      });

      const widget_layer_list = new LayerList({
        view: view
      });

      const expand_layer_list = new Expand({
        view: view,
        container: document.createElement("map-layer-list-container"),
        placement: "bottom-end",
        content: widget_layer_list,
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
        container: document.createElement("map-basemap-gallery-container"),
        placement: "bottom-end",
        content: widget_basemap_gallery,
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

      const widget_print = new Print({
        view: view
      });

      const expand_print = new Expand({
        view: view,
        container: document.createElement("map-print-container"),
        placement: "top-end",
        content: widget_print,
        group: "widgets"
      });

      view.ui.add(expand_print, {
        position: "bottom-right",
        index: 1
      });

    //   reactiveUtils.watch(
    //     function () {
    //       return (view.popup?.selectedFeature);
    //     },
    //     function (selectedFeature) {
    //       if ((selectedFeature) && (view.popup.visible)) {
    //         view
    //           .when(function () {
    //             view.goTo(selectedFeature.geometry.extent);
    //           })
    //           .catch(function (error) {
    //             console.error(error);
    //           });
    //       }
    //     });
    }, []);

    return (
      // Note: The parent <div> needs its width and height dimensions to be set into a constant value.
      <div id = "map-container" style = { { width: "100%", height: "100%" } }></div>
    );
  }

  function hide_layer () {
    // if (active_layers) {
    //   while (active_layers.layers.length > 0) {
    //     active_layers.layers.pop();
    //   }
    // }
  }

  function add_group_layer () {
    // view
    //   .when(function (group_layer) {
    //     view.map.layers.push(group_layer);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  }

  function view_layer (module) {
    // hide_layer();

    // if (active_layers) {
    //   switch (module) {
    //     case "summary":
    //       add_group_layer(group_layer_existing_road_slope_inventory);
    //       add_group_layer(group_layer_nonexisting_road_slope_inventory);
    //       break;
    //     case "existing-road-slopes":
    //       break;
    //     case "non-existing-road-slopes":
    //       break;
    //     case "potential-road-slope-projects":
    //       break;
    //     case "funded-road-slope-projects":
    //       break;
    //     case "proposal-for-funding":
    //       break;
    //     case "hazard-map":
    //       break;
    //     case "reports":
    //       break;
    //     default:
    //       break;
    //   }
    // }
  }

  function recenter_map (extent) {
    // view
    //   .when(function () {
    //     view.goTo(extent);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
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
        layer_sample_roads,
        // layer_road_inventory, layer_hazard_map, layer_road_closures,
        MapComponent,
        // hide_layer, view_layer, recenter_map, open_popup, close_popup
      } 
    }>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContextProvider;