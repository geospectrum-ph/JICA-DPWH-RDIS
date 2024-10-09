const dbConfig = require("../config/config.js");

const { Sequelize } = require('sequelize');

console.log(dbConfig)

const sequelize = new Sequelize(`${dbConfig.dialect}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
  dialectOptions: {
  options: {
    encrypt: true,
  }
}});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.js")(sequelize, Sequelize);

module.exports = db;