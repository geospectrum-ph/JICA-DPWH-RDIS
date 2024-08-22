import React from 'react';

export const MainContext = React.createContext();

const MainContextProvider = (props) => {
  const [moduleTitle, setModuleTitle] = React.useState('Dashboard');

  const [moduleSelect, setModuleSelect] = React.useState('dashboard')

  return (
    <MainContext.Provider value = {{moduleTitle, setModuleTitle,
                                    moduleSelect, setModuleSelect
    }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;