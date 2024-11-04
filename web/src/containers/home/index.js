import * as React from "react";

import { Outlet } from "react-router-dom";

import { MainContext } from "../../contexts/MainContext";
import { MapContext } from "../../contexts/MapContext";

import TitleBar from "../components/title-bar";
import ModuleBar from "../components/module-bar";

import "./index.css";

function HomePage () {
  const {
    // modules, moduleSelected,
    setRoadSections,
    setInventoryOfRoadSlopeStructuresData,
    setInventoryOfRoadSlopesData,
    // setPotentialRoadSlopeProjectsData,
    // setFundedRoadSlopeProjectsData,
    // setProposalForFundingData,
    // setHazardMapData,
    // setReportsData
  } = React.useContext(MainContext);

  const {
    layer_road_sections,

    MapComponent
  } = React.useContext(MapContext);

  function query_road_sections () {
    layer_road_sections
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: true,
        outFields: ["*"]
      })
      .then(function (response) {
        // setRoadSections(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_inventory_of_road_slope_structures () {
    layer_road_sections
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setInventoryOfRoadSlopeStructuresData(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function query_inventory_of_road_slopes () {
    layer_road_sections
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        setInventoryOfRoadSlopesData(response.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // function query_potential_road_slope_projects () {
  //   layer_potential_road_slope_projects
  //     .queryFeatures({
  //       where: "1 = 1",
  //       returnGeometry: false,
  //       outFields: ["*"]
  //     })
  //     .then(function (response) {
  //       setPotentialRoadSlopeProjectsData(response.features);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // function query_funded_road_slope_projects () {
  //   layer_funded_road_slope_projects
  //     .queryFeatures({
  //       where: "1 = 1",
  //       returnGeometry: false,
  //       outFields: ["*"]
  //     })
  //     .then(function (response) {
  //       setFundedRoadSlopeProjectsData(response.features);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // function query_proposal_for_funding () {
  //   layer_proposal_for_funding
  //     .queryFeatures({
  //       where: "1 = 1",
  //       returnGeometry: false,
  //       outFields: ["*"]
  //     })
  //     .then(function (response) {
  //       setProposalForFundingData(response.features);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // function query_hazard_map () {
  //   layer_hazard_map
  //     .queryFeatures({
  //       where: "1 = 1",
  //       returnGeometry: false,
  //       outFields: ["*"]
  //     })
  //     .then(function (response) {
  //       setHazardMapData(response.features);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // function query_reports () {
  //   layer_reports
  //     .queryFeatures({
  //       where: "1 = 1",
  //       returnGeometry: false,
  //       outFields: ["*"]
  //     })
  //     .then(function (response) {
  //       setReportsData(response.features);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  React.useEffect(function () {
    query_road_sections();
    // query_inventory_of_road_slope_structures();
    // query_inventory_of_road_slopes();
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