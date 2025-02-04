import * as React from "react";

import { MapContext } from "../../../contexts/MapContext";

import "./index.css";


export default function ErrorPage() {

  const {
    view_layer
  } = React.useContext(MapContext);

  React.useEffect(function () {
    view_layer("error");
  }, []);

  return (null
    // <div id = "error-container">
    //   { "PAGE NOT FOUND!" }
    // </div>
  )
}