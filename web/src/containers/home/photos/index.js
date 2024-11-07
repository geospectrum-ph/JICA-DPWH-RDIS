import React from "react";

import { MainContext } from "../../../contexts/MainContext";

import "./index.css";

export default function Photos () {
  const {
    roadSelected
  } = React.useContext(MainContext);

  React.useEffect(function () {
    // console.log(roadSelected);
  }, [roadSelected]);

  return (
    <div id = "photos-container">
      <div>{ "Photos" }</div>
    </div>
  );
}