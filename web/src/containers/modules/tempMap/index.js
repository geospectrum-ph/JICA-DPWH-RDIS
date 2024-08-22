
import React from 'react';
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView"
import WebScene from "@arcgis/core/WebScene"

const MapComponent = () => {

  const mapDiv = React.useRef(null);

  React.useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const webmap = new Map({
        basemap: "satellite"
      });

      const view = new MapView({
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        map: webmap, // An instance of a Map object to display in the view.
        center: [120.99775590587882, 14.630052167039127],
        scale: 50000 // Represents the map scale at the center of the view.
      });

      return () => view && view.destroy()

    }
  }, []);

  return <div className="mapDiv" ref={mapDiv} style={{height: '79vh', width: "100%"}}></div>;
}

export default MapComponent;