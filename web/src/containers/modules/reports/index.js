import * as React from "react";

import ExcelJS from "exceljs";

import { saveAs } from "file-saver";

import {
  view_layer,
  layer_road_slope_hazards,
  layer_road_slopes_and_countermeasures
} from "../../home/map-component";

import "./index.css";

function ExcelExport({ data, fileName }) {
  async function exportToExcel (event) {
    event.preventDefault();

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");

      worksheet.columns = Object
        .keys(data[0])
        .map(function (key) {
          return ({
            header: key,
            key: key,
            width: 20
          });
        });

      data
        .forEach(function (item) {
          worksheet
            .addRow(item);
        });

      const buffer = await workbook.xlsx.writeBuffer();

      saveAs(new Blob([buffer]), `${fileName}.xlsx`);
    }
    catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className = "export-button-container">
      <button className = "export-button" onClick = { function (event) { exportToExcel(event); } }>{ `Export ${ fileName } to Excel` }</button>
    </div>
  );
}

export default function Reports() {
  React.useEffect(function () {
    view_layer("reports");
  }, []);

  const [arrayRoadSlopeHazards, setArrayRoadSlopeHazards] = React.useState([]);
  const [arrayRoadSlopesAndCountermeasures, setArrayRoadSlopesAndCountermeasures] = React.useState([]);

  React.useEffect(function () {
    layer_road_slope_hazards
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          let arrayRoadSlopeHazardsBuffer = [];

          for (const feature of response.features) {
            arrayRoadSlopeHazardsBuffer = [...arrayRoadSlopeHazardsBuffer, JSON.parse(JSON.stringify(feature.attributes))];
            setArrayRoadSlopeHazards([...arrayRoadSlopeHazardsBuffer]);
          }
        }
      })

    layer_road_slopes_and_countermeasures
      .queryFeatures({
        where: "1 = 1",
        returnGeometry: false,
        outFields: ["*"]
      })
      .then(function (response) {
        if (response?.features) {
          let arrayRoadSlopesAndCountermeasuresBuffer = [];

          for (const feature of response.features) {
            arrayRoadSlopesAndCountermeasuresBuffer = [...arrayRoadSlopesAndCountermeasuresBuffer, JSON.parse(JSON.stringify(feature.attributes))];
            setArrayRoadSlopesAndCountermeasures([...arrayRoadSlopesAndCountermeasuresBuffer]);
          }
        }
      })
  }, []);

  return (
    <div id = "reports-container">
      <div>
        <span>{ "Reports" }</span>
      </div>
      <div >
        <ExcelExport data = { arrayRoadSlopeHazards } fileName = "Road Slope Hazards"/>
        <ExcelExport data = { arrayRoadSlopesAndCountermeasures } fileName = "Road Slope Inventory"/>
      </div>
    </div>
  );
}
