import React from "react";
import Dashboard from "../containers/modules/dashboard";

// The imported assets here are only sample data. If files are missing, please refer to https://drive.google.com/file/d/1PetSQpOw8KdjuQ5CGdhUvwoBGnV2ILgY/view?usp=sharing. The password is `RDISpass`.

// import assets_sample_annex from "../assets/files/sample_annex.json";
// import assets_sample_hazard_map_surveys from "../assets/files/sample_hazard_map_surveys.json";
// import assets_sample_road_closures from "../assets/files/sample_road_closures.json";
// import assets_sample_road_projects from "../assets/files/sample_road_projects.json";
// import assets_terrain from "../assets/data/terrains.json";

export const MainContext = React.createContext();

function MainContextProvider (props) {
  const [moduleSelected, setModuleSelected] = React.useState("dashboard");

  const [regionSelected, setRegionSelected] = React.useState("");
  const [engineeringDistrictSelected, setEngineeringDistrictSelected] = React.useState("");
  const [congressionalDistrictSelected, setCongressionalDistrictSelected] = React.useState("");

  // const [moduleSummarySelect, setModuleSummarySelect] = React.useState("dashboard");
  // const [slopePageSelect, setSlopePageSelect] = React.useState("projects");
  // const [origDataSections, setOrigDataSections] = React.useState(assets_road_sections);
  // const [roadSegments, setRoadSegments] = React.useState(assets_sample_road_closures);
  // const [origDataEmergency, setOrigDataEmergency] = React.useState(assets_sample_road_closures);
  // const [terrainList, setTerrainList] = React.useState([]);
  // const [selectedSegments, setSelectedSegments] = React.useState();
  // const [roadProjects, setRoadProjects] = React.useState(assets_sample_road_projects);
  // const [annex2, setAnnex2] = React.useState(assets_sample_annex);
  // const [hazardSegments, setHazardSegments] = React.useState(assets_sample_hazard_map_surveys);
  // const [hazardList, setHazardList] = React.useState([]);
  // const [closureList, setClosureList] = React.useState([]);
  // const [selectedSection, setSelectedSection] = React.useState();
  // const [selectedHazard, setSelectedHazard] = React.useState();
  // const [selectedClosure, setSelectedClosure] = React.useState();
  // const [selectedPotential, setSelectedPotential] = React.useState();
  // const [origDataHazard, setOrigDataHazard] = React.useState(assets_sample_hazard_map_surveys);
  // const [origDataProjects, setOrigDataProjects] = React.useState(assets_sample_road_projects);
  // const [selectedInventory, setSelectedInventory] = React.useState();
  // const [terrain, setTerrain] = React.useState(assets_terrain);

  function clear_selected () {
    setRegionSelected("");
    setCongressionalDistrictSelected("");
    setEngineeringDistrictSelected("");
    
    // setSelectedSection();
    // setSelectedSegments();
    // setSelectedHazard();
    // setSelectedClosure();
    // setSelectedInventory();
    // setSelectedPotential();
  }

  const text_content = {
    dashboard: {
      title: `ABOUT THE SYSTEM`,
      description: `The Road Disaster Information System (RDIS) developed for the Department of Public Works and Highways (DPWH) through the partnership of the Japan International Cooperation Agency (JICA) and Geospectrum Analytics Services, Inc. The RDIS aims to improve the operational capability of the department in managing road and road disaster information by enhancing and extending the methods utilized in road and road disaster data collection, sharing, and analysis.`
    }
  };

  return (
    <MainContext.Provider value = {
      {
        moduleSelected, setModuleSelected,
        regionSelected, setRegionSelected,
        congressionalDistrictSelected, setCongressionalDistrictSelected,
        engineeringDistrictSelected, setEngineeringDistrictSelected, 
        
        clear_selected,

        text_content

        // moduleSummarySelect, setModuleSummarySelect,
        // slopePageSelect, setSlopePageSelect,
        // roadSection, setRoadSection,
        // roadSegments, setRoadSegments,
        // origDataEmergency, setOrigDataEmergency,
        // terrainList, setTerrainList,
        // selectedSegments, setSelectedSegments,
        // roadProjects, setRoadProjects,
        // annex2, setAnnex2,
        // hazardSegments, setHazardSegments,
        // hazardList, setHazardList,
        // closureList, setClosureList,
        // selectedSection, setSelectedSection,
        // selectedHazard, setSelectedHazard,
        // selectedClosure, setSelectedClosure,
        // selectedPotential, setSelectedPotential,
        // origDataSections, setOrigDataSections,
        // origDataHazard, setOrigDataHazard,
        // origDataProjects, setOrigDataProjects,
        // selectedInventory, setSelectedInventory,
      }
    }>
      { props.children }
    </MainContext.Provider>
  )
}

export default MainContextProvider;