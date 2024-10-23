import React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function FilterMenu () {
  const { moduleSelected, regionSelected, setRegionSelected, engineeringDistrictSelected, setEngineeringDistrictSelected, congressionalDistrictSelected, setCongressionalDistrictSelected } = React.useContext(MainContext);
  const { regionsList, congressionalDistrictsList, engineeringDistrictsList, clear_map, recenter_map, add_layer } = React.useContext(MapContext);

  function select (object, type) {
    var center_coordinates = [object.geometry.centroid.longitude, object.geometry.centroid.latitude];
    var zoom_level = 8;

    setRegionSelected(object.attributes.REGION);

    if (type === "region") {
      setCongressionalDistrictSelected("");
      setEngineeringDistrictSelected("");
    }
    if (type === "congressional_district") {
      setCongressionalDistrictSelected(object.attributes.CONG_DIST);
      setEngineeringDistrictSelected("");

      zoom_level = 9;
    }
    if (type === "engineering_district") {
      setEngineeringDistrictSelected(object.attributes.DEO);
      setCongressionalDistrictSelected("");

      zoom_level = 9;
    }

    clear_map();

    add_layer(object, type);

    recenter_map(center_coordinates, zoom_level);
  }

  function clear (type) {
    const object = regionsList.find(function (feature) { return (feature.attributes.REGION === regionSelected); });

    var center_coordinates = [121.7740, 12.8797];
    var zoom_level = 6;

    if (type === "region") {
      setRegionSelected("");
      setEngineeringDistrictSelected("");
      setCongressionalDistrictSelected("");

      clear_map();

      recenter_map(center_coordinates, zoom_level);
    }
    if (type === "engineering_district") {
      if (engineeringDistrictSelected !== "" && object) {
        center_coordinates = [object.geometry.centroid.longitude, object.geometry.centroid.latitude];
        zoom_level = 8;

        clear_map();
  
        recenter_map(center_coordinates, zoom_level);
      }

      setEngineeringDistrictSelected("");
    }
    if (type === "congressional_district") {
      if (congressionalDistrictSelected !== "" && object) {
        center_coordinates = [object.geometry.centroid.longitude, object.geometry.centroid.latitude];
        zoom_level = 8;

        clear_map();
  
        recenter_map(center_coordinates, zoom_level);
      }

      setCongressionalDistrictSelected("");
    }
  }

  const [dropdownActive, setDropdownActive] = React.useState(-1);
  const [dropdownRegionsActive, setDropdownRegionsActive] = React.useState(false);
  const [dropdownCDsActive, setDropdownCDsActive] = React.useState(false);
  const [dropdownDEOsActive, setDropdownDEOsActive] = React.useState(false);

  function click (index) {
    setDropdownRegionsActive(false);
    setDropdownCDsActive(false);
    setDropdownDEOsActive(false);

    if (dropdownActive === index) {
      setDropdownActive(-1);
    }
    else {
      if (index === 0) { setDropdownRegionsActive(true); }
      if (index === 1) { setDropdownCDsActive(true); }
      if (index === 2) { setDropdownDEOsActive(true); }

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
        setDropdownCDsActive(false);
        setDropdownDEOsActive(false);
  
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
                    .sort(function (base, next) {
                      let roman_parser = ["O", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];

                      let base_string_array = base.attributes.REGION.split(/[ -]+/);
                      let next_string_array = next.attributes.REGION.split(/[ -]+/);

                      if (base_string_array[0] === "Region" && next_string_array[0] === "Region") {
                        if (base_string_array[1] === next_string_array[1]) {
                          return (base_string_array[2].localeCompare(next_string_array[2]));
                        }
                        else {
                          return (roman_parser.indexOf(base_string_array[1]) - roman_parser.indexOf(next_string_array[1]));
                        }
                      }
                      else {
                        return (base.attributes.REGION.localeCompare(next.attributes.REGION));
                      }
                    })
                    .map(function (region, index) {
                      return (
                        <div key = { index } onClick = { function () { select(region, "region"); } }>{ region.attributes.REGION + " (" + region.attributes.VAR_NAME + ")" }</div>
                      );
                    })
                  :
                  null
              }
            </div>
          </div>
        </div>
        <div>
          <div>{ "Congressional District" }</div>
          <div className = { dropdownCDsActive ? "active" : null } onClick = { function () { click(1); } }>
            <div>{ congressionalDistrictSelected ? congressionalDistrictSelected.toLocaleLowerCase().replace(/([^\s(])([^\s(]*)/g, function ($0, $1, $2) { return ($1.toUpperCase()+$2.toLowerCase()); }) : "All" }</div>
            <div>
              <div onClick = { function () { clear("congressional_district"); } }>{ "Clear Selection" }</div>
              {
                congressionalDistrictsList ?
                  congressionalDistrictsList
                    .sort(function (base, next) {
                      return (base.attributes.CONG_DIST.localeCompare(next.attributes.CONG_DIST));
                    })
                    .map(function (congressional_district, index) {
                      if (regionSelected && regionSelected !== congressional_district.attributes.REGION) {
                        return (null);
                      }
                      else {  
                        return (
                          <div key = { index } onClick = { function () { select(congressional_district, "congressional_district"); } }>{ congressional_district.attributes.CONG_DIST.toLocaleLowerCase().replace(/([^\s(])([^\s(]*)/g, function ($0, $1, $2) { return ($1.toUpperCase()+$2.toLowerCase()); }) }</div>
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
          <div>{ "Engineering District" }</div>
          <div className = { dropdownDEOsActive ? "active" : null } onClick = { function () { click(2); } }>
            <div>{ engineeringDistrictSelected ? engineeringDistrictSelected : "All" }</div>
            <div>
              <div onClick = { function () { clear("engineering_district"); } }>{ "Clear Selection" }</div>
              {
                engineeringDistrictsList ?
                  engineeringDistrictsList
                    .sort(function (base, next) {
                      return (base.attributes.DEO.localeCompare(next.attributes.DEO));
                    })
                    .map(function (engineering_district, index) {
                      if (regionSelected && regionSelected !== engineering_district.attributes.REGION) {
                        return (null);
                      }
                      else {  
                        return (
                          <div key = { index } onClick = { function () { select(engineering_district, "engineering_district"); } }>{ engineering_district.attributes.DEO }</div>
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