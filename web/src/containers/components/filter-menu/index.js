import React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

import array_level_01 from "./filter_level_01.json";
import array_level_02 from "./filter_level_02.json";
import array_level_03 from "./filter_level_03.json";

export default function FilterMenu () {
  const {
    setDataArray,
    filterL01Selected, setFilterL01Selected,
    filterL02Selected, setFilterL02Selected,
    filterL03Selected, setFilterL03Selected,
    filterL04Selected, setFilterL04Selected
  } = React.useContext(MainContext);
  
  const {
    layer_road_sections,
    recenter_map
  } = React.useContext(MapContext);

  function query_features (expression) {
    layer_road_sections
      .queryFeatures({
        where: expression || "1 = 1",
        returnGeometry: true,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response && response.features && response.features.length > 0) {
          setDataArray(response.features);

          var extent = response.features[0].geometry.extent;

          response.features.forEach(function(feature) {
            extent = extent.union(feature.geometry.extent);
          })

          recenter_map(extent);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function clear_filter (type) {
    if (type === 1) {
      setFilterL01Selected("");
      setFilterL02Selected("");
      setFilterL03Selected("");
      setFilterL04Selected("");

      query_features(null);
    }
    if (type === 2) {
      setFilterL02Selected("");
      setFilterL03Selected("");
      setFilterL04Selected("");

      query_features("REGION = '" + filterL01Selected + "'");
    }
    if (type === 3) {
      setFilterL03Selected("");
      setFilterL04Selected("");

      query_features("DEO = '" + filterL02Selected + "'");
    }
    if (type === 4) {
      setFilterL04Selected("");

      query_features("CONG_DIST = '" + filterL03Selected + "'");
    }
  }

  function select_filter (type, object) {
    if (type === 1) {
      setFilterL01Selected(object.REGION);
      setFilterL02Selected("");
      setFilterL03Selected("");
      setFilterL04Selected("");

      query_features("REGION = '" + object.REGION + "'");
    }
    if (type === 2) {
      setFilterL01Selected(object.REGION);
      setFilterL02Selected(object.DEO);
      setFilterL03Selected("");
      setFilterL04Selected("");

      query_features("DEO = '" + object.DEO + "'");
    }
    if (type === 3) {
      setFilterL01Selected(object.REGION);
      setFilterL02Selected(object.DEO);
      setFilterL03Selected(object.CONG_DIST);
      setFilterL04Selected("");

      query_features("CONG_DIST = '" + object.CONG_DIST + "'");
    }
    if (type === 4) {
      layer_road_sections
        .queryFeatures({
          where: "SECTION_ID = '" + object.query + "'",
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          if (response && response.features && response.features.length > 0) {
            setDataArray(response.features);

            let found_object = response.features[0];
  
            setFilterL01Selected(found_object.attributes.REGION);
            setFilterL02Selected(found_object.attributes.DEO);
            setFilterL03Selected(found_object.attributes.CONG_DIST);
            setFilterL04Selected(found_object.attributes.SECTION_ID);

            recenter_map(found_object.geometry.extent);
          }
          else {
            clear_filter(4);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const [dropdownActive, setDropdownActive] = React.useState(false);
  const [dropdown01Active, setDropdown01Active] = React.useState(false);
  const [dropdown02Active, setDropdown02Active] = React.useState(false);
  const [dropdown03Active, setDropdown03Active] = React.useState(false);
  const [dropdown04Active, setDropdown04Active] = React.useState(false);

  function click_dropdown (index) {
    setDropdown01Active(false);
    setDropdown02Active(false);
    setDropdown03Active(false);
    setDropdown04Active(false);

    if (dropdownActive === index) {
      setDropdownActive(0);
    }
    else {
      if (index === 1) { setDropdown01Active(true); }
      if (index === 2) { setDropdown02Active(true); }
      if (index === 3) { setDropdown03Active(true); }
      if (index === 4) { setDropdown04Active(true); }

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
        setDropdown01Active(false);
        setDropdown02Active(false);
        setDropdown03Active(false);
        setDropdown04Active(false);
  
        setDropdownActive(0);
      }
    }
  });

  return (
    <div id = "filter-menu-container">
      <div>
        <div>{ "Region" }</div>
        <div className = { dropdown01Active ? "active" : null } onClick = { function () { click_dropdown(1); } }>
          <div>{ filterL01Selected ? array_level_01.find(function (object) { return (object.REGION === filterL01Selected); }).L01_NAME : "All" }</div>
          <div>
            <div onClick = { function () { clear_filter(1); } }>{ "Clear Selection" }</div>
            {
              array_level_01 ?
                array_level_01
                  .sort(function (base, next) {
                    return (base.L01_ID.localeCompare(next.L01_ID));
                  })
                  .map(function (item, index) {
                    return (
                      <div key = { index } onClick = { function () { select_filter(1, item); } }>{ item.L01_NAME }</div>
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
        <div className = { dropdown02Active ? "active" : null } onClick = { function () { click_dropdown(2); } }>
          <div>{ filterL02Selected ? array_level_02.find(function (object) { return (object.DEO === filterL02Selected); }).L02_NAME : "All" }</div>
          <div>
            <div onClick = { function () { clear_filter(2); } }>{ "Clear Selection" }</div>
            {
              array_level_02 ?
                array_level_02
                  .sort(function (base, next) {
                    return (base.L02_ID.localeCompare(next.L02_ID));
                  })
                  .map(function (item, index) {
                    if (filterL01Selected && filterL01Selected !== item.REGION) {
                      return (null);
                    }
                    else {  
                      return (
                        <div key = { index } onClick = { function () { select_filter(2, item); } }>{ item.L02_NAME }</div>
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
        <div className = { dropdown03Active ? "active" : null } onClick = { function () { click_dropdown(3); } }>
          <div>{ filterL03Selected ? array_level_03.find(function (object) { return (object.CONG_DIST === filterL03Selected); }).L03_NAME : "All" }</div>
          <div>
            <div onClick = { function () { clear_filter(3); } }>{ "Clear Selection" }</div>
            {
              array_level_03 ?
                array_level_03
                  .sort(function (base, next) {
                    return (base.L03_ID.localeCompare(next.L03_ID));
                  })
                  .map(function (item, index) {
                    if (filterL01Selected && filterL01Selected !== item.REGION) {
                      return (null);
                    }
                    else {
                      if (filterL02Selected && filterL02Selected !== item.DEO) {
                        return (null);
                      }
                      else {
                        return (
                          <div key = { index } onClick = { function () { select_filter(3, item); } }>{ item.L03_NAME }</div>
                        );
                      }
                    }
                  })
                :
                null
            }
          </div>
        </div>
      </div>
      <div>
        <div>{ "Section ID" }</div>
        <div className = { dropdown04Active ? "active" : null } onClick = { function () { click_dropdown(4); } }>
          <input
            type = "text"
            value = { filterL04Selected }
            onChange = { function (event) { setFilterL04Selected(event.target.value); } }
            onKeyDown = {
              function (event) {
                if (event.key === "Enter") {
                  select_filter(4, { "query": filterL04Selected });
                }
              }
            }
          />
        </div>
      </div>
    </div>
  );
}