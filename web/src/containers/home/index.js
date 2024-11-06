import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

import TitleBar from "./title-bar";
import ModuleBar from "./module-bar";

import "./index.css";

function HomePage () {
  const {
    moduleSelected,
    
    setDataArray,

    filterL01Selected, setFilterL01Selected,
    filterL02Selected, setFilterL02Selected,
    filterL03Selected, setFilterL03Selected,
    filterL04Selected, setFilterL04Selected
  } = React.useContext(MainContext);

  const {
    layer_road_sections,
    layer_inventory_of_road_slope_structures,
    layer_inventory_of_road_slopes,
    layer_hazard_map,

    MapComponent,
    recenter_map, close_popup
  } = React.useContext(MapContext);

  function clear_filter (type) {
    if (type === 1) {
      setFilterL01Selected("");
      setFilterL02Selected("");
      setFilterL03Selected("");
      setFilterL04Selected("");
    }
    if (type === 2) {
      setFilterL02Selected("");
      setFilterL03Selected("");
      setFilterL04Selected("");
    }
    if (type === 3) {
      setFilterL03Selected("");
      setFilterL04Selected("");
    }
    if (type === 4) {
      setFilterL04Selected("");
    }
  }

  function query_features () {
    const type = 
      filterL04Selected && filterL04Selected !== "" ? 4 :
      filterL03Selected && filterL03Selected !== "" ? 3 :
      filterL02Selected && filterL02Selected !== "" ? 2 :
      1;

    const expression =
      type === 1 ? "REGION = '" + filterL01Selected + "'" :
      type === 2 ? "REGION = '" + filterL01Selected + "' AND DEO = '" + filterL02Selected + "'" :
      type === 3 ? "REGION = '" + filterL01Selected + "' AND DEO = '" + filterL02Selected + "' AND CONG_DIST = '" + filterL03Selected + "'" :
      type === 4 ? "REGION = '" + filterL01Selected + "' AND DEO = '" + filterL02Selected + "' AND CONG_DIST = '" + filterL03Selected + "' AND SECTION_ID = '" + filterL04Selected :
      null;

    if (moduleSelected === "inventory-of-road-slope-structures") {
      layer_inventory_of_road_slope_structures
        .queryFeatures({
          where: expression || "1 = 1",
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          if (response && response.features && response.features.length > 0) {
            var extent = response.features[0].geometry.extent;

            response.features.forEach(function(feature) {
              extent = extent.union(feature.geometry.extent);
            });

            recenter_map(extent);

            const data_object = Object.groupBy(response.features, function ({ attributes }) { return (attributes.ROAD_ID) });

            setDataArray(Object.keys(data_object).map((key) => [key, data_object[key]]));

            close_popup();
          }
          else {
            clear_filter(1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else if (moduleSelected === "inventory-of-road-slopes") {
      layer_inventory_of_road_slopes
        .queryFeatures({
          where: expression || "1 = 1",
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          if (response && response.features && response.features.length > 0) {
            var extent = response.features[0].geometry.extent;

            response.features.forEach(function(feature) {
              extent = extent.union(feature.geometry.extent);
            });

            recenter_map(extent);

            const data_object = Object.groupBy(response.features, function ({ attributes }) { return (attributes.ROAD_ID) });

            setDataArray(Object.keys(data_object).map((key) => [key, data_object[key]]));

            close_popup();
          }
          else {
            clear_filter(1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else if (moduleSelected === "hazard-map") {
      layer_hazard_map
        .queryFeatures({
          where: expression || "1 = 1",
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          if (response && response.features && response.features.length > 0) {
            var extent = response.features[0].geometry.extent;

            response.features.forEach(function(feature) {
              extent = extent.union(feature.geometry.extent);
            });

            recenter_map(extent);

            const data_object = Object.groupBy(response.features, function ({ attributes }) { return (attributes.ROAD_ID) });

            setDataArray(Object.keys(data_object).map((key) => [key, data_object[key]]));

            close_popup();
          }
          else {
            clear_filter(1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      layer_road_sections
        .queryFeatures({
          where: expression || "1 = 1",
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          if (response && response.features && response.features.length > 0) {
            var extent = response.features[0].geometry.extent;

            response.features.forEach(function(feature) {
              extent = extent.union(feature.geometry.extent);
            });

            recenter_map(extent);

            const data_object = Object.groupBy(response.features, function ({ attributes }) { return (attributes.ROAD_ID) });

            setDataArray(Object.keys(data_object).map((key) => [key, data_object[key]]));

            close_popup();
          }
          else {
            clear_filter(1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  React.useEffect(function () {
    query_features();
  }, []);

  return (
    <div id = "home-container">
      <div>
        <TitleBar/>
      </div>
      <div>
        <ModuleBar/>
      </div>
      <div>
        <div>
          <Outlet/>
        </div>
        <div>
          <MapComponent/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;