import * as React from "react";

import esriConfig from "@arcgis/core/config.js";

import Map from "@arcgis/core/Map.js";
import Basemap from "@arcgis/core/Basemap.js";

import MapView from "@arcgis/core/views/MapView.js";
import SceneView from "@arcgis/core/views/SceneView.js";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import BaseElevationLayer from "@arcgis/core/layers/BaseElevationLayer.js";
import ElevationLayer from "@arcgis/core/layers/ElevationLayer.js";
import KMLLayer from "@arcgis/core/layers/KMLLayer.js";

import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const ArcGISMapContext = React.createContext();

var map = null;

const ArcGISMapContextProvider = (props) => {
  const [mapLayers, setMapLayers] = React.useState([]);
  let counter = 0;

  React.useEffect(() => {
    console.log(mapLayers);
    if (map) {
      console.log("Map initialized!");
      console.log(map.layers.length);

      const layer_container = new KMLLayer({
        url: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=kml&minmagnitude=5.8" // Sample layer.
      });

      if (counter < 2) counter++;
      else map.layers.addLayer(layer_container);
    }
  }, [mapLayers]);

  const addNewLayer = (files) => {
    console.log("addNewLayer() initialized!");
    console.log("File count: " + files.length);

    setMapLayers(files);
  }
  
  const ArcGISMap = () => {
    function loadMap() {
      esriConfig.apiKey = "AAPK122f88af0a6f4036b72d37b8c0df9d097eGqHL_YM-GllJbCGGUxjcjZfBFE75b0C8mYwKTv40eMyH7DtxeKk4TBfzZEwFBx";
  
      const layer_container = new KMLLayer({
        url: "http://www.lohneswright.com/ctc/kml/actc_wheels.kml" // Sample layer.
      });
  
      map = new Map({
        basemap: "streets-vector",
        layers: [layer_container]
      });
  
      const view = new MapView({
        map: map,
        container: "sample-map",
        center: [121.5, 21.5],
        zoom: 3
      });
  
      const scalebar = new ScaleBar({
        view: view
      });
  
      view.ui.add(scalebar, "bottom-left");
    }
  
    React.useEffect(() => {
      loadMap();
    }, []);
  
    return (
      <div id = "sample-map" style = { { width: "100%", height: "100%" } }></div>
    );
  }

  return (
    <ArcGISMapContext.Provider value = { { addNewLayer, ArcGISMap } }>{ props.children }</ArcGISMapContext.Provider>
  )
}

export default ArcGISMapContextProvider;

// export function ArcGISMap() {
//   const mapRef = React.useRef(null);

//   esriConfig.apiKey = "AAPK122f88af0a6f4036b72d37b8c0df9d097eGqHL_YM-GllJbCGGUxjcjZfBFE75b0C8mYwKTv40eMyH7DtxeKk4TBfzZEwFBx";

//   React.useEffect(() => {
//     if (mapRef.current) {
//       const basemap = new Basemap({
//         style: {
//           id: "arcgis/streets"
//         }
//       });

//       const map = new Map({
//         basemap: basemap
//       });

//       const view = new MapView({
//         map: map,
//         container: "sample-map",
//         center: [121.5, 21.5],
//         zoom: 3
//       });
// // // Sets the center point of the view at a specified lon/lat
// // view.center = [-112, 38];
// // view.zoom = 13;  // Sets the zoom LOD to 13

// // // new extent for the mapview where the spatialReference.wkid is 4326
// // const extent = new Extent({
// //   xmin: -9177882,
// //   ymin: 4246761,
// //   xmax: -9176720,
// //   ymax: 4247967,
// //   spatialReference: {
// //     wkid: 102100
// //   }
// // });

// // if (!projection.isLoaded()) {
// //   // load the projection engine if it is not loaded
// //   await projection.load();
// // }
// // view.extent = extent;

//       // const graphicsLayer = new GraphicsLayer();

//       // const ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({

//       //   properties: {
//       //     exaggeration: null
//       //   },

//       //   // The load() method is called when the layer is added to the map
//       //   // prior to it being rendered in the view.
//       //   load: function () {
//       //     this._elevation = new ElevationLayer({
//       //       url:
//       //         "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/TopoBathy3D/ImageServer"
//       //     });

//       //     // wait for the elevation layer to load before resolving load()
//       //     this.addResolvingPromise(this._elevation.load());
//       //   },

//       //   // Fetches the tile(s) visible in the view
//       //   fetchTile: function (level, row, col, options) {
//       //     // calls fetchTile() on the elevationlayer for the tiles
//       //     // visible in the view
//       //     return this._elevation.fetchTile(level, row, col, options).then(
//       //       function (data) {
//       //         var exaggeration = this.exaggeration;
//       //         // `data` is an object that contains the
//       //         // the width and the height of the tile in pixels,
//       //         // and the values of each pixel
//       //         for (var i = 0; i < data.values.length; i++) {
//       //           // Multiply the given pixel value
//       //           // by the exaggeration value
//       //           data.values[i] = data.values[i] * exaggeration;
//       //         }

//       //         return data;
//       //       }.bind(this)
//       //     );
//       //   }
//       // });

//       // const elevationLayer = new ExaggeratedElevationLayer({ exaggeration: 5 });

//       // const map = new Map({
//       //   basemap: "topo-3d",
//       //   ground: {
//       //     layers: [elevationLayer]
//       //   }
//       // });

//       // const initial_position = {
//       //   x: 121.059,
//       //   y: 14.584,
//       //   z: 1000
//       // }
    
//       // const view = new SceneView({
//       //   container: "sample-map",
//       //   map: map,
//       //   alphaCompositingEnabled: true,
//       //   qualityProfile: "high",
//       //   camera: {
//       //     position: initial_position,
//       //     heading: 1000,
//       //     tilt: 45
//       //   }
//       // });

//       // view.when(() => {
//       //   const sketch = new Sketch({
//       //       layer: graphicsLayer,
//       //       view: view,
//       //       creationMode: "update"
//       //   });

//       //   view.ui.add(sketch, "top-right");

//       //   const basemapGallery = new BasemapGallery({
//       //     view: view
//       //   });

//       //   view.ui.add(basemapGallery, {
//       //     position: "bottom-left"
//       //   });
//       // });

//       // return () => view && view.destroy()
//     }
//   }, [mapRef]);

//   return (
//     <div id = "sample-map" ref = { mapRef } style = { { width: "100%", height: "100%" } }></div>
//   );
// }