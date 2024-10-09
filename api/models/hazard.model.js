const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hazardSchema = new Schema({
  type: String,
  id: Number,
  geometry: {
    type: String,
    coordinates: [[]]
  },
  properties: {
    FID: Number,
    OBJECTID: Number,
    ISLAND: String,
    REGION: String,
    PROVINCE: String,
    DEO: String,
    ROAD_NAME: String,
    SECTION_ID: String,
    DIRECTION: String,
    SEC_LENGTH: Number,
    SOURCE: String,
    ROAD_SEC_C: String,
    ROUTE_NO: String,
    CONG_DIST: String,
    REMARKS: String,
    ROAD_ID: String,
    ROUTE_ID: String,
    HAZARD: String,
    Ev_Link: String,
    Ev_Report: String,
  }
})

const Hazard = mongoose.model("hazard", hazardSchema);
module.exports = Hazard