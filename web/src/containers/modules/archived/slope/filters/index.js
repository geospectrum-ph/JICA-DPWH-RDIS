import React from 'react';
import regions from '../../../../assets/regions-list.json'
import { MainContext } from '../../../../contexts/MainContext';

export default function Filter() {
  const {sampleData, setSampleData, origData} = React.useContext(MainContext)

  const [regionSelect, setRegionSelect] = React.useState('Region')
  const [provinceSelect, setProvinceSelect] = React.useState('Province')
  const [hazardSelect, setHazardSelect] = React.useState('Hazard')

  React.useEffect(() => {
    
    if (regionSelect !== 'Region' && regionSelect.length > 0) {
      setSampleData({...sampleData, features: origData.features.filter((feat) => {
        // console.log(origData.features, feat)
        return feat.properties.region.toLowerCase() === regionSelect.toLowerCase()
      })})
    } else {
      setSampleData(origData)
    }
  }, [regionSelect])

  React.useEffect(() => {
    if (provinceSelect !== 'Province' && provinceSelect.length > 0) {
      setSampleData({sampleData, features: origData.features.filter((feat) => {
        return feat.properties.deo_name.toLowerCase().includes(provinceSelect.toLowerCase())
      })})
    }
    
  }, [provinceSelect])

  React.useEffect(() => {
    if (hazardSelect !== 'Hazard' && hazardSelect.length > 0) {
      setSampleData({sampleData, features: origData.features.filter((feat) => {
        return feat.properties.hazard_risk.toLowerCase().includes(hazardSelect.toLowerCase())
      })})
    }
  }, [hazardSelect])
  return(
    <>
      <div className='mdb-left-title'>
        <b>Filters</b>
      </div>
      <select name="region" className='sdb-dropdown' value={regionSelect} 
        onChange={(event)=>setRegionSelect(event.target.value)}>
        <option disabled selected hidden value="Region">Region</option>
        <option value=''></option>
        {regions.map((region) => {
          return <option value={region.region_name}>{region.region_name}</option>
        }) }
        
      </select>

      <select className='sdb-dropdown' value={provinceSelect}
        onChange={(event) => setProvinceSelect(event.target.value)}>
        <option disabled selected hidden value='Province'>Province</option>
        <option value=''></option>
        {regionSelect !== 'Region' && regionSelect.length > 0  ? Object.keys(regions.filter((region) => {
          return region.region_name === regionSelect
        })[0].province_list).map((provinces) => {
          return <option>{provinces}</option>
        }) : null}
        
      </select>

      <select className='sdb-dropdown' value={hazardSelect}
        onChange={(event) => setHazardSelect(event.target.value)}>
        <option disabled selected hidden value='Hazard'>Hazard level</option>
        <option></option>
        <option value="High">High</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        
      </select>

      <select className='sdb-dropdown'>
        <option disabled selected hidden>Disaster</option>
        <option></option>
        
      </select>

      <select className='sdb-dropdown'>
        <option disabled selected hidden>Priority</option>
        <option></option>
        
      </select>
      
      <select className='sdb-dropdown'>
        <option disabled selected hidden>Project Status</option>
        <option></option>
        
      </select>
      <br/>
      <div className='mdb-left-title'>
        <b>Sort</b>
      </div>

      <select className='sdb-dropdown'>
        <option disabled selected hidden>Date</option>
        <option></option>
        
      </select>

      <select className='sdb-dropdown'>
        <option disabled selected hidden>Road Closure Frequency</option>
        <option></option>
        
      </select>
    </>
  )
}