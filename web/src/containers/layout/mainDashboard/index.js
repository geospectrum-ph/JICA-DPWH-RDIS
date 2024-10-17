import React from "react";
import { Route, Routes } from "react-router-dom";

import { MainContext } from "../../../contexts/MainContext";
import { ArcGISMapContext } from "../../components/map";

import TitleBar from "../../components/title";
import HeaderBar from "../../components/appBar";
import AreaFilter from "../../components/filters";

import MainDashboard from "../../modules/dashboard";
import SlopeModule from "../../modules/slope";
import HazardModule from "../../modules/hazard";
import RoadInformation from "../../components/roadInformation";
import EmergencyModule from "../../modules/emergency";

import "./index.css";

export default function DashboardLayout () {
  const { moduleSelect, selectedSection } = React.useContext(MainContext);
  const { ArcGISMap } = React.useContext(ArcGISMapContext);

  /*
  <Route path = "/dashboard" element = { <Dashboard/> }/>
  <Route path = "/road" element = { <RoadInventory/> }/>
  <Route path = "/slope" element = { <RoadSlopeInventory/> }/>
  <Route path = "/slope/existing" = { <ExistingRoadSlopeStructures/> }/>
  <Route path = "/slope/potential" = { <PotentialRoadSlopeStructures/> }/>
  <Route path = "/project" element = { <ProjectsInventory/> }/>
  <Route path = "/project/existing" = { <ExistingProjects/> }/>
  <Route path = "/project/potential" = { <PotentialProjects/> }/>
  <Route path = "/funding" element = { <EvaluationForFundingProposal/> }/>
  <Route path = "/status" element = { <ProjectStatusReports/> }/>
  <Route path = "/hazard" element = { <HazardsAndRoadClosures/> }/>
  <Route path = "/hazard/potential" element = { <HazardsPotentials/> }/>
  <Route path = "/hazard/actual" element = { <RoadClosures/> }/>
  <Route path = "/user" element = { <UserManagement/> }/>
  */

  return (
    <div className = "layout-container">
      <TitleBar/>
      <HeaderBar/>
      {/* <AreaFilter/> */}
      <div>
        <div>
          <Routes>
            {/* <Route path = "/dashboard" element = { <MainDashboard/>}/>
            <Route path = "/slope" element = { <SlopeModule/> }/>
            <Route path = "/slope/:id" />
            <Route path = "/emergency" element = { <EmergencyModule/> }/>
            <Route path = "/hazard" element = { <HazardModule/> }/>
            <Route path = "/user" /> */}
          </Routes>
        </div>
        <div className = { moduleSelect === "user" || moduleSelect === "status" ? "hidden" : "visible" }>
          <ArcGISMap/>
        </div>
      </div>
    </div>
  );
}