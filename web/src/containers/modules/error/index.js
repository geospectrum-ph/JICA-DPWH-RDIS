import * as React from "react";

import { view_layer } from "../../home/map-component";

import { MainContext } from "../../../contexts/MainContext";

import "./index.css";

export default function ErrorPage() {
  const {
    yearDefault,
    regionDefault,
    engineeringDistrictDefault
  } = React.useContext(MainContext);

  React.useEffect(function () {
    view_layer("error", yearDefault, regionDefault, engineeringDistrictDefault);
  }, []);

  return (null);
}
