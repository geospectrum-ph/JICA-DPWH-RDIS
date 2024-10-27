import * as React from "react";

import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import Search from "@arcgis/core/widgets/Search.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Print from "@arcgis/core/widgets/Print.js";
import Attachments from "@arcgis/core/widgets/Attachments.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const MapContext = React.createContext();

function MapContextProvider (props) {
  const url_regions = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/region_rdis/FeatureServer";
  const url_congressional_districts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Congressional_Districts/FeatureServer";
  const url_engineering_districts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/engineering_district_rdis/FeatureServer";
  const url_terrain = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer";
  const url_roads = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/road_sections_merged/FeatureServer";
  const url_kilometer_posts = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/kilometer_posts/FeatureServer";
  const url_road_closures = "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/sample_disire_road_closure/FeatureServer";

  const layer_regions = new FeatureLayer({
    title: "Regions",
    url: url_regions,
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
    url: url_congressional_districts,
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
    url: url_engineering_districts,
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
    url: url_terrain,
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
    url: url_roads
  });

  const layer_primary_roads = new FeatureLayer({
    title: "Primary Roads",
    url: url_roads,
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
    url: url_roads,
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
    url: url_roads,
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
    url: url_kilometer_posts,
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
    layers: [
      layer_regions || null,
      layer_congressional_districts || null,
      layer_engineering_districts || null,
      layer_terrain || null,
      layer_primary_roads || null,
      layer_secondary_roads || null,
      layer_tertiary_roads || null,
      layer_kilometer_posts || null
    ],
    opacity: 1.00
  });

  const layer_road_closures = new FeatureLayer({
    title: "Road Closures",
    url: url_road_closures,
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
    layers: [
      layer_road_closures || null
    ],
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

    React.useEffect(function () {
      view = new MapView({
        container: "map-container",
        map: new Map({
          basemap: "satellite",
          layers: [
            base_layers || null,
            overlay_layers || null,
            active_layers || null]
        }),
        center: [121.7740, 12.8797],
        zoom: 6
      });

      const widget_search = new Search({
        view: view,
        container: document.createElement("map-search-container")
      });

      const expand_search = new Expand({
        view: view,
        content: widget_search
      });

      view.ui.add(expand_search, {
        position: "top-right"
      });

      const widget_layer_list = new LayerList({
        view: view,
        container: document.createElement("map-layer-list-container")
      });
      
      const expand_layer_list = new Expand({
        view: view,
        content: widget_layer_list
      });

      view.ui.add(expand_layer_list, {
        position: "top-right"
      });

      const widget_basemap_gallery = new BasemapGallery({
        view: view,
        container: document.createElement("map-basemap-gallery-container")
      });

      const expand_basemap_gallery = new Expand({
        view: view,
        content: widget_basemap_gallery
      });

      view.ui.add(expand_basemap_gallery, {
        position: "top-right"
      });

      const widget_print = new Print({
        view: view,
        container: document.createElement("map-print-container")
      });

      const expand_print = new Expand({
        view: view,
        content: widget_print
      });

      view.ui.add(expand_print, {
        position: "top-right"
      });

      const widget_attachments = new Attachments({
        view: view,
        container: document.createElement("map-attachments")
      });

      const expand_attachments = new Expand({
        view: view,
        content: widget_attachments
      });

      view.ui.add(expand_attachments, {
        position: "bottom-left"
      });

      const widget_scale_bar = new ScaleBar({
        view: view,
        container: document.createElement("map-scale-bar")
      });

      view.ui.add(widget_scale_bar, {
        position: "bottom-right"
      });

      view.popup.defaultPopupTemplateEnabled = true;
    }, []);

    return (
      // Note: The parent <div> needs its width and height dimensions to be set into a constant value.
      <div id = "map-container" style = { { width: "100%", height: "100%" } }></div>
    );
  }

  function clear_map() {
    if (active_layers) {
      while (active_layers.layers.length) {
        active_layers.layers.pop();
      }
    }
  }

  function recenter_map(extent) {
    view
      .goTo(extent)
      .catch(function (error) {
        console.log(error);
      });
  }

  function add_layer(layer) {
    if (active_layers) {
      active_layers.layers.push(layer);
    }
  }

  return (
    <MapContext.Provider value = {
      {
        layer_regions, layer_congressional_districts, layer_engineering_districts,
        layer_roads,
        MapComponent,
        clear_map, recenter_map, add_layer
      } 
    }>
      { props.children }
    </MapContext.Provider>
  )
}

export default MapContextProvider;