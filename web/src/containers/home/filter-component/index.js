import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";

import {
  layer_national_road_network,
  layer_national_expressways,
  layer_regions,
  layer_engineering_districts,
  layer_legislative_districts,
  layer_road_slope_hazards,
  layer_road_slopes_and_countermeasures,
  layer_inventory_of_road_slopes,
  layer_inventory_of_road_slope_protection_structures,
  close_popup,
  focus_map,
  view_layer,
} from "../map-component";

import "./index.css";

export default function FilterComponent () {
  const {
    moduleSelected,

    setDataSourceBuffer01,
    dataSourceBuffer02, setDataSourceBuffer02,
    dataSourceBuffer03, setDataSourceBuffer03,
    
    setDataSource01,
    setDataSource02,
    setDataSource03,

    dataLoading, setDataLoading,

    setDataTimestamp,

    setArrayRoadSlopeHazards,
    
    setArrayRoadSlopesTypeOfDisaster,
    setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure,
    
    setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure,
    setArrayRoadSlopeProtectionStructuresTypeOfDisaster,
    setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure,

    filterLevel01Selected, setFilterLevel01Selected,
    filterLevel02Selected, setFilterLevel02Selected,
    filterLevel03Selected, setFilterLevel03Selected,
    filterLevel04Selected, setFilterLevel04Selected,
    filterLevel05Selected, setFilterLevel05Selected,

    setTotalRoadInventory,
    setFilteredRoadInventory,

    setTotalRoadSlopeHazardsInventory,
    setFilteredRoadSlopeHazardsInventory,

    setTotalRoadSlopeInventory,
    setFilteredRoadSlopeInventory,

    setTotalExistingRoadSlopeProtectionStructures,
    setFilteredExistingRoadSlopeProtectionStructures,
  
    setTotalNonExistingRoadSlopeProtectionStructures,
    setFilteredNonExistingRoadSlopeProtectionStructures
  } = React.useContext(MainContext);

  /* Sets the working dataset and the values of the summary variables based on selected filters per module. */

  const [dataLoader01, setDataLoader01] = React.useState(false);
  const [dataLoader02, setDataLoader02] = React.useState(false);
  const [dataLoader03, setDataLoader03] = React.useState(false);
  const [dataLoader04, setDataLoader04] = React.useState(false);

  function filter_data_01 (type, string) {
    let region = sessionStorage.getItem("regionDefault") === "null" ? null : sessionStorage.getItem("regionDefault");
    let deo = sessionStorage.getItem("engineeringDistrictDefault") === "null" ? null : sessionStorage.getItem("engineeringDistrictDefault");

    setDataLoader01(true);

    layer_national_road_network
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response_national_road_network) {
        layer_national_expressways
          .queryFeatures({
            where: "1 = 1",
            returnGeometry: false,
            outFields: ["*"]
          })
          .then(function (response_national_expressways) {
            if (response_national_road_network?.features?.length > 0 && response_national_expressways?.features?.length > 0) {              
              setDataSourceBuffer01([...response_national_road_network.features, ...response_national_expressways.features]);

              setTotalRoadInventory([...response_national_road_network.features, ...response_national_expressways.features].length);

              let working_array =
                [...response_national_road_network.features, ...response_national_expressways.features]
                  .filter(function (data) {
                    if (deo) {
                      return (
                        (Object(data.attributes).hasOwnProperty("DEO") && data.attributes.DEO === deo) ||
                        (Object(data.attributes).hasOwnProperty("deo_name") && data.attributes.deo_name === deo)
                      );
                    }
                    else if (region) {
                      return (
                        (Object(data.attributes).hasOwnProperty("REGION") && data.attributes.REGION === region) ||
                        (Object(data.attributes).hasOwnProperty("region_name") && data.attributes.region_name === region)
                      );
                    }
                    else {
                      return (data);
                    }
                  })
                  .filter(function (data) {
                    if (type === 0 || type === 5) {
                      return (data);
                    }
                    if (type === 1) {
                      return (
                        (Object(data.attributes).hasOwnProperty("REGION") && data.attributes.REGION === (string ?? filterLevel01Selected)) ||
                        (Object(data.attributes).hasOwnProperty("region_name") && data.attributes.region_name === (string ?? filterLevel01Selected))
                      );
                    }
                    else if (type === 2) {
                      return (
                        (Object(data.attributes).hasOwnProperty("DEO") && data.attributes.DEO === (string ?? filterLevel02Selected)) ||
                        (Object(data.attributes).hasOwnProperty("deo_name") && data.attributes.deo_name === (string ?? filterLevel02Selected))
                      );
                    }
                    else if (type === 3) {
                      return (
                        (Object(data.attributes).hasOwnProperty("CONG_DIST") && data.attributes.CONG_DIST === (string ?? filterLevel03Selected)) ||
                        (Object(data.attributes).hasOwnProperty("district_name") && data.attributes.district_name === (string ?? filterLevel03Selected))
                      );
                    }
                    else if (type === 4) {
                      return (
                        ((Object(data.attributes).hasOwnProperty("ROAD_ID") && data.attributes.ROAD_ID.includes(string ?? filterLevel04Selected)) ||
                        (Object(data.attributes).hasOwnProperty("ROAD_NAME") && data.attributes.ROAD_NAME.includes(string ?? filterLevel04Selected)) ||
                        (Object(data.attributes).hasOwnProperty("SECTION_ID") && data.attributes.SECTION_ID.includes(string ?? filterLevel04Selected)) ||
                        (Object(data.attributes).hasOwnProperty("road_id") && data.attributes.road_id.includes(string ?? filterLevel04Selected)) ||
                        (Object(data.attributes).hasOwnProperty("road_name") && data.attributes.road_name.includes(string ?? filterLevel04Selected)) ||
                        (Object(data.attributes).hasOwnProperty("section_id") && data.attributes.section_id.includes(string ?? filterLevel04Selected)))
                      );
                    }
                    else {
                      return (false);
                    }
                  });

              setDataSource01(working_array);

              setFilteredRoadInventory(working_array.length);
            }
            else {
              setTotalRoadInventory(0);
              setFilteredRoadInventory(0);
            }

            setDataLoader01(false);
          })
          .catch(function (error) {
            setTotalRoadInventory(0);
            setFilteredRoadInventory(0);

            setDataLoader01(false);

            // console.log(error);
          });
      })
      .catch(function (error) {
        setTotalRoadInventory(0);
        setFilteredRoadInventory(0);

        setDataLoader01(false);

        // console.log(error);
      });
  }

  function filter_data_02 (type, string) {
    let region = sessionStorage.getItem("regionDefault") === "null" ? null : sessionStorage.getItem("regionDefault");
    let deo = sessionStorage.getItem("engineeringDistrictDefault") === "null" ? null : sessionStorage.getItem("engineeringDistrictDefault");

    const arrayRoadSlopeHazardsBuffer = [
      {
        name: "High",
        total: 0,
        filtered: 0,
        color: "rgba(255, 0, 0, 1.00)"
      },
      {
        name: "Middle",
        total: 0,
        filtered: 0,
        color: "rgba(255, 255, 0, 1.00)"
      },
      {
        name: "Low",
        total: 0,
        filtered: 0, 
        color: "rgba(0, 176, 80, 1.00)"
      },
      {
        name: "Unclassified",
        total: 0,
        filtered: 0,
        color: "rgba(191, 191, 191, 1.00)"
      }
    ];

    setDataLoader02(true);

    layer_road_slope_hazards
      .queryFeatures({
        where:
          deo ?
            `deo_name = '${ deo }'`
            :
          region ?
            `region_name = '${ region }'`
            :
            "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features?.length > 0) {       
          setDataSourceBuffer02(response.features);

          setTotalRoadSlopeHazardsInventory(response.features.length);

          let working_array = 
            response.features
              .filter(function (data) {
                if (type === 0 || type === 5) {
                  return (
                    Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (string || new Date().getFullYear())
                  );
                }
                else if (type === 1) {
                  return (
                    (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)) &&
                    ((Object(data.attributes).hasOwnProperty("REGION") && data.attributes.REGION === (string || filterLevel01Selected)) ||
                    (Object(data.attributes).hasOwnProperty("region_name") && data.attributes.region_name === (string || filterLevel01Selected)))
                  );
                }
                else if (type === 2) {
                  return (
                    (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)) &&
                    ((Object(data.attributes).hasOwnProperty("DEO") && data.attributes.DEO === (string || filterLevel02Selected)) ||
                    (Object(data.attributes).hasOwnProperty("deo_name") && data.attributes.deo_name === (string || filterLevel02Selected)))
                  );
                }
                else if (type === 3) {
                  return (
                    (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)) &&
                    ((Object(data.attributes).hasOwnProperty("CONG_DIST") && data.attributes.CONG_DIST === (string || filterLevel03Selected)) ||
                    (Object(data.attributes).hasOwnProperty("district_name") && data.attributes.district_name === (string || filterLevel03Selected)))
                  );
                }
                else if (type === 4) {
                  return (
                    (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)) &&
                    ((Object(data.attributes).hasOwnProperty("ROAD_ID") && data.attributes.ROAD_ID.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("ROAD_NAME") && data.attributes.ROAD_NAME.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("SECTION_ID") && data.attributes.SECTION_ID.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("road_id") && data.attributes.road_id.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("road_name") && data.attributes.road_name.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("section_id") && data.attributes.section_id.includes(string || filterLevel04Selected)))
                  );
                }
                else {
                  return (false);
                }
              });

          setDataSource02(working_array);

          setFilteredRoadSlopeHazardsInventory(working_array.length);

          let arrayRoadSlopeHazardsBuffer_ =
            arrayRoadSlopeHazardsBuffer
              .map(function (item, index) {
                return ({
                  ...arrayRoadSlopeHazardsBuffer[index],
                  filtered:
                    working_array
                      .filter(function (feature) {
                        if (index < arrayRoadSlopeHazardsBuffer.length - 1) {
                          return (feature.attributes.hazard_risk === item.name);
                        }
                        else {
                          return (arrayRoadSlopeHazardsBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.hazard_risk) < 0);
                        }
                      })
                      .length,
                  total:
                    response.features
                      .filter(function (feature) {
                        if (index < arrayRoadSlopeHazardsBuffer.length - 1) {
                          return (feature.attributes.hazard_risk === item.name);
                        }
                        else {
                          return (arrayRoadSlopeHazardsBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.hazard_risk) < 0);
                        }
                      })
                      .length,
                });
              });

          setArrayRoadSlopeHazards(arrayRoadSlopeHazardsBuffer_);
        }
        else {
          setFilteredRoadSlopeHazardsInventory(0);
          setTotalRoadSlopeHazardsInventory(0);

          setArrayRoadSlopeHazards(arrayRoadSlopeHazardsBuffer);
        }

        setDataLoader02(false);
      })
      .catch(function (error) {        
        setFilteredRoadSlopeHazardsInventory(0);
        setTotalRoadSlopeHazardsInventory(0);

        setArrayRoadSlopeHazards(arrayRoadSlopeHazardsBuffer);

        setDataLoader02(false);

        // console.log(error);
      });
  }

  function filter_data_03 (type, string) {
    let region = sessionStorage.getItem("regionDefault") === "null" ? null : sessionStorage.getItem("regionDefault");
    let deo = sessionStorage.getItem("engineeringDistrictDefault") === "null" ? null : sessionStorage.getItem("engineeringDistrictDefault");

    const arrayRoadSlopesTypeOfDisasterBuffer = [
      {
        name: "Soil Slope Collapse",
        total: 0,
        filtered: 0,
        color: "rgba(249, 65, 68, 1.00)"
      }, 
      {
        name: "Rock Slope Collapse or Rock Fall",
        total: 0,
        filtered: 0,
        color: "rgba(243, 114, 44, 1.00)"
      },
      {
        name: "Landslide",
        total: 0,
        filtered: 0,
        color: "rgba(248, 150, 30, 1.00)"
      },
      {
        name: "Road Slip",
        total: 0,
        filtered: 0,
        color: "rgba(249, 199, 79, 1.00)"
      },
      {
        name: "River Erosion",
        total: 0,
        filtered: 0,
        color: "rgba(144, 190, 109, 1.00)"
      },
      {
        name: "Debris Flow",
        total: 0,
        filtered: 0,
        color: "rgba(67, 170, 139, 1.00)"
      },
      {
        name: "Coastal Erosion",
        total: 0,
        filtered: 0,
        color: "rgba(87, 117, 144, 1.00)"
      },
      {
        name: "Unclassified",
        total: 0,
        filtered: 0,
        color: "rgba(191, 191, 191, 1.00)"
      } 
    ];

    const arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer = [
      {
        name: "Grouted Riprap", 
        total: 0,
        filtered: 0,
        color: "rgba(138, 22, 177, 1.00)"
      },
      {
        name: "Grouted Riprap with Steel Sheet Pile Foundation", 
        total: 0,
        filtered: 0,
        color: "rgba(138, 22, 177, 1.00)"
      },
      {
        name: "Grouted Riprap with Concrete Sheet Pile Foundation", 
        total: 0,
        filtered: 0,
        color: "rgba(199, 26, 176, 1.00)"
      },
      {
        name: "Rubble Concrete Revetment (Spread Type I)", 
        total: 0,
        filtered: 0,
        color: "rgba(220, 30, 122, 1.00)"
      },
      {
        name: "Stone Masonry", 
        total: 0,
        filtered: 0,
        color: "rgba(161, 19, 24, 1.00)"
      },
      {
        name: "Concrete Slope Protection (Reinforced Concrete Type II)", 
        total: 0,
        filtered: 0,
        color: "rgba(182, 75, 23, 1.00)"
      },
      {
        name: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)", 
        total: 0,
        filtered: 0,
        color: "rgba(204, 153, 27, 1.00)"
      },
      {
        name: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)", 
        total: 0,
        filtered: 0,
        color: "rgba(206, 224, 32, 1.00)"
      },
      {
        name: "Gravity Wall (Type I)", 
        total: 0,
        filtered: 0,
        color: "rgba(87, 166, 20, 1.00)"
      },
      {
        name: "Gabion/Mattress Slope Protection", 
        total: 0,
        filtered: 0,
        color: "rgba(36, 188, 24, 1.00)"
      },
      {
        name: "Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)", 
        total: 0,
        filtered: 0,
        color: "rgba(28, 209, 84, 1.00)"
      },
      {
        name: "Bio-Engineering Solutions (Coco-Net, Coco-Log & Vetiver Grass)", 
        total: 0,
        filtered: 0,
        color: "rgba(38, 225, 167, 1.00)"
      },
      {
        name: "Earthfill Dike (Type I)", 
        total: 0,
        filtered: 0,
        color: "rgba(21, 151, 172, 1.00)"
      },
      {
        name: "Boulder Spur Dike (Type II)", 
        total: 0,
        filtered: 0,
        color: "rgba(25, 106, 193, 1.00)"
      },
      {
        name: "Gabions Revetment (Pile-Up Type)", 
        total: 0,
        filtered: 0,
        color: "rgba(29, 47, 215, 1.00)"
      },
      {
        name: "Unclassified",
        total: 0,
        filtered: 0,
        color: "rgba(191, 191, 191, 1.00)"
      }
    ];

    const arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer = [
      {
        name: "Good",
        total: 0,
        filtered: 0,
        color: "rgba(153, 255, 153, 1.00)"
      },
      {
        name: "Fair",
        total: 0,
        filtered: 0,
        color: "rgba(0, 204, 255, 1.00)"
      },
      {
        name: "Poor",
        total: 0,
        filtered: 0,
        color: "rgba(255, 153, 51, 1.00)"
      },
      {
        name: "Bad",
        total: 0,
        filtered: 0,
        color: "rgba(204, 102, 0, 1.00)"
      },
      {
        name: "Unclassified",
        total: 0,
        filtered: 0,
        color: "rgba(191, 191, 191, 1.00)"
      }
    ];

    const arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer = [
      {
        name: "Soil Slope Collapse",
        total: 0,
        filtered: 0,
        color: "rgba(249, 65, 68, 1.00)"
      }, 
      {
        name: "Rock Slope Collapse or Rock Fall",
        total: 0,
        filtered: 0,
        color: "rgba(243, 114, 44, 1.00)"
      },
      {
        name: "Landslide",
        total: 0,
        filtered: 0,
        color: "rgba(248, 150, 30, 1.00)"
      },
      {
        name: "Road Slip",
        total: 0,
        filtered: 0,
        color: "rgba(249, 199, 79, 1.00)"
      },
      {
        name: "River Erosion",
        total: 0,
        filtered: 0,
        color: "rgba(144, 190, 109, 1.00)"
      },
      {
        name: "Debris Flow",
        total: 0,
        filtered: 0,
        color: "rgba(67, 170, 139, 1.00)"
      },
      {
        name: "Coastal Erosion",
        total: 0,
        filtered: 0,
        color: "rgba(87, 117, 144, 1.00)"
      },
      {
        name: "Unclassified",
        total: 0,
        filtered: 0,
        color: "rgba(191, 191, 191, 1.00)"
      } 
    ];

    const arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer = [
      {
        name: "Grouted Riprap", 
        total: 0,
        filtered: 0,
        color: "rgba(138, 22, 177, 1.00)"
      },
      {
        name: "Grouted Riprap with Steel Sheet Pile Foundation", 
        total: 0,
        filtered: 0,
        color: "rgba(138, 22, 177, 1.00)"
      },
      {
        name: "Grouted Riprap with Concrete Sheet Pile Foundation", 
        total: 0,
        filtered: 0,
        color: "rgba(199, 26, 176, 1.00)"
      },
      {
        name: "Rubble Concrete Revetment (Spread Type I)", 
        total: 0,
        filtered: 0,
        color: "rgba(220, 30, 122, 1.00)"
      },
      {
        name: "Stone Masonry", 
        total: 0,
        filtered: 0,
        color: "rgba(161, 19, 24, 1.00)"
      },
      {
        name: "Concrete Slope Protection (Reinforced Concrete Type II)", 
        total: 0,
        filtered: 0,
        color: "rgba(182, 75, 23, 1.00)"
      },
      {
        name: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (2 Berms)", 
        total: 0,
        filtered: 0,
        color: "rgba(204, 153, 27, 1.00)"
      },
      {
        name: "Reinforced Concrete Revetment with Steel Sheet Pile Foundation (3 Berms)", 
        total: 0,
        filtered: 0,
        color: "rgba(206, 224, 32, 1.00)"
      },
      {
        name: "Gravity Wall (Type I)", 
        total: 0,
        filtered: 0,
        color: "rgba(87, 166, 20, 1.00)"
      },
      {
        name: "Gabion/Mattress Slope Protection", 
        total: 0,
        filtered: 0,
        color: "rgba(36, 188, 24, 1.00)"
      },
      {
        name: "Bio-Engineering Solutions (Coco-Net, Coco-Log & Hydroseeding)", 
        total: 0,
        filtered: 0,
        color: "rgba(28, 209, 84, 1.00)"
      },
      {
        name: "Bio-Engineering Solutions (Coco-Net, Coco-Log & Vetiver Grass)", 
        total: 0,
        filtered: 0,
        color: "rgba(38, 225, 167, 1.00)"
      },
      {
        name: "Earthfill Dike (Type I)", 
        total: 0,
        filtered: 0,
        color: "rgba(21, 151, 172, 1.00)"
      },
      {
        name: "Boulder Spur Dike (Type II)", 
        total: 0,
        filtered: 0,
        color: "rgba(25, 106, 193, 1.00)"
      },
      {
        name: "Gabions Revetment (Pile-Up Type)", 
        total: 0,
        filtered: 0,
        color: "rgba(29, 47, 215, 1.00)"
      },
      {
        name: "Unclassified",
        total: 0,
        filtered: 0,
        color: "rgba(191, 191, 191, 1.00)"
      }
    ];

    setDataLoader03(true);

    layer_road_slopes_and_countermeasures
      .queryFeatures({
        where:
          deo ?
            `deo_name = '${ deo }'`
            :
          region ?
            `region_name = '${ region }'`
            :
            "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          setDataSourceBuffer03(response.features);

          setTotalRoadSlopeInventory(response.features.length);
          
          let response_01 =
            response.features
              .filter(function (data) {
                return (Object(data.attributes).hasOwnProperty("rsm_category") && data.attributes.rsm_category === "Inventory of Road Slope");
              });

          setTotalNonExistingRoadSlopeProtectionStructures(response_01.length);

          let response_02 =
            response.features
              .filter(function (data) {
                return (Object(data.attributes).hasOwnProperty("rsm_category") && data.attributes.rsm_category === "Inventory of Road Slope Structures");
              });

          setTotalExistingRoadSlopeProtectionStructures(response_02.length);

          let working_array = 
            response.features
              .filter(function (data) {
                if (type === 0 || type === 5) {
                  return (
                    Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (string || new Date().getFullYear())
                  );
                }
                if (type === 1) {
                  return (
                    (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)) &&
                    ((Object(data.attributes).hasOwnProperty("REGION") && data.attributes.REGION === (string || filterLevel01Selected)) ||
                    (Object(data.attributes).hasOwnProperty("region_name") && data.attributes.region_name === (string || filterLevel01Selected)))
                  );
                }
                else if (type === 2) {
                  return (
                    (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)) &&
                    ((Object(data.attributes).hasOwnProperty("DEO") && data.attributes.DEO === (string || filterLevel02Selected)) ||
                    (Object(data.attributes).hasOwnProperty("deo_name") && data.attributes.deo_name === (string || filterLevel02Selected)))
                  );
                }
                else if (type === 3) {
                  return (
                    (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)) &&
                    ((Object(data.attributes).hasOwnProperty("CONG_DIST") && data.attributes.CONG_DIST === (string || filterLevel03Selected)) ||
                    (Object(data.attributes).hasOwnProperty("district_name") && data.attributes.district_name === (string || filterLevel03Selected)))
                  );
                }
                else if (type === 4) {
                  return (
                    (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)) &&
                    ((Object(data.attributes).hasOwnProperty("ROAD_ID") && data.attributes.ROAD_ID.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("ROAD_NAME") && data.attributes.ROAD_NAME.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("SECTION_ID") && data.attributes.SECTION_ID.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("road_id") && data.attributes.road_id.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("road_name") && data.attributes.road_name.includes(string || filterLevel04Selected)) ||
                    (Object(data.attributes).hasOwnProperty("section_id") && data.attributes.section_id.includes(string || filterLevel04Selected)))
                  );
                }
                else {
                  return (false);
                }
              });
          
          setDataSource03(working_array);

          setFilteredRoadSlopeInventory(working_array.length);

          let working_array_01 =
            working_array
              .filter(function (data) {
                return (Object(data.attributes).hasOwnProperty("rsm_category") && data.attributes.rsm_category === "Inventory of Road Slope");
              });

          setFilteredNonExistingRoadSlopeProtectionStructures(working_array_01.length);

          let working_array_02 =
            working_array
              .filter(function (data) {
                return (Object(data.attributes).hasOwnProperty("rsm_category") && data.attributes.rsm_category === "Inventory of Road Slope Structures");
              });

          setFilteredExistingRoadSlopeProtectionStructures(working_array_02.length);

          let arrayRoadSlopesTypeOfDisasterBuffer_ =
            arrayRoadSlopesTypeOfDisasterBuffer
              .map(function (item, index) {
                return ({
                  ...arrayRoadSlopesTypeOfDisasterBuffer[index],
                  filtered:
                    working_array_01
                      .filter(function (feature) {
                        if (index < arrayRoadSlopesTypeOfDisasterBuffer.length - 1) {
                          return (feature.attributes.disaster_type === item.name);
                        }
                        else {
                          return (arrayRoadSlopesTypeOfDisasterBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.disaster_type) < 0);
                        }
                      })
                      .length,
                  total:
                    response_01
                      .filter(function (feature) {
                        if (index < arrayRoadSlopesTypeOfDisasterBuffer.length - 1) {
                          return (feature.attributes.disaster_type === item.name);
                        }
                        else {
                          return (arrayRoadSlopesTypeOfDisasterBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.disaster_type) < 0);
                        }
                      })
                      .length,
                });
              });

          setArrayRoadSlopesTypeOfDisaster(arrayRoadSlopesTypeOfDisasterBuffer_);

          let arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_ =
            arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer
              .map(function (item, index) {
                return ({
                  ...arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer[index],
                  filtered:
                    working_array_01
                      .filter(function (feature) {
                        if (index < arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer.length - 1) {
                          return (feature.attributes.road_slope_structure_type === item.name);
                        }
                        else {
                          return (arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0);
                        }
                      })
                      .length,
                  total:
                    response_01
                      .filter(function (feature) {
                        if (index < arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer.length - 1) {
                          return (feature.attributes.road_slope_structure_type === item.name);
                        }
                        else {
                          return (arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0);
                        }
                      })
                      .length,
                });
              });

          setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure(arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_);

          let arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_ =
            arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer
              .map(function (item, index) {
                return ({
                  ...arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer[index],
                  filtered:
                    working_array_02
                      .filter(function (feature) {
                        if (index < arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer.length - 1) {
                          return (feature.attributes.road_slope_structure_type === item.name);
                        }
                        else {
                          return (arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0);
                        }
                      })
                      .length,
                  total:
                    response_02
                      .filter(function (feature) {
                        if (index < arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer.length - 1) {
                          return (feature.attributes.road_slope_structure_type === item.name);
                        }
                        else {
                          return (arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0);
                        }
                      })
                      .length,
                });
              });

          setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_);

          let arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_ =
            arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer
              .map(function (item, index) {
                return ({
                  ...arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer[index],
                  filtered:
                    working_array_02
                      .filter(function (feature) {
                        if (index < arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer.length - 1) {
                          return (feature.attributes.road_condition === item.name);
                        }
                        else {
                          return (arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_condition) < 0);
                        }
                      })
                      .length,
                  total:
                    response_02
                      .filter(function (feature) {
                        if (index < arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer.length - 1) {
                          return (feature.attributes.road_condition === item.name);
                        }
                        else {
                          return (arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_condition) < 0);
                        }
                      })
                      .length,
                });
              });

          setArrayRoadSlopeProtectionStructuresTypeOfDisaster(arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_);

          let arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_ =
            arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer
              .map(function (item, index) {
                return ({
                  ...arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer[index],
                  filtered:
                    working_array_02
                      .filter(function (feature) {
                        if (index < arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer.length - 1) {
                          return (feature.attributes.disaster_type === item.name);
                        }
                        else {
                          return (arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.disaster_type) < 0);
                        }
                      })
                      .length,
                  total:
                    response_02
                      .filter(function (feature) {
                        if (index < arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer.length - 1) {
                          return (feature.attributes.disaster_type === item.name);
                        }
                        else {
                          return (arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.disaster_type) < 0);
                        }
                      })
                      .length,
                });
              });

          setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_);
        }
        else {
          setFilteredRoadSlopeInventory(0);
          setTotalRoadSlopeInventory(0);

          setTotalExistingRoadSlopeProtectionStructures(0);
          setFilteredExistingRoadSlopeProtectionStructures(0);

          setTotalNonExistingRoadSlopeProtectionStructures(0);
          setFilteredNonExistingRoadSlopeProtectionStructures(0);

          setArrayRoadSlopesTypeOfDisaster(arrayRoadSlopesTypeOfDisasterBuffer);
          setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure(arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer);

          setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer);
          setArrayRoadSlopeProtectionStructuresTypeOfDisaster(arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer);
          setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer);
        }

        setDataLoader03(false);
      })
      .catch(function (error) {
        setFilteredRoadSlopeInventory(0);
        setTotalRoadSlopeInventory(0);

        setTotalExistingRoadSlopeProtectionStructures(0);
        setFilteredExistingRoadSlopeProtectionStructures(0);

        setTotalNonExistingRoadSlopeProtectionStructures(0);
        setFilteredNonExistingRoadSlopeProtectionStructures(0);

        setArrayRoadSlopesTypeOfDisaster(arrayRoadSlopesTypeOfDisasterBuffer);
        setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure(arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer);

        setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer);
        setArrayRoadSlopeProtectionStructuresTypeOfDisaster(arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer);
        setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer);

        setDataLoader03(false);

        // console.log(error);
      });
  }

  /* Sets the working arrays of object references for the filter component. */

  const [filterArray, setFilterArray] = React.useState([]);

  React.useEffect(function () {
    let region = sessionStorage.getItem("regionDefault") === "null" ? null : sessionStorage.getItem("regionDefault");
    let deo = sessionStorage.getItem("engineeringDistrictDefault") === "null" ? null : sessionStorage.getItem("engineeringDistrictDefault");

    setDataLoader04(true);

    layer_engineering_districts
      .queryFeatures({
        where:
          deo ?
            `DEO = '${ deo }'`
            :
          region ?
            `REGION = '${ region }'`
            :
            "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features?.length > 0) {
          for (const feature of response.features) {
            const buffer_array = filterArray;

            const string_array = /^(.*) ?\((.*)\)$/.exec(feature.attributes.CONG_DIST);
            const orders_string = /^(.*) DISTRICT$/.exec(string_array[2]);
            const orders_array = orders_string[1].split(/[\s,&]+/);

            for (const item of orders_array) {
              const feature_attribute_district = string_array[1] + "(" + item + " DISTRICT)";

              const match_array = buffer_array.filter(function (item) {
                return (item.REGION === feature.attributes.REGION && item.DEO === feature.attributes.DEO && item.CONG_DIST === feature_attribute_district);
              });

              if (match_array.length === 0 && item !== "to") {
                buffer_array
                  .push({
                    "REGION": feature.attributes.REGION,
                    "DEO": feature.attributes.DEO,
                    "CONG_DIST": feature_attribute_district
                  });
              }
            }

            setFilterArray(buffer_array);
          }
        }

        setDataLoader04(false);
      })
      .catch(function (error) {
        setDataLoader04(false);

        // console.log(error);
      });
  }, [filterArray]);

  /* Sets the initial values of the data source buffers and the summary variables. */

  React.useEffect(function () {
    setDataLoading(true);

    filter_data_01(0, null);
    filter_data_02(0, null);
    filter_data_03(0, null);
  }, []);

  React.useEffect(function () {
    if (dataLoading && !dataLoader01 && !dataLoader02 && !dataLoader03 && !dataLoader04) {
      setDataLoading(false);

      setDataTimestamp(new Date().toString());
    }
  }, [dataLoading, setDataLoading, setDataTimestamp, dataLoader01, dataLoader02, dataLoader03, dataLoader04]);

  /* Filter handlers. */

  function clear_filter (type) {
    let region = sessionStorage.getItem("regionDefault") === "null" ? null : sessionStorage.getItem("regionDefault");
    let deo = sessionStorage.getItem("engineeringDistrictDefault") === "null" ? null : sessionStorage.getItem("engineeringDistrictDefault");

    setDataLoading(true);

    close_popup();

    if (type === 1) {
      setFilterLevel01Selected(region);
      setFilterLevel02Selected(deo);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);
      
      focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
          setDataLoader01(false);
        });
      
      filter_data_01(0, null);
      filter_data_02(0, null);
      filter_data_03(0, null);
    }
    else if (type === 2) {
      setFilterLevel02Selected(deo);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      if (region || filterLevel01Selected) {
        focus_map(1, [layer_regions], ["REGION", "region_name"], region ?? filterLevel01Selected, filterLevel05Selected)
          .then(function (response) {
          })
          .catch(function (error) {
            setDataLoading(false);
            setDataLoader01(false);
          });

        filter_data_01(1, region ?? filterLevel01Selected);
        filter_data_02(1, region ?? filterLevel01Selected);
        filter_data_03(1, region ?? filterLevel01Selected);
      }
      else {
        focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, filterLevel05Selected)
          .then(function (response) {
          })
          .catch(function (error) {
            setDataLoading(false);
            setDataLoader01(false);
          });

        filter_data_01(0, null);
        filter_data_02(0, null);
        filter_data_03(0, null);
      }
    }
    else if (type === 3) {
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      if (deo || filterLevel02Selected) {
        focus_map(2, [layer_engineering_districts], ["DEO", "deo_name"], deo ?? filterLevel02Selected, filterLevel05Selected)
          .then(function (response) {
          })
          .catch(function (error) {
            setDataLoading(false);
            setDataLoader01(false);
          });
        
        filter_data_01(2, deo ?? filterLevel02Selected);
        filter_data_02(2, deo ?? filterLevel02Selected);
        filter_data_03(2, deo ?? filterLevel02Selected);
      }
      else if (region || filterLevel01Selected) {
        focus_map(1, [layer_regions], ["REGION", "region_name"], region ?? filterLevel01Selected, filterLevel05Selected)
          .then(function (response) {
          })
          .catch(function (error) {
            setDataLoading(false);
            setDataLoader01(false);
          });

        filter_data_01(1, region ?? filterLevel01Selected);
        filter_data_02(1, region ?? filterLevel01Selected);
        filter_data_03(1, region ?? filterLevel01Selected);
      }
      else {
        focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, filterLevel05Selected)
          .then(function (response) {
          })
          .catch(function (error) {
            setDataLoading(false);
            setDataLoader01(false);
          });

        filter_data_01(0, null);
        filter_data_02(0, null);
        filter_data_03(0, null);
      }
    }
  }
  
  function select_filter (type, string) {
    let region = sessionStorage.getItem("regionDefault") === "null" ? null : sessionStorage.getItem("regionDefault");
    let deo = sessionStorage.getItem("engineeringDistrictDefault") === "null" ? null : sessionStorage.getItem("engineeringDistrictDefault");

    setDataLoading(true);

    close_popup();

    if (type === 1) {
      setFilterLevel01Selected(region ?? string ?? filterLevel01Selected);
      setFilterLevel02Selected(deo ?? null);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      focus_map(1, [layer_regions], ["REGION", "region_name"], region ?? string ?? filterLevel01Selected, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
          setDataLoader01(false);
        });
      
      filter_data_01(type, string);
      filter_data_02(type, string);
      filter_data_03(type, string);
    }
    else if (type === 2) {
      let object_index =
        filterArray
          .map(function (object) {
            return (object.DEO);
          })
          .indexOf(string);

      setFilterLevel01Selected(region ?? filterArray[object_index].REGION ?? filterLevel01Selected);
      setFilterLevel02Selected(deo ?? string ?? filterLevel02Selected);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      focus_map(2, [layer_engineering_districts], ["DEO", "deo_name"], deo ?? string ?? filterLevel02Selected, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
          setDataLoader01(false);
        });
      
      filter_data_01(type, string);
      filter_data_02(type, string);
      filter_data_03(type, string);
    }
    else if (type === 3) {
      let object_index =
        filterArray
          .map(function (object) {
            return (object.CONG_DIST);
          })
          .indexOf(string);
      
      setFilterLevel01Selected(region ?? filterArray[object_index].REGION ?? filterLevel01Selected);
      setFilterLevel02Selected(deo ?? filterArray[object_index].DEO ?? filterLevel02Selected);
      setFilterLevel03Selected(string ?? filterLevel03Selected);
      setFilterLevel04Selected(null);

      focus_map(3, [layer_legislative_districts], ["CONG_DIST", "district_name"], string ?? filterLevel03Selected, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
          setDataLoader01(false);
        });
      
      filter_data_01(type, string);
      filter_data_02(type, string);
      filter_data_03(type, string);
    }
    else if (type === 4) {
      if (string.length > 0) {
        setFilterLevel01Selected(region);
        setFilterLevel02Selected(deo);
        setFilterLevel03Selected(null);
        setFilterLevel04Selected(string);
        
        focus_map(
            4,
            moduleSelected === 0 ?
              [layer_road_slope_hazards, layer_inventory_of_road_slopes, layer_inventory_of_road_slope_protection_structures]
              :
            moduleSelected === 1 ?
              [layer_road_slope_hazards]
              :
            moduleSelected === 2 ||
            moduleSelected === 3 ?
              [layer_inventory_of_road_slopes, layer_inventory_of_road_slope_protection_structures]
              :
              [layer_national_road_network, layer_national_expressways],
            ["REGION", "region_name", "DEO", "deo_name", "CONG_DIST", "district_name", "road_name", "road_id", "section_id"],
            string,
            filterLevel05Selected
          )
          .then(function (response) {
          })
          .catch(function (error) {
            setDataLoading(false);
            setDataLoader01(false);
          });
      }
      else {
        if (deo) {
          clear_filter(3);
        }
        else if (region) {
          clear_filter(2);
        }
        else {
          clear_filter(1);
        }
      }
    }
    else if (type === 5) {
      setFilterLevel04Selected(null);
      setFilterLevel05Selected(string);      

      view_layer(moduleSelected, string);

      if (deo) {
        setFilterLevel03Selected(null);
        setFilterLevel04Selected(null);

        if (deo || filterLevel02Selected) {
          focus_map(2, [layer_engineering_districts], ["DEO", "deo_name"], deo ?? filterLevel02Selected, string ?? filterLevel05Selected)
            .then(function (response) {
            })
            .catch(function (error) {
              setDataLoading(false);
              setDataLoader01(false);
            });
          
          filter_data_01(2, deo ?? filterLevel02Selected);
          filter_data_02(2, deo ?? filterLevel02Selected);
          filter_data_03(2, deo ?? filterLevel02Selected);
        }
        else if (region || filterLevel01Selected) {
          focus_map(1, [layer_regions], ["REGION", "region_name"], region ?? filterLevel01Selected, string ?? filterLevel05Selected)
            .then(function (response) {
            })
            .catch(function (error) {
              setDataLoading(false);
              setDataLoader01(false);
            });

          filter_data_01(1, region ?? filterLevel01Selected);
          filter_data_02(1, region ?? filterLevel01Selected);
          filter_data_03(1, region ?? filterLevel01Selected);
        }
        else {
          focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, string ?? filterLevel05Selected)
            .then(function (response) {
            })
            .catch(function (error) {
              setDataLoading(false);
              setDataLoader01(false);
            });

          filter_data_01(5, string);
          filter_data_02(5, string);
          filter_data_03(5, string);
        }
      }
      else if (region) {
        setFilterLevel02Selected(deo);
        setFilterLevel03Selected(null);
        setFilterLevel04Selected(null);

        if (region || filterLevel01Selected) {
          focus_map(1, [layer_regions], ["REGION", "region_name"], region ?? filterLevel01Selected, string ?? filterLevel05Selected)
            .then(function (response) {
            })
            .catch(function (error) {
              setDataLoading(false);
              setDataLoader01(false);
            });

          filter_data_01(1, region ?? filterLevel01Selected);
          filter_data_02(1, region ?? filterLevel01Selected);
          filter_data_03(1, region ?? filterLevel01Selected);
        }
        else {
          focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, string ?? filterLevel05Selected)
            .then(function (response) {
            })
            .catch(function (error) {
              setDataLoading(false);
              setDataLoader01(false);
            });

          filter_data_01(5, string);
          filter_data_02(5, string);
          filter_data_03(5, string);
        }
      }
      else {
        setFilterLevel01Selected(region);
        setFilterLevel02Selected(deo);
        setFilterLevel03Selected(null);
        setFilterLevel04Selected(null);
        
        focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, string ?? filterLevel05Selected)
          .then(function (response) {
          })
          .catch(function (error) {
            setDataLoading(false);
            setDataLoader01(false);
          });
        
        filter_data_01(5, string);
        filter_data_02(5, string);
        filter_data_03(5, string);
      }
    }
  }

  /* Module selection handler. */

  const [yearArray, setYearArray] = React.useState([new Date().getFullYear()]);

  React.useEffect(function () {
    if (moduleSelected === 0 && dataSourceBuffer02?.length > 0 && dataSourceBuffer03?.length > 0) {
      setYearArray(
        [
          ...new Set(
            [...dataSourceBuffer02, ...dataSourceBuffer03]
              .filter(function (item) {
                return (!isNaN(item.attributes.survey_date));
              })
              .map(function (item) {
                return (new Date(item.attributes.survey_date).getFullYear());
              })
            )
        ]
      );
    }
    else if (moduleSelected === 1 && dataSourceBuffer02?.length > 0) {
      setYearArray(
        [
          ...new Set(
            dataSourceBuffer02
              .filter(function (item) {
                return (!isNaN(item.attributes.survey_date));
              })
              .map(function (item) {
                return (new Date(item.attributes.survey_date).getFullYear());
              })
            )
        ]
      );
    }
    else if ((moduleSelected === 2 || moduleSelected === 3) && dataSourceBuffer03?.length > 0) {
      setYearArray(
        [
          ...new Set(
            dataSourceBuffer03
              .filter(function (item) {
                return (!isNaN(item.attributes.survey_date));
              })
              .map(function (item) {
                return (new Date(item.attributes.survey_date).getFullYear());
              })
            )
        ]
      );
    }
    else {
      setYearArray([new Date().getFullYear()]);
    }
  }, [moduleSelected, dataSourceBuffer02, dataSourceBuffer03]);

  React.useEffect(function () {
    let region = sessionStorage.getItem("regionDefault") === "null" ? null : sessionStorage.getItem("regionDefault");
    let deo = sessionStorage.getItem("engineeringDistrictDefault") === "null" ? null : sessionStorage.getItem("engineeringDistrictDefault");

    setDataLoading(true);

    close_popup();

    setFilterLevel01Selected(region ?? null);
    setFilterLevel02Selected(deo ?? null);
    setFilterLevel03Selected(null);
    setFilterLevel04Selected(null);
    setFilterLevel05Selected(new Date().getFullYear());

    if (deo) {
      clear_filter(3);
    }
    else if (region) {
      clear_filter(2);
    }
    else {
      clear_filter(1);
    }
  }, [moduleSelected]);

  /* Dropdown handlers. */

  const [dropdownActive, setDropdownActive] = React.useState(false);
  const [dropdown01Active, setDropdown01Active] = React.useState(false);
  const [dropdown02Active, setDropdown02Active] = React.useState(false);
  const [dropdown03Active, setDropdown03Active] = React.useState(false);
  const [dropdown04Active, setDropdown04Active] = React.useState(false);
  const [dropdown05Active, setDropdown05Active] = React.useState(false);

  function click_dropdown (index) {
    setDropdown01Active(false);
    setDropdown02Active(false);
    setDropdown03Active(false);
    setDropdown04Active(false);
    setDropdown05Active(false);

    if (index === 0 || dropdownActive === index) {
      setDropdownActive(0);
    }
    else {
      if (index === 1) {
        setDropdown01Active(true);
      }
      else if (index === 2) {
        setDropdown02Active(true);
      }
      else if (index === 3) {
        setDropdown03Active(true);
      }
      else if (index === 4) {
        setDropdown04Active(true);
      }
      else if (index === 5) {
        setDropdown05Active(true);
      }

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
        setDropdown04Active(false);
        setDropdown05Active(false);
  
        setDropdownActive(0);
      }
    }
  });

  /* Parsing functions. */

  function parseRomanToInteger (string) {
    let values = new Map([["I", 1], ["V", 5], ["X", 10]]);
    let result = 0, current, previous = 0;

    for (const character of string.split("").reverse()) {
      current = values.get(character);

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
      case "FIRST": 
        return ("01");
      case "SECOND":
        return ("02");
      case "THIRD":
        return ("03");
      case "FOURTH":
        return ("04");
      case "FIFTH":
        return ("05");
      case "SIXTH":
        return ("06");
      case "SEVENTH":
        return ("07");
      case "EIGHTH":
        return ("08");
      case "NINTH":
        return ("09");
      case "TENTH":
        return ("10");
      case "ELEVENTH":
        return ("11");
      case "TWELFTH":
        return ("12");
      case "THIRTEENTH":
        return ("13");
      case "FOURTEENTH":
        return ("14");
      case "FIFTEENTH":
        return ("15");
      default:
        return (string);
    }
  }

  return (
    <div id = "filter-component">
      <div>
        <div onClick = { function () { click_dropdown(0); } }>
          <input type = "text" placeholder = "Search" value = { filterLevel04Selected ? filterLevel04Selected : "" } onChange = { function (event) { setFilterLevel04Selected(event.target.value); } } onKeyDown = { function (event) { if (event.key === "Enter") { select_filter(4, filterLevel04Selected); } } }/>
          <div onClick = { function () { select_filter(4, filterLevel04Selected); } }>
            <span className = "material-symbols-outlined">{ "search" }</span>
          </div>
        </div>
        <div className = { dropdown05Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(5); } }>
          <div>
            <div>{ filterLevel05Selected || "Year" }</div>
            <div>
              <span className = "material-symbols-outlined">{ dropdown04Active ? "arrow_drop_up" : "arrow_drop_down" }</span>
            </div>
          </div>
          <div>
            {
              yearArray?.length > 0 ?
                yearArray
                  .map(function (item, index) {
                    if (item !== null) {
                      return (
                        <div key = { index } className = { filterLevel05Selected && filterLevel05Selected === item ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(5, item); } }>{ item }</div>
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
      <div id = "filter-container">
        <div className = { sessionStorage.getItem("regionDefault") === "null" || sessionStorage.getItem("regionDefault") === null ? dropdown01Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" : "filter-menu-dropdown-disabled" } onClick = { function () { if (sessionStorage.getItem("regionDefault") === "null" || sessionStorage.getItem("regionDefault") === null) { click_dropdown(1); } } }>
          <div>
            <div>{ (sessionStorage.getItem("regionDefault") === "null" ? null : sessionStorage.getItem("regionDefault")) || filterLevel01Selected || "Region" }</div>
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
                        <div key = { index } className = { filterLevel01Selected && filterLevel01Selected === item ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(1, item); } }>{ item }</div>
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
        <div className = { sessionStorage.getItem("engineeringDistrictDefault") === "null" || sessionStorage.getItem("engineeringDistrictDefault") === null ? dropdown02Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" : "filter-menu-dropdown-disabled" } onClick = { function () { if (sessionStorage.getItem("engineeringDistrictDefault") === "null" || sessionStorage.getItem("engineeringDistrictDefault") === null) { click_dropdown(2); } } }>
          <div>
            <div>{ (sessionStorage.getItem("engineeringDistrictDefault") === "null" ? null : sessionStorage.getItem("engineeringDistrictDefault")) || filterLevel02Selected || "District Engineering Office" }</div>
            <div>
              <span className = "material-symbols-outlined">{ dropdown02Active ? "arrow_drop_up" : "arrow_drop_down" }</span>
            </div>
          </div>
          <div>
            <div onClick = { function () { clear_filter(2); } }>{ "Clear Selection" }</div>
            {
              filterArray && filterArray.length > 0 ?
                [...new Set(filterArray.map(function (item) { if (filterLevel01Selected && filterLevel01Selected !== item.REGION) { return (null); } else { return (item.DEO); } }))]
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
                        <div key = { index } className = { filterLevel02Selected && filterLevel02Selected === item ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(2, item); } }>{ item }</div>
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
            <div>{ filterLevel03Selected || "Legislative District" }</div>
            <div>
              <span className = "material-symbols-outlined">{ dropdown03Active ? "arrow_drop_up" : "arrow_drop_down" }</span>
            </div>
          </div>
          <div>
            <div onClick = { function () { clear_filter(3); } }>{ "Clear Selection" }</div>
            {
              filterArray && filterArray.length > 0 ?
                [...new Set(filterArray.map(function (item) { if (filterLevel01Selected && filterLevel01Selected !== item.REGION) { return (null); } else if (filterLevel02Selected && filterLevel02Selected !== item.DEO) { return (null); } else { return (item.CONG_DIST); } }))]
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
                        <div key = { index } className = { filterLevel03Selected && filterLevel03Selected === item ? "filter-menu-item-selected" : null } onClick = { function () { select_filter(3, item); } }>{ item }</div>
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
