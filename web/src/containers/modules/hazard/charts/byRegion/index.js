import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MainContext } from '../../../../../contexts/MainContext';

import './index.css';

export default function HazardRegionListChart() {

  const {origDataHazard, hazardSegments} = React.useContext(MainContext)

  const [regionList, setRegionList] = React.useState()
  const listData = {}

  React.useEffect(() => {


    for (var i = 0; i < hazardSegments.length; i++){

      if(hazardSegments[0].properties.REGION in listData){
        listData[hazardSegments[i].properties.REGION] = listData[hazardSegments[i].properties.REGION] + hazardSegments[i].properties.SEC_LENGTH
      } else {
      listData[hazardSegments[i].properties.REGION] = hazardSegments[i].properties.SEC_LENGTH
      }
    }

    let sortable = []

    for (var item in listData) {
      sortable.push([item, listData[item]])
    }

    let objSorted = {}

    sortable.sort((a,b) => { return b[1] - a[1]}).forEach((item) => objSorted[item[0]] = item[1])

    setRegionList(objSorted)
  }, [hazardSegments])


  return (
    <div className='closure-classpie-container'>
      <div className='closure-classpie-header'>
        <b>HIGH HAZARD IN LENGTH BY REGION</b>
      </div>
      <div className='hazard-region-container'>
        {regionList ? Object.keys(regionList).map((key) => {
          return <div className='closure-region-list'>
            <div>{key}</div><div>{regionList[key]}</div>
          </div>
        }) : null}
      </div>
      
    </div>
  )
}