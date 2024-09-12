import React from 'react';

import './index.css';

import { MainContext } from '../../../contexts/MainContext';

export default function HeaderTitle () {
  const {moduleTitle} = React.useContext(MainContext);
  return (
    <div className='row header'>
      <div>
        <b>{moduleTitle}</b>
      </div>
    </div>
  )
}