import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HeaderBar from '../../components/appBar';
import HeaderTitle from '../../components/header';

import MapComponent from '../tempMap';
import MainDashboard from '../dashboard';
import SlopeDashboard from '../slope';
import EmergencyDashboard from '../emergency';

import { MainContext } from '../../../contexts/MainContext';

import './index.css';
import User from '../userManagement';
import SlopeDetails from '../slope/details';

export default function Dashboard() {
  const {moduleSelect} = React.useContext(MainContext)

  return (
    <div>
      <div>
        <HeaderBar/>
        <HeaderTitle/>
        <div className='dashboard-body'>
          <div className={moduleSelect === 'user' ? 'left-full' : 'left'}>
            <Routes>
              <Route path="/dashboard" element={<MainDashboard/>}/>
              <Route path="/slope" element={<SlopeDashboard/>}/>
              <Route path="/slope/:id" element={<SlopeDetails/>}/>
              <Route path="/emergency" element={<EmergencyDashboard/>}/>
              <Route path="/hazard"/>

              <Route path="/user" element={<User/>}/>
            </Routes>
          </div>
          {moduleSelect === 'user' ? null :
            <div className='right'>
              <MapComponent/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}