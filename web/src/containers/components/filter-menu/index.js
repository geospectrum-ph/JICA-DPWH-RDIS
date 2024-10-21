import React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

// export default function Filters() {
//   const {
//     regionSelect, setRegionSelect,
//     setRoadSection, roadSection, origDataSections,
//     setRoadSegments,
//     origDataEmergency,
//     moduleSelect,
//     moduleSummarySelect, setModuleSummarySelect,
//     slopePageSelect, setSlopePageSelect
//   } = React.useContext(MainContext);

//   const { recenter_map } = React.useContext(MapContext);

//   const [regionDropdown, setRegionDropdown] = React.useState(false);

//   const [ldList, setLdList] = React.useState([]);

//   React.useEffect(() => {
//     var ldFilter = [];

//     for (var i = 0; i < roadSection.length; i++) {
//       if (!ldFilter.includes(roadSection[i].properties.CONG_DIST)) {
//         ldFilter.push(roadSection[i].properties.CONG_DIST);
//       }
//     }

//     setLdList(ldFilter);
//   }, [roadSection]);
  
//   function changeRegion (regionFilter, regionSection, regionCenter) {
//     if (regionFilter !== "") {
//       setRoadSection(
//         origDataSections
//           .filter(function (section) {
//             return (section.properties.REGION.toLowerCase() === regionSection.toLowerCase());
//           })
//           .sort(function (accumulator, element) {
//             return (accumulator.properties.SECTION_ID - element.properties.SECTION_ID);
//           })
//         );
  
//       setRoadSegments(
//         origDataEmergency
//           .filter(function (segment) {
//             var id = origDataSections.filter(function (section) { return (section.properties.SECTION_ID === segment.properties.section_id) });
        
//             return (id[0].properties.REGION.toLowerCase() === regionSection.toLowerCase());
//           })
//           .sort(function (accumulator, element) {
//             return (accumulator.properties.section_id - element.properties.section_id);
//           })
//         );
//     }
//     else {
//       setRoadSection(origDataSections);
//       setRoadSegments(origDataEmergency);
//     }

//     setRegionSelect(regionFilter);
//     setRegionDropdown(false);
//     setDeoDropdown(false);
//     setDeoSelect("");

//     const coordinate_array = [regionCenter, regionCenter, regionCenter, regionCenter];
    
//     recenter_map(coordinate_array, 8);
//   }

//   const [deoSelect, setDeoSelect] = React.useState("");
//   const [deoDropdown, setDeoDropdown] = React.useState("");

//   const changeDEO = (deoFilter, center_x, center_y) => {
//     if (deoFilter !== "") {
//       const coordinates = [center_x, center_y];
//       const coordinate_array = [coordinates, coordinates, coordinates, coordinates];

//       recenter_map(coordinate_array, 10);

//       setRoadSection(
//         origDataSections
//           .filter(function (section) {
//             return (section.properties.DEO.toLowerCase() === deoFilter.toLowerCase());
//           })
//           .sort(function (accumulator, element) {
//             return (accumulator.properties.SECTION_ID - element.properties.SECTION_ID);
//           })
//       );

//       setRoadSegments(
//         origDataEmergency
//           .filter(function (segment) {
//             var id = origDataSections.filter(function (section) {
//               return (section.properties.SECTION_ID === segment.properties.section_id);
//             });
        
//             return (id[0].properties.DEO.toLowerCase() === deoFilter.toLowerCase());
//           })
//           .sort(function (accumulator, element) {
//             return (accumulator.properties.section_id - element.properties.section_id);
//           })
//       );
//     }
//     else {
//       setRoadSection(
//         origDataSections
//           .filter(function (section) {
//             return (section.properties.REGION.toLowerCase() === regionSelect.toLowerCase());
//           })
//           .sort(function (accumulator, element) {
//             return (accumulator.properties.SECTION_ID - element.properties.SECTION_ID);
//           })
//       );
  
//       setRoadSegments(
//         origDataEmergency
//           .filter(function (segment) {
//             var id = origDataSections.filter(function (section) {
//               return (section.properties.SECTION_ID === segment.properties.section_id);
//             });
        
//             return (id[0].properties.REGION.toLowerCase() === regionSelect.toLowerCase());
//           })
//           .sort(function (accumulator, element) {
//             return (accumulator.properties.section_id - element.properties.section_id);
//           })
//       );
//     }

