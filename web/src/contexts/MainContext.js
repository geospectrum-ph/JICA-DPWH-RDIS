import React from 'react';

import sample from '../sampleFiles/sample_data.json'

export const MainContext = React.createContext();

const MainContextProvider = (props) => {
  const [moduleTitle, setModuleTitle] = React.useState('Dashboard');

  const [moduleSelect, setModuleSelect] = React.useState('dashboard');

  const [sampleData, setSampleData] = React.useState(sample)

  const [origData, setOrigData] = React.useState(sample)

  const [selectedInventory, setSelectedInventory] = React.useState()

  const [mapCenter, setMapCenter] = React.useState([120.59958964948025, 16.40383820492775])

  return (
    <MainContext.Provider value = {{moduleTitle, setModuleTitle,
                                    moduleSelect, setModuleSelect,
                                    sampleData, setSampleData,
                                    origData, setOrigData,
                                    selectedInventory, setSelectedInventory,
                                    mapCenter, setMapCenter
    }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;