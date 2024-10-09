import React from 'react';
import regions from '../../../../assets/regions-list.json'
import deo from '../../../../assets/shp/engineering_district.json'
import ld from '../../../../assets/shp/congressional_district.json'
import { MainContext } from '../../../../contexts/MainContext';

export default function Filter() {
  const {roadSection, setRoadSection, origData} = React.useContext(MainContext)

  const [regionSelect, setRegionSelect] = React.useState('Region')
  const [deoSelect, setDeoSelect] = React.useState('Engineering District')
  const [ldSelect, setLdSelect] = React.useState('Legislative District')
  const [hazardSelect, setHazardSelect] = React.useState('Hazard')

  React.useEffect(() => {
    
    if (regionSelect !== 'Region' && regionSelect.length > 0) {
      setRoadSection(origData.filter((feat) => {
        // console.log(origData.features, feat)
        return feat.properties.REGION.toLowerCase() === regionSelect.toLowerCase()
      }).sort((a,b) => a.properties.SECTION_ID.localeCompare(b.properties.SECTION_ID)))
    } else {
      setRoadSection(origData)
    }
  }, [regionSelect])

  React.useEffect(() => {
    if (deoSelect !== 'Engineering District' && deoSelect.length > 0) {
      setRoadSection(origData.filter((feat) => {
        return feat.properties.DEO.toLowerCase().includes(deoSelect.toLowerCase())
      }).sort((a,b) => a.properties.SECTION_ID.localeCompare(b.properties.SECTION_ID)))
    }
    
  }, [deoSelect])

  React.useEffect(() => {
    if (hazardSelect !== 'Hazard' && hazardSelect.length > 0) {
      setRoadSection({...roadSection, features: origData.filter((feat) => {
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

      <select className='sdb-dropdown' value={deoSelect}
        onChange={(event) => setDeoSelect(event.target.value)}>
        <option disabled selected hidden value='Engineering District'>Engineering District</option>
        <option value=''></option>
        {regionSelect !== 'Region' && regionSelect.length > 0  ? deo.filter((d) => {
          return d.properties.REGION.toLowerCase() === regionSelect.toLowerCase()
        }).map((deof) => {
          return <option>{deof.properties.DEO}</option>
        }) : null}
        
      </select>

      {/* <select className='sdb-dropdown' value={ldSelect}
        onChange={(event) => setLdSelect(event.target.value)}>
        <option disabled selected hidden value='Legislative District'>Legislative District</option>
        <option value=''></option>
        {deoSelect !== 'Engineering District' && deoSelect.length > 0  ? ld.filter((ld) => {
          return ld.properties.REGION.toLowerCase() === regionSelect.toLowerCase()
        }).map((deof) => {
          return <option>{deof.properties.DEO}</option>
        }) : null}
        
      </select> */}

      <select className='sdb-dropdown' value={hazardSelect}
        onChange={(event) => setHazardSelect(event.target.value)}>
        <option disabled selected hidden value='Hazard'>Hazard level</option>
        <option></option>
        <option value="High">High</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        
      </select>

      {/* <select className='sdb-dropdown'>
        <option disabled selected hidden>Disaster</option>
        <option></option>
        
      </select> */}

      <select className='sdb-dropdown'>
        <option disabled selected hidden>Priority</option>
        <option></option>
        
      </select>
      
      {/* <select className='sdb-dropdown'>
        <option disabled selected hidden>Project Status</option>
        <option></option>
        
      </select> */}
      <br/>
      {/* <div className='mdb-left-title'>
        <b>Sort</b>
      </div>

      <select className='sdb-dropdown'>
        <option disabled selected hidden>Date</option>
        <option></option>
        
      </select>

      <select className='sdb-dropdown'>
        <option disabled selected hidden>Road Closure Frequency</option>
        <option></option>
        
      </select> */}
    </>
  )
}