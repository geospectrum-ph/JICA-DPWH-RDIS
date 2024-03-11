import * as React from "react";

import esriConfig from "@arcgis/core/config.js";

import Map from "@arcgis/core/Map.js";
import Basemap from "@arcgis/core/Basemap.js";

import MapView from "@arcgis/core/views/MapView.js";
import SceneView from "@arcgis/core/views/SceneView.js";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import BaseDynamicLayer from "@arcgis/core/layers/BaseDynamicLayer.js";
import BaseElevationLayer from "@arcgis/core/layers/BaseElevationLayer.js";
import ElevationLayer from "@arcgis/core/layers/ElevationLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";

import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const ArcGISMapContext = React.createContext();

var view;

const ArcGISMapContextProvider = (props) => {  
  function add_layer(file) {    
    view.map.removeAll();

    const blob = new Blob([JSON.stringify(file)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const layer = new GeoJSONLayer({
      url
    });

    view.map.layers.push(layer);

    let longitude = 0;
    let latitude = 0;

    for (let index = 0; index < file.features[0].geometry.coordinates[0].length; index++) {
      longitude = longitude + file.features[0].geometry.coordinates[0][index][0];
      latitude = latitude + file.features[0].geometry.coordinates[0][index][1];
    }

    let calculated_center = [(longitude/file.features[0].geometry.coordinates[0].length), (latitude/file.features[0].geometry.coordinates[0].length)];

    view.goTo({
      center: calculated_center,
      zoom: 10
    });
  }

  function ArcGISMap() {
    esriConfig.apiKey = "AAPK122f88af0a6f4036b72d37b8c0df9d097eGqHL_YM-GllJbCGGUxjcjZfBFE75b0C8mYwKTv40eMyH7DtxeKk4TBfzZEwFBx";

    React.useEffect(() => {
      const map = new Map({
        basemap: "streets-vector"
      });

      view = new MapView({
        container: "sample-map",
        map: map,
        center: [121.5, 20.5],
        zoom: 4
      });

      const basemap_gallery = new BasemapGallery({
        view: view,
        container: document.createElement("div")
      });

      view.ui.add(basemap_gallery, {
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
      <div className = "map-container">
        <div id = "sample-map" style = { { width: "100%", height: "100%" } }></div>
      </div>
    );
  }

  return (
    <ArcGISMapContext.Provider value = { { add_layer, ArcGISMap } }>{ props.children }</ArcGISMapContext.Provider>
  )
}

export default ArcGISMapContextProvider;