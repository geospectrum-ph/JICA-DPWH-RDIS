import React from "react";

export const MainContext = React.createContext();

function MainContextProvider (props) {
  const [modules, setModules] = React.useState([
    {
      name: "DASHBOARD",
      path: "dashboard",
      map_visible: true
    },
    {
      name: "Road Inventory",
      path: "road-inventory",
      map_visible: true
    },
    {
      name: "Road Slopes and Countermeasures",
      path: "road-slope-and-countermeasures",
      map_visible: true
    },
    {
      name: "Hazards and Road Closures",
      path: "hazards-and-road-closures",
      map_visible: true
    },
    {
      name: "Projects",
      path: "projects",
      map_visible: true
    },
    {
      name: "Status Reports",
      path: "status-reports",
      map_visible: false
    },
    {
      name: "User Management",
      path: "user-management",
      map_visible: false
    }
  ]);
  
  const [moduleSelected, setModuleSelected] = React.useState(0);

  const [regions, setRegions] = React.useState(null);
  const [regionSelected, setRegionSelected] = React.useState("");

  const [congressionalDistricts, setCongressionalDistricts] = React.useState(null);
  const [congressionalDistrictSelected, setCongressionalDistrictSelected] = React.useState("");

  const [engineeringDistricts, setEngineeringDistricts] = React.useState(null);
  const [engineeringDistrictSelected, setEngineeringDistrictSelected] = React.useState("");

  const [roads, setRoads] = React.useState(null);
  const [roadSelected, setRoadSelected] = React.useState("");

  function clear_selected () {
    setRegionSelected("");
    setCongressionalDistrictSelected("");
    setEngineeringDistrictSelected("");

    setRoadSelected("");
  }

  return (
    <MainContext.Provider value = {
      {
        modules, setModules,
        moduleSelected, setModuleSelected,

        regions, setRegions,
        regionSelected, setRegionSelected,

        congressionalDistricts, setCongressionalDistricts,
        congressionalDistrictSelected, setCongressionalDistrictSelected,

        engineeringDistricts, setEngineeringDistricts,
        engineeringDistrictSelected, setEngineeringDistrictSelected, 

        roads, setRoads,
        roadSelected, setRoadSelected,
        
        clear_selected
      }
    }>
      { props.children }
    </MainContext.Provider>
  )
}

export default MainContextProvider;