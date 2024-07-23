async function extract(source) {
  const path = require("path");

  const file_path = path.join(__dirname, "..", source);

  const mime = require("mime-types");

  const type = mime.lookup(file_path);
  
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

  /*
    The features should be of the format:

    {
      type: 'Feature',
      properties: { Name: [String], Description: [String] },
      geometry: { type: 'MultiLineString', coordinates: [Array] }
    }
  */

  return (geojson);
}

function decimal(value) {
  const sigfigs = 6;
  
  return (Math.round(value * (10 ** sigfigs)) / (10 ** sigfigs));
}

async function parse(array, parse_type) {
  function to_length(feature) {
    const turf = require("@turf/turf");

    const length = turf.length(feature, { units: "kilometers" });

    return (length);
  }
  
  function to_area(feature) {
    const geodesic = require("geographiclib-geodesic");
    const geo = geodesic.Geodesic.WGS84;

    const polygon = geo.Polygon(false);

    feature.geometry.coordinates.flat().flat().forEach((point) => {
      polygon.AddPoint(point[1], point[0]);
    });

    const measure = polygon.Compute(true, true);

    const area = Math.abs(measure.area) / 1000000;

    return (area);
  }

  function transform(feature) { 
    switch (parse_type) {
      case "to_length": return (to_length(feature));
      case "to_area": return (to_area(feature));
      default: return (null);
    }
  }

  const result = array.features.map((feature) => ({ [feature.properties.Name]: decimal(transform(feature)) })).sort((first, second) => { return (Object.values(first)[0] - Object.values(second)[0]); });

  return (result);
}

async function describe(array) {
  const size = array.length;

  const ascending  = array.sort((return_value, working_value) => { return (return_value - working_value); });

  const mean = (array.reduce((return_value, working_value) => (return_value + working_value))) / size;

  const median = size % 2 > 0 ? ascending[Math.ceil(size/2) - 1] : ((ascending[(size/2) - 1] + ascending[(size/2)]) / 2);

  const frequency = array.reduce((object, value) => { object[value] = (object[value] || 0) + 1; return (object); }, {} );

  const mode = Object.keys(frequency).filter((value) => { return (frequency[value] === Math.max.apply(null, Object.values(frequency))); }).map((value) => (parseFloat(value)));

  const minimum = array.reduce((return_value, working_value) => (return_value > working_value ? return_value = working_value : return_value));

  const maximum = array.reduce((return_value, working_value) => (return_value < working_value ? return_value = working_value : return_value));

  const variance = (array.map((value) => ((value - mean) ** 2)).reduce((return_value, working_value) => (return_value + working_value))) / (size - 1);

  const standard_deviation = variance ** (1/2);

  // const skewness = (array.map((value) => ((value - mean) ** 3)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (standard_deviation ** 3));
  const skewness = size * (array.map((value) => ((value - mean) ** 3)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (size - 2) * (standard_deviation ** 3));

  // const kurtosis = (array.map((value) => ((value - mean) ** 4)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (standard_deviation ** 4));
  const kurtosis = (((size) * (size + 1)) / ((size - 1) * (size - 2) * (size - 3))) * ((array.map((value) => ((value - mean) ** 4)).reduce((return_value, working_value) => (return_value + working_value))) / (standard_deviation ** 4)) - ((3 * (size - 1) * (size - 1)) / ((size - 2) * (size - 3)));

  return ({
    "mean": decimal(mean),
    "median": decimal(median),
    "mode": mode.length < size ? mode.map((value) => (decimal(value))) : null,
    "minimum": decimal(minimum),
    "maximum": decimal(maximum),
    "range": decimal(maximum - minimum),
    "variance": decimal(variance),
    "standard_deviation": decimal(standard_deviation),
    "skewness": decimal(skewness),
    "kurtosis": decimal(kurtosis)
  });
}

async function analyze(data, analysis) {
  function count(boundaries, features) {
    return (boundaries
      .map(function (boundary) {
        const found = [];

        features.map(function (feature) {
          const turf = require("@turf/turf");

          return (turf.booleanDisjoint(feature, boundary) ? null : found.push(feature));
        });

        return ({ [boundary.properties.Name]: found.length });
      })
      .sort((first, second) => {
        return (Object.values(first)[0] - Object.values(second)[0]);
      }));
  }

  switch (analysis) {
    case "count": return (count(data[0], data[1]));
    default: return (null);
  }

  // let temp_path = path.join(__dirname, "..", "\\public\\uploads");

  // let files = fs.readdirSync(temp_path);

  // for (const file of files) {
  //   fs.unlinkSync(path.join(temp_path, "\\", file));
  // }

  // const fs = require("fs");

  // let read_stream = fs.createReadStream(file_path);

  // const close_stream = new Promise ((resolve, reject) => {
  //   let chunks = [];

  //   read_stream.on("data", (data) => {
  //     chunks.push(data);
  //   });

  //   read_stream.on("end", () => {
  //     resolve(chunks);
  //   });
  // });

  // let data = await close_stream;

  // let result = data.map((item) => (JSON.stringify(item).length)).filter((size) => (size > 16000000));

  // console.log(result);
}

module.exports = { extract, parse, describe, analyze };