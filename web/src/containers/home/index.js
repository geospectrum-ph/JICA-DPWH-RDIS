import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

import TitleBar from "../components/title-bar";
import ModuleBar from "../components/module-bar";

import "./index.css";

function HomePage () {
  const {
    modules, moduleSelected,

    setExistingRoadSlopesData,
    setNonExistingRoadSlopesData,
    setPotentialRoadSlopeProjectsData,
    setFundedRoadSlopeProjectsData,
    setProposalForFundingData,
    setHazardMapData,
    setReportsData
  } = React.useContext(MainContext);

  const {
    layer_existing_road_slopes,
    layer_non_existing_road_slopes,
    layer_potential_road_slope_projects,
    layer_funded_road_slope_projects,
    layer_proposal_for_funding,
    layer_hazard_map,
    layer_reports,

    MapComponent
  } = React.useContext(MapContext);

  function query_existing_road_slopes () {
    layer_existing_road_slopes
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setExistingRoadSlopesData(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_non_existing_road_slopes () {
    layer_non_existing_road_slopes
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setNonExistingRoadSlopesData(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_potential_road_slope_projects () {
    layer_potential_road_slope_projects
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setPotentialRoadSlopeProjectsData(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_funded_road_slope_projects () {
    layer_funded_road_slope_projects
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setFundedRoadSlopeProjectsData(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_proposal_for_funding () {
    layer_proposal_for_funding
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setProposalForFundingData(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_hazard_map () {
    layer_hazard_map
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setHazardMapData(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_reports () {
    layer_reports
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setReportsData(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  React.useEffect(function () {
    // query_existing_road_slopes();
    // query_non_existing_road_slopes();
    // query_potential_road_slope_projects();
    // query_funded_road_slope_projects();
    // query_proposal_for_funding();
    // query_hazard_map();
    // query_reports();
  }, []);

  return (
    <div id = "home-container">
      <div>
        <TitleBar/>
      </div>
      <div>
        <ModuleBar/>
      </div>
      <div>
        <div>
          <Outlet/>
        </div>
        <div >
          <MapComponent/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;