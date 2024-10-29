const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regionSchema = new Schema({
  type: String,
  id: Number,
  geometry: {
    type: String,
    coordinates: [[]]
  },
  properties: {
    OBJECTID_12: Number,
    ISLAND: String,
    REGION: String,
    VAR_NAME: String,
  }
})

const Region = mongoose.model("region", regionSchema);
module.exports = Region