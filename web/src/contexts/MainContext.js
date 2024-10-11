import React from 'react';

import sections from '../sampleFiles/road_sections_merged.json'
import projects from '../sampleFiles/sample_road_projects.json'
import hazardData from '../sampleFiles/R7_LRS_HaszardMapSample.json'
import closure from '../sampleFiles/sample_disire_road_closure.json'
import terrainData from '../assets/shp/terrain.json'

export const MainContext = React.createContext();

const MainContextProvider = (props) => {
  const [moduleTitle, setModuleTitle] = React.useState('Dashboard');

  const [moduleSelect, setModuleSelect] = React.useState('dashboard');

  const [roadSection, setRoadSection] = React.useState(sections);

  const [origDataSections, setOrigDataSections] = React.useState(sections)

  const [roadSegments, setRoadSegments] = React.useState(closure);

  const [origDataEmergency, setOrigDataEmergency] = React.useState(closure)

  const [terrain, setTerrain] = React.useState(terrainData)
  
  const [selectedSegments, setSelectedSegments] = React.useState()

  const [roadProjects, setRoadProjects] = React.useState(projects)

  const [hazardList, setHazardList] = React.useState([])

  const [closureList, setClosureList] = React.useState([])

  const [selectedSection, setSelectedSection] = React.useState()

  const [selectedHazard, setSelectedHazard] = React.useState()

  const [origDataHazard, setOrigDataHazard] = React.useState(hazardData)

  const [selectedInventory, setSelectedInventory] = React.useState()

  const [scale, setScale] = React.useState(50000)

  const [mapCenter, setMapCenter] = React.useState([120.59958964948025, 16.40383820492775])

  return (
    <MainContext.Provider value = {{moduleTitle, setModuleTitle,
                                    moduleSelect, setModuleSelect,
                                    roadSection, setRoadSection,
                                    roadSegments, setRoadSegments,
                                    origDataEmergency, setOrigDataEmergency,
                                    terrain, setTerrain,
                                    selectedSegments, setSelectedSegments,
                                    roadProjects, setRoadProjects,
                                    hazardList, setHazardList,
                                    closureList, setClosureList,
                                    selectedSection, setSelectedSection,
                                    selectedHazard, setSelectedHazard,
                                    origDataSections, setOrigDataSections,
                                    origDataHazard, setOrigDataHazard,
                                    selectedInventory, setSelectedInventory,
                                    scale, setScale,
                                    mapCenter, setMapCenter
    }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;