//     setDeoSelect(deoFilter);
//     setDeoDropdown(false);
//   }

//   const [ldSelect, setLdSelect] = React.useState("");
//   const [ldDropdown, setLdDropdown] = React.useState("");

//   // anong nangyayari dito?
//   function changeLd (ld) {
//     if (ld !== "") {
//       // setMapCenter([center_x, center_y])

//       setRoadSection(origDataSections.filter((section)=> {
//         return section.properties.CONG_DIST.toLowerCase() === ld.toLowerCase()
//       }).sort((a, b) => { return a.properties.SECTION_ID - b.properties.SECTION_ID}))

//       setRoadSegments(origDataEmergency.filter((segment) => {
//         var id = origDataSections.filter((section) => {
//           return section.properties.SECTION_ID === segment.properties.section_id
//         })
        
//         return id[0].properties.CONG_DIST.toLowerCase() === ld.toLowerCase()
//       }).sort((a, b) => { return a.properties.section_id - b.properties.section_id}))
//     } else {
//       setRoadSection(origDataSections.filter((section)=> {
//         return section.properties.DEO.toLowerCase() === deoSelect.toLowerCase()
//       }).sort((a, b) => { return a.properties.SECTION_ID - b.properties.SECTION_ID}))
  
//       setRoadSegments(origDataEmergency.filter((segment) => {
//         var id = origDataSections.filter((section) => {
//           return section.properties.SECTION_ID === segment.properties.section_id
//         })
        
//         return id[0].properties.DEO.toLowerCase() === deoSelect.toLowerCase()
//       }).sort((a, b) => { return a.properties.section_id - b.properties.section_id}))
//     }
//     setLdSelect(ld)
//     setLdDropdown(false)
    
//   }

//   return (
//     <div className='areafilter-container'>
//       {moduleSelect === 'dashboard' ?
//         <div className='areafilter-header'>
//           <div className='areafilter-header-title'>
//             <b>DASHBOARD SUMMARY</b>
//           </div>
//           <div className='areafilter-header-appbar'>
//             <div className={moduleSummarySelect === 'dashboard' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setModuleSummarySelect('dashboard')}>Main Dashboard</div>
//             <div className={moduleSummarySelect === 'slope' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>{setModuleSummarySelect('slope'); console.log('slope')}}>Slope Inventory and Countermeasure</div>
//             <div className={moduleSummarySelect === 'emergency' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setModuleSummarySelect('emergency')}>Emergency Response</div>
//             <div className={moduleSummarySelect === 'hazard' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setModuleSummarySelect('hazard')}>Hazard Map</div>
//           </div>
          
//         </div>
//       : moduleSelect === 'slope' ? <div className='areafilter-header'>
//         <div className='areafilter-header-title'>
//           <b>SLOPE INVENTORY AND COUNTERMEASURE</b>
//         </div>
//         <div className='areafilter-header-appbar'>
//           <div className={slopePageSelect === 'projects' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setSlopePageSelect('projects')}>Road Slope Inventory</div>
//           <div className={slopePageSelect === 'potential' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>{setSlopePageSelect('potential')}}>Prone to Road Slope Disaster</div>
//         </div>
        
//       </div>
//       : moduleSelect === 'emergency' ? <div className='areafilter-header'>
//         <div className='areafilter-header-title'>
//           <b>EMERGENCY RESPONSE</b>
//         </div>
//         {/* <div className='areafilter-header-appbar'>
//           <div className={slopePageSelect === 'projects' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setSlopePageSelect('projects')}>Road Slope Inventory</div>
//           <div className={slopePageSelect === 'potential' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>{setSlopePageSelect('potential')}}>Prone to Road Slope Disaster</div>
//         </div> */}  
//       </div>
        
