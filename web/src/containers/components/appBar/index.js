import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContext } from '../../../contexts/MainContext';

import './index.css';

export default function HeaderBar () {
  const {setModuleTitle, moduleSelect, setModuleSelect} = React.useContext(MainContext)

  const navigate = useNavigate()

  const setModule = (moduleName, module) => {
    setModuleTitle(moduleName)
    setModuleSelect(module)
    navigate(`/home/${module}`)
  }
  return (
    <div className='headerbar-container'>
      <div className='appbar'>
        <div className={moduleSelect === 'dashboard' ? 'appbar-button-selected' : 'appbar-button'} onClick={()=>setModule('Dashboard', 'dashboard')}>Main Dashboard</div>
        <div className={moduleSelect === 'slope' ? 'appbar-button-selected' : 'appbar-button'} onClick={()=>setModule('Slope Inventory and Countermeasure', 'slope')}>Slope Inventory and Countermeasure</div>
        <div className={moduleSelect === 'emergency' ? 'appbar-button-selected' : 'appbar-button'} onClick={()=>setModule('Emergency Response', 'emergency')}>Emergency Response</div>
        <div className={moduleSelect === 'hazard' ? 'appbar-button-selected' : 'appbar-button'} onClick={()=>setModule('Hazard Map', 'hazard')}>Hazard Map</div>
        <div style={{flexGrow: 1}}></div>
        <div className={moduleSelect === 'user' ? 'appbar-button-selected' : 'appbar-button'} onClick={()=>setModule('User Management', 'user')}>User Management</div>
        <div className='appbar-button' onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">
            logout
          </span>
        </div>
      </div>
    </div>
  )
}