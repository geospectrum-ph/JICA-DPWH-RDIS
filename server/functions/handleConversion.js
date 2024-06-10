const initgdaljs = require("gdal3.js/node");

const mime = require("mime-types");

function open_zip(path) {
  const admzip = require("adm-zip");

  const zip = new admzip(path);
  
  const entries = zip.getEntries();

  let output = new Array();

  entries.forEach((entry) => {
    output.push(entry.getData());
  })

  return (output);
}

async function convert(source) {
  const gdal = await initgdaljs();
  
  let type = mime.lookup(source);
  
  /*
    mime.lookup(/path/) will return
    > "text/plain" - for paths for files with a .TXT extension
    > "text/csv" - for paths for files with a .CSV extension
    > "application/geo+json" - for paths for files with a .GEOJSON extension
    > "application/zip" - for paths for files with a .ZIP extension
    > "application/vnd.google-earth.kmz" - for paths for files with a .KMZ extension
    > "application/vnd.google-earth.kml+xml" - for paths for files with a .KML extension
    > "application/vnd.dbf" - for paths for files with a .DBF extension
    > false - for paths for files with .GPKG, .QGZ, .QMD, .SHP, .SHX, and .PRJ extensions
  */

  if (type === "application/zip" || type === "application/vnd.google-earth.kmz") {
    let file_array = open_zip(source);
    console.log(file_array);
  }

  // const file = await gdal
  //   .open([source])
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

module.exports = { convert };