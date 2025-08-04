import * as React from "react";

// import { MapContext } from "../../../contexts/MapContext";

import "./index.css";

import { ViewLayer } from "../../../contexts/MapComponent";

export default function ErrorPage() {
  // const {
  //   ViewLayer
  // } = React.useContext(MapContext);

  React.useEffect(function () {
    ViewLayer("error");
  }, []);

  return (null);
}