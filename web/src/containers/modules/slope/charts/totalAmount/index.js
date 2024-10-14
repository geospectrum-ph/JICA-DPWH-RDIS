import React from 'react';

import { MainContext } from '../../../../../contexts/MainContext';

import './index.css'

export default function SlopeProjectTotal() {
  const {roadProjects} = React.useContext(MainContext)

  const [budgetTotal, setBudgetTotal] = React.useState(0)

  React.useEffect(() => {
    for (var i = 0; i < roadProjects.length; i++) {
      setBudgetTotal(budgetTotal + roadProjects[i].properties.approved_amount)
    }
  }, [roadProjects])
  

  return(
    <div className='closure-total-container'>
      <div className='closure-total-header'>
        <b>TOTAL BUDGET ALLOCATION</b>
      </div>
      <div className='closure-total-body'>
        PHP {budgetTotal}
      </div>
      <br/>
      <div className='closure-total-header'>
        <b>TOTAL NUMBER OF ROAD SLOPE PROJECTS</b>
      </div>
      <div className='closure-total-body'>
        {roadProjects.length}
      </div>
    </div>
  )
}