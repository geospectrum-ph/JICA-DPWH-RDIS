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

export const ArcGISMapContext = React.createContext();

const ArcGISMapContextProvider = (props) => {
  const [mapLayers, setMapLayers] = React.useState([]);
  // const [counter, setCounter] = React.useState(0);

  // var map_instance = React.useRef(null);

  function addNewLayer(files) {
    console.log("addNewLayer() initialized!");
    console.log("File count: " + files.length);

    setMapLayers(files);
  }
  
  // function ArcGISMap() {
  //   function loadMap() {
  //     esriConfig.apiKey = "AAPK122f88af0a6f4036b72d37b8c0df9d097eGqHL_YM-GllJbCGGUxjcjZfBFE75b0C8mYwKTv40eMyH7DtxeKk4TBfzZEwFBx";
  
  //     const layer_container = new KMLLayer({
  //       url: "http://www.lohneswright.com/ctc/kml/actc_wheels.kml" // Sample layer.
  //     });
  
  //     const map = new Map({
  //       basemap: "streets-vector",
  //       layers: [layer_container]
  //     });
  
  //     const view = new MapView({
  //       map: map,
  //       container: map_instance.current,
  //       center: [121.5, 21.5],
  //       zoom: 3
  //     });
  
  //     const scalebar = new ScaleBar({
  //       view: view
  //     });
  
  //     view.ui.add(scalebar, "bottom-left");

  //   }
  
  //   React.useEffect(() => {
  //     loadMap();
  //   }, []);
  
  //   return (
  //     <div id = "sample-map" ref = { map_instance } style = { { width: "100%", height: "100%" } }></div>
  //   );
  // }
  function ArcGISMap() {
    esriConfig.apiKey = "AAPK122f88af0a6f4036b72d37b8c0df9d097eGqHL_YM-GllJbCGGUxjcjZfBFE75b0C8mYwKTv40eMyH7DtxeKk4TBfzZEwFBx";

    React.useEffect(() => {
      // create a geojson layer from geojson feature collection
      // const geojson = {
      //   type: "FeatureCollection",
      //   features: [
      //     {
      //       type: "Feature",
      //       id: 1,
      //       geometry: {
      //         type: "Polygon",
      //         coordinates: [
      //           [
      //             [100.0, 0.0],
      //             [101.0, 0.0],
      //             [101.0, 1.0],
      //             [100.0, 1.0],
      //             [100.0, 0.0]
      //           ]
      //         ]
      //       },
      //       properties: {
      //         type: "single",
      //         recordedDate: "2018-02-07T22:45:00-08:00"
      //       }
      //     }
      //   ]
      // };

      // // create a new blob from geojson featurecollection
      // const blob = new Blob([JSON.stringify(geojson)], {
      //   type: "application/json"
      // });

      // // URL reference to the blob
      // const url = URL.createObjectURL(blob);
      // // create new geojson layer using the blob url
      // const layer = new GeoJSONLayer({
      //   url
      // });

      const layer = new GeoJSONLayer({
        url: "https://earthquake.usgs.gov/fdsnws/event/1/query",
        copyright: "USGS - Japan earthquakes since 1905",
        // Use customParameters to set the query parameters
        // get the all red alert Japan earthquakes since 1905
        // order the results by magnitude
        customParameters: {
          format: "geojson",
          starttime: "1905-01-01",
          endtime: new Date().toISOString().split("T")[0],
          minlatitude: 24,
          maxlatitude: 46,
          minlongitude: 123,
          maxlongitude: 145,
          orderby: "magnitude",
          minmagnitude: 1,
          alertlevel: "red"
        },
        // only show earthquakes that mentions japan
        definitionExpression: "place LIKE '%Japan'",
        effect: "bloom(2 1px 0)",
        title: "USGS Earthquakes",
        renderer: {
          // apply unique values to alert levels
          type: "unique-value",
          field: "alert",
          uniqueValueInfos: [
            {
              value: "red",
              symbol: createQuakeSymbol("red")
            },
            {
              value: "orange",
              symbol: createQuakeSymbol("orange")
            },
            {
              value: "yellow",
              symbol: createQuakeSymbol("yellow")
            },
            {
              value: "green",
              symbol: createQuakeSymbol("#136d15")
            }
          ],
          visualVariables: [
            {
              type: "size",
              field: "mag",
              stops: [
                {
                  value: 4.5,
                  size: "1px"
                },
                {
                  value: 6,
                  size: "20px"
                },
                {
                  value: 8,
                  size: "60px"
                }
              ]
            }
          ]
        },
        popupTemplate: {
          title: "Earthquake Info",
          content:
            "Magnitude <b>{mag}</b> {type} hit {place} on <b>{time}</b> <br/><br/>  <a href={url}>More info</a>",
          fieldInfos: [
            {
              fieldName: "time",
              format: {
                dateFormat: "short-date-short-time"
              }
            }
          ]
        }
      });

      const map = new Map({
        basemap: "streets-vector",
        layers: [layer]
      });

      const view = new MapView({
        container: "sample-map",
        map: map,
        center: [137.632, 35.294],
        zoom: 4
      });

      layer.load().then(() => {
        // Update the layer custom parameters with the selected alert level on user select
        // fetch the data from the feed by calling refresh method.

        const selectTopEarthquakes = document.getElementById("selectTopEarthquakes");
        selectTopEarthquakes.addEventListener("calciteRadioButtonGroupChange", (event) => {
          const alertlevel = selectTopEarthquakes.selectedItem.value;
          layer.customParameters.alertlevel = alertlevel;
          layer.refresh();
          updateQuakeList();
        });
        updateQuakeList();
      });


      async function updateQuakeList() {
        const query = layer.createQuery().set({
          outFields: ["mag", "title", "time", layer.objectIdField],
          returnGeometry: true
        });
        const { features, fields } = await layer.queryFeatures(query);

        document.getElementById("results").innerHTML = "";
        for (const feature of features) {
          const { mag, title, time } = feature.attributes;
          const item = document.createElement("calcite-pick-list-item");
          const date = new Date(time).toLocaleString();
          const description = `Magnitude: ${mag} - Date: ${date}`;
          item.setAttribute("label", title);
          item.setAttribute("description", description);
          item.addEventListener("click", () => {
            view.openPopup({
              features: [feature],
              location: feature.geometry
            });
          });
          document.getElementById("results").appendChild(item);
        }
        document.getElementById("resultsHeading").innerHTML =
          `<b>${features.length}</b> ${layer.customParameters.alertlevel} alert level earthquakes.`;
      }

      // // add a legend for the earthquakes layer
      // const legendExpand = new Expand({
      //   expandTooltip: "Legend",
      //   view,
      //   content: new Legend({
      //     view
      //   }),
      //   expanded: false
      // });
      // view.ui.add(legendExpand, "top-left");

      // assign symbols to earthquakes matching their alert level.
      function createQuakeSymbol(color) {
        return {
          type: "simple-marker",
          color: null,
          outline: {
            color: color,
            width: "2px"
          }
        };
      }

      // const layerList = new LayerList({
      //   view: view
      // });

      // view.ui.add(layerList, "top-right");
    }, []);

    return (
      <div className = "map-container">
        <div id = "sample-map" style = { { width: "100%", height: "100%" } }></div>
        <calcite-panel id="infoDiv" class="calcite-mode-dark"
        style = {{
          padding: "6px",
          width: "370px",
          height: "96%",
          position: "absolute",
          top: "5px",
          right: "10px",
        }}
        >
          <h3 class="heading" slot="header-content">Earthquakes since 1905</h3>
          <div id="content">
            <calcite-label>
              <b>View earthquakes with:</b>
            </calcite-label>
            <calcite-radio-button-group name="selectTopEarthquakes" layout="vertical" id="selectTopEarthquakes" scale="s">
              <calcite-label layout="inline">
                <calcite-radio-button value="red" checked></calcite-radio-button>
                Red alert level
              </calcite-label>
              <calcite-label layout="inline">
                <calcite-radio-button value="orange"></calcite-radio-button>
                Orange alert level
              </calcite-label>
              <calcite-label layout="inline">
                <calcite-radio-button value="yellow"></calcite-radio-button>
                Yellow alert level
              </calcite-label>
              <calcite-label layout="inline">
                <calcite-radio-button value="green"></calcite-radio-button>
                Green alert level
              </calcite-label>
            </calcite-radio-button-group>
          </div>
          <calcite-panel id="resultsDiv">
            <p class="heading" id="resultsHeading" slot="header-content"></p>
            <div id="results"></div>
          </calcite-panel>
        </calcite-panel>
      </div>
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