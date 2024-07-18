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

async function parse(array, parse_type) {
  const turf = require("@turf/turf");

  function transform(feature) {
    switch (parse_type) {
      case "to_area": return (turf.area(feature));
      default: return (null);
    }
  }

  const result = array.features.map((feature) => ({ [feature.properties.Name]: transform(feature) }));

  return (result);
}

async function describe(array) {
  const size = array.length;

  const ascending = array.sort((return_value, working_value) => { return (return_value - working_value); });

  const mean = (array.reduce((return_value, working_value) => (return_value + working_value))) / size;

  const median = size % 2 > 0 ? ascending[Math.ceil(size/2)] : ((ascending[(size/2) - 1] + ascending[(size/2)]) / 2);

  const frequency = array.reduce((object, value) => { object[value] = (object[value] || 0) + 1; return (object); }, {} );

  const mode = Object.keys(frequency).filter((value) => { return (frequency[value] === Math.max.apply(null, Object.values(frequency))); }).map((value) => (parseFloat(value)));

  const minimum = array.reduce((return_value, working_value) => (return_value > working_value ? return_value = working_value : return_value));

  const maximum = array.reduce((return_value, working_value) => (return_value < working_value ? return_value = working_value : return_value));

  const p_25 = Math.floor((size + 1) / 4);
  const p_25_factor = ((size + 1) / 4) - p_25;
  const p_75 = Math.floor(3 * (size + 1) / 4);
  const p_75_factor = (3 * (size + 1) / 4) - p_75;

  const interquartile_range =
    (size + 1) % 4 === 0 ?
      ascending[p_75 - 1]
      - ascending[p_25 - 1]
      :
      (ascending[p_75 - 1] === ascending[p_75] ? ascending[p_75 - 1] : ascending[p_75 - 1] + (p_75_factor * (ascending[p_75] - ascending[p_75 - 1])))
      - (ascending[p_25 - 1] === ascending[p_25] ? ascending[p_25 - 1] : ascending[p_25 - 1] + (p_25_factor * (ascending[p_25] - ascending[p_25 - 1])));

  const variance = (array.map((value) => ((value - mean) ** 2)).reduce((return_value, working_value) => (return_value + working_value))) / (size - 1);

  const standard_deviation = variance ** (1/2);

  const skewness = (array.map((value) => ((value - mean) ** 3)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (standard_deviation ** 3));

  const kurtosis = (array.map((value) => ((value - mean) ** 4)).reduce((return_value, working_value) => (return_value + working_value))) / ((size - 1) * (standard_deviation ** 4));

  return ({
    "mean": mean,
    "median": median,
    "mode": mode.length < size ? mode : null,
    "minimum": minimum,
    "maximum": maximum,
    "range": (maximum - minimum),
    "interquantile_range": interquartile_range,
    "variance": variance,
    "standard_deviation": standard_deviation,
    "skewness": skewness,
    "kurtosis": kurtosis
  });
}

async function analyze(data, analysis) {
  const turf = require("@turf/turf");

  function count_points_in_boundaries(boundaries, points) {
    const count_array = boundaries.map(function (boundary) {
      let count = 0;

      points.map(function (point) {
        turf.booleanPointInPolygon(point, boundary) ? count++ : null;
      });

      return ({ [boundary.properties.Name]: count });
    });

    return (count_array);
  }

  switch (analysis) {
    case "count_points_in_boundaries": return (count_points_in_boundaries(data[0], data[1]));
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