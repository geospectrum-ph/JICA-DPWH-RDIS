import React from "react";

import { MainContext } from "../../../contexts/MainContext";
import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

import RoadsLists from './roadSections';
import ClosureTotal from '../emergency/charts/closureTotal';
import DashboardClassPieChart from './byRoadClassification';
import ClassPieChart from '../emergency/charts/byRoadClassification';
import HighRiskTotal from '../hazard/charts/totalLength';
import HazardRegionListChart from '../hazard/charts/byRegion';
import SlopeProjectTotal from '../slope/charts/totalAmount';
import SlopeFundingTotal from '../slope/charts/totalForBudgeting';

export default function Dashboard() {
  const { text_content } = React.useContext(MainContext);
  const {  } = React.useContext(MapContext);

  return (
    <div id = "dashboard-container">
      <div>
        <div>
          { text_content.dashboard.title }
        </div>
        <div>
          { text_content.dashboard.description }
        </div>
      </div>
      {/* <div className='md-roadsections'>
        <RoadsLists/>
      </div> */}
{/*       
      {moduleSummarySelect === 'dashboard' ? 
        <div className='md-modules'>
          <ClosureTotal/>
          <div className='md-general-charts-main'>
            <DashboardClassPieChart/>
          </div>
        </div>
      : moduleSummarySelect === 'slope' ? 
        <div className='md-modules-slope'>
          <SlopeProjectTotal/>
          <SlopeFundingTotal/>
          <div className='md-general-charts'>
            <SlopeProjectTotal/>
          </div>
        </div>

      : moduleSummarySelect === 'emergency' ? 
        <div className='md-modules'>
          <ClosureTotal/>
          <div className='md-general-charts'>
            <ClassPieChart/>
          </div>
          

        </div>
      : moduleSummarySelect === 'hazard' ? 
      <div className='md-modules'>
        <HighRiskTotal/>
        <div className='md-general-charts'>
          <HazardRegionListChart/>
        </div>
      </div>
    : null} */}
        

      
    </div>
  )
}