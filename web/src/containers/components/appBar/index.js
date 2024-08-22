import React from 'react';

import { MainContext } from '../../../contexts/MainContext';

import './index.css';

export default function HeaderBar () {
  const {setModuleTitle, moduleSelect, setModuleSelect} = React.useContext(MainContext)

  const setModule = (moduleName, module) => {
    setModuleTitle(moduleName)
    setModuleSelect(module)
  }
  return (
    <div className='rowbar headerbar'>
      <div className='appbar'>
        <div className={moduleSelect === 'dashboard' ? 'appbar-button-selected' : 'appbar-button'} onClick={()=>setModule('Dashboard', 'dashboard')}>Dashboard</div>
        <div className={moduleSelect === 'slope' ? 'appbar-button-selected' : 'appbar-button'} onClick={()=>setModule('Slope Inventory and Countermeasure', 'slope')}>Slope</div>
        <div className={moduleSelect === 'emergency' ? 'appbar-button-selected' : 'appbar-button'} onClick={()=>setModule('Emergency Response', 'emergency')}>Emergency</div>
        <div className={moduleSelect === 'hazard' ? 'appbar-button-selected' : 'appbar-button'} onClick={()=>setModule('Hazard Map', 'hazard')}>Hazard</div>
      </div>
    </div>
  )
}