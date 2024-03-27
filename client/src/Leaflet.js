import * as React from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-draw/dist/leaflet.draw.js";
import "leaflet-draw/dist/leaflet.draw.css";

export default function LeafletMap() {
  const map_container = React.useRef(null);

  const [shape_color, setShape_color] = React.useState("#000000");

    /* Basemaps for the map component. */

  const carto_basemap = new L.TileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
    subdomains: "abcd",
    minZoom: 2
  });
  
  const esri_basemap = new L.TileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: `Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community`,
    minZoom: 2
  });

  const basemaps = {
    "Carto": carto_basemap,
    "ESRI": esri_basemap
  }

  /* Layer containing all drawn features. */

  const drawn_items = new L.FeatureGroup();

  /* Map initialization. */

  React.useEffect(() => {
    if (map_container.current === undefined || map_container.current === null) {
      map_container.current = new L.Map("leaflet-map", {
        preferCanvas: true,
        center: [12.5, 121.5],
        maxBounds: ([[-90, -180], [90, 180]]),
        maxBoundsViscosity: 1.0,
        zoom: 6,
        zoomControl: true,
        layers: [carto_basemap]       
      });

      const layer_control = new L.control.layers(basemaps, null, {position: "bottomleft"});
      map_container.current.addControl(layer_control);
      map_container.current.on("baselayerchange", function (event) {
          event.layer === carto_basemap ? setShape_color("#000000") : setShape_color("#FFFFFF");
      });

      map_container.current.on(
        L.Draw.Event.CREATED, function(event) {
          var layer = event.layer;
          drawn_items.addLayer(layer);
        }
      );

      L.Draw.Polygon.include({
        options: {
          guidelineDistance: 8
        }
      });

      const draw_control = new L.Control.Draw({
        draw: {
          position: "topleft",
          marker: false,
          polyline: false,
          polygon: {
            shapeOptions: {
              stroke: true,
              weight: 1,
              color: shape_color
            }
          },
          rectangle: {
            shapeOptions: {
              stroke: true,
              weight: 1,
              color: shape_color
            }
          },
          circlemarker: false,
          circle: false
        },

        edit: {
          featureGroup: drawn_items,
          remove: true
        }
      });

        drawn_items.addTo(map_container.current);
        map_container.current.addControl(draw_control);
      } 
  }, []);

  return (
    <div>
      <div id = "leaflet-map"></div>
    </div>
  );
}