import * as React from "react";

import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";

import array_roads from "../../../sampleFiles/road_sections_merged.json"
import array_regions from "../../../assets/shp/region.json"

// regions
// deos
// cong dist
// km posts
// roads 

export const ArcGISMapContext = React.createContext();

const INTEGER_ZOOM_INITIAL = 4;
const INTEGER_ZOOM_FOCUS = 12;
const FLOAT_LATITUDE = 12.8797;
const FLOAT_LONGITUDE = 121.7740;

const STRING_KEY = null;

var view;

const ArcGISMapContextProvider = (props) => {  
  function add_layer(feature) {
    const geojson = {
      type: "FeatureCollection",
      features: [feature]
    };

    // create a new blob from geojson featurecollection
    const blob = new Blob([JSON.stringify(geojson)], {
      type: "application/json"
    });

    // URL reference to the blob
    const url = URL.createObjectURL(blob);
    // create new geojson layer using the blob url
    const layer = new GeoJSONLayer({
      url
    });

    view.map.layers.push(layer);

    console.log(geojson);

    // view.map.removeAll();

    // const blob = new Blob([JSON.stringify(file)], {
    //   type: "application/json"
    // });

    // const url = URL.createObjectURL(blob);

    // const layer = new GeoJSONLayer({
    //   url
    // });

    // view.map.layers.push(layer);

    // let longitude = 0;
    // let latitude = 0;

    // for (let index = 0; index < file.features[0].geometry.coordinates[0].length; index++) {
    //   longitude = longitude + file.features[0].geometry.coordinates[0][index][0];
    //   latitude = latitude + file.features[0].geometry.coordinates[0][index][1];
    // }

    // let calculated_center = [(longitude/file.features[0].geometry.coordinates[0].length), (latitude/file.features[0].geometry.coordinates[0].length)];

    // view.goTo({
    //   center: calculated_center,
    //   zoom: INTEGER_ZOOM_FOCUS
    // });
  }

  function recenter_map(coordinates, zoom) {
    view.goTo({
      center: coordinates,
      zoom: zoom
    });
  }


  function ArcGISMap() {
    // esriConfig.apiKey = STRING_KEY;

    const geojson = {
      type: "FeatureCollection",
      features: array_roads
    };
    

    // SAMPLE_GEOJSON.forEach(
    //   function (value, index, array) {
    //     geojson.features.push(value);
    //   }
    // )

    // create a new blob from geojson featurecollection
    const blob = new Blob([JSON.stringify(geojson)], {
      type: "application/json"
    });

    // URL reference to the blob
    const url = URL.createObjectURL(blob);
    // create new geojson layer using the blob url
    const layer = new GeoJSONLayer({
      url
    });

    // const geojson2 = {
    //   type: "FeatureCollection",
    //   features: array_regions.features
    // };
    

    // // SAMPLE_GEOJSON.forEach(
    // //   function (value, index, array) {
    // //     geojson.features.push(value);
    // //   }
    // // )

    // // create a new blob from geojson featurecollection
    // const blob2 = new Blob([JSON.stringify(geojson2)], {
    //   type: "application/json"
    // });

    // // URL reference to the blob
    // const url2 = URL.createObjectURL(blob2);
    // // create new geojson layer using the blob url
    // const layer2 = new GeoJSONLayer({
    //   url2
    // });
    

    React.useEffect(() => {
      const map = new Map({
        basemap: "satellite",
        layers: []
      });

      view = new MapView({
        container: "sample-map",
        map: map,
        center: [FLOAT_LONGITUDE, FLOAT_LATITUDE],
        zoom: INTEGER_ZOOM_INITIAL
      });

      const scale_bar = new ScaleBar({
        view: view
      });

      view.ui.add(scale_bar, {
        position: "bottom-right"
      });

      const basemapToggle = new BasemapToggle({
        view: view,  // The view that provides access to the map's "streets-vector" basemap
        nextBasemap: "streets"  // Allows for toggling to the "hybrid" basemap
      });

      // Add widget to the top right corner of the view
      view.ui.add(basemapToggle, {
        position: "top-right"
      });

      view.map.layers.push(layer);
      // view.map.layers.push(layer2);
    }, []);

    return (
      // Note: The parent <div> needs its width and height dimensions to be set into a constant value.
      <div id = "sample-map" style = { { width: "100%", height: "100%" } }></div>
    );
  }

  return (
    <ArcGISMapContext.Provider value = { { add_layer, recenter_map, ArcGISMap } }>{ props.children }</ArcGISMapContext.Provider>
  )
}

export default ArcGISMapContextProvider;