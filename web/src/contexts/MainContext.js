import React from "react";

export const MainContext = React.createContext();

function MainContextProvider (props) {
  const [modules, setModules] = React.useState([
    {
      name: "SUMMARY",
      path: "summary",
      map_visible: true
    },
    {
      name: "Inventory of Road Slope Structures",
      path: "inventory-of-road-slope-structures",
      map_visible: true
    },
    {
      name: "Inventory of Road Slopes",
      path: "inventory-of-road-slopes",
      map_visible: true
    },
    {
      name: "Potential Road Slope Projects",
      path: "potential-road-slope-projects",
      map_visible: true
    },
    {
      name: "Funded Road Slope Projects",
      path: "funded-road-slope-projects",
      map_visible: true
    },
    {
      name: "Proposal For Funding",
      path: "proposal-for-funding",
      map_visible: true
    },
    {
      name: "Hazard Map",
      path: "hazard-map",
      map_visible: true
    },
    {
      name: "Reports",
      path: "reports",
      map_visible: true
    }
  ]);
  
  const [moduleSelected, setModuleSelected] = React.useState(0);

  const [regions, setRegions] = React.useState(null);
  const [regionSelected, setRegionSelected] = React.useState("");

  const [legislativeDistricts, setLegislativeDistricts] = React.useState(null);
  const [legislativeDistrictSelected, setLegislativeDistrictSelected] = React.useState("");

  const [engineeringDistricts, setEngineeringDistricts] = React.useState(null);
  const [engineeringDistrictSelected, setEngineeringDistrictSelected] = React.useState("");

  function clear_selected () {
    setRegionSelected("");
    setLegislativeDistrictSelected("");
    setEngineeringDistrictSelected("");
  }

  const [inventoryOfRoadSlopeStructuresData, setInventoryOfRoadSlopeStructuresData] = React.useState(null);
  const [inventoryOfRoadSlopesData, setInventoryOfRoadSlopesData] = React.useState(null);
  const [potentialRoadSlopeProjectsData, setPotentialRoadSlopeProjectsData] = React.useState(null);
  const [fundedRoadSlopeProjectsData, setFundedRoadSlopeProjectsData] = React.useState(null);
  const [proposalForFundingData, setProposalForFundingData] = React.useState(null);
  const [hazardMapData, setHazardMapData] = React.useState(null);
  const [reportsData, setReportsData] = React.useState(null);

  return (
    <MainContext.Provider value = {
      {
        modules, setModules,
        moduleSelected, setModuleSelected,

        regions, setRegions,
        regionSelected, setRegionSelected,

        legislativeDistricts, setLegislativeDistricts,
        legislativeDistrictSelected, setLegislativeDistrictSelected,

        engineeringDistricts, setEngineeringDistricts,
        engineeringDistrictSelected, setEngineeringDistrictSelected, 

        clear_selected,

        inventoryOfRoadSlopeStructuresData, setInventoryOfRoadSlopeStructuresData,
        inventoryOfRoadSlopesData, setInventoryOfRoadSlopesData,
        potentialRoadSlopeProjectsData, setPotentialRoadSlopeProjectsData,
        fundedRoadSlopeProjectsData, setFundedRoadSlopeProjectsData,
        proposalForFundingData, setProposalForFundingData,
        hazardMapData, setHazardMapData,
        reportsData, setReportsData
      }
    }>
      { props.children }
    </MainContext.Provider>
  )
}

export default MainContextProvider;