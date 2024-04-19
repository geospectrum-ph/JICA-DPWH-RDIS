import * as React from "react";

import esriConfig from "@arcgis/core/config.js";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const ArcGISMapContext = React.createContext();

var view;

const ArcGISMapContextProvider = (props) => {  
  function add_layer(file) {
    const blob = new Blob([JSON.stringify(file)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const layer = new GeoJSONLayer({ url });

    view.map.layers.push(layer);

    let longitude = 0;
    let latitude = 0;

    for (let index = 0; index < file.features[0].geometry.coordinates[0].length; index++) {
      longitude = longitude + file.features[0].geometry.coordinates[0][index][0];
      latitude = latitude + file.features[0].geometry.coordinates[0][index][1];
    }

    let calculated_center = [(longitude/file.features[0].geometry.coordinates[0].length), (latitude/file.features[0].geometry.coordinates[0].length)];

    view
      .goTo({
        center: calculated_center,
        zoom: 10
      })
      .catch(function(error) { if (error.name != "AbortError") { return null; } });
  }

  function remove_all_layers() {
    view.map.removeAll();

    view
      .goTo({
        center: [121.5, 12.5],
        zoom: 4
      })
      .catch(function(error) { if (error.name != "AbortError") { return null; } });
  }

  function ArcGISMap() {
    esriConfig.apiKey = "AAPK122f88af0a6f4036b72d37b8c0df9d097eGqHL_YM-GllJbCGGUxjcjZfBFE75b0C8mYwKTv40eMyH7DtxeKk4TBfzZEwFBx";

    React.useEffect(() => {
      const map = new Map({ basemap: "streets-vector" });

      view = new MapView({
        container: "arcgis-map",
        map: map,
        center: [121.5, 12.5],
        zoom: 4
      });

      const scale_bar = new ScaleBar({ view: view });

      view.ui.add(scale_bar, { position: "bottom-right" });
    }, []);

    return (
      <div className = "map-container">
        <div id = "arcgis-map"></div>
      </div>
    );
  }

  return (
    <ArcGISMapContext.Provider value = { { add_layer, remove_all_layers, ArcGISMap } }>{ props.children }</ArcGISMapContext.Provider>
  )
}

export default ArcGISMapContextProvider;