import * as React from "react";

import { useNavigate, Outlet } from "react-router-dom";

import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

export default function Projects () {
  const navigate = useNavigate();

  const { view_layer } = React.useContext(MapContext);

  const [projectsActive, setProjectsActive] = React.useState(0);

  function switch_projects (tab) {
    setProjectsActive(tab);
    navigate(`/home/projects/${tab}`); 
  }

  React.useEffect(function () {
    view_layer("projects");

    switch_projects("existing-projects"); 
  }, []);

  return (
    <div id = "projects-container">
      <div>
        <div className = { projectsActive === "existing-projects" ? "active" : null } onClick = { function () { switch_projects("existing-projects"); } }>Existing Projects</div>
        <div className = { projectsActive === "potential-projects" ? "active" : null } onClick = { function () { switch_projects("potential-projects"); } }>Potential Projects</div>
      </div>
      <Outlet/>
    </div>
  );
}