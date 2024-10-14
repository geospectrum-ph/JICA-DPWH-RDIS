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
import array_regions from "../../../assets/shp/region.json";
// import array_deos from 
// import array_cdists from 
// import array_kmposts from

export const ArcGISMapContext = React.createContext();

const INTEGER_ZOOM_INITIAL = 6;
const FLOAT_LATITUDE_INITIAL = 12.8797; // Latitude of the center of the PH
const FLOAT_LONGITUDE_INITIAL = 121.7740; // Longitude of the center of the PH

const STRING_KEY = null;

var view;

const ArcGISMapContextProvider = (props) => {
  const geojson_regions = {
    type: "FeatureCollection",
    features: array_regions.features
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
      color: "#FF0000"
    }
  };

  const renderer_secondary = {
    type: "simple",
    symbol: {
      type: "simple-line",
      width: 1,
      color: "#00FF00"
    }
  };

  const renderer_tertiary = {
    type: "simple",
    symbol: {
      type: "simple-line",
      width: 1,
      color: "#0000FF"
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

  const baselayers = new GroupLayer({
    title: "Base Layers",
    visible: true,
    visibilityMode: "independent",
    layers: [layer_regions, layer_tertiary, layer_secondary, layer_primary],
    opacity: 1.00
  });

  function ArcGISMap() {
    // esriConfig.apiKey = STRING_KEY;    

    React.useEffect(() => {
      const map = new Map({
        basemap: "satellite",
        layers: [baselayers]
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
    }, []);

    return (
      // Note: The parent <div> needs its width and height dimensions to be set into a constant value.
      <div id = "sample-map" style = {{ width: "100%", height: "100%" }}></div>
    );
  }

  function clear_map() {
    while (view.map.layers > 5) { view.map.layers.pop(); };
  }

  function add_layer(feature) {
    const geojson = {
      type: "FeatureCollection",
      features: [feature]
    };

    const blob = new Blob([JSON.stringify(geojson)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const renderer = {
      type: "simple",
      symbol: {
        type: "simple-line",
        width: 2,
        color: "#FFFF00"
      }
    };

    const layer = new GeoJSONLayer({
      url: url,
      renderer: renderer
    });

    view.map.layers.push(layer);
  }

  function recenter_map(coordinates, zoom) {
    view.goTo({
      center: coordinates,
      zoom: zoom
    });
  }

  return (
    <ArcGISMapContext.Provider value = {{ ArcGISMap, clear_map, add_layer, recenter_map }}>{ props.children }</ArcGISMapContext.Provider>
  )
}

export default ArcGISMapContextProvider;