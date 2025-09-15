import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";

import {
  layer_national_road_network,
  layer_national_expressways,
  layer_regions,
  layer_legislative_districts,
  layer_engineering_districts,
  layer_road_slope_hazards,
  layer_road_slopes_and_countermeasures,
  close_popup,
  focus_map,
} from "../map-component";

import "./index.css";

export default function FilterComponent () {
  const {
    dataSource, setDataSource,
    setDataArray,
    dataLoading, setDataLoading,
    setDataTimestamp,

    moduleSelected,

    arrayRoadSlopeHazards,
    setArrayRoadSlopeHazards,
    
    arrayRoadSlopesTypeOfDisaster,
    setArrayRoadSlopesTypeOfDisaster,
    arrayRoadSlopesTypeOfRoadSlopeProtectionStructure,
    setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure,
    
    arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure,
    setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure,
    arrayRoadSlopeProtectionStructuresTypeOfDisaster,
    setArrayRoadSlopeProtectionStructuresTypeOfDisaster,
    arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure,
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

  const [userAccess, setUserAccess] = React.useState({
    ro: null,
    deo: null,
  });
  
  /* Sets the initial values of the data source buffers and the summary variables. */

  const [dataSourceBuffer01, setDataSourceBuffer01] = React.useState(null); // layer_national_road_network + layer_national_expressways
  const [dataSourceBuffer02, setDataSourceBuffer02] = React.useState(null); // layer_road_slope_hazards
  const [dataSourceBuffer03, setDataSourceBuffer03] = React.useState(null); // layer_road_slopes_and_countermeasures
  
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

  const [dataLoader01, setDataLoader01] = React.useState(false);
  const [dataLoader02, setDataLoader02] = React.useState(false);
  const [dataLoader03, setDataLoader03] = React.useState(false);

  React.useEffect(function () {
    if (dataLoading && !dataLoader01 && !dataLoader02 && !dataLoader03) {
      setDataLoading(false);

      setDataTimestamp(new Date().toString());
    }
  }, [dataLoader01, dataLoader02, dataLoader03]);

  function initialize_summary () {
    setDataLoading(true);

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
            if (response_national_road_network?.features && response_national_expressways?.features) {
              setDataSourceBuffer01([...response_national_road_network.features, ...response_national_expressways.features]);

              setTotalRoadInventory(response_national_road_network.features.length + response_national_expressways.features.length);
              setFilteredRoadInventory(response_national_road_network.features.length + response_national_expressways.features.length);
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

    setDataLoader02(true);

    layer_road_slope_hazards
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {          
          setDataSourceBuffer02(response.features);

          setFilteredRoadSlopeHazardsInventory(response.features.filter(function (data) { return (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)); }).length);
          setTotalRoadSlopeHazardsInventory(response.features.filter(function (data) { return (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)); }).length);

          let arrayRoadSlopeHazardsBuffer_ = arrayRoadSlopeHazardsBuffer;

          for (const feature of response.features.filter(function (data) { return (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)); })) {
            if (arrayRoadSlopeHazardsBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.hazard_risk) < 0) {
              let index = arrayRoadSlopeHazardsBuffer_.length - 1;
              let value = arrayRoadSlopeHazardsBuffer_[index].total;

              arrayRoadSlopeHazardsBuffer_[index].total = value + 1;
              arrayRoadSlopeHazardsBuffer_[index].filtered = value + 1;
            }
            else {
              let index = arrayRoadSlopeHazardsBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.hazard_risk);
              let value = arrayRoadSlopeHazardsBuffer_[index].total;

              arrayRoadSlopeHazardsBuffer_[index].total = value + 1;
              arrayRoadSlopeHazardsBuffer_[index].filtered = value + 1;
            }
          }

          setArrayRoadSlopeHazards(arrayRoadSlopeHazardsBuffer_);
        }
        else {
          setFilteredRoadSlopeHazardsInventory(0);
          setTotalRoadSlopeHazardsInventory(0);
        }

        setDataLoader02(false);
      })
      .catch(function (error) {        
        setFilteredRoadSlopeHazardsInventory(0);
        setTotalRoadSlopeHazardsInventory(0);

        setDataLoader02(false);

        // console.log(error);
      });

    setDataLoader03(true);

    layer_road_slopes_and_countermeasures
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          setDataSourceBuffer03(response.features);

          setFilteredRoadSlopeInventory(response.features.filter(function (data) { return (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)); }).length);
          setTotalRoadSlopeInventory(response.features.filter(function (data) { return (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)); }).length);

          let roadSlopesCounter = 0;
          let roadSlopeProtectionStructuresCounter = 0;

          let arrayRoadSlopesTypeOfDisasterBuffer_ = arrayRoadSlopesTypeOfDisasterBuffer;
          let arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_ = arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer;

          let arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_ = arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer;
          let arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_ = arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer;
          let arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_ = arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer;

          for (const feature of response.features.filter(function (data) { return (Object(data.attributes).hasOwnProperty("survey_date") && new Date(data.attributes.survey_date).getFullYear() === (filterLevel05Selected)); })) {
            if (feature.attributes.rsm_category === "Inventory of Road Slope") {
              roadSlopesCounter++;

              if (arrayRoadSlopesTypeOfDisasterBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.disaster_type) < 0) {
                let index = arrayRoadSlopesTypeOfDisasterBuffer_.length - 1;
                let value = arrayRoadSlopesTypeOfDisasterBuffer_[index].total;

                arrayRoadSlopesTypeOfDisasterBuffer_[index].total = value + 1;
                arrayRoadSlopesTypeOfDisasterBuffer_[index].filtered = value + 1;
              }
              else {
                let index = arrayRoadSlopesTypeOfDisasterBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.disaster_type);
                let value = arrayRoadSlopesTypeOfDisasterBuffer_[index].total;

                arrayRoadSlopesTypeOfDisasterBuffer_[index].total = value + 1;
                arrayRoadSlopesTypeOfDisasterBuffer_[index].filtered = value + 1;
              }

              if (arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0) {
                let index = arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_.length - 1;
                let value = arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_[index].total;

                arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_[index].total = value + 1;
                arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_[index].filtered = value + 1;
              }
              else {
                let index = arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.road_slope_structure_type);
                let value = arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_[index].total;

                arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_[index].total = value + 1;
                arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_[index].filtered = value + 1;
              }
            }
            else if (feature.attributes.rsm_category === "Inventory of Road Slope Structures") {
              roadSlopeProtectionStructuresCounter++;
              
              if (arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.road_condition) < 0) {
                let index = arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_.length - 1;
                let value = arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_[index].total;

                arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_[index].total = value + 1;
                arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_[index].filtered = value + 1;
              }
              else {
                let index = arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.road_condition);
                let value = arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_[index].total;

                arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_[index].total = value + 1;
                arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_[index].filtered = value + 1;
              }

              if (arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.disaster_type) < 0) {
                let index = arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_.length - 1;
                let value = arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_[index].total;

                arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_[index].total = value + 1;
                arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_[index].filtered = value + 1;
              }
              else {
                let index = arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.disaster_type);
                let value = arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_[index].total;

                arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_[index].total = value + 1;
                arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_[index].filtered = value + 1;
              }

              if (arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0) {
                let index = arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_.length - 1;
                let value = arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_[index].total;

                arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_[index].total = value + 1;
                arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_[index].filtered = value + 1;
              }
              else {
                let index = arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_.map(function (item) { return (item.name); }).indexOf(feature.attributes.road_slope_structure_type);
                let value = arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_[index].total;

                arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_[index].total = value + 1;
                arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_[index].filtered = value + 1;
              }
            }
          }

          setTotalExistingRoadSlopeProtectionStructures(roadSlopeProtectionStructuresCounter);
          setFilteredExistingRoadSlopeProtectionStructures(roadSlopeProtectionStructuresCounter);

          setTotalNonExistingRoadSlopeProtectionStructures(roadSlopesCounter);
          setFilteredNonExistingRoadSlopeProtectionStructures(roadSlopesCounter);

          setArrayRoadSlopesTypeOfDisaster(arrayRoadSlopesTypeOfDisasterBuffer_);
          setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure(arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_);

          setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_);
          setArrayRoadSlopeProtectionStructuresTypeOfDisaster(arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_);
          setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_);
        }
        else {
          setFilteredRoadSlopeInventory(0);
          setTotalRoadSlopeInventory(0);

          setTotalExistingRoadSlopeProtectionStructures(0);
          setFilteredExistingRoadSlopeProtectionStructures(0);

          setTotalNonExistingRoadSlopeProtectionStructures(0);
          setFilteredNonExistingRoadSlopeProtectionStructures(0);
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

        setDataLoader03(false);

        // console.log(error);
      });
  }

  /* Sets the working arrays of object references for the filter component. */

  const [filterArray, setFilterArray] = React.useState([]);

  React.useEffect(function () {
    setDataLoading(true);

    setUserAccess({
      // ro_id: null,
      ro: "Cordillera Administrative Region",
      // ro_id: null,
      // deo_id: null,
      deo: null,
      // deo_id: "Cebu City District Engineering Office",
    });

    layer_engineering_districts
      .queryFeatures({
        where:
          userAccess.deo ? `deo_name = '${ userAccess.deo }' AND region_name = '${ userAccess.ro }'` :
          userAccess.ro ? `region = '${ userAccess.ro }'` :
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

        setDataLoading(false);
      })
      .catch(function (error) {
        setDataLoading(false);

        // console.log(error);
      });
    
    initialize_summary();
  }, []);

  /* Sets the values of the summary variables based on selected filters per module. */

  function filter_summary (type, string) {
    let filteredRoadInventoryBuffer =
      dataSourceBuffer01
        .filter(function (data) {
          if (type === 0 || type === 5) {
            return (data);
          }
          if (type === 1) {
            return (
              (Object(data.attributes).hasOwnProperty("REGION") && data.attributes.REGION === (string || filterLevel01Selected)) ||
              (Object(data.attributes).hasOwnProperty("region_name") && data.attributes.region_name === (string || filterLevel01Selected))
            );
          }
          else if (type === 2) {
            return (
              (Object(data.attributes).hasOwnProperty("DEO") && data.attributes.DEO === (string || filterLevel02Selected)) ||
              (Object(data.attributes).hasOwnProperty("deo_name") && data.attributes.deo_name === (string || filterLevel02Selected))
            );
          }
          else if (type === 3) {
            return (
              (Object(data.attributes).hasOwnProperty("CONG_DIST") && data.attributes.CONG_DIST === (string || filterLevel03Selected)) ||
              (Object(data.attributes).hasOwnProperty("district_name") && data.attributes.district_name === (string || filterLevel03Selected))
            );
          }
          else if (type === 4) {
            return (
              (Object(data.attributes).hasOwnProperty("ROAD_ID") && data.attributes.ROAD_ID.includes(string || filterLevel04Selected)) ||
              (Object(data.attributes).hasOwnProperty("ROAD_NAME") && data.attributes.ROAD_NAME.includes(string || filterLevel04Selected)) ||
              (Object(data.attributes).hasOwnProperty("SECTION_ID") && data.attributes.SECTION_ID.includes(string || filterLevel04Selected)) ||
              (Object(data.attributes).hasOwnProperty("road_id") && data.attributes.road_id.includes(string || filterLevel04Selected)) ||
              (Object(data.attributes).hasOwnProperty("road_name") && data.attributes.road_name.includes(string || filterLevel04Selected)) ||
              (Object(data.attributes).hasOwnProperty("section_id") && data.attributes.section_id.includes(string || filterLevel04Selected))
            );
          }
          else {
            return (false);
          }
        });

    setFilteredRoadInventory(filteredRoadInventoryBuffer.length);

    let filteredRoadSlopeHazardsInventoryBuffer =
      dataSourceBuffer02
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

    setFilteredRoadSlopeHazardsInventory(filteredRoadSlopeHazardsInventoryBuffer.length);

    if (type === 0 || type === 5) { 
      setTotalRoadSlopeHazardsInventory(filteredRoadSlopeHazardsInventoryBuffer.length);
    }

    let filteredRoadSlopeInventoryBuffer =
      dataSourceBuffer03
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

    setFilteredRoadSlopeInventory(filteredRoadSlopeInventoryBuffer.length);

    if (type === 0 || type === 5) { 
      setTotalRoadSlopeInventory(filteredRoadSlopeInventoryBuffer.length);
    }

    let filteredNonExistingRoadSlopeProtectionStructuresBuffer =
      filteredRoadSlopeInventoryBuffer
        .filter(function (data) {
          return (Object(data.attributes).hasOwnProperty("rsm_category") && data.attributes.rsm_category === "Inventory of Road Slope");
        });

    setFilteredNonExistingRoadSlopeProtectionStructures(filteredNonExistingRoadSlopeProtectionStructuresBuffer.length);

    if (type === 0 || type === 5) { 
      setTotalNonExistingRoadSlopeProtectionStructures(filteredNonExistingRoadSlopeProtectionStructuresBuffer.length);
    }

    let filteredExistingRoadSlopeProtectionStructuresBuffer =
      filteredRoadSlopeInventoryBuffer
        .filter(function (data) {
          return (Object(data.attributes).hasOwnProperty("rsm_category") && data.attributes.rsm_category === "Inventory of Road Slope Structures");
        });

    setFilteredExistingRoadSlopeProtectionStructures(filteredExistingRoadSlopeProtectionStructuresBuffer.length);

    if (type === 0 || type === 5) { 
      setTotalExistingRoadSlopeProtectionStructures(filteredExistingRoadSlopeProtectionStructuresBuffer.length);
    }

    let arrayRoadSlopeHazardsBuffer_ =
      arrayRoadSlopeHazardsBuffer
        .map(function (item, index) {
          return ({
            ...arrayRoadSlopeHazards[index],
            filtered:
              filteredRoadSlopeHazardsInventoryBuffer
                .filter(function (feature) {
                  if (index < arrayRoadSlopeHazards.length - 1) {
                    return (feature.attributes.hazard_risk === item.name);
                  }
                  else {
                    return (arrayRoadSlopeHazardsBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.hazard_risk) < 0);
                  }
                })
                .length,
            total:
              type === 0 || type === 5 ?
                filteredRoadSlopeHazardsInventoryBuffer
                  .filter(function (feature) {
                    if (index < arrayRoadSlopeHazards.length - 1) {
                      return (feature.attributes.hazard_risk === item.name);
                    }
                    else {
                      return (arrayRoadSlopeHazardsBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.hazard_risk) < 0);
                    }
                  })
                  .length
                :
                arrayRoadSlopeHazards[index].total
          });
        });

    setArrayRoadSlopeHazards(arrayRoadSlopeHazardsBuffer_);

    let arrayRoadSlopesTypeOfDisasterBuffer_ =
      arrayRoadSlopesTypeOfDisasterBuffer
        .map(function (item, index) {
          return ({
            ...arrayRoadSlopesTypeOfDisaster[index],
            filtered:
              filteredNonExistingRoadSlopeProtectionStructuresBuffer
                .filter(function (feature) {
                  if (index < arrayRoadSlopesTypeOfDisaster.length - 1) {
                    return (feature.attributes.disaster_type === item.name);
                  }
                  else {
                    return (arrayRoadSlopesTypeOfDisasterBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.disaster_type) < 0);
                  }
                })
                .length,
            total:
              type === 0 || type === 5 ?
                filteredNonExistingRoadSlopeProtectionStructuresBuffer
                  .filter(function (feature) {
                    if (index < arrayRoadSlopesTypeOfDisaster.length - 1) {
                      return (feature.attributes.disaster_type === item.name);
                    }
                    else {
                      return (arrayRoadSlopesTypeOfDisasterBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.disaster_type) < 0);
                    }
                  })
                  .length
                :
                arrayRoadSlopesTypeOfDisaster[index].total
          });
        });

    setArrayRoadSlopesTypeOfDisaster(arrayRoadSlopesTypeOfDisasterBuffer_);

    let arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_ =
      arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer
        .map(function (item, index) {
          return ({
            ...arrayRoadSlopesTypeOfRoadSlopeProtectionStructure[index],
            filtered:
              filteredNonExistingRoadSlopeProtectionStructuresBuffer
                .filter(function (feature) {
                  if (index < arrayRoadSlopesTypeOfRoadSlopeProtectionStructure.length - 1) {
                    return (feature.attributes.road_slope_structure_type === item.name);
                  }
                  else {
                    return (arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0);
                  }
                })
                .length,
            total:
              type === 0 || type === 5 ?
                filteredNonExistingRoadSlopeProtectionStructuresBuffer
                  .filter(function (feature) {
                    if (index < arrayRoadSlopesTypeOfRoadSlopeProtectionStructure.length - 1) {
                      return (feature.attributes.road_slope_structure_type === item.name);
                    }
                    else {
                      return (arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0);
                    }
                  })
                  .length
                :
                arrayRoadSlopesTypeOfRoadSlopeProtectionStructure[index].total
          });
        });

    setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure(arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_);

    let arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_ =
      arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer
        .map(function (item, index) {
          return ({
            ...arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure[index],
            filtered:
              filteredExistingRoadSlopeProtectionStructuresBuffer
                .filter(function (feature) {
                  if (index < arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure.length - 1) {
                    return (feature.attributes.road_slope_structure_type === item.name);
                  }
                  else {
                    return (arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0);
                  }
                })
                .length,
            total:
              type === 0 || type === 5 ?
                filteredExistingRoadSlopeProtectionStructuresBuffer
                  .filter(function (feature) {
                    if (index < arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure.length - 1) {
                      return (feature.attributes.road_slope_structure_type === item.name);
                    }
                    else {
                      return (arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_slope_structure_type) < 0);
                    }
                  })
                  .length
                :
                arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure[index].total
          });
        });

    setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_);

    let arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_ =
      arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer
        .map(function (item, index) {
          return ({
            ...arrayRoadSlopeProtectionStructuresTypeOfDisaster[index],
            filtered:
              filteredExistingRoadSlopeProtectionStructuresBuffer
                .filter(function (feature) {
                  if (index < arrayRoadSlopeProtectionStructuresTypeOfDisaster.length - 1) {
                    return (feature.attributes.road_condition === item.name);
                  }
                  else {
                    return (arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_condition) < 0);
                  }
                })
                .length,
            total:
              type === 0 || type === 5 ?
                filteredExistingRoadSlopeProtectionStructuresBuffer
                  .filter(function (feature) {
                    if (index < arrayRoadSlopeProtectionStructuresTypeOfDisaster.length - 1) {
                      return (feature.attributes.road_condition === item.name);
                    }
                    else {
                      return (arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.road_condition) < 0);
                    }
                  })
                  .length
                :
                arrayRoadSlopeProtectionStructuresTypeOfDisaster[index].total
          });
        });

    setArrayRoadSlopeProtectionStructuresTypeOfDisaster(arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_);

    let arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_ =
      arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer
        .map(function (item, index) {
          return ({
            ...arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure[index],
            filtered:
              filteredExistingRoadSlopeProtectionStructuresBuffer
                .filter(function (feature) {
                  if (index < arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure.length - 1) {
                    return (feature.attributes.disaster_type === item.name);
                  }
                  else {
                    return (arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.disaster_type) < 0);
                  }
                })
                .length,
            total:
              type === 0 || type === 5 ?
                filteredExistingRoadSlopeProtectionStructuresBuffer
                  .filter(function (feature) {
                    if (index < arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure.length - 1) {
                      return (feature.attributes.disaster_type === item.name);
                    }
                    else {
                      return (arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer.map(function (category) { return (category.name); }).indexOf(feature.attributes.disaster_type) < 0);
                    }
                  })
                  .length
                :
                arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure[index].total
          });
        });

    setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_);
  }

  /* Sets the working dataset for the output component. */

  function query_features (type, string) {
    if (dataSource) {
      const data_buffer =
        dataSource
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

      setDataArray(data_buffer);
    }

    if (dataSourceBuffer01 && dataSourceBuffer02 && dataSourceBuffer03) {
      filter_summary(type, string);
    }
    
    setDataLoading(false);
  }

  /* Filter handlers. */

  function clear_filter (type) {    
    setDataLoading(true);

    if (type === 1) {
      setFilterLevel01Selected(null);
      setFilterLevel02Selected(null);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
        });
    }
    else if (type === 2) {
      setFilterLevel02Selected(null);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      focus_map(1, [layer_regions], ["REGION", "region_name"], filterLevel01Selected, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
        });
    }
    else if (type === 3) {
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      focus_map(2, [layer_engineering_districts], ["DEO", "deo_name"], filterLevel02Selected, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
        });
    }

    query_features(type - 1, null);
  }
  
  function select_filter (type, string) {
    setDataLoading(true);

    close_popup();

    if (type === 1) {
      setFilterLevel01Selected(string);
      setFilterLevel02Selected(null);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      focus_map(1, [layer_regions], ["REGION", "region_name"], string, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
        });
    }
    else if (type === 2) {
      let object_index =
        filterArray
          .map(function (object) {
            return (object.DEO);
          })
          .indexOf(string);

      setFilterLevel01Selected(filterArray[object_index].REGION);
      setFilterLevel02Selected(string);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      focus_map(2, [layer_engineering_districts], ["DEO", "deo_name"], string, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
        });
    }
    else if (type === 3) {
      let object_index =
        filterArray
          .map(function (object) {
            return (object.CONG_DIST);
          })
          .indexOf(string);

      setFilterLevel01Selected(filterArray[object_index].REGION);
      setFilterLevel02Selected(filterArray[object_index].DEO);
      setFilterLevel03Selected(string);
      setFilterLevel04Selected(null);

      focus_map(3, [layer_legislative_districts], ["CONG_DIST", "district_name"], string, filterLevel05Selected)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
        });
    }
    else if (type === 4) {
      setFilterLevel01Selected(null);
      setFilterLevel02Selected(null);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(string);

      if (string.length > 0) {
        focus_map(4, [layer_regions, layer_engineering_districts, layer_legislative_districts, layer_national_road_network, layer_national_expressways], ["REGION", "region_name", "DEO", "deo_name", "CONG_DIST", "district_name", "ROAD_ID", "ROAD_NAME", "SECTION_ID"], string, filterLevel05Selected)
          .then(function (response) {
          })
          .catch(function (error) {
            setDataLoading(false);
          });
      }
      else {
        focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, filterLevel05Selected)
          .then(function (response) {
          })
          .catch(function (error) {
            setDataLoading(false);
          });
      }
    }
    else if (type === 5) {
      setFilterLevel01Selected(null);
      setFilterLevel02Selected(null);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);
      setFilterLevel05Selected(string);

      focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, string)
        .then(function (response) {
        })
        .catch(function (error) {
          setDataLoading(false);
        });
    }

    query_features(type, string);
  }

  /* Module selection handler. */

  function setSource (layer) {
    layer
      .queryFeatures({
        where: "1 = 1", /* Change to appropriate filter when necessary. */
        returnGeometry: true,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features?.length > 0) {
          setDataSource(response.features);
          setDataArray(response.features);
        }
        else {
          setDataSource(null);
          setDataArray(null);
        }
      })
      .then(function () {
        setDataTimestamp(new Date().toString());
      })
      .catch(function (error) {
        setDataLoading(false);
        
        setDataTimestamp(null);

        // console.log(error);
      });
  }

  const [yearArray, setYearArray] = React.useState(null);

  function setYears (module) {
    if (module === 0) {
      layer_road_slope_hazards
        .queryFeatures({
          where: "1 = 1",
          returnGeometry: false,
          outFields: ["survey_date"]
        })
        .then(function (response_road_slope_hazards) {
          layer_road_slopes_and_countermeasures
            .queryFeatures({
              where: "1 = 1",
              returnGeometry: false,
              outFields: ["survey_date"]
            })
            .then(function (response_road_slopes_and_countermeasures) {
              if (response_road_slope_hazards?.features?.length > 0 || response_road_slopes_and_countermeasures?.features?.length > 0) {
                setYearArray(
                  [
                    ...new Set(
                      [...response_road_slope_hazards.features, ...response_road_slopes_and_countermeasures.features]
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
            })
            .catch(function (error) {
              setDataLoading(false);

              // console.log(error);
            });
        })
        .catch(function (error) {
          setDataLoading(false);

          // console.log(error);
        });
    }
    else if (module === 1) {
      layer_road_slope_hazards
        .queryFeatures({
          where: "1 = 1",
          returnGeometry: false,
          outFields: ["survey_date"]
        })
        .then(function (response) {
          if (response?.features?.length > 0) {
            setYearArray(
              [
                ...new Set(
                  response.features
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
        })
        .catch(function (error) {
          setDataLoading(false);

          // console.log(error);
        });
    }
    else if (module === 2 || module === 3) {
      layer_road_slopes_and_countermeasures
        .queryFeatures({
          where: "1 = 1",
          returnGeometry: false,
          outFields: ["survey_date"]
        })
        .then(function (response) {
          if (response?.features?.length > 0) {
            setYearArray(
              [
                ...new Set(
                  response.features
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
        })
        .catch(function (error) {
          setDataLoading(false);

          // console.log(error);
        });
    }
    else {
      setYearArray([new Date().getFullYear()]);
    }
  }

  React.useEffect(function () {
    setDataLoading(true);

    close_popup();

    setYears(moduleSelected);

    /* When a user access level is defined, keep the selected filter level values... */
    setFilterLevel01Selected(null);
    setFilterLevel02Selected(null);
    setFilterLevel03Selected(null);
    setFilterLevel04Selected(null);
    setFilterLevel05Selected(new Date().getFullYear());

    /* ...and do not refocus the map. */
    focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, filterLevel05Selected)
      .then(function (response) {
      })
      .catch(function (error) {
        setDataLoading(false);
      });

    /* Change data source. */

    if (moduleSelected === 1) {
      setSource(layer_road_slope_hazards);
    }
    else if (moduleSelected === 2 || moduleSelected === 3) {
      setSource(layer_road_slopes_and_countermeasures);
    }
    else {
      setDataSource(null);
      setDataArray(null);
    }

    query_features(0, null);
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
      if (index === 1) { setDropdown01Active(true); }
      else if (index === 2) { setDropdown02Active(true); }
      else if (index === 3) { setDropdown03Active(true); }
      else if (index === 4) { setDropdown04Active(true); }
      else if (index === 5) { setDropdown05Active(true); }

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
      case "FIRoadSlopesT": 
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
        <div className = { dropdown01Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { if (!userAccess.ro && !userAccess.deo) { click_dropdown(1); } } }>
          <div>
            <div>{ userAccess.ro || filterLevel01Selected || "Region" }</div>
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
        <div className = { dropdown02Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { if (!userAccess.deo) { click_dropdown(2); } } }>
          <div>
            <div>{ userAccess.deo || filterLevel02Selected || "District Engineering Office" }</div>
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
