import React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function FilterMenu () {
  const {
    regions, setRegions,
    regionSelected, setRegionSelected,
    legislativeDistricts, setLegislativeDistricts,
    legislativeDistrictSelected, setLegislativeDistrictSelected,
    engineeringDistricts, setEngineeringDistricts,
    engineeringDistrictSelected, setEngineeringDistrictSelected
  } = React.useContext(MainContext);
  
  const {
    layer_regions,
    layer_legislative_districts,
    layer_engineering_districts,
    recenter_map
  } = React.useContext(MapContext);

  function query_regions () {
    layer_regions
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: true,
        outFields: ["REGION"]
      })
      .then(function (response) {
        setRegions(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_engineering_districts () {
    layer_engineering_districts
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: true,
        outFields: ["REGION", "DEO"]
      })
      .then(function (response) {
        setEngineeringDistricts(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_legislative_districts () {
    layer_legislative_districts
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: true,
        outFields: ["REGION", "CONG_DIST"]
      })
      .then(function (response) {
        setLegislativeDistricts(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  React.useEffect(function () {
    query_regions();
    query_engineering_districts();
    query_legislative_districts();
  }, []);

  function clear_filter (type) {
    if (type === "region") {
      setRegionSelected("");
      setEngineeringDistrictSelected("");
      setLegislativeDistrictSelected("");
    }
    else {
      if (type === "engineering-district" && engineeringDistrictSelected !== "") {
        setEngineeringDistrictSelected("");
      }
      if (type === "legislative-district" && legislativeDistrictSelected !== "") {
        setLegislativeDistrictSelected("");
      }
    }
  }

  function select_filter (type, object) {
    setRegionSelected(object.attributes.REGION);

    if (type === "region") {
      setLegislativeDistrictSelected("");
      setEngineeringDistrictSelected("");
    }
    if (type === "engineering-district") {
      setEngineeringDistrictSelected(object.attributes.DEO);
      setLegislativeDistrictSelected("");
    }
    if (type === "legislative-district") {
      setLegislativeDistrictSelected(object.attributes.CONG_DIST);
      setEngineeringDistrictSelected("");
    }

    recenter_map(object.geometry.extent);
  }

  const [dropdownActive, setDropdownActive] = React.useState(false);
  const [dropdownRegionsActive, setDropdownRegionsActive] = React.useState(false);
  const [dropdownDEOsActive, setDropdownDEOsActive] = React.useState(false);
  const [dropdownLDsActive, setDropdownLDsActive] = React.useState(false);

  function click_dropdown (index) {
    setDropdownRegionsActive(false);
    setDropdownDEOsActive(false);
    setDropdownLDsActive(false);

    if (dropdownActive === index) {
      setDropdownActive(-1);
    }
    else {
      if (index === 0) { setDropdownRegionsActive(true); }
      if (index === 1) { setDropdownDEOsActive(true); }
      if (index === 2) { setDropdownLDsActive(true); }

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
        setDropdownLDsActive(false);
  
        setDropdownActive(-1);
      }
    }
  });

  return (
    <div id = "filter-menu-container">
      <div>
        <div>{ "Region" }</div>
        <div className = { dropdownRegionsActive ? "active" : null } onClick = { function () { click_dropdown(0); } }>
          <div>{ regionSelected ? regionSelected : "All" }</div>
          <div>
            <div onClick = { function () { clear_filter("region"); } }>{ "Clear Selection" }</div>
            {
              regions ?
                regions
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
                      <div key = { index } onClick = { function () { select_filter("region", region); } }>{ region.attributes.REGION }</div>
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
        <div className = { dropdownDEOsActive ? "active" : null } onClick = { function () { click_dropdown(1); } }>
          <div>{ engineeringDistrictSelected ? engineeringDistrictSelected : "All" }</div>
          <div>
            <div onClick = { function () { clear_filter("engineering-district"); } }>{ "Clear Selection" }</div>
            {
              engineeringDistricts ?
                engineeringDistricts
                  .sort(function (base, next) {
                    return (base.attributes.DEO.localeCompare(next.attributes.DEO));
                  })
                  .map(function (engineering_district, index) {
                    if (regionSelected && regionSelected !== engineering_district.attributes.REGION) {
                      return (null);
                    }
                    else {  
                      return (
                        <div key = { index } onClick = { function () { select_filter("engineering-district", engineering_district); } }>{ engineering_district.attributes.DEO }</div>
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
        <div>{ "Legislative District" }</div>
        <div className = { dropdownLDsActive ? "active" : null } onClick = { function () { click_dropdown(2); } }>
          <div>{ legislativeDistrictSelected ? legislativeDistrictSelected : "All" }</div>
          <div>
            <div onClick = { function () { clear_filter("legislative-district"); } }>{ "Clear Selection" }</div>
            {
              legislativeDistricts ?
                legislativeDistricts
                  .sort(function (base, next) {
                    return (base.attributes.CONG_DIST.localeCompare(next.attributes.CONG_DIST));
                  })
                  .map(function (legislative_district, index) {
                    if (regionSelected && regionSelected !== legislative_district.attributes.REGION) {
                      return (null);
                    }
                    else {  
                      return (
                        <div key = { index } onClick = { function () { select_filter("legislative-district", legislative_district); } }>{ legislative_district.attributes.CONG_DIST }</div>
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
  );
}