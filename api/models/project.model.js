const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  type: String,
  id: Number,
  properties: {
    road_name: String,
    route_id: String,
    road_classification: String,
    terrain_ty: String,
    project_id: String,
    program: String,
    region: String,
    deo_name: String,
    district: String,
    category: String,
    section_id: String,
    start_lrp: String,
    end_lrp: String,
    start_chainage: Number,
    end_chainage: Number,
    approved_amount: Number,
    physical_target: Number,
    unit_of_measure: String,
    type_of_work: String,
    project_component: String,
    detailed_scope_of_work: String,
    source_of_fund: String,
    objectid: Number,
    hazard_risk: String,
    remarks_1: String,
    inventory: Number,
    road_closure_frequency: Number,
    road_closure_duration: Number,
    volume_collapsed_material: Number,
    rdis_id: String
  },
  geometry: {
    type: {type: String, default: 'MultiLineString'},
    coordinates: {type: []}
  }
})

const Project = mongoose.model("road-project", projectSchema);
module.exports = Project