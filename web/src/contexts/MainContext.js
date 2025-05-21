import * as React from "react";

export const MainContext = React.createContext();

function MainContextProvider (props) {
  const [dataSource, setDataSource] = React.useState(null);
  const [dataArray, setDataArray] = React.useState(null);
  const [dataLoading, setDataLoading] = React.useState(false);

  const [menuComponentOpen, setMenuComponentOpen] = React.useState(false);

  const [modules, setModules] = React.useState([
    {
      name: "Summary",
      logo: "analytics",
      map_visible: true
    },
    {
      name: "Road Slope Hazards",
      logo: "warning",
      map_visible: true
    },
    {
      name: "Road Slope Inventory",
      logo: "list",
      map_visible: true
    },
    {
      name: "Potential Road Slope Protection Projects",
      logo: "search_check",
      map_visible: true
    },
    {
      name: "Funded Road Slope Protection Projects",
      logo: "local_atm",
      map_visible: true
    },
    {
      name: "Proposal For Funding",
      logo: "approval_delegation",
      map_visible: true
    },
    {
      name: "Reports",
      logo: "content_paste_search",
      map_visible: true
    }
  ]);
  
  const [moduleSelected, setModuleSelected] = React.useState(0);

  const [arrayRoadSlopeHazards, setArrayRoadSlopeHazards] = React.useState(null);

  const [arrayRoadSlopesTypeOfDisaster, setArrayRoadSlopesTypeOfDisaster] = React.useState(null);
  const [arrayRoadSlopesTypeOfRoadSlopeProtectionStructure, setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure] = React.useState(null);

  const [arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure, setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure] = React.useState(null);
  const [arrayRoadSlopeProtectionStructuresTypeOfDisaster, setArrayRoadSlopeProtectionStructuresTypeOfDisaster] = React.useState(null);
  const [arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure, setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure] = React.useState(null);

  const [filterLevel00Selected, setFilterLevel00Selected] = React.useState(null);
  const [filterLevel01Selected, setFilterLevel01Selected] = React.useState(null); // Filter by region.
  const [filterLevel02Selected, setFilterLevel02Selected] = React.useState(null); // Filter by district engineering office.
  const [filterLevel03Selected, setFilterLevel03Selected] = React.useState(null); // Filter by congressional district.
  const [filterLevel04Selected, setFilterLevel04Selected] = React.useState(null); // Filter by searching keywords.
  const [filterLevel05Selected, setFilterLevel05Selected] = React.useState(null); // Filter by year.

  const [totalRoadInventory, setTotalRoadInventory] = React.useState(null);
  const [filteredRoadInventory, setFilteredRoadInventory] = React.useState(null);

  const [totalRoadSlopeInventory, setTotalRoadSlopeInventory] = React.useState(null);
  const [filteredRoadSlopeInventory, setFilteredRoadSlopeInventory] = React.useState(null);

  const [totalExistingRoadSlopeProtectionStructures, setTotalExistingRoadSlopeProtectionStructures] = React.useState(null);
  const [filteredExistingRoadSlopeProtectionStructures, setFilteredExistingRoadSlopeProtectionStructures] = React.useState(null);

  const [totalNonExistingRoadSlopeProtectionStructures, setTotalNonExistingRoadSlopeProtectionStructures] = React.useState(null);
  const [filteredNonExistingRoadSlopeProtectionStructures, setFilteredNonExistingRoadSlopeProtectionStructures] = React.useState(null);
  
  return (
    <MainContext.Provider value = {
      {
        dataSource, setDataSource,
        dataArray, setDataArray,
        dataLoading, setDataLoading,

        menuComponentOpen, setMenuComponentOpen,

        modules, setModules,
        moduleSelected, setModuleSelected,

        arrayRoadSlopeHazards, setArrayRoadSlopeHazards,
        
        arrayRoadSlopesTypeOfDisaster, setArrayRoadSlopesTypeOfDisaster,
        arrayRoadSlopesTypeOfRoadSlopeProtectionStructure, setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure,
        
        arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure, setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure,
        arrayRoadSlopeProtectionStructuresTypeOfDisaster, setArrayRoadSlopeProtectionStructuresTypeOfDisaster,
        arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure, setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure,

        filterLevel00Selected, setFilterLevel00Selected,
        filterLevel01Selected, setFilterLevel01Selected,
        filterLevel02Selected, setFilterLevel02Selected,
        filterLevel03Selected, setFilterLevel03Selected, 
        filterLevel04Selected, setFilterLevel04Selected,
        filterLevel05Selected, setFilterLevel05Selected,

        totalRoadInventory, setTotalRoadInventory,
        filteredRoadInventory, setFilteredRoadInventory,
        
        totalRoadSlopeInventory, setTotalRoadSlopeInventory,
        filteredRoadSlopeInventory, setFilteredRoadSlopeInventory,

        totalExistingRoadSlopeProtectionStructures, setTotalExistingRoadSlopeProtectionStructures,
        filteredExistingRoadSlopeProtectionStructures, setFilteredExistingRoadSlopeProtectionStructures,

        totalNonExistingRoadSlopeProtectionStructures, setTotalNonExistingRoadSlopeProtectionStructures,
        filteredNonExistingRoadSlopeProtectionStructures, setFilteredNonExistingRoadSlopeProtectionStructures
      }
    }>
      { props.children }
    </MainContext.Provider>
  )
}

export default MainContextProvider;