import React from "react";

import { Routes, Route } from "react-router-dom";

import SignIn from "./modules/sign-in";

import Home from "./home";

import Summary from "./modules/summary";
import RoadSlopeInventory from "./modules/road-inventory";
import PotentialRoadSlopeProjects from "./modules/potential-road-slopes";
import FundedRoadSlopeProjects from "./modules/error";
import ProposalForFunding from "./modules/error";
import HazardMap from "./modules/hazard-map";
import Reports from "./modules/error";

import About from "./modules/error";
import TermsOfUse from "./modules/error";
import PrivacyPolicy from "./modules/error";
import Help from "./modules/error";

import Error from "./modules/error";

import "./index.css"

export default function App() {
  window.addEventListener("offline", function (event) {
    console.log("Web application is offline.");
  });
  
  return (
    <div id = "app-container">
      <Routes>
        <Route path = "/">
          <Route index element = { <SignIn/> }/>
          <Route path = "home" element = { <Home/> }>
            <Route path = "summary" element = { <Summary/> }/>
            <Route path = "hazard-map" element = { <HazardMap/> }/>
            <Route path = "road-slope-inventory" element = { <RoadSlopeInventory/> }/>
            <Route path = "potential-road-slope-projects" element = { <PotentialRoadSlopeProjects/> }/>
            <Route path = "funded-road-slope-projects" element = { <FundedRoadSlopeProjects/> }/>
            <Route path = "proposal-for-funding" element = { <ProposalForFunding/> }/>
            <Route path = "reports" element = { <Reports/> }/>
          </Route>
          <Route path = "about" element = { <About/> }/>
          <Route path = "terms-of-use" element = { <TermsOfUse/> }/>
          <Route path = "privacy-policy" element = { <PrivacyPolicy/> }/>
          <Route path = "help" element = { <Help/> }/>
          <Route path = "*" element = { <Error/> }/>
        </Route>
      </Routes>
    </div>
  );
}