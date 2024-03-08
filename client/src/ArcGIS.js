import * as React from "react";

import esriConfig from "@arcgis/core/config.js";

import Map from "@arcgis/core/Map.js";
import Basemap from "@arcgis/core/Basemap.js";

import MapView from "@arcgis/core/views/MapView.js";
import SceneView from "@arcgis/core/views/SceneView.js";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import BaseDynamicLayer from "@arcgis/core/layers/BaseDynamicLayer.js";
import BaseElevationLayer from "@arcgis/core/layers/BaseElevationLayer.js";
import ElevationLayer from "@arcgis/core/layers/ElevationLayer.js";
import KMLLayer from "@arcgis/core/layers/KMLLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";

import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";

import axios from "axios";

export const ArcGISMapContext = React.createContext();

var view;

const ArcGISMapContextProvider = (props) => {  
  function add_layer() {
    const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

    const template = {
      title: "Earthquake Info",
      content: "Magnitude {mag} {type} hit {place} on {time}",
      fieldInfos: [
        {
          fieldName: 'time',
          format: {
            dateFormat: 'short-date-short-time'
          }
        }
      ]
    };

    const renderer = {
      type: "simple",
      field: "mag",
      symbol: {
        type: "simple-marker",
        color: "orange",
        outline: {
          color: "white"
        }
      },
      visualVariables: [{
        type: "size",
        field: "mag",
        stops: [{
            value: 2.5,
            size: "4px"
          }, {
            value: 8,
            size: "40px"
          }
        ]
      }]
    };

    const layer = new GeoJSONLayer({
      url: url,
      copyright: "USGS Earthquakes",
      popupTemplate: template,
      renderer: renderer,
      orderBy: {
        field: "mag"
      }
    });

    view.map.layers.push(layer);
    console.log(view.map.layers.length);
  }

  function ArcGISMap() {
    esriConfig.apiKey = "AAPK122f88af0a6f4036b72d37b8c0df9d097eGqHL_YM-GllJbCGGUxjcjZfBFE75b0C8mYwKTv40eMyH7DtxeKk4TBfzZEwFBx";

    React.useEffect(() => {
      const map = new Map({
        basemap: "streets-vector"
      });

      view = new MapView({
        container: "sample-map",
        map: map,
        center: [121.5, 20.5],
        zoom: 4
      });
    }, []);

    return (
      <div className = "map-container">
        <div id = "sample-map" style = { { width: "100%", height: "100%" } }></div>
      </div>
    );
  }

  return (
    <ArcGISMapContext.Provider value = { { add_layer, ArcGISMap } }>{ props.children }</ArcGISMapContext.Provider>
  )
}

export default ArcGISMapContextProvider;