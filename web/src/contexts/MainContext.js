import React from 'react';

export const MainContext = React.createContext();

const MainContextProvider = (props) => {
  const [moduleTitle, setModuleTitle] = React.useState('Dashboard');

  return (
    <MainContext.Provider value = {{moduleTitle, setModuleTitle}}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;