import React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function FilterMenu () {
  const {
    moduleSelected,
    regionsList, regionSelected, setRegionSelected,
    engineeringDistrictsList, engineeringDistrictSelected, setEngineeringDistrictSelected,
    congressionalDistrictsList, congressionalDistrictSelected, setCongressionalDistrictSelected,

  } = React.useContext(MainContext);
  const { recenter_map } = React.useContext(MapContext);

  function select (object, type) {
    if (type === "region") {
      setEngineeringDistrictSelected("");

      setRegionSelected(object.region_name);

      const zoom_regional = 8;

      const center_coordinates = object.center;
      const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

      recenter_map(coordinate_array, zoom_regional);
    }
    if (type === "engineering_district") {
      if (regionSelected === "") { setRegionSelected(object.REGION); }

      setEngineeringDistrictSelected(object.DEO);

      const zoom_provincial = 10;

      const center_coordinates = [object.centroid_x, object.centroid_y];
      const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

      recenter_map(coordinate_array, zoom_provincial);
    }
    if (type === "congressional_district") {
      if (regionSelected === "") { setRegionSelected(object.REGION); }
      if (engineeringDistrictSelected === "") { setRegionSelected(object.DEO); }

      setCongressionalDistrictSelected(object.CD);

      const zoom_local = 12;

      const center_coordinates = [object.centroid_x, object.centroid_y];
      const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

      recenter_map(coordinate_array, zoom_local);
    }
  }

  function clear (type) {
    if (type === "region") {
      setRegionSelected("");
      setEngineeringDistrictSelected("");
      setCongressionalDistrictSelected("");

      const zoom_level = 6;
      const center_coordinates = [121.7740, 12.8797];
      const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

      recenter_map(coordinate_array, zoom_level);
    }
    if (type === "engineering_district") {
      setEngineeringDistrictSelected("");
      setCongressionalDistrictSelected("");

      if (regionSelected === "") {
        const zoom_level = 6;
        const center_coordinates = [121.7740, 12.8797];
        const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

        recenter_map(coordinate_array, zoom_level);
      }
      else {
        const zoom_level = 8;
        const object = regionsList.find(function (element) { return (element.region_name === regionSelected); });
        const center_coordinates = object ? object.center : [121.7740, 12.8797];
        const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

        recenter_map(coordinate_array, zoom_level);
      }
    }
    if (type === "congressional_district") {
      setCongressionalDistrictSelected("");

      if (engineeringDistrictSelected === "") {
        if (regionSelected === "") {
          const zoom_level = 6;
          const center_coordinates = [121.7740, 12.8797];
          const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

          recenter_map(coordinate_array, zoom_level);
        }
        else {
          const zoom_level = 8;
          const object = regionsList.find(function (element) { return (element.region_name === regionSelected); });
          const center_coordinates = object ? object.center : [121.7740, 12.8797];
          const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

          recenter_map(coordinate_array, zoom_level);
        }
      }
      else {
        const zoom_level = 10;
        const object = engineeringDistrictsList.find(function (element) {return (element.DEO === engineeringDistrictSelected); });
        const center_coordinates = object ? [object.centroid_x, object.centroid_y] : [121.7740, 12.8797];
        const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

        recenter_map(coordinate_array, zoom_level);
      }
    }
  }

  const [dropdownActive, setDropdownActive] = React.useState(-1);
  const [dropdownRegionsActive, setDropdownRegionsActive] = React.useState(false);
  const [dropdownDEOsActive, setDropdownDEOsActive] = React.useState(false);
  const [dropdownCDsActive, setDropdownCDsActive] = React.useState(false);

  function click (index) {
    setDropdownRegionsActive(false);
    setDropdownDEOsActive(false);
    setDropdownCDsActive(false);

    if (dropdownActive === index) {
      setDropdownActive(-1);
    }
    else {
      if (index === 0) { setDropdownRegionsActive(true); }
      if (index === 1) { setDropdownDEOsActive(true); }
      if (index === 2) { setDropdownCDsActive(true); }

      setDropdownActive(index);
    }
  }

  window.addEventListener("click", function (event) {   
    const container = document.getElementById("filter-menu-container");
    
    if (container) {
      if (container.contains(event.target)) {
        return (null);
      }
      else {
        setDropdownRegionsActive(false);
        setDropdownDEOsActive(false);
        setDropdownCDsActive(false);
  
        setDropdownActive(-1);
      }
    }
  });

  return (
    <div id = "filter-menu-container">
      <div>{ moduleSelected.replace(/(^|-)[a-z]/g, function (character) { return (character[1] ? " " + character[1] : character[0]).toUpperCase(); }) }</div>
      <div>
        <div>
          <div>{ "Region" }</div>
          <div className = { dropdownRegionsActive ? "active" : null } onClick = { function () { click(0); } }>
            <div>{ regionSelected ? regionSelected : "All" }</div>
            <div>
              <div onClick = { function () { clear("region"); } }>{ "Clear Selection" }</div>
              {
                regionsList ?
                  regionsList
                    .map(function (region, index) {
                      return (
                        <div key = { index } onClick = { function () { select(region, "region"); } }>{ region.region_name }</div>
                      );
                    })
                  :
                  null
              }
            </div>
          </div>
        </div>
        <div>
          <div>{ "Engineering District" }</div>
          <div className = { dropdownDEOsActive ? "active" : null } onClick = { function () { click(1); } }>
            <div>{ engineeringDistrictSelected ? engineeringDistrictSelected : "All" }</div>
            <div>
              <div onClick = { function () { clear("engineering_district"); } }>{ "Clear Selection" }</div>
              {
                engineeringDistrictsList ?
                  engineeringDistrictsList
                    .map(function (engineering_district, index) {
                      if (regionSelected && regionSelected !== engineering_district.REGION) {
                        return (null);
                      }
                      else {  
                        return (
                          <div key = { index } onClick = { function () { select(engineering_district, "engineering_district"); } }>{ engineering_district.DEO }</div>
                        );
                      }
                    })
                  :
                  null
              }
            </div>
          </div>
        </div>
        <div>
          <div>{ "Congressional District" }</div>
          <div className = { dropdownCDsActive ? "active" : null } onClick = { function () { click(2); } }>
            <div>{ congressionalDistrictSelected ? congressionalDistrictSelected : "All" }</div>
            <div>
              <div onClick = { function () { clear("congressional_district"); } }>{ "Clear Selection" }</div>
              {
                congressionalDistrictsList ?
                congressionalDistrictsList
                    .map(function (congressional_district, index) {
                      if (regionSelected && regionSelected !== congressional_district.REGION) {
                        return (null);
                      }
                      else if (engineeringDistrictSelected && engineeringDistrictSelected !== congressional_district.DEO) {
                        return (null);
                      }
                      else {  
                        return (
                          <div key = { index } onClick = { function () { select(congressional_district, "congressional_district"); } }>{ congressional_district.CD }</div>
                        );
                      }
                    })
                  :
                  null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}