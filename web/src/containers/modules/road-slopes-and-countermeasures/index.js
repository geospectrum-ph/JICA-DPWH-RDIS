import * as React from "react";

import { useNavigate, Outlet } from "react-router-dom";

import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function RoadSlopesAndCounterMeasures () {
  const navigate = useNavigate();

  const { view_layer } = React.useContext(MapContext);

  const [structuresActive, setStructuresActive] = React.useState(0);

  function switch_structures (tab) {
    setStructuresActive(tab);
    navigate(`/home/road-slopes-and-countermeasures/${tab}`); 
  }

  React.useEffect(function () {
    view_layer("road-slopes-and-countermeasures");

    switch_structures("existing-structures");
  }, []);

  return (
    <div id = "road-slopes-and-countermeasures-container">
      <div>
        <div className = { structuresActive === "existing-structures" ? "active" : null } onClick = { function () { switch_structures("existing-structures"); } }>Existing Structures</div>
        <div className = { structuresActive === "potential-structures" ? "active" : null } onClick = { function () { switch_structures("potential-structures"); } }>Potential Structures</div>
      </div>
      <Outlet/>
    </div>
  );
}