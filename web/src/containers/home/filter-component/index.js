import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";

import { layer_national_road_network, layer_national_expressways, layer_road_slope_hazards, layer_road_slopes_and_countermeasures, layer_engineering_districts, close_popup, focus_map } from "../map-component";

import "./index.css";

export default function FilterComponent () {
  const {
    dataSource, setDataSource,
    setDataArray,
    dataLoading, setDataLoading,

    moduleSelected,

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

    setTotalRoadInventoryA,
    setFilteredRoadInventoryA,

    setTotalRoadInventoryB,
    setFilteredRoadInventoryB,

    setTotalRoadSlopeInventory,
    setFilteredRoadSlopeInventory,

    setTotalRoadSlopeHazardsInventory,
    setFilteredRoadSlopeHazardsInventory,

    setTotalExistingRoadSlopeProtectionStructures,
    setFilteredExistingRoadSlopeProtectionStructures,
  
    setTotalNonExistingRoadSlopeProtectionStructures,
    setFilteredNonExistingRoadSlopeProtectionStructures
  } = React.useContext(MainContext);
  
  const [filterArray, setFilterArray] = React.useState([]);

  /* Sets the values of summary variables. */

  const [dataSourceBuffer01, setDataSourceBuffer01] = React.useState(null);
  const [dataSourceBuffer02, setDataSourceBuffer02] = React.useState(null);
  const [dataSourceBuffer03, setDataSourceBuffer03] = React.useState(null);
  
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
  const [dataLoader04, setDataLoader04] = React.useState(false);

  function initialize_summary () {
    setDataLoading(true);

    setDataLoader01(true);

    layer_national_road_network
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          setDataSourceBuffer01(response.features);

          setTotalRoadInventoryA(response.features.length);
          setFilteredRoadInventoryA(response.features.length);
        }
        else {
          setTotalRoadInventoryA(0);
          setFilteredRoadInventoryA(0);
        }
      })
      .then(function () {
        setDataLoader01(false);
      })
      .catch(function (error) {
        setDataLoader01(false);

        setTotalRoadInventoryA(0);
        setFilteredRoadInventoryA(0);

        console.log(error);
      });

    setDataLoader02(true);

    layer_national_expressways
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          setDataSourceBuffer01(response.features);

          setTotalRoadInventoryB(response.features.length);
          setFilteredRoadInventoryB(response.features.length);
        }
        else {
          setTotalRoadInventoryB(0);
          setFilteredRoadInventoryB(0);
        }
      })
      .then(function () {
        setDataLoader02(false);
      })
      .catch(function (error) {
        setDataLoader02(false);

        setTotalRoadInventoryB(0);
        setFilteredRoadInventoryB(0);

        console.log(error);
      });

    setDataLoader03(true);

    layer_road_slope_hazards
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          setDataSourceBuffer03(response.features);

          setFilteredRoadSlopeHazardsInventory(response.features.length);
          setTotalRoadSlopeHazardsInventory(response.features.length);

          let arrayRoadSlopeHazardsBuffer_ = arrayRoadSlopeHazardsBuffer;

          for (const feature of response.features) {
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
      })
      .then(function () {
        setDataLoader04(false);
      })
      .catch(function (error) {
        setDataLoader04(false);
        
        setFilteredRoadSlopeHazardsInventory(0);
        setTotalRoadSlopeHazardsInventory(0);

        console.log(error);
      });

    layer_road_slopes_and_countermeasures
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          setDataSourceBuffer02(response.features);

          setFilteredRoadSlopeInventory(response.features.length);
          setTotalRoadSlopeInventory(response.features.length);

          let roadSlopesCounter = 0;
          let roadSlopeProtectionStructuresCounter = 0;

          let arrayRoadSlopesTypeOfDisasterBuffer_ = arrayRoadSlopesTypeOfDisasterBuffer;
          let arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_ = arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer;

          let arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_ = arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer;
          let arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_ = arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer;
          let arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_ = arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer;

          for (const feature of response.features) {
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
      })
      .then(function () {
        setDataLoader03(false);
      })
      .catch(function (error) {
        setDataLoader03(false);

        setFilteredRoadSlopeInventory(0);
        setTotalRoadSlopeInventory(0);

        setTotalExistingRoadSlopeProtectionStructures(0);
        setFilteredExistingRoadSlopeProtectionStructures(0);

        setTotalNonExistingRoadSlopeProtectionStructures(0);
        setFilteredNonExistingRoadSlopeProtectionStructures(0);

        console.log(error);
      });

    setDataLoader04(true);
  }

  React.useEffect(function () {
    initialize_summary();
  }, []);

  React.useEffect(function () {
    if (dataLoading && !dataLoader01 && !dataLoader02 && !dataLoader03 && !dataLoader04) {
      setDataLoading(false);
    }
  }, [dataLoader01, dataLoader02, dataLoader03, dataLoader04]);

  function filter_summary (level, object) {
    setFilteredRoadInventoryA(
      dataSourceBuffer01
        .filter(function (feature) {
          if (level === 1) {
            return (feature.attributes.REGION === object.REGION);
          }
          else if (level === 2) {
            return (feature.attributes.REGION === object.REGION && feature.attributes.DEO === object.DEO);
          }
          else if (level === 3) {
            return (feature.attributes.REGION === object.REGION && feature.attributes.DEO === object.DEO && feature.attributes.CONG_DIST === object.CONG_DIST);
          }
          else if (level === 4 ) {
            return (feature.attributes.ROAD_ID.toLowerCase().includes(object.QUERY?.toLowerCase()) || feature.attributes.ROAD_NAME.toLowerCase().includes(object.QUERY?.toLowerCase()) || feature.attributes.SECTION_ID.toLowerCase().includes(object.QUERY?.toLowerCase()));
          }
        })
        .length
    );

    setFilteredRoadInventoryB(0);

    let counterRoadSlopeHazardsInventory = 0;

    let arrayRoadSlopeHazardsBuffer_ = arrayRoadSlopeHazardsBuffer;

    for (const feature of 
      dataSourceBuffer03
        .filter(function (feature) {
          if (level === 1) {
            return (feature.attributes.region_name === object.REGION);
          }
          else if (level === 2) {
            return (feature.attributes.region_name === object.REGION && feature.attributes.deo_name === object.DEO);
          }
          else if (level === 3) {
            return (feature.attributes.region_name === object.REGION && feature.attributes.deo_name === object.DEO && feature.attributes.district_name === object.CONG_DIST);
          }
          else if (level === 4 ) {
            return (feature.attributes.road_id.toLowerCase().includes(object.QUERY?.toLowerCase()) || feature.attributes.road_name.toLowerCase().includes(object.QUERY?.toLowerCase()) || feature.attributes.section_id.toLowerCase().includes(object.QUERY?.toLowerCase()));
          }
        })
    ) {
      counterRoadSlopeHazardsInventory++;

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

    setFilteredRoadSlopeHazardsInventory(counterRoadSlopeHazardsInventory);

    setArrayRoadSlopeHazards(arrayRoadSlopeHazardsBuffer_);

    let counterRoadSlopeInventory = 0;

    let counterNonExistingRoadSlopeProtectionStructures = 0;
    let counterExistingRoadSlopeProtectionStructures = 0;

    let arrayRoadSlopesTypeOfDisasterBuffer_ = arrayRoadSlopesTypeOfDisasterBuffer;
    let arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_ = arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer;

    let arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_ = arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer;
    let arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_ = arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer;
    let arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_ = arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer;
    
    for (const feature of 
      dataSourceBuffer02
        .filter(function (feature) {
          if (level === 1) {
            return (feature.attributes.region_name === object.REGION);
          }
          else if (level === 2) {
            return (feature.attributes.region_name === object.REGION && feature.attributes.deo_name === object.DEO);
          }
          else if (level === 3) {
            return (feature.attributes.region_name === object.REGION && feature.attributes.deo_name === object.DEO && feature.attributes.district_name === object.CONG_DIST);
          }
          else if (level === 4 ) {
            return (feature.attributes.road_id.toLowerCase().includes(object.QUERY?.toLowerCase()) || feature.attributes.road_name.toLowerCase().includes(object.QUERY?.toLowerCase()) || feature.attributes.section_id.toLowerCase().includes(object.QUERY?.toLowerCase()));
          }
        })
    ) {
      counterRoadSlopeInventory++;

      if (feature.attributes.rsm_category === "Inventory of Road Slope") {
        counterNonExistingRoadSlopeProtectionStructures++;

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
        counterExistingRoadSlopeProtectionStructures++;

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

    setFilteredRoadSlopeInventory(counterRoadSlopeInventory);

    setFilteredNonExistingRoadSlopeProtectionStructures(counterNonExistingRoadSlopeProtectionStructures);
    setFilteredExistingRoadSlopeProtectionStructures(counterExistingRoadSlopeProtectionStructures);

    setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructureBuffer_);
    setArrayRoadSlopeProtectionStructuresTypeOfDisaster(arrayRoadSlopeProtectionStructuresTypeOfDisasterBuffer_);
    setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure(arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructureBuffer_);
    setArrayRoadSlopesTypeOfDisaster(arrayRoadSlopesTypeOfDisasterBuffer_);
    setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure(arrayRoadSlopesTypeOfRoadSlopeProtectionStructureBuffer_);
  }

  /* Sets the working arrays of object references for the filter component. */

  React.useEffect(function () {
    setDataLoading(true);

    layer_engineering_districts
      .queryFeatures({
        where: "1 = 1",
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
                buffer_array.push({
                  "REGION": feature.attributes.REGION,
                  "DEO": feature.attributes.DEO,
                  "CONG_DIST": feature_attribute_district
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

  function query_features (level, object) {
    if (dataSource) {
      const data_buffer = dataSource.filter(function (data) {
        if (level === 0) {
          return (data);
        }
        else if (level === 1) {
          return (data.attributes.region_name === (object?.REGION || filterLevel01Selected));
        }
        else if (level === 2) {
          return (data.attributes.region_name === (object?.REGION || filterLevel01Selected) && data.attributes.deo_name === (object?.DEO || filterLevel02Selected));
        }
        else if (level === 3) {
          return (data.attributes.region_name === (object?.REGION || filterLevel01Selected) && data.attributes.deo_name === (object?.DEO || filterLevel02Selected) && data.attributes.district_name === (object?.CONG_DIST || filterLevel03Selected));
        }
        else if (level === 4) {
          return (data.attributes.road_id.toLowerCase().includes(object?.QUERY?.toLowerCase()) || data.attributes.road_name.toLowerCase().includes(object?.QUERY?.toLowerCase()) || data.attributes.section_id.toLowerCase().includes(object?.QUERY?.toLowerCase()));
        }
        else {
          return (null);
        }
      });

      setDataArray(data_buffer);
    }
  }

  function clear_filter (type) {    
    if (!dataSourceBuffer01 && !dataSourceBuffer02 && !dataSourceBuffer03) {
      initialize_summary();
    }
    
    if (type === 1) {
      setFilterLevel01Selected(null);
      setFilterLevel02Selected(null);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      query_features(0, null);
    }
    if (type === 2) {
      setFilterLevel02Selected(null);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      if (filterLevel01Selected) {  
        query_features(1, null);
      }
      else {  
        query_features(0, null);
      }
    }
    if (type === 3) {
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      if (filterLevel02Selected) {  
        query_features(2, null);
      }
      else if (filterLevel01Selected) {  
        query_features(1, null);
      }
      else {  
        query_features(0, null);
      }
    }
    if (type === 4) {
      setFilterLevel01Selected(null);
      setFilterLevel02Selected(null);
      setFilterLevel03Selected(null);
    }
  }
  
  function select_filter (type, string) {
    close_popup();

    focus_map(type, string);

    if (type === 1) {
      const object = {
        "REGION": string
      }

      setFilterLevel01Selected(string);
      setFilterLevel02Selected(null);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      if (moduleSelected === 0 && dataSourceBuffer01 && dataSourceBuffer02 && dataSourceBuffer03) { filter_summary(1, object); }

      query_features(1, object);
    }
    if (type === 2) {
      const object = {
        "REGION": filterLevel01Selected ? filterLevel01Selected : filterArray[filterArray.map(function (object) { return (object.DEO); }).indexOf(string)].REGION,
        "DEO": string
      }

      if (!filterLevel01Selected) { setFilterLevel01Selected(filterArray[filterArray.map(function (object) { return (object.DEO); }).indexOf(string)].REGION); }
      setFilterLevel02Selected(string);
      setFilterLevel03Selected(null);
      setFilterLevel04Selected(null);

      if (moduleSelected === 0 && dataSourceBuffer01 && dataSourceBuffer02 && dataSourceBuffer03) { filter_summary(2, object); }

      query_features(2, object);
    }
    if (type === 3) {
      const object = {
        "REGION": filterLevel01Selected ? filterLevel01Selected : filterArray[filterArray.map(function (object) { return (object.CONG_DIST); }).indexOf(string)].REGION,
        "DEO": filterLevel02Selected ? filterLevel02Selected : filterArray[filterArray.map(function (object) { return (object.CONG_DIST); }).indexOf(string)].DEO,
        "CONG_DIST": string
      }

      if (!filterLevel01Selected) { setFilterLevel01Selected(filterArray[filterArray.map(function (object) { return (object.CONG_DIST); }).indexOf(string)].REGION); }
      if (!filterLevel02Selected) { setFilterLevel02Selected(filterArray[filterArray.map(function (object) { return (object.CONG_DIST); }).indexOf(string)].DEO); }
      setFilterLevel03Selected(string);
      setFilterLevel04Selected(null);

      if (moduleSelected === 0 && dataSourceBuffer01 && dataSourceBuffer02 && dataSourceBuffer03) { filter_summary(3, object); }

      query_features(3, object);
    }
    if (type === 4) {
      const object = {
        "QUERY": string
      }

      clear_filter(4);

      if (moduleSelected === 0 && dataSourceBuffer01 && dataSourceBuffer02 && dataSourceBuffer03) { filter_summary(4, object); }

      query_features(4, object);
    }
  }

  React.useEffect(function () {
    setFilterLevel01Selected(null);
    setFilterLevel02Selected(null);
    setFilterLevel03Selected(null);
    setFilterLevel04Selected(null);

    focus_map(5, null);

    switch (moduleSelected) {
      case 1:
        setDataLoading(true);
        layer_road_slope_hazards
          .queryFeatures({
            where: "1 = 1",
            returnGeometry: true,
            outFields: ["*"]
          })
          .then(function (response) {
            if (response?.features?.length > 0) {
              var extent = response.features[0].geometry.extent;

              response.features.forEach(function(feature) {
                extent = extent.union(feature.geometry.extent);
              });

              setDataSource(response.features);
              setDataArray(response.features);
            }
            else {
              setDataArray(null);
            }
          })
          .then(function () {
            setDataLoading(false);
          })
          .catch(function (error) {
            setDataLoading(false);

            console.log(error);
          });
        break;
      case 2:
      case 3:
        setDataLoading(true);
        layer_road_slopes_and_countermeasures
          .queryFeatures({
            where: "1 = 1",
            returnGeometry: true,
            outFields: ["*"]
          })
          .then(function (response) {
            if (response?.features?.length > 0) {
              var extent = response.features[0].geometry.extent;

              response.features.forEach(function(feature) {
                extent = extent.union(feature.geometry.extent);
              });

              setDataSource(response.features);
              setDataArray(response.features);
            }
            else {
              setDataArray(null);
            }
          })
          .then(function () {
            setDataLoading(false);
          })
          .catch(function (error) {
            setDataLoading(false);
            
            console.log(error);
          });
        break;
      case 0:
      default:
        setDataSource(null);
        setDataArray(null);
        break;
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
      <div>
        <div onClick = { function () { click_dropdown(0); } }>
          <input type = "text" placeholder = "Search" value = { filterLevel04Selected ? filterLevel04Selected : "" } onChange = { function (event) { setFilterLevel04Selected(event.target.value); } } onKeyDown = { function (event) { if (event.key === "Enter") { select_filter(4, filterLevel04Selected); } } }/>
          <div onClick = { function () { select_filter(4, filterLevel04Selected); } }>
            <span className = "material-symbols-outlined">{ "search" }</span>
          </div>
        </div>
        <div className = { "filter-menu-dropdown-inactive" }>
        {/* <div className = { dropdown03Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(3); } }> */}
          <div>
            <div>{ filterLevel05Selected || "Year" }</div>
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
      <div id = "filter-container">
        <div className = { dropdown01Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(1); } }>
          <div>
            <div>{ filterLevel01Selected || "Region" }</div>
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
        <div className = { dropdown02Active ? "filter-menu-dropdown-active" : "filter-menu-dropdown-inactive" } onClick = { function () { click_dropdown(2); } }>
          <div>
            <div>{ filterLevel02Selected || "District Engineering Office" }</div>
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