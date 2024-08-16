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
      zoom: INTEGER_ZOOM
    });
  }

  function ArcGISMap() {
    esriConfig.apiKey = "STRING_KEY";

    React.useEffect(() => {
      const map = new Map({
        basemap: "streets-vector"
      });

      view = new MapView({
        container: "sample-map",
        map: map,
        center: [FLOAT_LONGITUDE, FLOAT_LATITUDE],
        zoom: INTEGER_ZOOM
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
      <div id = "sample-map" style = { { width: "100%", height: "100%" } }></div>
    );
  }

  return (
    <ArcGISMapContext.Provider value = { { add_layer, ArcGISMap } }>{ props.children }</ArcGISMapContext.Provider>
  )
}

export default ArcGISMapContextProvider;