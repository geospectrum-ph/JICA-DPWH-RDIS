import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../../../contexts/MainContext';

import './index.css'

export default function HazardDetails() {
  const {selectedHazard} = React.useContext(MainContext)
  const navigate = useNavigate();

  return (
    <div className='sld-container'>
      <div className='sld-header'>
        <div className='sld-header-back' onClick={()=>navigate('/home/hazard')}>
          <b><span class="material-symbols-outlined">
            arrow_back
          </span></b>
        </div>
        <div className='sld-header-title'>
          <b>{selectedHazard.SECTION_ID} {selectedHazard.ROAD_NAME}</b>
        </div>
        <div className='hm-header-buttons'>
          <div className='hm-header-button'>
            <b><span class="material-symbols-outlined">
              edit
            </span></b>
          </div>
          <div className='hm-header-button'>
            <b><span class="material-symbols-outlined">
              print
            </span></b>
          </div>
        </div>
      </div>
      <div className='hm-body'>
        <div className='hm-body-prop'><b>Region</b></div>
        <div className='hm-body-prop'>{selectedHazard.REGION}</div>
        <div className='hm-body-prop'><b>Start LRP</b></div>
        <div className='hm-body-prop'>{selectedHazard.LRP_DISP1}</div>
        <div className='hm-body-prop'><b>DEO</b></div>
        <div className='hm-body-prop'>{selectedHazard.DEO}</div>
        <div className='hm-body-prop'><b>End LRP</b></div>
        <div className='hm-body-prop'>{selectedHazard.LRP_DISP2}</div>
        <div className='hm-body-prop'><b>Congressional District</b></div>
        <div className='hm-body-prop'>{selectedHazard.CONG_DIST}</div>
        <div className='hm-body-prop'><b>Section ID</b></div>
        <div className='hm-body-prop'>{selectedHazard.SECTION_ID}</div>
        <div className='hm-body-prop'><b>Road Name</b></div>
        <div className='hm-body-prop'>{selectedHazard.ROAD_NAME}</div>
        <div className='hm-body-prop'><b>Hazard Evaluation</b></div>
        <div className='hm-body-prop'>{selectedHazard.HAZARD}</div>
        <div className='hm-body-prop'></div>
        <div className='hm-body-prop'></div>
        <div className='hm-body-prop'></div>
        <div className='hm-body-prop'></div>
        <div className='hm-body-prop'><b>Date of Survey</b></div>
        <div className='hm-body-prop'>October 2, 2023</div>
        <div className='hm-body-prop'><b>Weather</b></div>
        <div className='hm-body-prop'>Cloudy</div>
        <div className='hm-body-prop'><b>Latitude</b></div>
        <div className='hm-body-prop'> </div>
        <div className='hm-body-prop'><b>Longitude</b></div>
      </div>
      <div className='hm-details'>
        <div className='hm-body-causes'>
          <div className='hm-body-prop'><b>Profile</b></div>
          <div className='hm-body-prop'><b>Value/factor</b></div>
          <div className='hm-body-prop'><b>Score</b></div>
          <div className='hm-body-prop'>Slope height</div>
          <div className='hm-body-prop'>17m</div>
          <div className='hm-body-prop'>10</div>
          <div className='hm-body-prop'>Slope angle</div>
          <div className='hm-body-prop'>72</div>
          <div className='hm-body-prop'>10</div>
          <div className='hm-body-prop'><b>Topography</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Collasped factor (G1)</div>
          <div className='hm-body-prop'><b>Collapsed slope (including past)</b></div>
          <div className='hm-body-prop'>20</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Overhang</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Collapsed factor (G2)</div>
          <div className='hm-body-prop'>Talrus slope</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Clear convex break of slope</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Surface water castchment slope</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Collapsed factor (G3)</div>
          <div className='hm-body-prop'><b>Ridge, Overhang</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><b>Geological conditions</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Soil</div>
          <div className='hm-body-prop'>Susceptible to erosion</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'>Rock</div>
          <div className='hm-body-prop'><b>High density of cracks</b></div>
          <div className='hm-body-prop'>10</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><b>Weak layers</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Susceptible to erosion</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Structure</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><i>Slope direction of bedding plane or cracks</i></div>
          <div className='hm-body-prop'>Sloping towards the road</div>
          <div className='hm-body-prop'>10</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><i>Non compounded sediment on impermeable bedrock</i></div>
          <div className='hm-body-prop'>No</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><b>Surface condition</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Vegetation condition</div>
          <div className='hm-body-prop'><i>Bare land with minor vegetation</i></div>
          <div className='hm-body-prop'>10</div>
          <div className='hm-body-prop'><i>Soil or bedrock condition</i></div>
          <div className='hm-body-prop'>Partle stable</div>
          <div className='hm-body-prop'>8</div>
          <div className='hm-body-prop'><i>Water condition</i></div>
          <div className='hm-body-prop'>None</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'><b>Anomaly</b></div>
          <div className='hm-body-prop'><b>Surface collapse, small falling rock</b></div>
          <div className='hm-body-prop'>25</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Bending of tree root, fallen tree</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><b>Subsidence, heaving, cracks of slope</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Damage to slope countermeasures</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Road subsidence, bumps, cracks, etc.</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><b>Total score: Causes (A)</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>73</div>
        </div>
        <div className='hm-csf'>
          <div className='hm-body-prop'><b>Cross sectional figure of slope</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><b>Slope Types</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Left slope</div>
          <div className='hm-body-prop'>Cut slope</div>
          <div className='hm-body-prop'>Right slope</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><b>Countermeasure</b></div>
          <div className='hm-body-prop'><i>(B) = (A) + a, or (A) x 0</i></div>
          <div className='hm-body-prop'>No exisiting countermeasure</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'><b>Road slope disaster history (C)</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>No road slope disasters records</div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'></div>
        
          <div className='hm-body-prop'><b>Hazard Score (D)</b></div>
          <div className='hm-body-prop'></div>
          <div className='hm-body-prop'>Score in evaluation from countermeasure (B)</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'>Score in evaluation from Disaster History (C)</div>
          <div className='hm-body-prop'>0</div>
          <div className='hm-body-prop'>The larger score between (B)&(C)</div>
          <div className='hm-body-prop'>0</div>


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