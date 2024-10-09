
import React from 'react';
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView"
import WebScene from "@arcgis/core/WebScene"
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'

import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Graphic from '@arcgis/core/Graphic';

import Legend from "@arcgis/core/widgets/Legend"
import ScaleBar from "@arcgis/core/widgets/ScaleBar"
import Expand from "@arcgis/core/widgets/Expand"

import { MainContext } from '../../../contexts/MainContext';

const MapComponent = () => {
  const {roadSegments, scale, roadSegments2, hazardList, mapCenter, moduleSelect} = React.useContext(MainContext)
  const mapDiv = React.useRef(null);
  


  React.useEffect(() => {
    // console.log(mapDiv.current)
    if (mapDiv.current) {

      const webmap = new Map({
        basemap: "satellite",
        // layers: [geojsonlayer]
      });
    
      const view = new MapView({
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        map: webmap, // An instance of a Map object to display in the view.
        center: mapCenter, 
        scale: scale // Represents the map scale at the center of the view.
      });;

      const view_3d = new SceneView({
        map: webmap,
        center: mapCenter
      })
    
      var viewWidget = new Legend({
        view: view
      })

      var expandLegend = new Expand({
        view: view,
        content: viewWidget
      })

      view.ui.add(expandLegend, "top-right");
      view_3d.ui.add(viewWidget, "top-right")
    
      const scalebar = new ScaleBar({
        view: view
      });
    
      view.ui.add(scalebar, "bottom-left");
      view_3d.ui.add(scalebar, "bottom-left");


      const regionLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Congressional_Districts/FeatureServer/0",
        id: "congressional_districts",
        opacity: 0.2
      })
      webmap.add(regionLayer)

      const kpsLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/kilometer_posts/FeatureServer/0",
        id: "kilometer_post",
        opacity: 0.9
      })
      webmap.add(kpsLayer)

      const roadLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/Road_Sections_view/FeatureServer/0",
        id: "road_sections",
        opacity: 0.9
      })
      webmap.add(roadLayer)

      const terrainLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/IwZZTMxZCmAmFYvF/arcgis/rest/services/terrain/FeatureServer",
        id: "terrain",
        opacity: 0.9,
        // renderer: {
        //   type: "polyline",
        //   width: 4,
        //   color: "blue"
        // }
      })
      // webmap.add(terrainLayer)


      const graphicsLayer = new GraphicsLayer();
      const graphicsLayerBounds = new GraphicsLayer()
      webmap.add(graphicsLayer);
      webmap.add(graphicsLayerBounds);
      if (moduleSelect === 'slope'){
        roadSegments2.map((feat) => {
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
            title: "{section_id}: {infrastructure_name}",
            content: "{situation}"
          }
  
          const polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: simpleLineSymbol,
  
            attributes: feat.properties,
            popupTemplate: popupTemplate
         });
        //  console.log(polylineGraphic)
         graphicsLayer.add(polylineGraphic);
        })
      } else if (moduleSelect === 'hazard') {
        hazardList.map((feat) => {
          const checkHazard = () => {
            if (feat.properties.HAZARD === "High") {
              return [255, 0, 0]
            } else if (feat.properties.HAZARD === "Low") {
              return [50, 205, 50]
            } else if (feat.properties.HAZARD === "Medium") {
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
            title: "{SECTION_ID}: {ROAD_NAME}",
            content: "{ROAD_SEC_C} {DIRECTION}"
          }
  
          const polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: simpleLineSymbol,
  
            attributes: feat.properties,
            popupTemplate: popupTemplate
         });
        //  console.log(polylineGraphic)
         graphicsLayer.add(polylineGraphic);
        })
      } else if (moduleSelect === 'emergency') {
        roadSegments.map((feat) => {
          const checkHazard = () => {
            if (feat.properties.situation === "notpassable") {
              return [255, 0, 0]
            } else if (feat.properties.situation === "passable") {
              return [50, 205, 50]
            } else if (feat.properties.situatiton === "limitedaccess") {
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
            title: "{section_id}: {infrastructure_name}",
            content: "Type: {infra_type} - {situation}"
          }
  
          const polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: simpleLineSymbol,
  
            attributes: feat.properties,
            popupTemplate: popupTemplate
         });
        //  console.log(polylineGraphic)
         graphicsLayer.add(polylineGraphic);
        })
      }
      

      return () => view

    }
  }, [mapCenter, moduleSelect]);


  React.useEffect(() => {
    // console.log(view)

    // if (view){
    // view.goTo({target: mapCenter}, {animation: true})

    // }
  }, [mapCenter, moduleSelect])


  return <div className="mapDiv" ref={mapDiv} style={{height: '85vh', width: "100%"}}></div>;
}

export default MapComponent;