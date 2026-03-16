import * as React from "react";

export const MainContext = React.createContext();

function MainContextProvider (props) {
  // For module switch handling.

  const [token, setToken] = React.useState(null);
  
  const [menuComponentOpen, setMenuComponentOpen] = React.useState(true);

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
    },
    
    {
      name: "Settings",
      logo: "settings",
      map_visible: false
    }
  ]);
  
  const [moduleSelected, setModuleSelected] = React.useState(0);

  // For data rendering.

  const [dataSourceBuffer01, setDataSourceBuffer01] = React.useState(null); // layer_national_road_network + layer_national_expressways
  const [dataSourceBuffer02, setDataSourceBuffer02] = React.useState(null); // layer_road_slope_hazards
  const [dataSourceBuffer03, setDataSourceBuffer03] = React.useState(null); // layer_road_slopes_and_countermeasures
  
  const [dataSource01, setDataSource01] = React.useState(null); // layer_national_road_network + layer_national_expressways
  const [dataSource02, setDataSource02] = React.useState(null); // layer_road_slope_hazards
  const [dataSource03, setDataSource03] = React.useState(null); // layer_road_slopes_and_countermeasures

  const [dataLoading, setDataLoading] = React.useState(false);

  const [dataTimestamp, setDataTimestamp] = React.useState(null);

  // For storing data on the browser.

  const [arrayRoadSlopeHazards, setArrayRoadSlopeHazards] = React.useState(null);

  const [arrayRoadSlopesTypeOfDisaster, setArrayRoadSlopesTypeOfDisaster] = React.useState(null);
  const [arrayRoadSlopesTypeOfRoadSlopeProtectionStructure, setArrayRoadSlopesTypeOfRoadSlopeProtectionStructure] = React.useState(null);

  const [arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure, setArrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure] = React.useState(null);
  const [arrayRoadSlopeProtectionStructuresTypeOfDisaster, setArrayRoadSlopeProtectionStructuresTypeOfDisaster] = React.useState(null);
  const [arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure, setArrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure] = React.useState(null);

  // For data filtering.

  const [filterLevel00Selected, setFilterLevel00Selected] = React.useState(null);
  const [filterLevel01Selected, setFilterLevel01Selected] = React.useState(null); // Filter by region.
  const [filterLevel02Selected, setFilterLevel02Selected] = React.useState(null); // Filter by district engineering office.
  const [filterLevel03Selected, setFilterLevel03Selected] = React.useState(null); // Filter by congressional district.
  const [filterLevel04Selected, setFilterLevel04Selected] = React.useState(null); // Filter by searching keywords.
  const [filterLevel05Selected, setFilterLevel05Selected] = React.useState(new Date().getFullYear()); // Filter by year.

  // For summary data.

  const [totalRoadInventory, setTotalRoadInventory] = React.useState(0);
  const [filteredRoadInventory, setFilteredRoadInventory] = React.useState(0);

  const [totalRoadSlopeHazardsInventory, setTotalRoadSlopeHazardsInventory] = React.useState(0);
  const [filteredRoadSlopeHazardsInventory, setFilteredRoadSlopeHazardsInventory] = React.useState(0);

  const [totalRoadSlopeInventory, setTotalRoadSlopeInventory] = React.useState(0);
  const [filteredRoadSlopeInventory, setFilteredRoadSlopeInventory] = React.useState(0);

  const [totalExistingRoadSlopeProtectionStructures, setTotalExistingRoadSlopeProtectionStructures] = React.useState(0);
  const [filteredExistingRoadSlopeProtectionStructures, setFilteredExistingRoadSlopeProtectionStructures] = React.useState(0);

  const [totalNonExistingRoadSlopeProtectionStructures, setTotalNonExistingRoadSlopeProtectionStructures] = React.useState(0);
  const [filteredNonExistingRoadSlopeProtectionStructures, setFilteredNonExistingRoadSlopeProtectionStructures] = React.useState(0);

  return (
    <MainContext.Provider value = {
      {
        token, setToken,

        menuComponentOpen, setMenuComponentOpen,

        modules, setModules,

        moduleSelected, setModuleSelected,

        dataSourceBuffer01, setDataSourceBuffer01,
        dataSourceBuffer02, setDataSourceBuffer02,
        dataSourceBuffer03, setDataSourceBuffer03,

        dataSource01, setDataSource01,
        dataSource02, setDataSource02,
        dataSource03, setDataSource03,

        dataLoading, setDataLoading,
        
        dataTimestamp, setDataTimestamp,

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

        totalRoadSlopeHazardsInventory, setTotalRoadSlopeHazardsInventory,
        filteredRoadSlopeHazardsInventory, setFilteredRoadSlopeHazardsInventory,
        
        totalRoadSlopeInventory, setTotalRoadSlopeInventory,
        filteredRoadSlopeInventory, setFilteredRoadSlopeInventory,

        totalExistingRoadSlopeProtectionStructures, setTotalExistingRoadSlopeProtectionStructures,
        filteredExistingRoadSlopeProtectionStructures, setFilteredExistingRoadSlopeProtectionStructures,

        totalNonExistingRoadSlopeProtectionStructures, setTotalNonExistingRoadSlopeProtectionStructures,
        filteredNonExistingRoadSlopeProtectionStructures, setFilteredNonExistingRoadSlopeProtectionStructures,
      }
    }>
      { props.children }
    </MainContext.Provider>
  )
}

export default MainContextProvider;
