import React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function FilterMenu () {
  const {
    regions, setRegions,
    regionSelected, setRegionSelected,
    congressionalDistricts, setCongressionalDistricts,
    congressionalDistrictSelected, setCongressionalDistrictSelected,
    engineeringDistricts, setEngineeringDistricts,
    engineeringDistrictSelected, setEngineeringDistrictSelected
  } = React.useContext(MainContext);
  
  const {
    layer_regions,
    layer_congressional_districts,
    layer_engineering_districts,
    recenter_map, close_popup
  } = React.useContext(MapContext);

  function query_regions () {
    layer_regions
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setRegions(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_congressional_districts () {
    layer_congressional_districts
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setCongressionalDistricts(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_engineering_districts () {
    layer_engineering_districts
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setEngineeringDistricts(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  React.useEffect(function () {
    query_regions("1 = 1");
    query_congressional_districts("1 = 1");
    query_engineering_districts("1 = 1");
  }, []);

  function select (object, type) {
    close_popup();

    setRegionSelected(object.attributes.REGION);

    if (type === "region") {
      setCongressionalDistrictSelected("");
      setEngineeringDistrictSelected("");

      layer_regions
        .queryExtent({
          where: "REGION = '" + object.attributes.REGION + "'",
        })
        .then(function (response) {
          recenter_map(response.extent.expand(1.50));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (type === "congressional_district") {
      setCongressionalDistrictSelected(object.attributes.CONG_DIST);
      setEngineeringDistrictSelected("");

      layer_congressional_districts
        .queryExtent({
          where: "CONG_DIST = '" + object.attributes.CONG_DIST + "'",
        })
        .then(function (response) {
          recenter_map(response.extent.expand(1.50));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (type === "engineering_district") {
      setEngineeringDistrictSelected(object.attributes.DEO);
      setCongressionalDistrictSelected("");

      layer_engineering_districts
        .queryExtent({
          where: "DEO = '" + object.attributes.DEO + "'",
        })
        .then(function (response) {
          recenter_map(response.extent.expand(1.50));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function clear (type) {
    close_popup();

    if (type === "region") {
      setRegionSelected("");
      setEngineeringDistrictSelected("");
      setCongressionalDistrictSelected("");

      recenter_map({ center: [121.7740, 12.8797], zoom: 6 });
    }
    else {
      if (type === "congressional_district" && congressionalDistrictSelected !== "") {
        setCongressionalDistrictSelected("");

        layer_regions
          .queryExtent({
            where: "REGION = '" + regionSelected + "'",
          })
          .then(function (response) {
            recenter_map(response.extent.expand(1.50));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      if (type === "engineering_district" && engineeringDistrictSelected !== "") {
        setEngineeringDistrictSelected("");

        layer_regions
          .queryExtent({
            where: "REGION = '" + regionSelected + "'",
          })
          .then(function (response) {
            recenter_map(response.extent.expand(1.50));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
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
      <div>
        <div>{ "Region" }</div>
        <div className = { dropdownRegionsActive ? "active" : null } onClick = { function () { click(0); } }>
          <div>{ regionSelected ? regionSelected : "All" }</div>
          <div>
            <div onClick = { function () { clear("region"); } }>{ "Clear Selection" }</div>
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
              congressionalDistricts ?
                congressionalDistricts
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
  );
}