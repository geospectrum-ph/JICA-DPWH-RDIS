import React from "react";

// The imported assets here are only sample data.
// import assets_terrain from "../assets/data/terrains.json";
// import assets_regions from "../assets/data/regions.json";
// import assets_congressional_districts from "../assets/data/congressional_districts.json";
// import assets_engineering_districts from "../assets/data/engineering_districts.json";
import assets_road_sections from "../assets/data/road_sections.json";
// import assets_kilometer_posts from "../assets/data/kilometer_posts.json";
import assets_sample_annex from "../assets/files/sample_annex.json";
import assets_sample_hazard_map_surveys from "../assets/files/sample_hazard_map_surveys.json";
import assets_sample_road_closures from "../assets/files/sample_road_closures.json";
import assets_sample_road_projects from "../assets/files/sample_road_projects.json";

export const MainContext = React.createContext();

function MainContextProvider (props) {
  // const [terrain, setTerrain] = React.useState(assets_terrain);
  // const [regions, setRegions] = React.useState(assets_regions);
  // const [congressionalDistricts, setCongressionalDistricts] = React.useState(assets_congressional_districts);
  // const [engineeringDistricts, setEngineeringDistricts] = React.useState(assets_engineering_districts);
  // const [roadSections, setRoadSections] = React.useState(assets_road_sections);
  // const [kilometerPosts, setKilometerPosts] = React.useState(assets_kilometer_posts);

  const [regionSelect, setRegionSelect] = React.useState("");

  const [moduleTitle, setModuleTitle] = React.useState("Dashboard");

  const [moduleSelect, setModuleSelect] = React.useState("dashboard");

  const [moduleSummarySelect, setModuleSummarySelect] = React.useState("dashboard");

  const [slopePageSelect, setSlopePageSelect] = React.useState("projects");

  const [roadSection, setRoadSection] = React.useState(assets_road_sections);

  const [origDataSections, setOrigDataSections] = React.useState(assets_road_sections);

  const [roadSegments, setRoadSegments] = React.useState(assets_sample_road_closures);

  const [origDataEmergency, setOrigDataEmergency] = React.useState(assets_sample_road_closures);


  const [terrainList, setTerrainList] = React.useState([]);
  
  const [selectedSegments, setSelectedSegments] = React.useState();

  const [roadProjects, setRoadProjects] = React.useState(assets_sample_road_projects);

  const [annex2, setAnnex2] = React.useState(assets_sample_annex);

  const [hazardSegments, setHazardSegments] = React.useState(assets_sample_hazard_map_surveys);

  const [hazardList, setHazardList] = React.useState([]);

  const [closureList, setClosureList] = React.useState([]);

  const [selectedSection, setSelectedSection] = React.useState();

  const [selectedHazard, setSelectedHazard] = React.useState();

  const [selectedClosure, setSelectedClosure] = React.useState();

  const [selectedPotential, setSelectedPotential] = React.useState();

  const [origDataHazard, setOrigDataHazard] = React.useState(assets_sample_hazard_map_surveys);

  const [origDataProjects, setOrigDataProjects] = React.useState(assets_sample_road_projects);

  const [selectedInventory, setSelectedInventory] = React.useState();

  function clear_selected () {
    setRegionSelect("");
    setSelectedSection();
    setSelectedSegments();
    setSelectedHazard();
    setSelectedClosure();
    setSelectedInventory();
    setSelectedPotential();
  }

  return (
    <MainContext.Provider value = {
      {
        // terrain, regions, congressionalDistricts, engineeringDistricts, roadSections, kilometerPosts,
        regionSelect, setRegionSelect,
        moduleTitle, setModuleTitle,
        moduleSelect, setModuleSelect,
        moduleSummarySelect, setModuleSummarySelect,
        slopePageSelect, setSlopePageSelect,
        roadSection, setRoadSection,
        roadSegments, setRoadSegments,
        origDataEmergency, setOrigDataEmergency,
        terrainList, setTerrainList,
        selectedSegments, setSelectedSegments,
        roadProjects, setRoadProjects,
        annex2, setAnnex2,
        hazardSegments, setHazardSegments,
        hazardList, setHazardList,
        closureList, setClosureList,
        selectedSection, setSelectedSection,
        selectedHazard, setSelectedHazard,
        selectedClosure, setSelectedClosure,
        selectedPotential, setSelectedPotential,
        origDataSections, setOrigDataSections,
        origDataHazard, setOrigDataHazard,
        origDataProjects, setOrigDataProjects,
        selectedInventory, setSelectedInventory,
        clear_selected
      }
    }>
      { props.children }
    </MainContext.Provider>
  )
}

export default MainContextProvider;