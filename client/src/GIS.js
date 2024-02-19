import * as React from "react";

import Map from "@arcgis/core/Map.js";

import SceneView from "@arcgis/core/views/SceneView.js";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import BaseElevationLayer from "@arcgis/core/layers/BaseElevationLayer.js";
import ElevationLayer from "@arcgis/core/layers/ElevationLayer.js";

import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";

export default function DataMap() {
  const mapRef = React.useRef(null);

  // esriConfig.apiKey = "AAPK122f88af0a6f4036b72d37b8c0df9d097eGqHL_YM-GllJbCGGUxjcjZfBFE75b0C8mYwKTv40eMyH7DtxeKk4TBfzZEwFBx";

  React.useEffect(() => {
    if (mapRef.current) {
      const graphicsLayer = new GraphicsLayer();

      const ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({

        properties: {
          exaggeration: null
        },

        // The load() method is called when the layer is added to the map
        // prior to it being rendered in the view.
        load: function () {
          this._elevation = new ElevationLayer({
            url:
              "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/TopoBathy3D/ImageServer"
          });

          // wait for the elevation layer to load before resolving load()
          this.addResolvingPromise(this._elevation.load());
        },

        // Fetches the tile(s) visible in the view
        fetchTile: function (level, row, col, options) {
          // calls fetchTile() on the elevationlayer for the tiles
          // visible in the view
          return this._elevation.fetchTile(level, row, col, options).then(
            function (data) {
              var exaggeration = this.exaggeration;
              // `data` is an object that contains the
              // the width and the height of the tile in pixels,
              // and the values of each pixel
              for (var i = 0; i < data.values.length; i++) {
                // Multiply the given pixel value
                // by the exaggeration value
                data.values[i] = data.values[i] * exaggeration;
              }

              return data;
            }.bind(this)
          );
        }
      });

      const elevationLayer = new ExaggeratedElevationLayer({ exaggeration: 5 });

      const map = new Map({
        basemap: "topo-3d",
        ground: {
          layers: [elevationLayer]
        }
      });

      const initial_position = {
        x: 121.059,
        y: 14.584,
        z: 1000
      }
    
      const view = new SceneView({
        container: "sample-map",
        map: map,
        alphaCompositingEnabled: true,
        qualityProfile: "high",
        camera: {
          position: initial_position,
          heading: 1000,
          tilt: 45
        }
      });

      view.when(() => {
        const sketch = new Sketch({
            layer: graphicsLayer,
            view: view,
            creationMode: "update"
        });

        view.ui.add(sketch, "top-right");

        const basemapGallery = new BasemapGallery({
          view: view
        });

        view.ui.add(basemapGallery, {
          position: "bottom-left"
        });
      });

      return () => view && view.destroy()
    }
  }, [mapRef]);

  return (
    <div id = "sample-map" ref = { mapRef } style = { { width: "100%", height: "100%" } }></div>
  );
}