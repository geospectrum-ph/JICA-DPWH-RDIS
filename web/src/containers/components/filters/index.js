import React from 'react';

import regions from '../../../assets/regions-list.json'
import deos from '../../../assets/engineering_district.json'

import './index.css'
import { MainContext } from '../../../contexts/MainContext';

export default function AreaFilter() {

  const {regionSelect, setRegionSelect, setRoadSection, roadSection, origDataSections, setMapCenter, setRoadSegments, origDataEmergency, moduleSelect, moduleSummarySelect, setModuleSummarySelect, slopePageSelect, setSlopePageSelect} = React.useContext(MainContext)

  const [regionDropdown, setRegionDropdown] = React.useState(false)

  const [ldList, setLdList] = React.useState([]);

  React.useEffect(() => {
    // console.log(roadSection[0])
    var ldFilter = []
    for (var i = 0; i < roadSection.length; i++) {
      if (!ldFilter.includes(roadSection[i].properties.CONG_DIST)){
        ldFilter.push(roadSection[i].properties.CONG_DIST)
      }
    }

    setLdList(ldFilter)
  }, [roadSection])
  
  console.log('ld', ldList)

  const changeRegion = (regionFilter, regionSection) => {
    if (regionFilter !== '') {
      setRoadSection(origDataSections.filter((section)=> {
        return section.properties.REGION.toLowerCase() === regionSection.toLowerCase()
      }).sort((a, b) => { return a.properties.SECTION_ID - b.properties.SECTION_ID}))
  
      setRoadSegments(origDataEmergency.filter((segment) => {
        var id = origDataSections.filter((section) => {
          return section.properties.SECTION_ID === segment.properties.section_id
        })
        
        return id[0].properties.REGION.toLowerCase() === regionSection.toLowerCase()
      }).sort((a, b) => { return a.properties.section_id - b.properties.section_id}))
    } else {
      setRoadSection(origDataSections)
      setRoadSegments(origDataEmergency)
    }
    setRegionSelect(regionFilter)
    setRegionDropdown(false)
    setDeoDropdown(false)

    

    setDeoSelect('')
  }

  const [deoSelect, setDeoSelect] = React.useState('')
  const [deoDropdown, setDeoDropdown] = React.useState('')

  const changeDEO = (deoFilter, center_x, center_y) => {
    if (deoFilter !== ''){
      setMapCenter([center_x, center_y])

      setRoadSection(origDataSections.filter((section)=> {
        return section.properties.DEO.toLowerCase() === deoFilter.toLowerCase()
      }).sort((a, b) => { return a.properties.SECTION_ID - b.properties.SECTION_ID}))

      setRoadSegments(origDataEmergency.filter((segment) => {
        var id = origDataSections.filter((section) => {
          return section.properties.SECTION_ID === segment.properties.section_id
        })
        
        return id[0].properties.DEO.toLowerCase() === deoFilter.toLowerCase()
      }).sort((a, b) => { return a.properties.section_id - b.properties.section_id}))
    } else {
      setRoadSection(origDataSections.filter((section)=> {
        return section.properties.REGION.toLowerCase() === regionSelect.toLowerCase()
      }).sort((a, b) => { return a.properties.SECTION_ID - b.properties.SECTION_ID}))
  
      setRoadSegments(origDataEmergency.filter((segment) => {
        var id = origDataSections.filter((section) => {
          return section.properties.SECTION_ID === segment.properties.section_id
        })
        
        return id[0].properties.REGION.toLowerCase() === regionSelect.toLowerCase()
      }).sort((a, b) => { return a.properties.section_id - b.properties.section_id}))
    }
    setDeoSelect(deoFilter)
    setDeoDropdown(false)
    
  }

  const [ldSelect, setLdSelect] = React.useState('')
  const [ldDropdown, setLdDropdown] = React.useState('')

  const changeLd = (ld) => {
    if (ld !== ''){
      // setMapCenter([center_x, center_y])

      setRoadSection(origDataSections.filter((section)=> {
        return section.properties.CONG_DIST.toLowerCase() === ld.toLowerCase()
      }).sort((a, b) => { return a.properties.SECTION_ID - b.properties.SECTION_ID}))

      setRoadSegments(origDataEmergency.filter((segment) => {
        var id = origDataSections.filter((section) => {
          return section.properties.SECTION_ID === segment.properties.section_id
        })
        
        return id[0].properties.CONG_DIST.toLowerCase() === ld.toLowerCase()
      }).sort((a, b) => { return a.properties.section_id - b.properties.section_id}))
    } else {
      setRoadSection(origDataSections.filter((section)=> {
        return section.properties.DEO.toLowerCase() === deoSelect.toLowerCase()
      }).sort((a, b) => { return a.properties.SECTION_ID - b.properties.SECTION_ID}))
  
      setRoadSegments(origDataEmergency.filter((segment) => {
        var id = origDataSections.filter((section) => {
          return section.properties.SECTION_ID === segment.properties.section_id
        })
        
        return id[0].properties.DEO.toLowerCase() === deoSelect.toLowerCase()
      }).sort((a, b) => { return a.properties.section_id - b.properties.section_id}))
    }
    setLdSelect(ld)
    setLdDropdown(false)
    
  }

  return (
    <div className='areafilter-container'>
      {moduleSelect === 'dashboard' ?
        <div className='areafilter-header'>
          <div className='areafilter-header-title'>
            <b>DASHBOARD SUMMARY</b>
          </div>
          <div className='areafilter-header-appbar'>
            <div className={moduleSummarySelect === 'dashboard' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setModuleSummarySelect('dashboard')}>Main Dashboard</div>
            <div className={moduleSummarySelect === 'slope' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>{setModuleSummarySelect('slope'); console.log('slope')}}>Slope Inventory and Countermeasure</div>
            <div className={moduleSummarySelect === 'emergency' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setModuleSummarySelect('emergency')}>Emergency Response</div>
            <div className={moduleSummarySelect === 'hazard' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setModuleSummarySelect('hazard')}>Hazard Map</div>
          </div>
          
        </div>
      : moduleSelect === 'slope' ? <div className='areafilter-header'>
        <div className='areafilter-header-title'>
          <b>SLOPE INVENTORY AND COUNTERMEASURE</b>
        </div>
        <div className='areafilter-header-appbar'>
          <div className={slopePageSelect === 'projects' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setSlopePageSelect('projects')}>Road Slope Inventory</div>
          <div className={slopePageSelect === 'potential' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>{setSlopePageSelect('potential')}}>Prone to Road Slope Disaster</div>
        </div>
        
      </div>
      : moduleSelect === 'emergency' ? <div className='areafilter-header'>
        <div className='areafilter-header-title'>
          <b>EMERGENCY RESPONSE</b>
        </div>
        {/* <div className='areafilter-header-appbar'>
          <div className={slopePageSelect === 'projects' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setSlopePageSelect('projects')}>Road Slope Inventory</div>
          <div className={slopePageSelect === 'potential' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>{setSlopePageSelect('potential')}}>Prone to Road Slope Disaster</div>
        </div> */}  
      </div>
        
      : moduleSelect === 'hazard' ? <div className='areafilter-header'>
        <div className='areafilter-header-title'>
          <b>HAZARD MAP</b>
        </div>
        {/* <div className='areafilter-header-appbar'>
          <div className={slopePageSelect === 'projects' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setSlopePageSelect('projects')}>Road Slope Inventory</div>
          <div className={slopePageSelect === 'potential' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>{setSlopePageSelect('potential')}}>Prone to Road Slope Disaster</div>
        </div> */}  
      </div>
      : <div className='areafilter-header'/>}
      <div className='areafilter-dropdowns'>
        <div className='areafilter-dropdown'>
          <div className='areafilter-dropdown-menu' onClick={()=>setRegionDropdown(!regionDropdown)}>
            <b>Region</b>
            {regionSelect === '' ? <div>No region selected</div> : regionSelect}
          </div>
          <div className='areafilter-dropdown-list' style={{display: regionDropdown ? 'block' : 'none'}}>
            <div className='areafilter-dropdown-item' onClick={()=>changeRegion('', '')}>
              Select to clear filter
            </div>
            {regions.map((region)=> {
              return <div className='areafilter-dropdown-item' onClick={()=>changeRegion(region.filter_value, region.region_name)}>
              {region.filter_value}
              </div>
            })}
          </div>
        </div>
        <div className='areafilter-dropdown'>
          <div className='areafilter-dropdown-menu' onClick={()=>setDeoDropdown(!deoDropdown)}>
            <b>DEO</b>
            {deoSelect === '' ? <div>No DEO selected</div> : deoSelect}
          </div>
          <div className='areafilter-dropdown-list' style={{display: deoDropdown ? 'block' : 'none'}}>
            <div className='areafilter-dropdown-item' onClick={()=>changeDEO('', '', '')}>
              Select to clear filter
            </div>
            {regionSelect !== '' ? deos.filter((deo) => {
              return deo.REGION.toLowerCase() === regionSelect.toLowerCase()
            }).sort((a, b) => {return a.DEO - b.DEO}).map((deo, index) => {
              return <div className='areafilter-dropdown-item' key = {index} onClick={()=>changeDEO(deo.DEO, deo.centroid_x, deo.centroid_y)}>
                {deo.DEO}
              </div>
            }) : null}
          </div>
        </div>
        <div className='areafilter-dropdown'>
          <div className='areafilter-dropdown-menu' onClick={()=>setLdDropdown(!ldDropdown)}>
            <b>Legislative District</b>
            {ldSelect === '' ? <div>No district selected</div> : ldSelect}
          </div>
          <div className='areafilter-dropdown-list' style={{display: ldDropdown ? 'block' : 'none'}}>
            <div className='areafilter-dropdown-item' onClick={()=>changeLd('')}>
              Select to clear filter
            </div>
            {regionSelect !== ''  && deoSelect !== '' ? ldList.sort((a, b) => {return a - b}).map((ld) => {
              return <div className='areafilter-dropdown-item' onClick={()=>changeLd(ld)}>
                {ld}
              </div>
            }) : null}
          </div>
        </div>
      </div>
    </div>
  )
}