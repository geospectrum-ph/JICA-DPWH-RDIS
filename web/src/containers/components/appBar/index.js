import React from 'react';

import { MainContext } from '../../../contexts/MainContext';

import './index.css';

export default function HeaderBar () {
  const {setModuleTitle} = React.useContext(MainContext)
  return (
    <div className='rowbar headerbar'>
      <div className='appbar'>
        <div className='appbar-button' onClick={()=>setModuleTitle('Dashboard')}>Dashboard</div>
        <div className='appbar-button' onClick={()=>setModuleTitle('Slope Inventory and Countermeasure')}>Slope</div>
        <div className='appbar-button' onClick={()=>setModuleTitle('Emergency Response')}>Emergency</div>
        <div className='appbar-button' onClick={()=>setModuleTitle('Hazard Map')}>Hazard</div>
      </div>
    </div>
  )
}