import React from "react";

import ExcelJS from "exceljs";

import { saveAs } from "file-saver";

import "./index.css";

export default function ExcelExport({ data, fileName }) {
  const exportToExcel = async(e) => {
    e.preventDefault();

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

      data.forEach(function (item) {
        worksheet.addRow(item);
      });

      const buffer = await workbook.xlsx.writeBuffer();

      saveAs(new Blob([buffer]), `${fileName}.xlsx`);
    }
    catch (error) {
      console.error("Error exporting data to Excel: ", error);
    }
    
  };


  return (
    <div className = "export-button-container">
      <button className = "export-button" onClick = { exportToExcel }>Export { fileName } to Excel</button>
    </div>
  );
}
