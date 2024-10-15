import React from 'react';

import { MainContext } from '../../../../contexts/MainContext';

import ls2 from '../../../../assets/images/ls_road_rs_1.png'

import './index.css';
import { ArcGISMapContext } from '../../../components/map';

export default function HazardDetails() {
  const {selectedHazard} = React.useContext(MainContext)
  
  return (
    <div className='h-details-container'>
      <div className='h-details-header'>
        <div><b>Start LRP</b></div>
        <div>{selectedHazard.properties.LRP_DISP1}</div>
        <div><b>End LRP</b></div>
        <div>{selectedHazard.properties.LRP_DISP2}</div>
        <div><b>Latitude</b></div>
        <div> </div>
        <div><b>Longitude</b></div>
        <div> </div>
        <div><b>Date</b></div>
        <div>January 10, 2023</div>
        <div><b>Weather</b></div>
        <div> </div>
        <div><b>Hazard Level</b></div>
        <div>{selectedHazard.properties.HAZARD}</div>
      </div>
      <div className='h-details-body'>
        <div className='hazardm-body-causes'>
          <div className='hm-body-prop-header'><b>Item</b></div>
          <div className='hm-body-prop-header'><b>Factor</b></div>
          <div className='hm-body-prop-header'><b>Value/Category</b></div>
          <div className='hm-body-prop-header'><b>Point</b></div>
          <div className='hm-body-prop-header'><b>Score</b></div>

          <div className='hm-body-prop' style={{gridRowEnd: 'span 2'}}><b>Profile</b></div>
          <div className='hm-body-prop'>Slope height</div>
          <div className='hm-body-prop'>17m</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>10</div>

          {/* <div></div> */}
          <div className='hm-body-prop'>Slope angle</div>
          <div className='hm-body-prop'>72</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>10</div>

          <div className='line'/>

          <div className='hm-body-prop' style={{gridColumnEnd: 'span 5'}}><b>Topography</b></div>
          <div className='small-line'/>
          <div className='hm-body-prop' style={{gridRowEnd: 'span 3'}}>Collasped factor (G1)</div>
          <div className='hm-body-prop' style={{gridRowEnd: 'span 3', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}><i className='hm-prop-yes'>Collapsed slope (including past)</i><br/>Overhang</div>
          <div className='hm-body-prop'>Correspond to 2</div>
          <div className='hm-body-prop-score'>25</div>
          <div className='hm-body-prop'>20</div>

          <div className='hm-body-prop'>Correspond to 1</div>
          <div className='hm-body-prop-score'>20 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'></div>

          
          <div className='hm-body-prop'>No correspond</div>
          <div className='hm-body-prop-score'>0</div>
          <div className='hm-body-prop'></div>

          <div className='small-line'/>

          <div className='hm-body-prop'style={{gridRowEnd: 'span 3'}}>Collapsed factor (G2)</div>
          <div className='hm-body-prop'>Talrus slope</div>
          <div className='hm-body-prop'>Correspond to 2 or more</div>
          <div className='hm-body-prop-score'>10</div>
          <div className='hm-body-prop'>0</div>

          {/* <div className='hm-body-prop'></div> */}
          <div className='hm-body-prop'>Clear convex break of slope</div>
          <div className='hm-body-prop'>Correspond to 1</div>
          <div className='hm-body-prop-score'>8</div>
          <div className='hm-body-prop'></div>

          {/* <div className='hm-body-prop'></div> */}
          <div className='hm-body-prop'>Surface water castchment slope</div>
          <div className='hm-body-prop'>No Correspond</div>
          <div className='hm-body-prop-score'>0 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'></div>

          <div className='small-line'/>

          <div className='hm-body-prop'>Collapsed factor (G3)</div>
          <div className='hm-body-prop'><i className='hm-prop-yes'>Ridge, Overhang</i></div>
          <div className='hm-body-prop'>Correspond</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>

          <div className='line'/>

          <div className='hm-body-prop' style={{gridColumnEnd: 'span 5'}}><b>Geological conditions</b></div>
          <div className='small-line'/>
          <div className='hm-body-prop' style={{gridRowEnd: 'span 4'}}>Soil</div>
          <div className='hm-body-prop' style={{gridRowEnd: 'span 4'}}>Susceptible to erosion?</div>
          <div className='hm-body-prop'>Yes</div>
          <div className='hm-body-prop-score'>10</div>
          <div className='hm-body-prop'>0</div>

          <div className='hm-body-prop'>Partly yes</div>
          <div className='hm-body-prop-score'>8</div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>No</div>
          <div className='hm-body-prop-score'>0 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>Unidentified</div>
          <div className='hm-body-prop-score'>2</div>
          <div className='hm-body-prop'></div>

          <div className='small-line'/>

          <div className='hm-body-prop' style={{gridRowEnd: 'span 4'}}>Rock</div>
          <div className='hm-body-prop'><i className='hm-prop-yes'>High density of cracks</i></div>
          <div className='hm-body-prop'>Correspond to 2 or more</div>
          <div className='hm-body-prop-score'>10 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'>10</div>

          <div className='hm-body-prop'><i className='hm-prop-yes'>Weak layers</i></div>
          <div className='hm-body-prop'>Correspond to 1</div>
          <div className='hm-body-prop-score'>8</div>
          <div className='hm-body-prop'></div>


          <div className='hm-body-prop'>Susceptible to erosion</div>
          <div className='hm-body-prop'>No Correspond</div>
          <div className='hm-body-prop-score'>0</div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Unidentified</div>
          <div className='hm-body-prop-score'>2</div>
          <div className='hm-body-prop'></div>

          <div className='small-line'/>

          <div className='hm-body-prop' style={{gridRowEnd: 'span 9'}}>Structure</div>
          <div className='hm-body-prop' style={{gridRowEnd: 'span 4'}}>Slope direction of bedding plane or cracks</div>
          <div className='hm-body-prop'>Sloping towards the road, open crack</div>
          <div className='hm-body-prop-score'>10 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'>10</div>

          <div className='hm-body-prop'>Sloping towards the road, not open crack</div>
          <div className='hm-body-prop'>8</div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>Not sloping towards the road</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>Unidentified</div>
          <div className='hm-body-prop'>3</div>
          <div className='hm-body-prop'></div>

          <div className='small-line-inner'/>
          
          <div className='hm-body-prop' style={{gridRowEnd: 'span 4'}}>Non compounded sediment on impermeable bedrock</div>
          <div className='hm-body-prop'>Yes</div>
          <div className='hm-body-prop'>10</div>
          <div className='hm-body-prop'>0</div>

          <div className='hm-body-prop'>Partly yes</div>
          <div className='hm-body-prop'>8</div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>No</div>
          <div className='hm-body-prop-score'>0 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>Unidentified</div>
          <div className='hm-body-prop'>2</div>
          <div className='hm-body-prop'></div>

          <div className='line'/>

          <div className='hm-body-prop' style={{gridRowEnd: 'span 11'}}><b>Surface condition</b></div>
          <div className='hm-body-prop' style={{gridRowEnd: 'span 3'}}>Vegetation condition</div>
          <div className='hm-body-prop'>Bare land with minor vegetation</div>
          <div className='hm-body-prop-score'>10 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'>10</div>

          <div className='hm-body-prop'>Intermmediate(grass-tree)</div>
          <div className='hm-body-prop'>8</div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>Mainly tree, or mainly structure</div>
          <div className='hm-body-prop'>1</div>
          <div className='hm-body-prop'></div>

          <div className='small-line-inner'/>

          <div className='hm-body-prop' style={{gridRowEnd: 'span 3'}}>Soil or bedrock condition</div>
          <div className='hm-body-prop'>Unstable</div>
          <div className='hm-body-prop'>10</div>
          <div className='hm-body-prop'>8</div>

          <div className='hm-body-prop'>Partly unstable</div>
          <div className='hm-body-prop-score'>8 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>Stable</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'></div>

          <div className='small-line-inner'/>

          <div className='hm-body-prop' style={{gridRowEnd: 'span 3'}}>Water condition</div>
          <div className='hm-body-prop'>Spring water</div>
          <div className='hm-body-prop'>10</div>
          <div className='hm-body-prop'>0</div>

          <div className='hm-body-prop'>Seepage (up to wet condition only)</div>
          <div className='hm-body-prop'>8</div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>None</div>
          <div className='hm-body-prop-score'>0 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'></div>

          <div className='line'/>

          <div className='hm-body-prop' style={{gridRowEnd: 'span 6'}}><b>Anomaly</b></div>
          <div className='hm-body-prop'><i className='hm-prop-yes'>Surface collapse, small falling rock</i></div>
          <div className='hm-body-prop'>Correspond to 3 or more</div>
          <div className='hm-body-prop'>30</div>
          <div className='hm-body-prop'>25</div>

          <div className='hm-body-prop'>Bending of tree root, fallen tree</div>
          <div className='hm-body-prop'>Correspond to 2</div>
          <div className='hm-body-prop-score'>25 
            <span class="material-symbols-outlined">
              check
              </span>
          </div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'><i className='hm-prop-yes'>Subsidence, heaving, cracks of slope</i></div>
          <div className='hm-body-prop'>Correspond to 1</div>
          <div className='hm-body-prop'>10</div>
          <div className='hm-body-prop'></div>
        
          <div className='hm-body-prop'>Damage to slope countermeasures</div>
          <div className='hm-body-prop'>None</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>Road subsidence, bumps, cracks, etc.</div>
          <div className='hm-body-prop'>Unidentified</div>
          <div className='hm-body-prop'>5</div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'>Signs of 'landslides'</div>
          <div className='hm-body-prop'>Determine the possiblity</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>

          <div className='line'/>

          <div className='hm-body-prop' style={{gridColumnEnd: 'span 4'}}><b>Total score: Causes (A)</b></div>
          <div className='hm-body-prop'><b>103</b></div>

          <div className='line'/>

          
        </div>
        <div className='hm-csf'>
          <div className='hm-body-prop'><b>Cross sectional figure of slope</b></div>
          <div className='hm-body-prop'><img src={ls2}/></div>

          <div className='line'/>

          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><b>Slope Types</b></div>
          <div className='hm-body-prop'></div>
          <div className='small-line'/>

          <div className='hm-body-prop'>Left slope</div>
          <div className='hm-body-prop'>Cut slope</div>
          <div className='hm-body-prop'>Right slope</div>
          <div className='hm-body-prop'>none</div>
          <div className='line'/>

        </div>
        <div className='hm-csf'>
          <div className='hm-body-prop'><b>Countermeasure (B) </b></div>
          <div className='hm-body-prop'><i>(B) = (A) + a, or (A) x 0</i></div>
          <div className='hm-body-prop'>No exisiting countermeasure</div>
          <div className='hm-body-prop'>(B) = 103</div>

          <div className='line'/>

          <div className='hm-body-prop'><b>Road slope disaster history (C)</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>No road slope disasters records</div>
          <div className='hm-body-prop'>0</div>
          
          <div className='line'/>

          <div className='hm-body-prop'><b>Hazard Score (D)</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Score in evaluation from countermeasure (B)</div>
          <div className='hm-body-prop'>103</div>
          <div className='hm-body-prop'>Score in evaluation from Disaster History (C)</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'>The larger score between (B)&(C)</div>
          <div className='hm-body-prop'>103</div>
          
          <div className='line'/>

          <div className='hm-body-prop'><b>Evaluation of the Hazard Risk</b></div>
          <div className='hm-body-prop'>High</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'><b>Road Slope Disaster Type</b></div>
          <div className='hm-body-prop'>Rock Slope Collapse/Rock Fall</div>
          <div className='hm-body-prop'><b>Another Road Slope Disaster Type</b></div>
          <div className='hm-body-prop'>None</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>

          <div className='hm-body-prop'><b>Photos</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Entire slope (required)</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Notable close-up photo (1)</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Notable close-up photo (2)</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Notable close-up photo (3)</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Notable close-up photo (4)</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Notable close-up photo (5)</div>
          <div className='hm-body-prop'></div>
        </div>
      </div>
    </div>
  )
}