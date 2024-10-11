import React from 'react';

import { MainContext } from '../../../contexts/MainContext';

import './index.css'

export default function RoadInformation(){

  const {selectedSection} = React.useContext(MainContext)

  return (
    <div className='roadinfo-container'>
      <div><b>Region</b></div>
      <div>{selectedSection.properties.REGION}</div>
      <div><b>DEO</b></div>
      <div>{selectedSection.properties.DEO}</div>
      <div><b>Legislative District</b></div>
      <div>{selectedSection.properties.CONG_DIST}</div>
      <div><b>Road Name</b></div>
      <div>{selectedSection.properties.ROAD_NAME}</div>
      <div><b>Section ID</b></div>
      <div>{selectedSection.properties.SECTION_ID}</div>
      <div><b>Road Classification</b></div>
      <div>{selectedSection.properties.ROAD_SEC_C}</div>
    </div>
  )
}