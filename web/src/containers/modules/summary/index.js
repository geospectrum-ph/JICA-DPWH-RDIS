import * as React from "react";

import { Pie, PieChart, Cell, BarChart, CartesianGrid, Bar } from "recharts";

import { MainContext } from "../../../contexts/MainContext";

import {
  view_layer,
  layer_national_road_network,
  layer_national_expressways,
  layer_road_slope_hazards,
  layer_inventory_of_road_slope_protection_structures,
  layer_inventory_of_road_slopes,
  focus_map
} from "../../home/map-component";

import "./index.css";

export default function Summary () {
  const {
    filterLevel05Selected,

    arrayRoadSlopeHazards,

    arrayRoadSlopesTypeOfDisaster,
    arrayRoadSlopesTypeOfRoadSlopeProtectionStructure,
        
    arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure,
    arrayRoadSlopeProtectionStructuresTypeOfDisaster,
    arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure,

    totalRoadInventory,
    filteredRoadInventory,

    totalRoadSlopeHazardsInventory,
    filteredRoadSlopeHazardsInventory,

    totalRoadSlopeInventory,
    filteredRoadSlopeInventory,

    totalExistingRoadSlopeProtectionStructures,
    filteredExistingRoadSlopeProtectionStructures,

    totalNonExistingRoadSlopeProtectionStructures,
    filteredNonExistingRoadSlopeProtectionStructures
  } = React.useContext(MainContext);

  React.useEffect(function () {
    view_layer("summary", filterLevel05Selected);
  }, []);

  const RADIAN = Math.PI / 180;

  function renderCustomizedLabel ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    
    const x = percent === 1 ? radius + 20 : (cx + radius * Math.cos(-midAngle * RADIAN)) - (midAngle < 180 ? 5 : 0);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x = { x } y = { y } dominantBaseline = "central">
        { `${ (percent * 100).toFixed(0) }%` }
      </text>
    );
  }

  return (
    <div id = "summary-container">
      <div>
        <span>{ "Summary" }</span>
      </div>
      <div>
        <div>
          <div className = "summary-section">
            <div className = "summary-section-header"><span>{ "Road Inventory" }</span></div>
            <div className = "summary-header-row">
              <div></div>
              <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
              <div className = "summary-column-header"><span>{ "Total" }</span></div>
            </div>
            <div className = "summary-row summary-interactive" onClick = { function () { focus_map(0, [layer_national_road_network, layer_national_expressways], null, null, filterLevel05Selected); } }>
              <div className = "summary-row-header"><span>{ "Number of Road Sections" }</span></div>
              <div><span>{ filteredRoadInventory }</span></div>
              <div><span>{ totalRoadInventory }</span></div>
            </div>
            <div className = "summary-note">
              <span>{ "The total number of road sections based on the national road network and national expressways data from the RBIA." }</span>
            </div>
          </div>
          <div className = "summary-section">
            <div className = "summary-section-header"><span>{ "Road Slope Hazards Inventory" }</span></div>
            <div className = "summary-header-row">
              <div></div>
              <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
              <div className = "summary-column-header"><span>{ "Total" }</span></div>
            </div>
            <div className = "summary-row" onClick = { function () { focus_map(0, [layer_inventory_of_road_slopes], null, null, filterLevel05Selected); } }>
              <div className = "summary-row-header"><span>{ "Number of Road Slope Hazard Records" }</span></div>
              <div><span>{ filteredRoadSlopeHazardsInventory }</span></div>
              <div><span>{ totalRoadSlopeHazardsInventory }</span></div>
            </div>
            <div className = "summary-note">
              <span>{ "The total number of active road slope hazard records from RDIS RSH." }</span>
            </div>
          </div>
          <div className = "summary-section">
            <div className = "summary-section-header"><span>{ "Road Slope Hazards" }</span></div>
            <div className = "summary-section-subheader"><span>{ "Road Slope Hazard Level" }</span></div>
            <div>
              <div className = "summary-details">
                <div className = "summary-header-row">
                  <div></div>
                  <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                  <div className = "summary-column-header"><span>{ "Total" }</span></div>
                </div>
                {
                  arrayRoadSlopeHazards?.length > 0 ?
                    arrayRoadSlopeHazards.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row summary-interactive" onClick = { function () { focus_map(4, [layer_road_slope_hazards], ["hazard_risk"], item.name, filterLevel05Selected); } }>
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    :
                    null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRoadSlopeHazards ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRoadSlopeHazards ? arrayRoadSlopeHazards.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRoadSlopeHazards ?
                            arrayRoadSlopeHazards.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        } 
                      </Bar>
                    </BarChart>
                    :
                    null
                }
                {
                  arrayRoadSlopeHazards ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRoadSlopeHazards ? arrayRoadSlopeHazards.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRoadSlopeHazards.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRoadSlopeHazards ?
                            arrayRoadSlopeHazards.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        }  
                      </Pie>
                    </PieChart>
                    :
                    null
                }
              </div>
            </div>
          </div>
          <div className = "summary-section">
            <div className = "summary-section-header"><span>{ "Road Slope Inventory" }</span></div>
            <div className = "summary-header-row">
              <div></div>
              <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
              <div className = "summary-column-header"><span>{ "Total" }</span></div>
            </div>
            <div className = "summary-row" onClick = { function () { focus_map(0, [layer_inventory_of_road_slopes], null, null, filterLevel05Selected); } }>
              <div className = "summary-row-header"><span>{ "Number of Road Slope Records" }</span></div>
              <div><span>{ filteredRoadSlopeInventory }</span></div>
              <div><span>{ totalRoadSlopeInventory }</span></div>
            </div>
            <div className = "summary-row" onClick = { function () { focus_map(0, [layer_inventory_of_road_slope_protection_structures], null, null, filterLevel05Selected); } }>
              <div className = "summary-row-header"><span>{ "Non-Existing Road Slope Protection Structures" }</span></div>
              <div><span>{ filteredNonExistingRoadSlopeProtectionStructures }</span></div>
              <div><span>{ totalNonExistingRoadSlopeProtectionStructures }</span></div>
            </div>
            <div className = "summary-row" onClick = { function () { focus_map(0, [layer_inventory_of_road_slope_protection_structures], null, null, filterLevel05Selected); } }>
              <div className = "summary-row-header"><span>{ "Existing Road Slope Protection Structures" }</span></div>
              <div><span>{ filteredExistingRoadSlopeProtectionStructures }</span></div>
              <div><span>{ totalExistingRoadSlopeProtectionStructures }</span></div>
            </div>
            <div className = "summary-note">
              <span>{ "The total number of active road slope records from RDIS RSMS." }</span>
            </div>
          </div>
          <div className = "summary-section">
            <div className = "summary-section-header"><span>{ "Road Slopes" }</span></div>
            <div className = "summary-section-subheader"><span>{ "Type of Disasters affecting Road Slopes" }</span></div>
            <div>
              <div className = "summary-details">
                <div className = "summary-header-row">
                  <div></div>
                  <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                  <div className = "summary-column-header"><span>{ "Total" }</span></div>
                </div>
                {
                  arrayRoadSlopesTypeOfDisaster?.length > 0 ?
                    arrayRoadSlopesTypeOfDisaster.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row summary-interactive" onClick = { function () { focus_map(4, [layer_inventory_of_road_slopes], ["disaster_type"], item.name, filterLevel05Selected); } }>
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    :
                    null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRoadSlopesTypeOfDisaster ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRoadSlopesTypeOfDisaster ? arrayRoadSlopesTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRoadSlopesTypeOfDisaster ?
                            arrayRoadSlopesTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        } 
                      </Bar>
                    </BarChart>
                    :
                    null
                }
                {
                  arrayRoadSlopesTypeOfDisaster ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRoadSlopesTypeOfDisaster ? arrayRoadSlopesTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRoadSlopesTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRoadSlopesTypeOfDisaster ?
                            arrayRoadSlopesTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        }  
                      </Pie>
                    </PieChart>
                    :
                    null
                }
              </div>
            </div>
            <div className = "summary-section-subheader"><span>{ "Type of Non-Existing Road Slope Protection Structures" }</span></div>
            <div>
              <div className = "summary-details">
                <div className = "summary-header-row">
                  <div></div>
                  <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                  <div className = "summary-column-header"><span>{ "Total" }</span></div>
                </div>
                {
                  arrayRoadSlopesTypeOfRoadSlopeProtectionStructure?.length > 0 ?
                    arrayRoadSlopesTypeOfRoadSlopeProtectionStructure.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row summary-interactive" onClick = { function () { focus_map(4, [layer_inventory_of_road_slope_protection_structures], ["road_slope_structure_type"], item.name, filterLevel05Selected); } }>
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    :
                    null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRoadSlopesTypeOfRoadSlopeProtectionStructure ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRoadSlopesTypeOfRoadSlopeProtectionStructure ? arrayRoadSlopesTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRoadSlopesTypeOfRoadSlopeProtectionStructure ?
                            arrayRoadSlopesTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        } 
                      </Bar>
                    </BarChart>
                    :
                    null
                }
                {
                  arrayRoadSlopesTypeOfRoadSlopeProtectionStructure ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRoadSlopesTypeOfRoadSlopeProtectionStructure ? arrayRoadSlopesTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRoadSlopesTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRoadSlopesTypeOfRoadSlopeProtectionStructure ?
                            arrayRoadSlopesTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        }  
                      </Pie>
                    </PieChart>
                    :
                    null
                }
              </div>
            </div>
          </div>
          <div className = "summary-section">
            <div className = "summary-section-header"><span>{ "Road Slope Protection Structures" }</span></div>
            <div className = "summary-section-subheader"><span>{ "Condition of Existing Road Slope Protection Structures" }</span></div>
            <div>
              <div className = "summary-details">
                <div className = "summary-header-row">
                  <div></div>
                  <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                  <div className = "summary-column-header"><span>{ "Total" }</span></div>
                </div>
                {
                  arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure?.length > 0 ?
                    arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row summary-interactive" onClick = { function () { focus_map(4, [layer_inventory_of_road_slope_protection_structures], ["road_condition"], item.name, filterLevel05Selected); } }>
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    :
                    null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure ? arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure ?
                            arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        } 
                      </Bar>
                    </BarChart>
                    :
                    null
                }
                {
                  arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure ? arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure ?
                            arrayRoadSlopeProtectionStructuresConditionOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        }  
                      </Pie>
                    </PieChart>
                    :
                    null
                }
              </div>
            </div>
            <div className = "summary-section-subheader"><span>{ "Type of Disasters affecting Existing Road Slope Protection Structures" }</span></div>
            <div>
              <div className = "summary-details">
                <div className = "summary-header-row">
                  <div></div>
                  <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                  <div className = "summary-column-header"><span>{ "Total" }</span></div>
                </div>
                {
                  arrayRoadSlopeProtectionStructuresTypeOfDisaster?.length > 0 ?
                    arrayRoadSlopeProtectionStructuresTypeOfDisaster.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row summary-interactive" onClick = { function () { focus_map(4, [layer_inventory_of_road_slope_protection_structures], ["disaster_type"], item.name, filterLevel05Selected); } }>
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    :
                    null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRoadSlopeProtectionStructuresTypeOfDisaster ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRoadSlopeProtectionStructuresTypeOfDisaster ? arrayRoadSlopeProtectionStructuresTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRoadSlopeProtectionStructuresTypeOfDisaster ?
                            arrayRoadSlopeProtectionStructuresTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            : null
                        } 
                      </Bar>
                    </BarChart>
                    :
                    null
                }
                {
                  arrayRoadSlopeProtectionStructuresTypeOfDisaster ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRoadSlopeProtectionStructuresTypeOfDisaster ? arrayRoadSlopeProtectionStructuresTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRoadSlopeProtectionStructuresTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRoadSlopeProtectionStructuresTypeOfDisaster ?
                            arrayRoadSlopeProtectionStructuresTypeOfDisaster.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        }  
                      </Pie>
                    </PieChart>
                    :
                    null
                }
              </div>
            </div>
            <div className = "summary-section-subheader"><span>{ "Type of Existing Road Slope Protection Structures" }</span></div>
            <div>
              <div className = "summary-details">
                <div className = "summary-header-row">
                  <div></div>
                  <div className = "summary-column-header"><span>{ "Filtered" }</span></div>
                  <div className = "summary-column-header"><span>{ "Total" }</span></div>
                </div>
                {
                  arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure?.length > 0 ?
                    arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure.map(function (item, index) {
                      return (
                        <div key = { index } className = "summary-row summary-interactive" onClick = { function () { focus_map(4, [layer_inventory_of_road_slope_protection_structures], ["road_slope_structure_type"], item.name, filterLevel05Selected); } }>
                          <div className = "summary-row-header">
                            <div style = { { background: item.color } }/>
                            <span>{ item.name }</span>
                          </div>
                          <div><span>{ item.filtered }</span></div>
                          <div><span>{ item.total }</span></div>
                        </div>
                      );
                    })
                    :
                    null
                }
              </div>
              <div className = "summary-graph">
                {
                  arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure ?
                    <BarChart width = { 200 } height = { 100 } data = { arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure ? arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }>
                      <CartesianGrid strokeDasharray = "2 2"/>
                      <Bar dataKey = "value" fill = "white" maxBarSize = { 8 }>
                        {
                          arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure ?
                            arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        } 
                      </Bar>
                    </BarChart>
                    :
                    null
                }
                {
                  arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure ?
                    <PieChart width = { 100 } height = { 100 }>
                      <Pie
                        data = { arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure ? arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item) { return ({ "name": item.name, "value": item.filtered }); }) : null }
                        dataKey = "value"
                        nameKey = "name" 
                        cx = "50%" cy = "50%" 
                        labelLine = { false }
                        label = { renderCustomizedLabel }
                        outerRadius = { 40 }
                        fill = "white"
                        blendStroke = { arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).length > 1 ? false : true }
                      >
                        {
                          arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure ?
                            arrayRoadSlopeProtectionStructuresTypeOfRoadSlopeProtectionStructure.filter(function (item) { return (item.filtered > 0); }).map(function (item, index) {
                              return (
                                <Cell key = { `cell-${ index }` } fill = { item.color }/>
                              );
                            })
                            :
                            null
                        }  
                      </Pie>
                    </PieChart>
                    :
                    null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
