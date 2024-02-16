import * as React from "react";

// import Map from "@arcgis/core/Map.js";
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
// import MapView from "@arcgis/core/views/MapView.js";
// import Sketch from "@arcgis/core/widgets/Sketch.js";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView";

export function AnalyticsMap() {
    const mapRef = React.useRef(null);
        React.useEffect(() => {
            if (mapRef.current) {
              const baseMap = new Map({
                basemap: "topo-vector",
              });
            
              const view = new MapView({
                container: mapRef.current,
                map: baseMap,
                center: [-118.805, 34.027],
                zoom: 1,
              });
            }
          }, [mapRef]);
    // esriConfig.apiKey = "AAPK122f88af0a6f4036b72d37b8c0df9d097eGqHL_YM-GllJbCGGUxjcjZfBFE75b0C8mYwKTv40eMyH7DtxeKk4TBfzZEwFBx";

    // React.useEffect(() => {
    //     const graphicsLayer = new GraphicsLayer();

    //     const map = new Map({
    //     basemap: "topo-vector",
    //     layers: [graphicsLayer]
    //     });

    //     const view = new MapView({
    //     container: "sample-map",
    //     map: map,
    //     zoom: 5,
    //     center: [90, 45]
    //     });

    //     view.when(() => {
    //     const sketch = new Sketch({
    //         layer: graphicsLayer,
    //         view: view,
    //         // graphic will be selected as soon as it is created
    //         creationMode: "update"
    //     });

    //     view.ui.add(sketch, "top-right");
    //     });
    // }, []);

    return (
        <div id = "sample-map" ref = { mapRef }></div>
    );
} 