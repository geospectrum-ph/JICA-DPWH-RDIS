/* This file serves as the router file for the SEEDs Rebuild application. */
/* It routes requests for database information from the MongoDB server database. */

const mongoose = require("mongoose");

var router = require("express").Router();

const path = require("path");

const multer = require("multer");

const { extract, parse, describe, analyze } = require("./functions/handleConversion");
const { encrypt, decrypt } = require("./functions/handleEncryption");

// const usersData = mongoose.model("database/users",
//   new mongoose.Schema({
//     "username": { type: String },
//     "name": { type: String },
//     "password": { type: Object }
//   })
// );

// router.route("/user/sign-in/").post((request, response) => {
//   usersData
//     .find({})
//     .then((data) => {
//       let found = data.find((object) => object.username === request.body.username);

//       if (found === (null || undefined)) {
//         response.json({
//           note: "Please enter a valid username and password.",
//           code: 400
//         });
//       }
//       else if (decrypt(found.password) !== request.body.password) {
//         response.json({
//           note: "Please enter a valid username and password.",
//           code: 403
//         });
//       }
//       else {
//         response.json({
//           note: "Successful user authentication!",
//           code: 200
//         });
//       }
//     })
//     .catch((error) => {
//       response.status(400).json("Error: " + error);
//     });
// });

// router.route("/user/change-password/").post((request, response) => {
//   usersData
//     .find({})
//     .then((data) => {
//       let found = data.find((object) => object.username === request.body.username);

//       if (found === (null || undefined)) {
//         response.json({
//           note: "Please enter a valid username and password.",
//           code: 400
//         });
//       }
//       else if (decrypt(found.password) !== request.body.password) {
//         response.json({
//           note: "Please enter a valid username and password.",
//           code: 403
//         });
//       }
//       else {
//         if (request.body.newPassword !== request.body.clonePassword) {
//           response.json({
//             note: "The entered passwords do not match.",
//             code: 400
//           });
//         }
//         else { 
//           usersData
//             .findOneAndUpdate({
//               username: found.username,
//               password: found.password
//             }, {
//               password: encrypt(request.body.newPassword)
//             })
//             .then(() => {
//               response.json({
//                 note: "Successful password update!",
//                 code: 200
//               });
//             })
//             .catch((error) => {
//               response.status(400).json("Error: " + error);
//             });
//         }
//       }
//     })
//     .catch((error) => {
//       response.status(400).json("Error: " + error);
//     });
// });

// const unclassifiedData = mongoose.model("database/files/unclassified",
//   new mongoose.Schema({
//     "name": { type: String },
//     "file": { type: Object },
//     "aspect": { type: String },
//     "tags": { type: Array }
//   })
// );

// const socialData = mongoose.model("database/files/social",
//   new mongoose.Schema({
//     "name": { type: String },
//     "file": { type: Object },
//     "aspect": { type: String },
//     "tags": { type: Array }
//   })
// );

// const economicData = mongoose.model("database/files/economic",
//   new mongoose.Schema({
//     "name": { type: String },
//     "file": { type: Object },
//     "aspect": { type: String },
//     "tags": { type: Array }
//   })
// );

// const environmentalData = mongoose.model("database/files/environmental",
//   new mongoose.Schema({
//     "name": { type: String },
//     "file": { type: Object },
//     "aspect": { type: String },
//     "tags": { type: Array }
//   })
// );

// const demographicData = mongoose.model("database/files/demographic",
//   new mongoose.Schema({
//     "name": { type: String },
//     "file": { type: Object },
//     "aspect": { type: String },
//     "tags": { type: Array }
//   })
// );

// router.route("/data/fetch/").post((request, response) => {
//   let object = {
//     unclassified: null,
//     social: null,
//     economic: null,
//     environmental: null,
//     demographic: null
//   }

//   Promise
//     .all([
//       unclassifiedData
//         .find({})
//         .then((data) => {
//           Object.assign(object, { unclassified: data });
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         }),
//       socialData
//         .find({})
//         .then((data) => {
//           Object.assign(object, { social: data });
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         }),
//       economicData
//         .find({})
//         .then((data) => {
//           Object.assign(object, { economic: data });
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         }),
//       environmentalData
//         .find({})
//         .then((data) => {
//           Object.assign(object, { environmental: data });
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         }),
//       demographicData
//         .find({})
//         .then((data) => {
//           Object.assign(object, { demographic: data });
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         })
//     ])
//     .then(() => {
//       response.json(object);
//     })
//     .catch((error) => {
//       response.status(400).json("Error: " + error);
//     });  
// });

// const storage = multer.diskStorage({
//   destination:
//     function (request, file, callback) {
//       callback(null, "./src/assets/files");
//     },
//   filename:
//     function (request, file, callback) {
//       callback(null, file.originalname);
//     }
// });

// const upload = multer({ storage: storage }).fields([{ name: "file" }]);

// async function translate() {
//   let output = await convert(source)
//     .then((response) => {
//       return (response);
//     })
//     .catch((error) => {
//       throw (error);
//     });

