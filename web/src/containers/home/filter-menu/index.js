import React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

/* Parser for filter levels; To be updated once live data is available. */
import array_level_01 from "./filter_level_01.json";
import array_level_02 from "./filter_level_02.json";
import array_level_03 from "./filter_level_03.json";

export default function FilterMenu () {
  const {
    dataSource,
    setDataArray,
    setDataLoading,

    moduleSelected,

    filterL01Selected, setFilterL01Selected,
    filterL02Selected, setFilterL02Selected,
    filterL03Selected, setFilterL03Selected,
    filterL04Selected, setFilterL04Selected,

    setDataSelected
  } = React.useContext(MainContext);
  
  const {
    layer_road_sections,

    recenter_map, close_popup
  } = React.useContext(MapContext);

  function query_features (level, object) {
    setDataArray(null);
    setDataLoading(true);

    if (dataSource) {
      const expression =
        moduleSelected === 0 ? "1 = 0" :
        object ?
          level === 0 ? "1 = 1" :
          level === 1 ? "region_name = '" + object.REGION + "'" :
          level === 2 ? "region_name = '" + object.REGION + "' AND deo_name = '" + object.DEO + "'" :
          level === 3 ? "region_name = '" + object.REGION + "' AND deo_name = '" + object.DEO + "' AND district_name = '" + object.CONG_DIST + "'" :
          level === 4 ? "road_id LIKE '%" + object.query + "%' OR road_name LIKE '%" + object.query + "%' OR section_id LIKE '%" + object.query + "%'" || "1 = 0" :
          "1 = 0" :
        level === 0 ? "1 = 1" :
        level === 1 ? "region_name = '" + filterL01Selected + "'" :
        level === 2 ? "region_name = '" + filterL01Selected + "' AND deo_name = '" + filterL02Selected + "'" :
        level === 3 ? "region_name = '" + filterL01Selected + "' AND deo_name = '" + filterL02Selected + "' AND district_name = '" + filterL03Selected + "'" :
        "1 = 0";

      dataSource
        .queryFeatures({
          where: expression || "1 = 0",
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

            setDataArray(response.features);

            setDataLoading(false);
          }
          else {
            setDataLoading(false);

            setDataArray(null);
          }
        })
        .catch(function (error) {
          setDataLoading(false);

          console.log(error);
        });
    }
    else {
      const expression =
        moduleSelected === 0 ? "1 = 0" :
        object ?
          level === 0 ? "1 = 1" :
          level === 1 ? "REGION = '" + object.REGION + "'" :
          level === 2 ? "REGION = '" + object.REGION + "' AND DEO = '" + object.DEO + "'" :
          level === 3 ? "REGION = '" + object.REGION + "' AND DEO = '" + object.DEO + "' AND CONG_DIST = '" + object.CONG_DIST + "'" :
          level === 4 ? "ROAD_ID LIKE '%" + object.query + "%' OR ROAD_NAME LIKE '%" + object.query + "%' OR SECTION_ID LIKE '%" + object.query + "%'" || "1 = 0" :
          "1 = 0" :
        level === 0 ? "1 = 1" :
        level === 1 ? "REGION = '" + filterL01Selected + "'" :
        level === 2 ? "REGION = '" + filterL01Selected + "' AND DEO = '" + filterL02Selected + "'" :
        level === 3 ? "REGION = '" + filterL01Selected + "' AND DEO = '" + filterL02Selected + "' AND CONG_DIST = '" + filterL03Selected + "'" :
        "1 = 0";

      layer_road_sections
        .queryFeatures({
          where: moduleSelected === 0 ? "1 = 0" : expression || "1 = 0",
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

            setDataArray(response.features);

            setDataLoading(false);
          }
          else {
            setDataLoading(false);

            setDataArray(null);
          }
        })
        .catch(function (error) {
          setDataLoading(false);

          console.log(error);
        });
    }
  }

  function clear_filter (type) {
    if (type === 1) {
      setFilterL01Selected(null);
      setFilterL02Selected(null);
      setFilterL03Selected(null);
      setFilterL04Selected(null);

      query_features(0, null);
    }
    if (type === 2) {
      setFilterL02Selected(null);
      setFilterL03Selected(null);
      setFilterL04Selected(null);

     if (filterL01Selected) {  
        query_features(1, null);
      }
      else {  
        query_features(0, null);
      }
    }
    if (type === 3) {
      setFilterL03Selected(null);
      setFilterL04Selected(null);

      if (filterL02Selected) {  
        query_features(2, null);
      }
      else if (filterL01Selected) {  
        query_features(1, null);
      }
      else {  
        query_features(0, null);
      }
    }
    if (type === 4) {
      setFilterL01Selected(null);
      setFilterL02Selected(null);
      setFilterL03Selected(null);
    }
  }
  
  function select_filter (type, object) {
    close_popup();

    if (type === 1) {
      setFilterL01Selected(object.REGION);
      setFilterL02Selected(null);
      setFilterL03Selected(null);
      setFilterL04Selected(null);

      query_features(1, object);
    }
    if (type === 2) {
      setFilterL01Selected(object.REGION);
      setFilterL02Selected(object.DEO);
      setFilterL03Selected(null);
      setFilterL04Selected(null);

      query_features(2, object);
    }
    if (type === 3) {
      setFilterL01Selected(object.REGION);
      setFilterL02Selected(object.DEO);
      setFilterL03Selected(object.CONG_DIST);
      setFilterL04Selected(null);

      query_features(3, object);
    }
    if (type === 4) {
      clear_filter(4);

      query_features(4, object);
    }

    setDataSelected(null);
  }

  React.useEffect(function () {
    if (filterL03Selected) {
      clear_filter(4);
    }
    else if (filterL02Selected) {
      clear_filter(3);
    }
    else if (filterL01Selected) {
      clear_filter(2);
    }
    else {
      clear_filter(1);
    }
  }, [moduleSelected]);

  const [dropdownActive, setDropdownActive] = React.useState(false);
  const [dropdown01Active, setDropdown01Active] = React.useState(false);
  const [dropdown02Active, setDropdown02Active] = React.useState(false);
  const [dropdown03Active, setDropdown03Active] = React.useState(false);

  function click_dropdown (index) {
    setDropdown01Active(false);
    setDropdown02Active(false);
    setDropdown03Active(false);

    if (index === 0 || dropdownActive === index) {
      setDropdownActive(0);
    }
    else {
      if (index === 1) { setDropdown01Active(true); }
      if (index === 2) { setDropdown02Active(true); }
      if (index === 3) { setDropdown03Active(true); }

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
  
        setDropdownActive(0);
      }
    }
  });

  return (
    <div id = "filter-menu-container">
      <div>
        <div>{ "Region" }</div>
        <div className = { dropdown01Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(1); } }>
          <div>{ filterL01Selected ? array_level_01.find(function (object) { return (object.REGION === filterL01Selected); }).L01_NAME : "All" }</div>
          <div>
            <div onClick = { function () { clear_filter(1); } }>{ "Clear Selection" }</div>
            {
              array_level_01 ?
                array_level_01
                  .sort(function (base, next) {
                    if (base.L01_ID && next.L01_ID) {
                      return (base.L01_ID.localeCompare(next.L01_ID));
                    }
                    else {
                      return (0);
                    }
                  })
                  .map(function (item, index) {
                    return (
                      <div key = { index } className = { filterL01Selected && array_level_01.find(function (object) { return (object.REGION === filterL01Selected); }).L01_NAME === item.L01_NAME ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(1, item); } }>{ item.L01_NAME }</div>
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
        <div className = { dropdown02Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(2); } }>
          <div>{ filterL02Selected ? array_level_02.find(function (object) { return (object.DEO === filterL02Selected); }).L02_NAME : "All" }</div>
          <div>
            <div onClick = { function () { clear_filter(2); } }>{ "Clear Selection" }</div>
            {
              array_level_02 ?
                array_level_02
                  .sort(function (base, next) {
                    if (base.L02_ID && next.L02_ID) {
                      return (base.L02_ID.localeCompare(next.L02_ID));
                    }
                    else {
                      return (0);
                    }
                  })
                  .map(function (item, index) {
                    if (filterL01Selected && filterL01Selected !== item.REGION) {
                      return (null);
                    }
                    else {  
                      return (
                        <div key = { index } className = { filterL02Selected && array_level_02.find(function (object) { return (object.DEO === filterL02Selected); }).L02_NAME === item.L02_NAME ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(2, item); } }>{ item.L02_NAME }</div>
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
        <div className = { dropdown03Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(3); } }>
          <div>{ filterL03Selected ? array_level_03.find(function (object) { return (object.CONG_DIST === filterL03Selected); }).L03_NAME : "All" }</div>
          <div>
            <div onClick = { function () { clear_filter(3); } }>{ "Clear Selection" }</div>
            {
              array_level_03 ?
                array_level_03
                  .sort(function (base, next) {
                    if (base.L03_ID && next.L03_ID) {
                      return (base.L03_ID.localeCompare(next.L03_ID));
                    }
                    else {
                      return (0);
                    }
                  })
                  .map(function (item, index) {
                    if (filterL01Selected && filterL01Selected !== item.REGION) {
                      return (null);
                    }
                    else if (filterL02Selected && filterL02Selected !== item.DEO) {
                      return (null);
                    }
                    else {
                      return (
                        <div key = { index } className = { filterL03Selected && array_level_03.find(function (object) { return (object.CONG_DIST === filterL03Selected); }).L03_NAME === item.L03_NAME ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(3, item); } }>{ item.L03_NAME }</div>
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
        <div>{ "Search" }</div>
        <div className = { "filter-menu-input" } onClick = { function () { click_dropdown(0); } }>
          <input
            type = "text"
            value = { filterL04Selected ? filterL04Selected : "" }
            onChange = { function (event) { setFilterL04Selected(event.target.value); } }
            onKeyDown = { function (event) { if (event.key === "Enter") { select_filter(4, { "query": filterL04Selected }); } } }
          />
        </div>
      </div>
    </div>
  );
}