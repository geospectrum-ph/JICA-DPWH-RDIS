
import React from 'react';
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView"
import WebScene from "@arcgis/core/WebScene"
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'

import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Legend from "@arcgis/core/widgets/Legend"

import sample from '../../../sampleFiles/sample_data.json';
import { MainContext } from '../../../contexts/MainContext';

const MapComponent = () => {
  const {sampleData, setSampleData, mapCenter} = React.useContext(MainContext)
  const mapDiv = React.useRef(null);

  React.useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const webmap = new Map({
        basemap: "satellite",
        // layers: [geojsonlayer]
      });

      const view = new MapView({
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        map: webmap, // An instance of a Map object to display in the view.
        center: mapCenter, 
        scale: 50000 // Represents the map scale at the center of the view.
      });

      const graphicsLayer = new GraphicsLayer();
      webmap.add(graphicsLayer);

      // webmap.add(geojsonlayer)

      

      sampleData.features.map((feat) => {
        const checkHazard = () => {
          if (feat.properties.hazard_risk === "High") {
            return [255, 0, 0]
          } else if (feat.properties.hazard_risk === "Low") {
            return [50, 205, 50]
          } else if (feat.properties.hazard_risk === "Medium") {
            return [226, 119, 40]
          } else return [128, 128, 128]
        }
        
        const polyline = {
          type: "polyline",
          paths: feat.geometry.coordinates
        }

        const simpleLineSymbol = {
          type: "simple-line",
          color: checkHazard(),
          width: 2
        };

        const popupTemplate = {
          title: "{road_name}",
          content: "{category}"
        }

        const polylineGraphic = new Graphic({
          geometry: polyline,
          symbol: simpleLineSymbol,

          attributes: feat.properties,
          popupTemplate: popupTemplate
       });
       console.log(polylineGraphic)
       graphicsLayer.add(polylineGraphic);
      })
      
      // graphicsLayer.add(pointGraphic);

      return () => view && view.destroy()

    }
  }, [mapCenter]);

  // React.useEffect(() => {
  //   if (mapCenter.length > 0 && view) {
  //     console.log(mapCenter)
  //     view.goTo({
  //       center: mapCenter
  //     }).catch(function(error) {
  //       if (error.name != "AbortError") {
  //          console.error(error);
  //       }
  //     });
  //   }
  // }, [mapCenter])

  return <div className="mapDiv" ref={mapDiv} style={{height: '55vh', width: "100%"}}></div>;
}

export default MapComponent;