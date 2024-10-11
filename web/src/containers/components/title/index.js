import React from 'react';

import DPWH from '../../../assets/logos/logo_DPWH.png';
import BP from '../../../assets/logos/logo_Bagong Pilipinas.png';

import './index.css';

export default function TitleBar() {
  return (
    <div className='titlebar-container'>
      <div className='titlebar-header'>
        <div className='header-logo'>
          <img src={DPWH}/>
        </div>
        <div className='header-logo'>
          <img src={BP}/>
        </div>
        <div className='header-title'>
          <b>ROAD DISASTER INFORMATION SYSTEM</b>
        </div>
      </div>
    </div>
  )
}