import React from "react";

import { Routes, Route } from "react-router-dom";

import SignIn from "./modules/sign-in";

import Home from "./home";

import Summary from "./modules/summary";
import InventoryOfRoadSlopeStructures from "./modules/inventory-of-road-slope-structures";
import InventoryOfRoadSlopes from "./modules/inventory-of-road-slopes";
import PotentialRoadSlopeProjects from "./modules/error";
import FundedRoadSlopeProjects from "./modules/error";
import ProposalForFunding from "./modules/error";
import HazardMap from "./modules/error";
import Reports from "./modules/error";

import About from "./modules/error";
import TermsOfUse from "./modules/error";
import PrivacyPolicy from "./modules/error";
import Help from "./modules/error";

import Error from "./modules/error";

import "./index.css"

export default function App() {
  return (
    <div id = "app-container">
      <Routes>
        <Route path = "/">
          <Route index element = { <SignIn/> }/>
          <Route path = "home" element = { <Home/> }>
            <Route path = "summary" element = { <Summary/> }/>
            <Route path = "inventory-of-road-slope-structures" element = { <InventoryOfRoadSlopeStructures/> }/>
            <Route path = "inventory-of-road-slopes" element = { <InventoryOfRoadSlopes/> }/>
            <Route path = "potential-road-slope-projects" element = { <PotentialRoadSlopeProjects/> }/>
            <Route path = "funded-road-slope-projects" element = { <FundedRoadSlopeProjects/> }/>
            <Route path = "proposal-for-funding" element = { <ProposalForFunding/> }/>
            <Route path = "hazard-map" element = { <HazardMap/> }/>
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