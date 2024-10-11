import React from 'react';

import regions from '../../../assets/regions-list.json'
import deos from '../../../assets/engineering_district.json'

import './index.css'
import { MainContext } from '../../../contexts/MainContext';

export default function AreaFilter() {

  const {setRoadSection, origDataSections, setMapCenter} = React.useContext(MainContext)

  const [regionSelect, setRegionSelect] = React.useState('')
  const [regionDropdown, setRegionDropdown] = React.useState(false)

  const changeRegion = (regionFilter, regionSection) => {
    setRegionSelect(regionFilter)
    setRegionDropdown(false)

    setRoadSection(origDataSections.filter((section)=> {
      return section.properties.REGION.toLowerCase() === regionSection.toLowerCase()
    }).sort((a, b) => { return a.properties.SECTION_ID - b.properties.SECTION_ID}))
  }

  const [deoSelect, setDeoSelect] = React.useState('')
  const [deoDropdown, setDeoDropdown] = React.useState('')

  const changeDEO = (deoFilter, center_x, center_y) => {
    setDeoSelect(deoFilter)
    setDeoDropdown(false)
    setMapCenter([center_x, center_y])

    setRoadSection(origDataSections.filter((section)=> {
      return section.properties.DEO.toLowerCase() === deoFilter.toLowerCase()
    }).sort((a, b) => { return a.properties.SECTION_ID - b.properties.SECTION_ID}))

  }


  return (
    <div className='areafilter-container'>
      <div className='areafilter-header'>
        test
      </div>
      <div className='areafilter-dropdowns'>
        <div className='areafilter-dropdown'>
          <div className='areafilter-dropdown-menu' onClick={()=>setRegionDropdown(!regionDropdown)}>
            <b>Region</b>
            {regionSelect === '' ? <div>No region selected</div> : regionSelect}
          </div>
          <div className='areafilter-dropdown-list' style={{display: regionDropdown ? 'block' : 'none'}}>
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
            {regionSelect !== '' ? deos.filter((deo) => {
              return deo.REGION.toLowerCase() === regionSelect.toLowerCase()
            }).sort((a, b) => {return a.DEO - b.DEO}).map((deo) => {
              return <div className='areafilter-dropdown-item' onClick={()=>changeDEO(deo.DEO, deo.centroid_x, deo.centroid_y)}>
                {deo.DEO}
              </div>
            }) : null}
          </div>
        </div>
        <div className='areafilter-dropdown'>
          <div className='areafilter-dropdown-menu' onClick={()=>setRegionDropdown(!regionDropdown)}>
            <b>Legislative District</b>
            {regionSelect === '' ? <div>No district selected</div> : regionSelect}
          </div>
          <div className='areafilter-dropdown-list' style={{display: regionDropdown ? 'block' : 'none'}}>
            {regions.map((region)=> {
              return <div className='areafilter-dropdown-item' onClick={()=>changeRegion(region.filter_value, region.region_name)}>
              {region.filter_value}
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}