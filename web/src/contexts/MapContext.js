import * as React from "react";

import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";

import Expand from "@arcgis/core/widgets/Expand.js";
import Search from "@arcgis/core/widgets/Search.js";
import Home from "@arcgis/core/widgets/Home.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Editor from "@arcgis/core/widgets/Editor.js";
import Print from "@arcgis/core/widgets/Print.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar.js";

export const MapContext = React.createContext();

function MapContextProvider (props) {
  return (
    <MapContext.Provider value = {
      {
        // layer_national_road_network,
        // layer_national_expressways,
        // layer_regions,
        // layer_engineering_districts,
        // layer_legislative_districts,

        // layer_road_slope_hazards,
        // layer_road_slopes_and_countermeasures,

        // layer_inventory_of_road_slopes,
        // layer_inventory_of_road_slope_protection_structures,

        // MapComponent,

        // ViewLayer, FocusMap, RefocusMap, RecenterMap, OpenPopup, ClosePopup
      } 
    }>
      { props.children }
    </MapContext.Provider>
  );
}

export default MapContextProvider;