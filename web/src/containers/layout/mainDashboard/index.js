import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TitleBar from '../../components/title';
import HeaderBar from '../../components/appBar';
import AreaFilter from '../../components/filters';

import { MainContext } from '../../../contexts/MainContext';

import MainDashboard from '../../modules/dashboard';
import SlopeModule from '../../modules/slope';

import './index.css';
import HazardModule from '../../modules/hazard';
import RoadInformation from '../../components/roadInformation';
import EmergencyModule from '../../modules/emergency';
import { ArcGISMapContext } from '../../components/map';

export default function DashboardLayout(){
  const {moduleSelect, selectedSection} = React.useContext(MainContext)
  const {ArcGISMap} = React.useContext(ArcGISMapContext)

  return (
    <div className='app-container'>
      <TitleBar/>
      <HeaderBar/>
      <AreaFilter/>
      <div className='dashboard-body'>
        <div className={moduleSelect === 'user' ? 'left-full' : 'left'}>
          <Routes>
            <Route path="/dashboard" element={<MainDashboard/>}/>
            <Route path="/slope" element={<SlopeModule/>}/>
            <Route path="/slope/:id" />
            <Route path="/emergency" element={<EmergencyModule/>}/>
            <Route path="/hazard" element={<HazardModule/>}/>

            <Route path="/user" />
          </Routes>
        </div>
        <div className={moduleSelect === 'user' ? 'right-none' : 'right'}>
          <div>
            <ArcGISMap/>
          </div>
          <div>
            {selectedSection ? <RoadInformation/> : <div className='layout-info-null'><b>PLEASE SELECT AN OBJECT</b></div>}
          </div>
        </div>
      </div>
    </div>
  )
}