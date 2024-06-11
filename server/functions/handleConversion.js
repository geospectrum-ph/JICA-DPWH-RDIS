
async function convert(source) {
  const path = require("path");

  let file_path = path.join(__dirname, "..", source);

  const mime = require("mime-types");

  let type = mime.lookup(path);
  
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

  const initgdaljs = require("gdal3.js/node");

  const gdal = await initgdaljs();

  const options = [
    "-f", "GeoJSON",
    "-t_srs", "EPSG:4326"
  ];

    const file =
      await gdal
        .open(file_path)
        .then((response) => {
          return (response);
        })
        .catch((error) => {
          console.log(error);
        });
    
    const virtual_path = file ? await gdal.ogr2ogr(file.datasets[0], options, "output") : null;
    
    const byte_data = virtual_path ? await gdal.getFileBytes(virtual_path) : null;

    const geojson = byte_data ? JSON.parse(Buffer.from(byte_data).toString("utf8")) : null;

    console.log(geojson);

    // const admzip = require("adm-zip");

    // const zip = new admzip(path);

    // const entries = zip.getEntries();

    // const dom = require("@xmldom/xmldom");

    // let output = new Array();

    // entries.forEach((entry) => {
    //   let type = entry.entryName.split(".").pop();
    //   let file = new dom.DOMParser().parseFromString(entry.getData().toString("utf8"));
      
    //   output.push({
    //     "type": type,
    //     "file": file
    //   });
    // });
  // }
}

module.exports = { convert };