//   return (output);
// }

// translate()
//   .then((response) => {
//     return (response);
//   })
//   .catch((error) => {
//     throw (error);
//   });

// function create(object, request) {
//   let tags = request.body.tags.split(" ").filter((word) => word.length > 0).splice(0, 5);

//   switch (request.body.category) {
//     case "unclassified": 
//       unclassifiedData
//         .create({
//           name: request.files.file[index].originalname,
//           file: object,
//           aspect: request.body.category,
//           tags: tags
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     case "social":
//       socialData
//         .create({
//           name: request.files.file[index].originalname,
//           file: object,
//           aspect: request.body.category,
//           tags: tags
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => { 
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     case "economic":
//       economicData
//         .create({
//           name: request.files.file[index].originalname,
//           file: object,
//           aspect: request.body.category,
//           tags: tags
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     case "environmental":
//       environmentalData
//         .create({
//           name: request.files.file[index].originalname,
//           file: object,
//           aspect: request.body.category,
//           tags: tags
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     case "demographic":
//       demographicData
//         .create({
//           name: request.files.file[index].originalname,
//           file: object,
//           aspect: request.body.category,
//           tags: tags
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     default:
//       return (null);
//   }
// }

// const unclassifiedData = mongoose.model("database/files/unclassified",
//   new mongoose.Schema({
//     "name": { type: String },
//     "file": { type: Object }
//   })
// );

async function test_run() {
  const start = new Date();

  let boundaries_source = ("/assets/files/Barangays.kml");

  const boundaries = await extract(boundaries_source);

  const boundaries_area = await parse(boundaries, "to_area");

  console.log(boundaries_area, ((new Date() - start) / 1000));

  const boundaries_area_total = boundaries_area.flatMap((item) => Object.values(item)).reduce((return_value, working_value) => (return_value + working_value));

  console.log({ "total": boundaries_area_total }, ((new Date() - start) / 1000));

  const boundaries_stats = await describe(boundaries_area.map((object) => ((Object.keys(object).map((key) => (object[key])))[0])));

  console.log(boundaries_stats, ((new Date() - start) / 1000));

  let points_source = ("/assets/files/Buildings.kml");

  const dataset_points = await extract(points_source);

  const dataset_points_count = await analyze([boundaries.features, dataset_points.features], "count");

  console.log(dataset_points_count, ((new Date() - start) / 1000));

  const dataset_points_total = dataset_points_count.flatMap((item) => Object.values(item)).reduce((return_value, working_value) => (return_value + working_value));

  console.log({ "total": dataset_points_total }, ((new Date() - start) / 1000));

  const dataset_points_stats = await describe(dataset_points_count.map((object) => ((Object.keys(object).map((key) => (object[key])))[0])));

  console.log(dataset_points_stats, ((new Date() - start) / 1000));

  let lines_source = ("/assets/files/Roads.kml");

  const dataset_lines = await extract(lines_source);

  const dataset_lines_count = await analyze([boundaries.features, dataset_lines.features], "count");

  console.log(dataset_lines_count, ((new Date() - start) / 1000));

  const dataset_lines_total = dataset_lines_count.flatMap((item) => Object.values(item)).reduce((return_value, working_value) => (return_value + working_value));

  console.log({ "total": dataset_lines_total }, ((new Date() - start) / 1000));

  const dataset_lines_length = await parse(boundaries, "to_length");

  const dataset_lines_stats = await describe(dataset_lines_length.map((object) => ((Object.keys(object).map((key) => (object[key])))[0])));

  console.log(dataset_lines_stats, ((new Date() - start) / 1000));
}

test_run();


// router.route("/data/upload/").post((request, response) => {
//   upload (request, response, function (error) {
//     if (error instanceof multer.MulterError) {
//       return (response.status(500).json(error));
//     }
//     else if (error) {
//       return (response.status(500).json(error));
//     }

//     for (let index = 0; index < request.files.file.length; index++) {
//       translate()
//         .then((file) => {
//           if (file) {
//             create(file, request);
//           }
//         })
//         .catch((error) => {
//           throw (error);
//         });      
//     }
//   });
// });

// router.route("/data/edit/").post(() => {});

// router.route("/data/delete/").post((request, response) => {
//   switch (request.body.file.aspect) {
//     case "unclassified": 
//       unclassifiedData
//         .deleteOne({
//           _id: request.body.file._id
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     case "social":
//       socialData
//         .deleteOne({
//           _id: request.body.file._id
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     case "economic":
//       economicData
//         .deleteOne({
//           _id: request.body.file._id
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     case "environmental":
//       environmentalData
//         .deleteOne({
//           _id: request.body.file._id
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     case "demographic":
//       demographicData
//         .deleteOne({
//           _id: request.body.file._id
//         })
//         .then((data) => {
//           response.json(data);
//         })
//         .catch((error) => {
//           response.status(400).json("Error: " + error);
//         });
//       break;
//     default:
//       return (null);
//   }
// });

module.exports = router;