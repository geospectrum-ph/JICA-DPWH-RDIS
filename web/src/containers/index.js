import { Routes, Route } from "react-router-dom";

import SignIn from "./modules/sign-in";

import Home from "./home";

import Summary from "./modules/summary";
import RoadSlopeHazards from "./modules/road-slope-hazards";
import RoadSlopeInventory from "./modules/road-slope-inventory";
import PotentialRoadSlopeProtectionProjects from "./modules/potential-road-slope-protection-projects";
import FundedRoadSlopeProtectionProjects from "./modules/error";
import ProposalForFunding from "./modules/error";
import Reports from "./modules/reports";
import Settings from "./modules/error";

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
            <Route path = "road-slope-hazards" element = { <RoadSlopeHazards/> }/>
            <Route path = "road-slope-inventory" element = { <RoadSlopeInventory/> }/>
            <Route path = "potential-road-slope-protection-projects" element = { <PotentialRoadSlopeProtectionProjects/> }/>
            <Route path = "funded-road-slope-protection-projects" element = { <FundedRoadSlopeProtectionProjects/> }/>
            <Route path = "proposal-for-funding" element = { <ProposalForFunding/> }/>
            <Route path = "reports" element = { <Reports/> }/>
            <Route path = "settings" element = { <Settings/> }/>
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