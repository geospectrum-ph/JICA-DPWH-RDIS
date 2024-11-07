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

  const [roadSelected, setRoadSelected] = React.useState(null);

  const [dataArray, setDataArray] = React.useState(null);

  const [filterL01Selected, setFilterL01Selected] = React.useState(null);
  const [filterL02Selected, setFilterL02Selected] = React.useState(null);
  const [filterL03Selected, setFilterL03Selected] = React.useState(null);
  const [filterL04Selected, setFilterL04Selected] = React.useState(null);

  return (
    <MainContext.Provider value = {
      {
        modules, setModules,
        moduleSelected, setModuleSelected,

        roadSelected, setRoadSelected,

        dataArray, setDataArray,

        filterL01Selected, setFilterL01Selected,
        filterL02Selected, setFilterL02Selected,
        filterL03Selected, setFilterL03Selected, 
        filterL04Selected, setFilterL04Selected
      }
    }>
      { props.children }
    </MainContext.Provider>
  )
}

export default MainContextProvider;