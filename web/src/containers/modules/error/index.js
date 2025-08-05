import * as React from "react";

import { view_layer } from "../../home/map-component";

import "./index.css";

export default function ErrorPage() {
  React.useEffect(function () {
    view_layer("error");
  }, []);

  return (null);
}