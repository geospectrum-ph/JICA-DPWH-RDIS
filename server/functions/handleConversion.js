// const initGdalJs = require("gdal3.js");
// const path = require("path");

// initGdalJs().then((Gdal) => {});

// async function convert() {
//   const Gdal = await initGdalJs();
//   const dataset = await Gdal.open(path.join(__dirname, "..", "assets/files/sample.geojson"));

//   console.log(dataset);

//   // const file_container = file_array.datasets[0];

//   // console.log(file_container);

//   // const options = [
//   //   "-f", "GeoJSON",
//   //   "-t_srs", "EPSG:4326"
//   // ];

//   // console.log(options);

//   // console.log(file_container.path);

//   // const file_converted = await Gdal.ogr2ogr(file_container, options);

//   // const output = await Gdal.ogr2ogr(result.datasets[0], options);
//   // const bytes = await Gdal.getFileBytes(output)
  
//   // console.log(bytes);

//   Gdal.close(dataset);
// }

const initGdalJs = require("gdal3.js/node");

const path = require("path");

async function convert() {
  await Promise.all([
    (async() => {
      const Gdal = await initGdalJs();
      const dataset = await Gdal.open(path.join(__dirname, "..", "assets/files/sample.kml"));
      const options = [
        "-f", "GeoJSON",
        "-t_srs", "EPSG:4326"
      ];

      const filePath = await Gdal.ogr2ogr(dataset, options);

      // Gdal.close(dataset);
    })()
  ]);
}

module.exports = { convert };
 