/* This file serves as the main back-end file for the Product Portal. */
/* It connects the front-end part of the Product Portal with the MongoDB server database. */

const express = require("express");
const app = express(); /* Initializing server connection. */
const port = process.env.PORT || 5000;

const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(methodOverride("_method"));

const mongoose = require("mongoose"); /* For Object Document Modelling. Initializing connection with MongoDB. */
const uri = "mongodb+srv://seeds:S33DsR3build2024@seeds.fcrkgun.mongodb.net/seeds-rebuild?retryWrites=true&w=majority"; /* MongoDB connection string. */

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI || uri, {useNewUrlParser: true, useUnifiedTopology: true}).catch(error => console.log(error));

const connection = mongoose.connection; /* Connection to MongoDB using mongoose. */

connection.once("open", () => {
  console.log("The MongoDB database connection has been established successfully.");

  app.use(bodyParser.urlencoded({limit: "1000mb", extended: true}));
  app.use(bodyParser.json({limit: "1000mb"}));

  const router = require("./router");

  app.use("/", router);

  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {res.sendFile(path.join(__dirname, "/client/build/index.html"));});

  app.listen(port, () => {console.log(`The server is running on port: ${port}.`);});
});