const initgdaljs = require("gdal3.js/node");

const gdal = await initgdaljs();

async function convert(source) {
  const file = await gdal.open([source]);

  const options = [
    "-f", "GeoJSON",
    "-t_srs", "EPSG:4326"
  ];

  const path = await gdal.ogr2ogr(file.datasets[0], options, "output"); 

  const data = await gdal.getFileBytes(path);

  const string = Buffer.from(data).toString("utf8");

  const output = JSON.parse(string);

  gdal.close(file);

  console.log(output);
}


const fs = require("fs");

let read_stream = fs.createReadStream(file_path);

const close_stream = new Promise ((resolve, reject) => {
  let chunks = [];

  read_stream.on("data", (data) => {
    chunks.push(data);
  });

  read_stream.on("end", () => {
    resolve(Buffer.concat(chunks));
  });
});

let data = await close_stream;

console.log(data);

// const dom = require("@xmldom/xmldom");

// const fs = require("fs");

// const tj = require("@tmcw/togeojson");

// const shapefile = require("shapefile");

// const geojson = require("geojson");

// function kmz_to_geojson(path) {
//   const admzip = require("adm-zip");
//   const zip = new admzip(path);
//   const entries = zip.getEntries();

//   let output = null;

//   entries.forEach((entry) => {
//     if (entry.entryName.split(".").pop() === "kml") {
//       let file = new dom.DOMParser().parseFromString(entry.getData().toString("utf8"));

//       output = tj.kml(file);
//     }
//   });

//   return (output);
// }

// function kml_to_geojson(path) {
//   let file = new dom.DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

//   return (tj.kml(file));
// }

// function gpx_to_geojson(path) {
//   let file = new dom.DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

//   return (tj.gpx(file));
// }

// function tcx_to_geojson(path) {
//   let file = new dom.DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

//   return (tj.tcx(file));
// }

// async function shp_to_geojson(path) {
//   return shapefile
//     .open(path)
//     .then((source) => {
//       return (source
//         .read()
//         .then((response) => {
//           console.log(response.value);
//           return (response.value);
//         })
//         .catch((error) => {
//           throw (error);
//         })
//       );
//     })
//     .then((response) => {
//       return (response);
//     })
//     .catch((error) => {
//       throw (error);
//     });
// }

async function convert(source) {

  console.log(source);

  const file = await gdal.open([source]);

  // const options = [
  //   "-f", "GeoJSON",
  //   "-t_srs", "EPSG:4326"
  // ];

  // const virtual_path = await gdal.ogr2ogr(file.datasets[0], options, "output");

  // const unparsed_data = await gdal.getFileBytes(virtual_path);

  // const string = Buffer.from(unparsed_data).toString("utf8");

  // const parsed_data = JSON.parse(string);

  // gdal.close(file);

  // console.log(parsed_data);
 
  // return (
  //   await handler(source)
  //     .then((response) => {
  //       return (response);
  //     })
  //     .catch((error) => {
  //       throw (error);
  //     })
  // );


  // let type = source.split(".").pop();

  // switch (type) {
  //   case "kmz":
  //     return (kmz_to_geojson(source));
  //   case "kml":
  //     return (kml_to_geojson(source));
  //   case "gpx":
  //     return (gpx_to_geojson(source));
  //   case "tcx":
  //     return (tcx_to_geojson(source));
  //   case "shp":
  //     return (shp_to_geojson(source));
  //   case "dbf":
  //   case "csv":
  //   case "gpkg":
  //   case "zip":
  //   default:
  //     return (null);
  // }
}

module.exports = { convert };