import * as React from "react";

import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

// The imported assets here are only sample data. If files are missing, please refer to https://drive.google.com/file/d/1PetSQpOw8KdjuQ5CGdhUvwoBGnV2ILgY/view?usp=sharing. The password is `RDISpass`.
import assets_roads from "../assets/data/roads.json";

export const MapContext = React.createContext();

function MapContextProvider (props) {
  var view;

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
    }
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
    }
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
    }
  });

  const primary_roads = [];
  const secondary_roads = [];
  const tertiary_roads = [];
  const other_roads = [];

  assets_roads.forEach(function (element) {
    switch (element.properties.ROAD_SEC_C) {
      case "Primary":
        primary_roads.push(element);
        return;
      case "Secondary":
        secondary_roads.push(element);
        return;
      case "Tertiary":
        tertiary_roads.push(element);
        return;
      default:
        other_roads.push(element);
        return;
    }
  });

  const geojson_roads_primary = {
    type: "FeatureCollection",
    features: primary_roads
  };

  const geojson_roads_secondary = {
    type: "FeatureCollection",
    features: secondary_roads
  };

  const geojson_roads_tertiary = {
    type: "FeatureCollection",
    features: tertiary_roads
  };

  const blob_roads_primary = new Blob([JSON.stringify(geojson_roads_primary)], {
    type: "application/json"
  });

  const blob_roads_secondary = new Blob([JSON.stringify(geojson_roads_secondary)], {
    type: "application/json"
  });

  const blob_roads_tertiary = new Blob([JSON.stringify(geojson_roads_tertiary)], {
    type: "application/json"
  });

  const url_roads_primary = URL.createObjectURL(blob_roads_primary);
  const url_roads_secondary = URL.createObjectURL(blob_roads_secondary);
  const url_roads_tertiary = URL.createObjectURL(blob_roads_tertiary);

  const renderer_roads_primary = {
    type: "simple",
    symbol: {
      type: "simple-line",
      width: 1,
      color: [255, 0, 0, 1.00]
    }
  };

  const renderer_roads_secondary = {
    type: "simple",
    symbol: {
      type: "simple-line",
      width: 1,
      color: [0, 255, 0, 1.00]
    }
  };

  const renderer_roads_tertiary = {
    type: "simple",
    symbol: {
      type: "simple-line",
      width: 1,
      color: [0, 0, 255, 1.00]
    }
  };

  const layer_roads_primary = new GeoJSONLayer({
    title: "Primary Roads",
    url: url_roads_primary,
    renderer: renderer_roads_primary
  });

  const layer_roads_secondary = new GeoJSONLayer({
    title: "Secondary Roads",
    url: url_roads_secondary,
    renderer: renderer_roads_secondary
  });

  const layer_roads_tertiary = new GeoJSONLayer({
    title: "Tertiary Roads",
    url: url_roads_tertiary,
    renderer: renderer_roads_tertiary
  });

  const layer_kilometer_posts = new FeatureLayer({
    title: "Kilometer Posts",
    url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/kilometer_posts/FeatureServer",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: "2px",
        color: [0, 0, 0, 1.00],
        outline: {
          color: [255, 255, 0, 1.00],
          width: 2
        }
      }
    }
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
    }
  });

  const base_layers = new GroupLayer({
    title: "Base Layers",
    visible: true,
    visibilityMode: "independent",
    layers: [
      // Layers are ordered on the web map acoording to their order here. The last one has the highest z-index and the first, the lowest.
      layer_regions,
      layer_congressional_districts,
      layer_engineering_districts,
      layer_roads_tertiary,
      layer_roads_secondary,
      layer_roads_primary,
      layer_kilometer_posts
    ],
    opacity: 1.00
  });

  const overlay_layers = new GroupLayer({
    title: "Overlay Layers",
    visible: true,
    visibilityMode: "independent",
    layers: [
      // Layers are ordered on the web map acoording to their order here. The last one has the highest z-index and the first, the lowest.
      layer_road_closures
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

  function MapComponent () {
    // esriConfig.apiKey = STRING_KEY;

    const zoom_national = 6;

    const latitude_initial = 12.8797; // Latitude of the center of the PH.
    const longitude_initial = 121.7740; // Longitude of the center of the PH.

    React.useEffect(() => {
      const map = new Map({
        basemap: "satellite",
        layers: [base_layers, overlay_layers, active_layers]
      });

      view = new MapView({
        container: "sample-map",
        map: map,
        center: [longitude_initial, latitude_initial],
        zoom: zoom_national
      });

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

      layer_kilometer_posts.visible = false; // Initial value only.
      layer_engineering_districts.visible = false; // Initial value only.
      layer_congressional_districts.visible = false; // Initial value only.
      layer_road_closures.visible = false; // Initial value only.
    }, []);

    return (
      // Note: The parent <div> needs its width and height dimensions to be set into a constant value.
      <div id = "sample-map" style = { { width: "100%", height: "100%" } }></div>
    );
  }

  function clear_map() {
    while (active_layers.layers.length) { active_layers.layers.pop(); }
  }

  function recenter_map(coordinates, zoom_level) {
    const latitude_sum = coordinates.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[0])); }, 0);
    const longitude_sum = coordinates.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[1])); }, 0);

    const coordinates_mean = [latitude_sum/coordinates.length, longitude_sum/coordinates.length];

    view.goTo({
      center: coordinates_mean,
      zoom: zoom_level
    });
  }

  function add_layer(feature, module) {
    var geojson;
    var zoom_level;
    var layer_name;

    if (module === "inventory") {
      geojson = {
        type: "FeatureCollection",
        features: [feature]
      }
      zoom_level = 12;
      layer_name = feature.properties.SECTION_ID;
    }
    else if (module === "emergency") {
      geojson = feature;
      zoom_level = 12;
      layer_name = feature.properties.section_id;
    }
    else if (module === "hazard") {
      geojson = {
        type: "FeatureCollection",
        features: [feature]
      }
      zoom_level = 18;
      layer_name = feature.properties.SECTION_ID;
    }
    else {
      geojson = {
        type: "FeatureCollection",
        features: [feature]
      }
      zoom_level = 18;
      layer_name = "New Layer";
    }

    const blob = new Blob([JSON.stringify(geojson)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const renderer = {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 2,
        color: [242, 125, 48, 1.00]
      }
    };

    const layer = new GeoJSONLayer({
      title: layer_name,
      url: url,
      renderer: renderer
    });

    clear_map();

    active_layers.layers.push(layer);

    recenter_map(feature.geometry.coordinates, zoom_level);
  }

  return (
    <MapContext.Provider value = { { MapComponent, clear_map, recenter_map, add_layer } }>{ props.children }</MapContext.Provider>
  )
}

export default MapContextProvider;