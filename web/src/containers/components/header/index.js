import React from "react";

import { MainContext } from "../../../contexts/MainContext";

import "./index.css";

export default function HeaderTitle () {
  const { moduleTitle } = React.useContext(MainContext);

  return (
    <div className='row header'>
      <div>
        <b>{moduleTitle}</b>
      </div>
    </div>
  );
}