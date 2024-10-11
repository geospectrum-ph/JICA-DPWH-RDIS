const dbConfig = require("../config/config.js");

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(`${dbConfig.dialect}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
  dialectOptions: {
  options: {
    encrypt: true,
  }
}});

const User = require('./user')(sequelize, DataTypes);

module.exports = {
  sequelize,
  User
};