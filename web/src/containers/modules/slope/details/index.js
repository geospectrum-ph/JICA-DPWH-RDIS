import React from 'react';
import { useParams } from 'react-router-dom';

import './index.css';
import { MainContext } from '../../../../contexts/MainContext';

export default function SlopeDetails () {
  const {selectedInventory} = React.useContext(MainContext)

  const {id} = useParams()
  console.log(id)
  return (
    <div className='sld-container'>
      <div className='sld-header'>
        <div className='sld-header-back'>
          <b><span className="material-symbols-outlined">
            arrow_back
          </span></b>
        </div>
        <div className='sld-header-title'>
          k
        </div>
        <div className='sld-header-buttons'>

        </div>
      </div>
      <div className='sld-body'>

      </div>
    </div>
  )
}