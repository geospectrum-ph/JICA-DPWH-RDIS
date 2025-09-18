import * as React from "react";

import { MainContext } from "../../../contexts/MainContext";

import { view_layer } from "../../home/map-component";

import "./index.css";

export default function ErrorPage() {
  const { filterLevel05Selected } = React.useContext(MainContext);

  React.useEffect(function () {
    view_layer("error", filterLevel05Selected);
  }, []);

  return (null);
}