//       : moduleSelect === 'hazard' ? <div className='areafilter-header'>
//         <div className='areafilter-header-title'>
//           <b>HAZARD MAP</b>
//         </div>
//         {/* <div className='areafilter-header-appbar'>
//           <div className={slopePageSelect === 'projects' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>setSlopePageSelect('projects')}>Road Slope Inventory</div>
//           <div className={slopePageSelect === 'potential' ? 'areafilter-appbar-button-selected' : 'areafilter-appbar-button'} onClick={()=>{setSlopePageSelect('potential')}}>Prone to Road Slope Disaster</div>
//         </div> */}  
//       </div>
//       : <div className='areafilter-header'/>}
{/* <div className='areafilter-dropdowns'>
        <div className='areafilter-dropdown'>
          <div className='areafilter-dropdown-menu' onClick={()=>setRegionDropdown(!regionDropdown)}>
            <b>Region</b>
            {regionSelect === '' ? <div>No region selected</div> : regionSelect}
          </div>
          <div className='areafilter-dropdown-list' style={{display: regionDropdown ? 'block' : 'none'}}>
            <div className='areafilter-dropdown-item' onClick={()=>changeRegion('', '')}>
              Select to clear filter
            </div>
            {regions.map((region, index)=> {
              return <div className='areafilter-dropdown-item' key = {index} onClick={()=>changeRegion(region.filter_value, region.region_name, region.center)}>
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
            {regionSelect !== ''  && deoSelect !== '' ? ldList.sort((a, b) => {return a - b}).map((ld, index) => {
              return <div className='areafilter-dropdown-item' key = {index} onClick={()=>changeLd(ld)}>
                {ld}
              </div>
            }) : null}
          </div>
//         </div>
      </div> */}
//     </div>
//   )
// }

export default function FilterMenu () {
  const {
    regionsList, regionSelected, setRegionSelected,
    engineeringDistrictsList, engineeringDistrictSelected, setEngineeringDistrictSelected,
  } = React.useContext(MainContext);
  const { recenter_map } = React.useContext(MapContext);

  function filter (object, type) {
    if (type === "region") {
      setEngineeringDistrictSelected("");

      setRegionSelected(object.region_name);

      const zoom_regional = 8;

      const coordinate_array = [object.center, object.center, object.center, object.center];

      recenter_map(coordinate_array, zoom_regional);
    }
    if (type === "engineering_district") {
      if (regionSelected === "") { setRegionSelected(object.REGION); }

      setEngineeringDistrictSelected(object.DEO);

      const zoom_provincial = 10;

      const center_coordinates = [object.centroid_x, object.centroid_y];
      const coordinate_array = [center_coordinates, center_coordinates, center_coordinates, center_coordinates];

      recenter_map(coordinate_array, zoom_provincial);
    }
  }

  function clear (type) {
    const zoom_level = 6;
    
    const coordinates = [121.7740, 12.8797]; 
    const coordinate_array = [coordinates, coordinates, coordinates, coordinates];

    switch (type) {
      case "region":
        setRegionSelected("");
        recenter_map(coordinate_array, zoom_level);
      case "engineering_district":
        setEngineeringDistrictSelected("");
      case "congressional_district":
      default: break;
    }
  }

  return (
    <div id = "filter-menu-container">
      <div>
        <div>{ "Region" }</div>
        <div>
          <div>{ regionSelected ? regionSelected : "--" }</div>
          <div>
            <div onClick = { function () { clear("region"); } }>{ "Clear" }</div>
            {
              regionsList ?
                regionsList
                  .map(function (region, index) {
                    return (
                      <div key = { index } onClick = { function () { filter(region, "region"); } }>{ region.region_name }</div>
                    );
                  })
                :
                null
            }
          </div>
        </div>
      </div>
      <div>
        <div>{ "Engineering District" }</div>
        <div>
        <div>{ engineeringDistrictSelected ? engineeringDistrictSelected : "--" }</div>
        <div>
          <div onClick = { function () { clear("engineering_district"); } }>{ "Clear" }</div>
            {
              engineeringDistrictsList ?
                engineeringDistrictsList
                  .map(function (engineering_district, index) {
                    if (regionSelected && regionSelected !== engineering_district.REGION) {
                      return (null);
                    }
                    else {  
                      return (
                        <div key = { index } onClick = { function () { filter(engineering_district, "engineering_district"); } }>{ engineering_district.DEO }</div>
                      );
                    }
                  })
                :
                null
            }
          </div>
        </div>

      </div>
      <div>
        <div>{ "Congressional District" }</div>
        <div>
          <div>{ "--" }</div>
          <div>
            <div onClick = { function () { clear("congressional_district"); } }>{ "Clear" }</div>
          </div>
        </div>
      </div>
    </div>
  );
}