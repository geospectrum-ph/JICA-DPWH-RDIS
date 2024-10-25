import React from "react";

import { Routes, Route } from "react-router-dom";

import SignIn from "./modules/sign-in";

import Home from "./home";

import Dashboard from "./modules/dashboard";
import RoadInventory from "./modules/road-inventory";
import RoadSlopeAndCounterMeasures from "./modules/error";
import ExistingStructures from "./modules/error";
import PotentialStructures from "./modules/error";
import Projects from "./modules/error";
import ExistingProjects from "./modules/error";
import PotentialProjects from "./modules/error";
import StatusReports from "./modules/error";
import HazardsAndRoadClosures from "./modules/error";
import Hazards from "./modules/error";
import RoadClosures from "./modules/error";
import UserManagement from "./modules/error";

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
            <Route path = "dashboard" element = { <Dashboard/> }/>
            <Route path = "road-inventory" element = { <RoadInventory/> }/>
            <Route path = "road-slope-and-countermeasures" element = { <RoadSlopeAndCounterMeasures/> }>
              <Route path = "existing-structures" element = { <ExistingStructures/> }/>
              <Route path = "potential-structures" element = { <PotentialStructures/> }/>
            </Route>
            <Route path = "hazards-and-road-closures" element = { <HazardsAndRoadClosures/> }>
              <Route path = "hazard-risks" element = { <Hazards/> }/>
              <Route path = "road-closures" element = { <RoadClosures/> }/>
            </Route>
            <Route path = "projects" element = { <Projects/> }>
              <Route path = "existing-projects" element = { <ExistingProjects/> }/>
              <Route path = "potential-projects" element = { <PotentialProjects/> }/>
            </Route>
            <Route path = "status-reports" element = { <StatusReports/> }/>
            <Route path = "user-management" element = { <UserManagement/> }/>
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