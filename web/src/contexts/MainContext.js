import React from 'react';

import sections from '../sampleFiles/road_sections_merged.json'
import projects from '../sampleFiles/sample_road_projects.json'
import hazardData from '../sampleFiles/R7_LRS_HaszardMapSample.json'
import closure from '../sampleFiles/sample_disire_road_closure.json'
import terrainData from '../assets/shp/terrain.json'

export const MainContext = React.createContext();

const MainContextProvider = (props) => {
  const [regionSelect, setRegionSelect] = React.useState('')

  const [moduleTitle, setModuleTitle] = React.useState('Dashboard');

  const [moduleSelect, setModuleSelect] = React.useState('dashboard');

  const [moduleSummarySelect, setModuleSummarySelect] = React.useState('dashboard');

  const [slopePageSelect, setSlopePageSelect] = React.useState('projects')

  const [roadSection, setRoadSection] = React.useState(sections);

  const [origDataSections, setOrigDataSections] = React.useState(sections)

  const [roadSegments, setRoadSegments] = React.useState(closure);

  const [origDataEmergency, setOrigDataEmergency] = React.useState(closure)

  const [terrain, setTerrain] = React.useState(terrainData)
  
  const [selectedSegments, setSelectedSegments] = React.useState()

  const [roadProjects, setRoadProjects] = React.useState(projects)

  const [hazardSegments, setHazardSegments] = React.useState(hazardData)

  const [hazardList, setHazardList] = React.useState([])

  const [closureList, setClosureList] = React.useState([])

  const [selectedSection, setSelectedSection] = React.useState()

  const [selectedHazard, setSelectedHazard] = React.useState()

  const [selectedClosure, setSelectedClosure] = React.useState()

  const [origDataHazard, setOrigDataHazard] = React.useState(hazardData)

  const [origDataProjects, setOrigDataProjects] = React.useState(projects)

  const [selectedInventory, setSelectedInventory] = React.useState()

  const [scale, setScale] = React.useState(50000)

  const [mapCenter, setMapCenter] = React.useState([120.59958964948025, 16.40383820492775])

  return (
    <MainContext.Provider value = {{regionSelect, setRegionSelect,
                                    moduleTitle, setModuleTitle,
                                    moduleSelect, setModuleSelect,
                                    moduleSummarySelect, setModuleSummarySelect,
                                    slopePageSelect, setSlopePageSelect,
                                    roadSection, setRoadSection,
                                    roadSegments, setRoadSegments,
                                    origDataEmergency, setOrigDataEmergency,
                                    terrain, setTerrain,
                                    selectedSegments, setSelectedSegments,
                                    roadProjects, setRoadProjects,
                                    hazardSegments, setHazardSegments,
                                    hazardList, setHazardList,
                                    closureList, setClosureList,
                                    selectedSection, setSelectedSection,
                                    selectedHazard, setSelectedHazard,
                                    selectedClosure, setSelectedClosure,
                                    origDataSections, setOrigDataSections,
                                    origDataHazard, setOrigDataHazard,
                                    origDataProjects, setOrigDataProjects,
                                    selectedInventory, setSelectedInventory,
                                    scale, setScale,
                                    mapCenter, setMapCenter
    }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;