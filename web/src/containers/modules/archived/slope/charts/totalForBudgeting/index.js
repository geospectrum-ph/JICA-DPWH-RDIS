import React from 'react';

import { MainContext } from '../../../../../contexts/MainContext';

import './index.css'

export default function SlopeFundingTotal() {
  const {roadProjects, annex2} = React.useContext(MainContext)

  const [budgetTotal, setBudgetTotal] = React.useState(0)

  React.useEffect(() => {
    for (var i = 0; i < annex2.length; i++) {
      setBudgetTotal(budgetTotal + (annex2[i].estimated_cost * 1000000))
    }
  }, [roadProjects])
  

  return(
    <div className='slope-total-container'>
      <div className='closure-total-header'>
        <b>PROPOSED FOR BUDGET ALLOCATION</b>
      </div>
      <div className='closure-total-body' style={{fontSize: '3.5vh'}}>
        PHP {budgetTotal}
      </div>
      <br/>

      <div className='closure-total-header'>
        <b>TOTAL PROJECTS PROPOSED FOR FUNDING</b>
      </div>
      <div className='closure-total-body'>
        {annex2.length}
      </div>
    </div>
  )
}