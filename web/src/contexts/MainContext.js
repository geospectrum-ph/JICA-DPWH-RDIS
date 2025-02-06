import * as React from "react";

export const MainContext = React.createContext();

function MainContextProvider (props) {
  const [dataSource, setDataSource] = React.useState(null);
  const [dataArray, setDataArray] = React.useState(null);
  const [dataLoading, setDataLoading] = React.useState(false);

  const [modules, setModules] = React.useState([
    {
      name: "Summary",
      logo: "analytics",
      map_visible: true
    },
    {
      name: "Hazard Map",
      logo: "warning",
      map_visible: true
    },
    {
      name: "Road Slope Inventory",
      logo: "list",
      map_visible: true
    },
    {
      name: "Potential Road Slope Projects",
      logo: "search_check",
      map_visible: true
    },
    {
      name: "Funded Road Slope Projects",
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

  const [filterL00Selected, setFilterL00Selected] = React.useState(null);
  const [filterL01Selected, setFilterL01Selected] = React.useState(null);
  const [filterL02Selected, setFilterL02Selected] = React.useState(null);
  const [filterL03Selected, setFilterL03Selected] = React.useState(null);
  const [filterL04Selected, setFilterL04Selected] = React.useState(null);

  const [filteredRoadInventory, setFilteredRoadInventory] = React.useState(null);
  const [totalRoadInventory, setTotalRoadInventory] = React.useState(null);

  const [filteredRoadSlopeInventory, setFilteredRoadSlopeInventory] = React.useState(null);
  const [totalRoadSlopeInventory, setTotalRoadSlopeInventory] = React.useState(null);

  const [totalERoadSlopeStructures, setTotalERoadSlopeStructures] = React.useState(null);
  const [filteredERoadSlopeStructures, setFilteredERoadSlopeStructures] = React.useState(null);

  const [filteredNERoadSlopeStructures, setFilteredNERoadSlopeStructures] = React.useState(null);
  const [totalNERoadSlopeStructures, setTotalNERoadSlopeStructures] = React.useState(null);

  const [arrayHM01, setArrayHM01] = React.useState(null);

  const [arrayRSS01, setArrayRSS01] = React.useState(null);
  const [arrayRSS02, setArrayRSS02] = React.useState(null);
  const [arrayRSS03, setArrayRSS03] = React.useState(null);

  const [arrayRS01, setArrayRS01] = React.useState(null);
  const [arrayRS02, setArrayRS02] = React.useState(null);

  return (
    <MainContext.Provider value = {
      {
        dataSource, setDataSource,
        dataArray, setDataArray,
        dataLoading, setDataLoading,

        modules, setModules,
        moduleSelected, setModuleSelected,

        filterL00Selected, setFilterL00Selected,
        filterL01Selected, setFilterL01Selected,
        filterL02Selected, setFilterL02Selected,
        filterL03Selected, setFilterL03Selected, 
        filterL04Selected, setFilterL04Selected,

        filteredRoadInventory, setFilteredRoadInventory,
        totalRoadInventory, setTotalRoadInventory,
        
        filteredRoadSlopeInventory, setFilteredRoadSlopeInventory,
        totalRoadSlopeInventory, setTotalRoadSlopeInventory,

        filteredERoadSlopeStructures, setFilteredERoadSlopeStructures,
        totalERoadSlopeStructures, setTotalERoadSlopeStructures,
      
        filteredNERoadSlopeStructures, setFilteredNERoadSlopeStructures,
        totalNERoadSlopeStructures, setTotalNERoadSlopeStructures,
      
        arrayHM01, setArrayHM01,
      
        arrayRSS01, setArrayRSS01,
        arrayRSS02, setArrayRSS02,
        arrayRSS03, setArrayRSS03,
        
        arrayRS01, setArrayRS01,
        arrayRS02, setArrayRS02
      }
    }>
      { props.children }
    </MainContext.Provider>
  )
}

export default MainContextProvider;