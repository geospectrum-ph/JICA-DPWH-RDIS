import * as React from "react";

import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";

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

    const renderer = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-line",  // autocasts as new SimpleMarkerSymbol()
        width: 2,
        color: "#FFFF00",
      }
    };

    const layer = new GeoJSONLayer({
      url: url,
      renderer: renderer
    });

    view.map.layers.push(layer);

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

    const geojson_others = {
      type: "FeatureCollection",
      features: other_roads
    };

    // create a new blob from geojson featurecollection
    const blob_primary = new Blob([JSON.stringify(geojson_primary)], {
      type: "application/json"
    });

    // create a new blob from geojson featurecollection
    const blob_secondary = new Blob([JSON.stringify(geojson_secondary)], {
      type: "application/json"
    });

    // create a new blob from geojson featurecollection
    const blob_tertiary = new Blob([JSON.stringify(geojson_tertiary)], {
      type: "application/json"
    });

    // create a new blob from geojson featurecollection
    const blob_others = new Blob([JSON.stringify(geojson_others)], {
      type: "application/json"
    });


    // URL reference to the blob
    const url_primary = URL.createObjectURL(blob_primary);
    const url_secondary = URL.createObjectURL(blob_secondary);
    const url_tertiary = URL.createObjectURL(blob_tertiary);
    const url_others = URL.createObjectURL(blob_others);

    const renderer_primary = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-line",  // autocasts as new SimpleMarkerSymbol()
        width: 1,
        color: "#FF0000",
      }
    };

    const renderer_secondary = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-line",  // autocasts as new SimpleMarkerSymbol()
        width: 1,
        color: "#00FF00",
      }
    };

    const renderer_tertiary = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-line",  // autocasts as new SimpleMarkerSymbol()
        width: 1,
        color: "#0000FF",
      }
    };

    const renderer_others = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-line",  // autocasts as new SimpleMarkerSymbol()
        width: 1,
        color: "#FFFFFF",
      }
    };

    // create new geojson layer using the blob url
    const layer_primary = new GeoJSONLayer({
      url: url_primary,
      renderer: renderer_primary
    });

    const layer_secondary = new GeoJSONLayer({
      url: url_secondary,
      renderer: renderer_secondary
    });

    const layer_tertiary = new GeoJSONLayer({
      url: url_tertiary,
      renderer: renderer_tertiary
    });

    const layer_others = new GeoJSONLayer({
      url: url_others,
      renderer: renderer_others
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

      view.map.layers.push(layer_primary);
      view.map.layers.push(layer_secondary);
      view.map.layers.push(layer_tertiary);
      view.map.layers.push(layer_others);
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