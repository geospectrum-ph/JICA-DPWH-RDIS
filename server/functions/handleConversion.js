
const fs = require("fs");
const admzip = require("adm-zip");
const dom = require("@xmldom/xmldom");
const tj = require("@tmcw/togeojson");
const shapefile = require("shapefile");
const geojson = require("geojson");

function kmz_to_geojson(path) {
  const zip = new admzip(path);
  const entries = zip.getEntries();

  let output = null;

  entries.forEach((entry) => {
    if (entry.entryName.split(".").pop() === "kml") {
      let file = new dom.DOMParser().parseFromString(entry.getData().toString("utf8"));

      output = tj.kml(file);
    }
  });

  return (output);
}

function kml_to_geojson(path) {
  let file = new dom.DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

  return (tj.kml(file));
}

function gpx_to_geojson(path) {
  let file = new dom.DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

  return (tj.gpx(file));
}

function tcx_to_geojson(path) {
  let file = new dom.DOMParser().parseFromString(fs.readFileSync(path, "utf8"));

  return (tj.tcx(file));
}

function shp_to_geojson(path) {
  let output = null;

  shapefile
    .open(path)
    .then((source) => {
      source
        .read()
        .then(
        //   function log(result) {
        //   if (result.done) return;
        //   console.log(result.value);
        //   return source.read().then(log);
        // }
          (response) => { console.log(response); }
        );
    })
    .catch((error) => {
      throw (error);
    });

  return (output);
}

function convert(source) {
  let type = source.split(".").pop();

  switch (type) {
    case "kmz":
      return (kmz_to_geojson(source));
    case "kml":
      return (kml_to_geojson(source));
    case "gpx":
      return (gpx_to_geojson(source));
    case "tcx":
      return (tcx_to_geojson(source));
    case "shp":
      return (shp_to_geojson(source));
    default:
      return (null);
  }
}

module.exports = { convert };
 