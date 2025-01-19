import React from "react";

export const MainContext = React.createContext();

function MainContextProvider (props) {
  const [dataSource, setDataSource] = React.useState(null);
  const [dataArray, setDataArray] = React.useState(null);
  const [dataLoading, setDataLoading] = React.useState(false);

  const [modules, setModules] = React.useState([
    {
      name: "Summary",
      path: "summary",
      logo: "analytics",
      map_visible: true
    },
    {
      name: "Hazard Map",
      path: "hazard-map",
      logo: "warning",
      map_visible: true
    },
    {
      name: "Road Slope Inventory",
      path: "road-slope-inventory",
      logo: "list",
      map_visible: true
    },
    {
      name: "Potential Road Slope Projects",
      path: "potential-road-slope-projects",
      logo: "search_check",
      map_visible: true
    },
    {
      name: "Funded Road Slope Projects",
      path: "funded-road-slope-projects",
      logo: "local_atm",
      map_visible: true
    },
    {
      name: "Proposal For Funding",
      path: "proposal-for-funding",
      logo: "approval_delegation",
      map_visible: true
    },
    {
      name: "Reports",
      path: "reports",
      logo: "content_paste_search",
      map_visible: true
    }
  ]);
  
  const [moduleSelected, setModuleSelected] = React.useState(0);

  const [filterL01Selected, setFilterL01Selected] = React.useState(null);
  const [filterL02Selected, setFilterL02Selected] = React.useState(null);
  const [filterL03Selected, setFilterL03Selected] = React.useState(null);
  const [filterL04Selected, setFilterL04Selected] = React.useState(null);

  const [dataSelected, setDataSelected] = React.useState(null);

  return (
    <MainContext.Provider value = {
      {
        dataSource, setDataSource,
        dataArray, setDataArray,
        dataLoading, setDataLoading,

        modules, setModules,
        moduleSelected, setModuleSelected,

        filterL01Selected, setFilterL01Selected,
        filterL02Selected, setFilterL02Selected,
        filterL03Selected, setFilterL03Selected, 
        filterL04Selected, setFilterL04Selected,

        dataSelected, setDataSelected
      }
    }>
      { props.children }
    </MainContext.Provider>
  )
}

export default MainContextProvider;