/* This file serves as the back-end file for the SEEDs Rebuild application. */
/* It connects to the MongoDB server database. */

const express = require("express");

const app = express();

app.use(express.json());

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const uri = "mongodb+srv://seeds:S33DsR3build2024@seeds.fcrkgun.mongodb.net/seeds-rebuild?retryWrites=true&w=majority"; /* MongoDB API connection string. */

mongoose.connect(process.env.MONGODB_URI || uri).catch((error) => { console.log(error); });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("The MongoDB database connection has been established successfully.");

  const router = require("./router");

  app.use("/", router);

  const path = require("path");

  app.use(express.static(path.join(__dirname, "..", "/server/src/assets/files")));
  app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "..", "/server/src/assets/files/index.html")); });

  const port = process.env.PORT || 5000;

  app.listen(port, () => { console.log(`The server is running on port: ${port}.`); });
});