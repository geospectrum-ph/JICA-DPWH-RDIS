import * as React from "react";

import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const MapContext = React.createContext();

function MapContextProvider (props) {
  const layer_regions = new FeatureLayer({
    title: "Regions",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/region_rdis/FeatureServer",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [0, 0, 0, 0.50],
        style: "solid",
        outline: {
          width: 1,
          color: [255, 255, 255, 1.00],
        }
      }
    },
    visible: true
  });

  const layer_congressional_districts = new FeatureLayer({
    title: "Congressional Districts",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Congressional_Districts/FeatureServer",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [0, 0, 0, 0.50],
        style: "solid",
        outline: {
          width: 1,
          color: [255, 255, 255, 1.00],
        }
      }
    },
    visible: false
  });

  const layer_engineering_districts = new FeatureLayer({
    title: "Engineering Districts",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/engineering_district_rdis/FeatureServer",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [0, 0, 0, 0.50],
        style: "solid",
        outline: {
          width: 1,
          color: [255, 255, 255, 1.00],
        }
      }
    },
    visible: false
  });

  const layer_terrain = new FeatureLayer({
    title: "Terrain",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 1,
        color: [255, 255, 255, 1.00]
      }
    },
    visible: false
  });

  const layer_roads = new FeatureLayer({
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer"
  });

  const layer_primary_roads = new FeatureLayer({
    title: "Primary Roads",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer",
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

  const layer_secondary_roads = new FeatureLayer({
    title: "Secondary Roads",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer",
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

  const layer_tertiary_roads = new FeatureLayer({
    title: "Tertiary Roads",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer",
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

  const layer_kilometer_posts = new FeatureLayer({
    title: "Kilometer Posts",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/kilometer_posts/FeatureServer",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: "2px",
        outline: {
          width: 1,
          color: [255, 255, 0, 1.00]
        }
      }
    },
    visible: false
  });

  const base_layers = new GroupLayer({
    title: "Base Layers",
    visible: true,
    visibilityMode: "independent",
    layers: [layer_regions, layer_congressional_districts, layer_engineering_districts, layer_terrain, layer_primary_roads, layer_secondary_roads, layer_tertiary_roads, layer_kilometer_posts],
    opacity: 1.00
  });

  const layer_road_closures = new FeatureLayer({
    title: "Road Closures",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/sample_disire_road_closure/FeatureServer",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 2,
        color: [225, 125, 25, 1.00]
      }
    },
    visible: false
  });

  const overlay_layers = new GroupLayer({
    title: "Overlay Layers",
    visible: true,
    visibilityMode: "independent",
    layers: [layer_road_closures],
    opacity: 1.00
  });

  const active_layers = new GroupLayer({
    title: "Active Layers",
    visible: true,
    visibilityMode: "independent",
    layers: [],
    opacity: 1.00
  });

  var view;

  function MapComponent () {
    // esriConfig.apiKey = STRING_KEY;

    const map_reference = React.useRef(null);

    React.useEffect(function () {
      if (map_reference.current) {
        view = new MapView({
          container: "map-container",
          map: new Map({
            basemap: "satellite",
            layers: [base_layers, overlay_layers, active_layers]
          }),
          center: [121.7740, 12.8797],
          zoom: 6
        });
      }

      const widget_layer_list = new LayerList({
        view: view
      });

      view.ui.add(widget_layer_list, {
        position: "top-right"
      });

      const widget_basemap_toggle = new BasemapToggle({
        view: view,
        nextBasemap: "streets"
      });

      view.ui.add(widget_basemap_toggle, {
        position: "bottom-left"
      });

      const widget_scale_bar = new ScaleBar({
        view: view
      });

      view.ui.add(widget_scale_bar, {
        position: "bottom-right"
      });
    }, [map_reference]);

    return (
      // Note: The parent <div> needs its width and height dimensions to be set into a constant value.
      <div id = "map-container" ref = { map_reference } style = { { width: "100%", height: "100%" } }></div>
    );
  }

  function clear_map() {
    while (active_layers.layers.length) { active_layers.layers.pop(); }
  }

  function recenter_map(extent) {
    view.goTo(extent);
  }

  function add_layer(feature, title, style) {
    function renderer(geometry) {
      var symbol;
  
      if (geometry === "polygon") {
        symbol = {
          type: "simple-fill",
          color: [0, 0, 0, 0.50],
          style: "solid",
          outline: {
            width: 1,
            color: [255, 255, 255, 1.00],
          }
        };
      }
  
      if (geometry === "polyline") {
        symbol = {
          type: "simple-line",
          width: 1,
          color: [255, 255, 255, 1.00]
        }
      }
  
      if (geometry === "point" || geometry === "multipoint") {
        symbol = {
          type: "simple-marker",
          size: "1px",
          outline: {
            width: 1,
            color: [255, 255, 255, 1.00]
          }
        }
      }
  
      return ({
        type: "simple",
        symbol: symbol
      });
    }

    const layer = new FeatureLayer({
      title: title || "New Layer",
      source: [feature],
      objectIdField: "OBJECTID",
      renderer: style || renderer(feature.geometry.type),
      effect: "bloom(1, 0px, 1%)"
    });

    active_layers.layers.push(layer);
  }

  return (
    <MapContext.Provider value = {
      {
        layer_regions, layer_congressional_districts, layer_engineering_districts, layer_roads,
        MapComponent,
        clear_map, recenter_map, add_layer
      } 
    }>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContextProvider;