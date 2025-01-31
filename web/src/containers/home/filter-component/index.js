import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function FilterComponent () {
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
    layer_national_road_network,
    layer_engineering_districts,

    layer_road_slopes_and_countermeasures,

    focus_map, refocus_map, close_popup
  } = React.useContext(MapContext);

  const [filterArray, setFilterArray] = React.useState([]);

  React.useEffect(function () {
    layer_engineering_districts
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response && response.features && response.features.length > 0) {
          for (const feature of response.features) {
            const buffer_array = filterArray;

            const string_array = /^(.*) ?\((.*)\)$/.exec(feature.attributes.CONG_DIST);
            const orders_string = /^(.*) DISTRICT$/.exec(string_array[2]);
            const orders_array = orders_string[1].split(/[\s,&]+/);

            for (const item of orders_array) {
              const new_entry = string_array[1] + "(" + item + " DISTRICT)";

              const match_array = buffer_array.filter(function (item) {
                return (item.REGION === feature.attributes.REGION && item.DEO === feature.attributes.DEO && item.CONG_DIST === new_entry);
              });

              if (match_array.length === 0 && item !== "to") {
                buffer_array.push({
                  "REGION": feature.attributes.REGION,
                  "DEO": feature.attributes.DEO,
                  "CONG_DIST": new_entry
                });
              }
            }

            setFilterArray(buffer_array);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const values = new Map([["I", 1], ["V", 5], ["X", 10]]);
  
  function parseRomanToInteger (string) {
    let result = 0, current, previous = 0;

    for (const char of string.split("").reverse()) {
      current = values.get(char);

      if (current >= previous) {
        result += current;
      }
      else {
        result -= current;
      }

      previous = current;
    }

    return (result.toString().padStart(2, "0"));
  }

  function parseOrdinalStringToNumericalString (string) {
    switch (string) {
      case "FIRST":  return ("01");
      case "SECOND": return ("02");
      case "THIRD": return ("03");
      case "FOURTH": return ("04");
      case "FIFTH": return ("05");
      case "SIXTH": return ("06");
      case "SEVENTH": return ("07");
      case "EIGHTH": return ("08");
      case "NINTH": return ("09");
      case "TENTH": return ("10");
      case "ELEVENTH": return ("11");
      case "TWELFTH": return ("12");
      case "THIRTEENTH": return ("13");
      case "FOURTEENTH": return ("14");
      case "FIFTEENTH": return ("15");
      default: return (string);
    }
  }

  function query_features (level, object) {
    setDataArray(null);
    setDataLoading(true);

    if (dataSource) {   
      const expression =
        object ?
          level === 0 ? "1 = 1" :
          level === 1 ? "region_name = '" + object.REGION + "'" :
          level === 2 ? "deo_name = '" + object.DEO + "'" :
          level === 3 ? "district_name = '" + object.CONG_DIST + "'" :
          level === 4 ? "road_id LIKE '%" + object + "%' OR road_name LIKE '%" + object + "%' OR section_id LIKE '%" + object + "%'" || "1 = 0" :
          "1 = 0" :
        level === 0 ? "1 = 1" :
        level === 1 ? "region_name = '" + filterL01Selected + "'" :
        level === 2 ? "deo_name = '" + filterL02Selected + "'" :
        level === 3 ? "district_name = '" + filterL03Selected + "'" :
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

            setDataArray(response.features);

            setDataLoading(false);
          }
          else {
            dataSource
              .queryFeatures({
                where: "1 = 1",
                returnGeometry: true,
                outFields: ["*"]
              })
              .then(function (response) {
                if (response && response.features && response.features.length > 0) {
                  var extent = response.features[0].geometry.extent;
      
                  response.features.forEach(function(feature) {
                    extent = extent.union(feature.geometry.extent);
                  });
            
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
          level === 2 ? "DEO = '" + object.DEO + "'" :
          level === 3 ? "CONG_DIST = '" + object.CONG_DIST + "'" :
          level === 4 ? "ROAD_ID LIKE '%" + object + "%' OR ROAD_NAME LIKE '%" + object + "%' OR SECTION_ID LIKE '%" + object + "%'" || "1 = 0" :
          "1 = 0" :
        level === 0 ? "1 = 1" :
        level === 1 ? "REGION = '" + filterL01Selected + "'" :
        level === 2 ? "DEO = '" + filterL02Selected + "'" :
        level === 3 ? "CONG_DIST = '" + filterL03Selected + "'" :
        "1 = 0";

      layer_national_road_network
        .queryFeatures({
          where: moduleSelected === 0 ? "1 = 0" : expression || "1 = 0",
          returnGeometry: true,
          outFields: ["*"]
        })
        .then(function (response) {
          if (response && response.features && response.features.length > 0) {
            if (moduleSelected === 2 || moduleSelected === 3) {
              layer_road_slopes_and_countermeasures
                .queryFeatures({
                  where: "1 = 1",
                  returnGeometry: true,
                  outFields: ["*"]
                })
                .then(function (response) {
                  if (response && response.features.length > 0) {
                    var extent = response.features[0].geometry.extent;

                    response.features.forEach(function(feature) {
                      extent = extent.union(feature.geometry.extent);
                    });
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
            else {
              var extent = response.features[0].geometry.extent;

              response.features.forEach(function(feature) {
                extent = extent.union(feature.geometry.extent);
              });
            }
            
            setDataArray(response.features);

            setDataLoading(false);
          }
          else {
            layer_national_road_network
              .queryFeatures({
                where: "1 = 1",
                returnGeometry: true,
                outFields: ["*"]
              })
              .then(function (response) {
                if (response && response.features && response.features.length > 0) {
                  var extent = response.features[0].geometry.extent;
      
                  response.features.forEach(function(feature) {
                    extent = extent.union(feature.geometry.extent);
                  });

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
        })
        .catch(function (error) {
          setDataLoading(false);

          console.log(error);
        });
    }
  }

  function clear_filter (type) {
    refocus_map();
    
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
  
  function select_filter (type, string) {
    close_popup();

    focus_map(type, string);

    if (type === 1) {
      const object = filterArray.find(function (item) { return (item.REGION === string); });

      setFilterL01Selected(object.REGION);
      setFilterL02Selected(null);
      setFilterL03Selected(null);
      setFilterL04Selected(null);

      query_features(1, object);
    }
    if (type === 2) {
      const object = filterArray.find(function (item) { return (item.DEO === string); });

      if (!filterL01Selected) setFilterL01Selected(object.REGION);
      setFilterL02Selected(object.DEO);
      setFilterL03Selected(null);
      setFilterL04Selected(null);

      query_features(2, object);
    }
    if (type === 3) {
      const object = filterArray.find(function (item) { return (item.CONG_DIST === string); });

      if (!filterL01Selected) setFilterL01Selected(object.REGION);
      if (!filterL02Selected) setFilterL02Selected(object.DEO);
      setFilterL03Selected(object.CONG_DIST);
      setFilterL04Selected(null);

      query_features(3, object);
    }
    if (type === 4) {
      clear_filter(4);

      query_features(4, string);
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
    const container = document.getElementById("filter-component");
    
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
    <div id = "filter-component">
      <div onClick = { function () { click_dropdown(0); } }>
        <input type = "text" placeholder = "Search" value = { filterL04Selected ? filterL04Selected : "" } onChange = { function (event) { setFilterL04Selected(event.target.value); } } onKeyDown = { function (event) { if (event.key === "Enter") { select_filter(4, filterL04Selected); } } }/>
        <div>
          <span className = "material-symbols-outlined">{ "search" }</span>
        </div>
      </div>
      <div id = "filter-container">
        <div className = { dropdown01Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(1); } }>
          <div>
            <div>{ filterL01Selected || "Region" }</div>
            <div>
              <span className = "material-symbols-outlined">{ dropdown01Active ? "arrow_drop_up" : "arrow_drop_down" }</span>
            </div>
          </div>
          <div>
            <div onClick = { function () { clear_filter(1); } }>{ "Clear Selection" }</div>
            {
              filterArray && filterArray.length > 0 ?
                [...new Set(filterArray.map(function (item) { return (item.REGION); }))]
                  .sort(function (base, next) {
                    if (base && next) {
                      const base_split = base.split(/[\s-]+/);
                      base_split[1] = parseRomanToInteger(base_split[1]);
                      const next_split = next.split(/[\s-]+/);
                      next_split[1] = parseRomanToInteger(next_split[1]);

                      const base_parsed = base_split[0] === "Region" ? base_split.join(" ") : base;
                      const next_parsed = next_split[0] === "Region" ? next_split.join(" ") : next;

                      return (base_parsed.localeCompare(next_parsed));
                    }
                    else {
                      return (0);
                    }
                  })
                  .map(function (item, index) {
                    if (item !== null) {
                      return (
                        <div key = { index } className = { filterL01Selected && filterL01Selected === item ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(1, item); } }>{ item }</div>
                      );
                    }
                    else {
                      return (null);
                    }
                  })
                :
                null
            }
          </div>
        </div>
        <div className = { dropdown02Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(2); } }>
          <div>
            <div>{ filterL02Selected || "District Engineering Office" }</div>
            <div>
              <span className = "material-symbols-outlined">{ dropdown02Active ? "arrow_drop_up" : "arrow_drop_down" }</span>
            </div>
          </div>
          <div>
            <div onClick = { function () { clear_filter(2); } }>{ "Clear Selection" }</div>
            {
              filterArray && filterArray.length > 0 ?
                [...new Set(filterArray.map(function (item) { if (filterL01Selected && filterL01Selected !== item.REGION) { return (null); } else { return (item.DEO); } }))]
                  .sort(function (base, next) {
                    if (base && next) {
                      return (base.localeCompare(next));
                    }
                    else {
                      return (0);
                    }
                  })
                  .map(function (item, index) {
                    if (item !== null) {
                      return (
                        <div key = { index } className = { filterL02Selected && filterL02Selected === item ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(2, item); } }>{ item }</div>
                      );
                    }
                    else {
                      return (null);
                    }
                  })
                :
                null
            }
          </div>
        </div>
        <div className = { dropdown03Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(3); } }>
          <div>
            <div>{ filterL03Selected || "Legislative District" }</div>
            <div>
              <span className = "material-symbols-outlined">{ dropdown03Active ? "arrow_drop_up" : "arrow_drop_down" }</span>
            </div>
          </div>
          <div>
            <div onClick = { function () { clear_filter(3); } }>{ "Clear Selection" }</div>
            {
              filterArray && filterArray.length > 0 ?
                [...new Set(filterArray.map(function (item) { if (filterL01Selected && filterL01Selected !== item.REGION) { return (null); } else if (filterL02Selected && filterL02Selected !== item.DEO) { return (null); } else { return (item.CONG_DIST); } }))]
                  .sort(function (base, next) {
                    if (base && next) {
                      const base_string_array = /^(.*) ?\((.*)\)$/.exec(base);
                      const base_order_string = /^(.*) DISTRICT$/.exec(base_string_array[2]);
                      const base_parsed = base_string_array[1] + " (" + parseOrdinalStringToNumericalString(base_order_string[1]) + " DISTRICT)";

                      const next_string_array = /^(.*) ?\((.*)\)$/.exec(next);
                      const next_order_string = /^(.*) DISTRICT$/.exec(next_string_array[2]);
                      const next_parsed = next_string_array[1] + " (" + parseOrdinalStringToNumericalString(next_order_string[1]) + " DISTRICT)";

                      return (base_parsed.localeCompare(next_parsed));
                    }
                    else {
                      return (0);
                    }
                  })
                  .map(function (item, index) {
                    if (item !== null) {
                      return (
                        <div key = { index } className = { filterL03Selected && filterL03Selected === item ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(3, item); } }>{ item }</div>
                      );
                    }
                    else {
                      return (null);
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