import * as React from "react";

import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

import array_roads from "../../../sampleFiles/road_sections_merged.json";
import object_kmposts from "../../../assets/shp/kilometer_posts.json";
import object_regions from "../../../assets/shp/region.json";
import object_cdists from "../../../assets/shp/congressional_district.json";
import array_deos from "../../../assets/shp/engineering_district.json";

export const ArcGISMapContext = React.createContext();

const INTEGER_ZOOM_INITIAL = 6;
const FLOAT_LATITUDE_INITIAL = 12.8797; // Latitude of the center of the PH.
const FLOAT_LONGITUDE_INITIAL = 121.7740; // Longitude of the center of the PH.

const STRING_KEY = null; // API key is not needed for components used in this context provider.

var view;

const ArcGISMapContextProvider = (props) => {
  const geojson_regions = {
    type: "FeatureCollection",
    features: object_regions.features
  };

  const blob_regions = new Blob([JSON.stringify(geojson_regions)], {
    type: "application/json"
  });

  const url_regions = URL.createObjectURL(blob_regions);

  const renderer_regions = {
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
  };

  const layer_regions = new GeoJSONLayer({
    title: "Regions",
    url: url_regions,
    renderer: renderer_regions
  });

  const geojson_cdists = {
    type: "FeatureCollection",
    features: object_cdists.features
  };

  const blob_cdists = new Blob([JSON.stringify(geojson_cdists)], {
    type: "application/json"
  });

  const url_cdists = URL.createObjectURL(blob_cdists);

  const renderer_cdists = {
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
  };

  const layer_cdists = new GeoJSONLayer({
    title: "Congressional Districts",
    url: url_cdists,
    renderer: renderer_cdists
  });

  const geojson_deos = {
    type: "FeatureCollection",
    features: array_deos
  };

  const blob_deos = new Blob([JSON.stringify(geojson_deos)], {
    type: "application/json"
  });

  const url_deos = URL.createObjectURL(blob_deos);

  const renderer_deos = {
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
  };

  const layer_deos = new GeoJSONLayer({
    title: "Engineering Districts",
    url: url_deos,
    renderer: renderer_deos
  });

  const primary_roads = [];
  const secondary_roads = [];
  const tertiary_roads = [];
  const other_roads = [];

  array_roads.forEach(function (element) {
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

  const geojson_primary = {
    type: "FeatureCollection",
    features: primary_roads
  };

  const geojson_secondary = {
    type: "FeatureCollection",
    features: secondary_roads
  };

  const geojson_tertiary = {
    type: "FeatureCollection",
    features: tertiary_roads
  };

  const blob_primary = new Blob([JSON.stringify(geojson_primary)], {
    type: "application/json"
  });

  const blob_secondary = new Blob([JSON.stringify(geojson_secondary)], {
    type: "application/json"
  });

  const blob_tertiary = new Blob([JSON.stringify(geojson_tertiary)], {
    type: "application/json"
  });

  const url_primary = URL.createObjectURL(blob_primary);
  const url_secondary = URL.createObjectURL(blob_secondary);
  const url_tertiary = URL.createObjectURL(blob_tertiary);

  const renderer_primary = {
    type: "simple",
    symbol: {
      type: "simple-line",
      width: 1,
      color: [255, 0, 0, 1.00]
    }
  };

  const renderer_secondary = {
    type: "simple",
    symbol: {
      type: "simple-line",
      width: 1,
      color: [0, 255, 0, 1.00]
    }
  };

  const renderer_tertiary = {
    type: "simple",
    symbol: {
      type: "simple-line",
      width: 1,
      color: [0, 0, 255, 1.00]
    }
  };

  const layer_primary = new GeoJSONLayer({
    title: "Primary Roads",
    url: url_primary,
    renderer: renderer_primary
  });

  const layer_secondary = new GeoJSONLayer({
    title: "Secondary Roads",
    url: url_secondary,
    renderer: renderer_secondary
  });

  const layer_tertiary = new GeoJSONLayer({
    title: "Tertiary Roads",
    url: url_tertiary,
    renderer: renderer_tertiary
  });

  const geojson_kmposts = {
    type: "FeatureCollection",
    features: object_kmposts.features
  };

  const blob_kmposts = new Blob([JSON.stringify(geojson_kmposts)], {
    type: "application/json"
  });

  const url_kmposts = URL.createObjectURL(blob_kmposts);

  const renderer_kmposts = {
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
  };

  const layer_kmposts = new GeoJSONLayer({
    title: "Kilometer Posts",
    url: url_kmposts,
    renderer: renderer_kmposts
  });

  const baselayers = new GroupLayer({
    title: "Base Layers",
    visible: true,
    visibilityMode: "independent",
    layers: [layer_regions, layer_cdists, layer_deos, layer_tertiary, layer_secondary, layer_primary, layer_kmposts], // Layer indices are ordered on the web map acoording to their order here.
    opacity: 1.00
  });

  const activelayers = new GroupLayer({
    title: "Active Layers",
    visible: true,
    visibilityMode: "independent",
    layers: [],
    opacity: 1.00
  });

  function ArcGISMap() {
    // esriConfig.apiKey = STRING_KEY;    

    React.useEffect(() => {
      const map = new Map({
        basemap: "satellite",
        layers: [baselayers, activelayers]
      });

      view = new MapView({
        container: "sample-map",
        map: map,
        center: [FLOAT_LONGITUDE_INITIAL, FLOAT_LATITUDE_INITIAL],
        zoom: INTEGER_ZOOM_INITIAL
      });

      const layerList = new LayerList({
        view: view
      });

      view.ui.add(layerList, {
        position: "top-right"
      });

      const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "streets"
      });

      view.ui.add(basemapToggle, {
        position: "bottom-left"
      });

      const scale_bar = new ScaleBar({
        view: view
      });

      view.ui.add(scale_bar, {
        position: "bottom-right"
      });

      layer_kmposts.visible = false; // Initial value only.
      layer_deos.visible = false; // Initial value only.
      layer_cdists.visible = false; // Initial value only.
    }, []);

    return (
      // Note: The parent <div> needs its width and height dimensions to be set into a constant value.
      <div id = "sample-map" style = {{ width: "100%", height: "100%" }}></div>
    );
  }

  function clear_map() {
    while (activelayers.layers.length) { activelayers.layers.pop(); }
  }

  function recenter_map(coordinates, zoom) {
    const lat_sum = coordinates.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[0])); }, 0);
    const lng_sum = coordinates.reduce(function (accumulator, element) { return (accumulator + parseFloat(element[1])); }, 0);

    const mean = [lat_sum/coordinates.length, lng_sum/coordinates.length];

    view.goTo({
      center: mean,
      zoom: zoom
    });
  }

  function add_layer(feature, module) {
    var geojson;
    var zoom;
    var layer_name;

    if (module === "inventory") {
      geojson = {
        type: "FeatureCollection",
        features: [feature]
      }
      zoom = 12;
      layer_name = feature.properties.SECTION_ID;
    }
    else if (module === "emergency") {
      geojson = feature;
      zoom = 12;
      layer_name = feature.properties.section_id;
    }
    else if (module === "hazard") {
      geojson = {
        type: "FeatureCollection",
        features: [feature]
      }
      zoom = 18;
      layer_name = feature.properties.SECTION_ID;
    }
    else {
      geojson = {
        type: "FeatureCollection",
        features: [feature]
      }
      zoom = 18;
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

    activelayers.layers.push(layer);

    recenter_map(feature.geometry.coordinates, zoom);
  }

  return (
    <ArcGISMapContext.Provider value = {{ ArcGISMap, clear_map, recenter_map, add_layer }}>{ props.children }</ArcGISMapContext.Provider>
  )
}

export default ArcGISMapContextProvider;