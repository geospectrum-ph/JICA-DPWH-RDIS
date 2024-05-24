/* This file serves as the router file for the SEEDs Rebuild application. */
/* It routes requests for database information from the MongoDB server database. */

const mongoose = require("mongoose");

var router = require("express").Router();

// async function initialize() {
//   const initGdalJs = require("gdal3.js/node");

//   initGdalJs().then((gdal) => {});

//   const gdal = await initGdalJs().then().catch((error) => console.log(error));

//   const filename = "sample.kml";

//   const fs = require("fs");
//   const path = require("path");

//   const file = fs.readFileSync(path.join(__dirname, "./assets/files", filename), "utf8");
  
//   const getResult = async () => {
//     try {
//       const result = await gdal.open(file);
//     }
//     catch (error) {
//       throw (error);
//     }
//   }

//   console.log(getResult());
// }

// initialize();

const { convert } = require("./functions/handleConversion");
const { encrypt, decrypt } = require("./functions/handleEncryption");

// const fs = require("fs");
// const path = require("path");

// let file = fs.readFileSync(path.join(__dirname, "assets/files/sample.kml"), "utf8");

// if (file) {
//   console.log(file);
//   transform(file);
// }

convert();

// console.log(transform("./assets/files/sample.zip"));


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

//       if (found === (null || undefined)) { response.json({ note: "Please enter a valid username and password.", code: 400 }); }
//       else if (decrypt(found.password) !== request.body.password) { response.json({ note: "Please enter a valid username and password.", code: 403 }); }
//       else { response.json({ note: "Successful user authentication!", code: 200 }); }
//     })
//     .catch((error) => { response.status(400).json("Error: " + error); });
// });

// router.route("/user/change-password/").post((request, response) => {
//   usersData
//     .find({})
//     .then((data) => {
//       let found = data.find((object) => object.username === request.body.username);

//       if (found === (null || undefined)) { response.json({ note: "Please enter a valid username and password.", code: 400 }); }
//       else if (decrypt(found.password) !== request.body.password) { response.json({ note: "Please enter a valid username and password.", code: 403 }); }
//       else {
//         if (request.body.newPassword !== request.body.clonePassword) { response.json({ note: "The entered passwords do not match.", code: 400 }); }
//         else { 
//           usersData
//             .findOneAndUpdate({
//               username: found.username,
//               password: found.password
//             }, {
//               password: encrypt(request.body.newPassword)
//             })
//             .then(() => { response.json({ note: "Successful password update!", code: 200 }); })
//             .catch((error) => { response.status(400).json("Error: " + error); });
//         }
//       }
//     })
//     .catch((error) => { response.status(400).json("Error: " + error); });
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
//   let object = { unclassified: null, social: null, economic: null, environmental: null, demographic: null }

//   Promise
//     .all([
//       unclassifiedData
//         .find({})
//         .then((data) => { Object.assign(object, { unclassified: data }); })
//         .catch((error) => { response.status(400).json("Error: " + error); }),
//       socialData
//         .find({})
//         .then((data) => { Object.assign(object, { social: data }); })
//         .catch((error) => { response.status(400).json("Error: " + error); }),
//       economicData
//         .find({})
//         .then((data) => { Object.assign(object, { economic: data }); })
//         .catch((error) => { response.status(400).json("Error: " + error); }),
//       environmentalData
//         .find({})
//         .then((data) => { Object.assign(object, { environmental: data }); })
//         .catch((error) => { response.status(400).json("Error: " + error); }),
//       demographicData
//         .find({})
//         .then((data) => { Object.assign(object, { demographic: data }); })
//         .catch((error) => { response.status(400).json("Error: " + error); })
//     ])
//     .then(() => { response.json(object); })
//     .catch((error) => { response.status(400).json("Error: " + error); });  
// });

// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination:
//     function (request, file, callback) {
//       callback(null, "./src/assets/files");
//     },
//   filename:
//     function (request, file, callback) {
//       callback(null, file.originalname);
//     }
// });

// var upload = multer({ storage: storage }).fields([{ name: "file" }]);

// const { generate } = require("./functions/handleConversion");

// router.route("/data/upload/").post((request, response) => {
//   upload (request, response, function (error) {
//     if (error instanceof multer.MulterError) { return (response.status(500).json(error)); }
//     else if (error) { return (response.status(500).json(error)); }

//     for (let index = 0; index < request.files.file.length; index++) {
//       let object = generate(request.files.file[index].path, request.files.file[index].filename.split(".").pop());
//       let tags = request.body.tags.split(" ").filter((word) => word.length > 0).splice(0, 5);

//       if (object) {
//         switch (request.body.category) {
//           case "unclassified": 
//             unclassifiedData
//               .create({
//                 name: request.files.file[index].originalname,
//                 file: object,
//                 aspect: request.body.category,
//                 tags: tags
//               })
//               .then((data) => { response.json(data); })
//               .catch((error) => { response.status(400).json("Error: " + error); });
//             break;
//           case "social":
//             socialData
//               .create({
//                 name: request.files.file[index].originalname,
//                 file: object,
//                 aspect: request.body.category,
//                 tags: tags
//               })
//               .then((data) => { response.json(data); })
//               .catch((error) => { response.status(400).json("Error: " + error); });
//             break;
//           case "economic":
//             economicData
//               .create({
//                 name: request.files.file[index].originalname,
//                 file: object,
//                 aspect: request.body.category,
//                 tags: tags
//               })
//               .then((data) => { response.json(data); })
//               .catch((error) => { response.status(400).json("Error: " + error); });
//             break;
//           case "environmental":
//             environmentalData
//               .create({
//                 name: request.files.file[index].originalname,
//                 file: object,
//                 aspect: request.body.category,
//                 tags: tags
//               })
//               .then((data) => { response.json(data); })
//               .catch((error) => { response.status(400).json("Error: " + error); });
//             break;
//           case "demographic":
//             demographicData
//               .create({
//                 name: request.files.file[index].originalname,
//                 file: object,
//                 aspect: request.body.category,
//                 tags: tags
//               })
//               .then((data) => { response.json(data); })
//               .catch((error) => { response.status(400).json("Error: " + error); });
//             break;
//           default:
//             return null;
//         }
//       }
//     }
//   });
// });

// router.route("/data/edit/").post((request, response) => {

// });

// router.route("/data/delete/").post((request, response) => {
//   switch (request.body.file.aspect) {
//     case "unclassified": 
//       unclassifiedData
//         .deleteOne({ _id: request.body.file._id })
//         .then((data) => { response.json(data); })
//         .catch((error) => { response.status(400).json("Error: " + error); });
//       break;
//     case "social":
//       socialData
//         .deleteOne({ _id: request.body.file._id })
//         .then((data) => { response.json(data); })
//         .catch((error) => { response.status(400).json("Error: " + error); });
//       break;
//     case "economic":
//       economicData
//         .deleteOne({ _id: request.body.file._id })
//         .then((data) => { response.json(data); })
//         .catch((error) => { response.status(400).json("Error: " + error); });
//       break;
//     case "environmental":
//       environmentalData
//         .deleteOne({ _id: request.body.file._id })
//         .then((data) => { response.json(data); })
//         .catch((error) => { response.status(400).json("Error: " + error); });
//       break;
//     case "demographic":
//       demographicData
//         .deleteOne({ _id: request.body.file._id })
//         .then((data) => { response.json(data); })
//         .catch((error) => { response.status(400).json("Error: " + error); });
//       break;
//     default:
//       return null;
//   }
// });

module.exports = router;