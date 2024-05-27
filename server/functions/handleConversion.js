const initGdalJs = require("gdal3.js/node");

const fs = require("fs");

const path = require("path");

async function convert() {
  const gdal = await initGdalJs();
  
  const options = [
    "-f", "GeoJSON",
    "-t_srs", "EPSG:4326"
  ];

  // const options = [ "format", "KML" ];

  let source = path.join(__dirname, "..", "assets/files/sample.kml");

  console.log(source);

  let file = await gdal.open(source).then((response) => { return (response); }).catch((error) => { console.log(error); return (null); }); // returns Promise.<TypeDefs.DatasetList>

  console.log(file);

  let info = await gdal.ogr2ogr(file.datasets[0], options, "sample").then((response) => { return (response); }).catch((error) => { console.log(error); return (null); });

  console.log(info);

  let somewhere = path.join(__dirname, "..", "assets/files", info.all[0].local);

  console.log(somewhere);

  // let output = await gdal.open(somewhere).then((response) => { return (response); }).catch((error) => { console.log(error); return (null); }); // returns Promise.<TypeDefs.DatasetList>

  // console.log(output);
}

module.exports = { convert };
 