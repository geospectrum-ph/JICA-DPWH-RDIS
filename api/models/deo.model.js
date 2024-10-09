const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deoSchema = new Schema({
  type: String,
  id: Number,
  geometry: {
    type: String,
    coordinates: [[]]
  },
  properties: {
    OBJECTID: Number,
    ISLAND: String,
    REGION: String,
    PROVINCE: String,
    DEO: String,
    CLASS: String,
    CONG_DIST: String,
  }
})

const DEO = mongoose.model("engineering-district", deoSchema);
module.exports = DEO