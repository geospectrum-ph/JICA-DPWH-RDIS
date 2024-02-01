

const mongoose = require("mongoose");
var router = require("express").Router();

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const archiveSchema = new Schema({
    "username": {type: String},
    "password": {type: String}
});

const Test = mongoose.model("users", archiveSchema);

router.route("/").get((req, res) => {
    var query = {
        "username": "seeds.admin"
      };
  Test
    .find(query)
    .then(items => {res.json(items); console.log(items)})
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
