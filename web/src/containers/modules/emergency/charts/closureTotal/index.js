import React from 'react';

import { MainContext } from '../../../../../contexts/MainContext';

import './index.css'

export default function ClosureTotal() {
  const {roadSegments} = React.useContext(MainContext)
  

  return(
    <div className='closure-total-container'>
      <div className='closure-total-header'>
        <b>TOTAL CLOSED ROADS</b>
      </div>
      <div className='closure-total-body'>
        {roadSegments.filter((segment) => {
          return segment.properties.situation === 'notpassable'
        }).length}
      </div>
      <br/>
      <div className='closure-total-header'>
        <b>TOTAL ROADS W/ LIMITED ACCESS</b>
      </div>
      <div className='closure-total-body'>
        {roadSegments.filter((segment) => {
          return segment.properties.situation === 'limitedaccess'
        }).length}
      </div>
    </div>
  )
}