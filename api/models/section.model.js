const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  type: String,
  id: Number,
  properties: {
    OBJECTID_1: Number,
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
    ROUTE_ID: String
  }, geometry: {
    type: {type: String, default: 'MultiLineString'},
    coordinates: {type: []}
  }
})

const Section = mongoose.model("road-section", sectionSchema);
module.exports = Section