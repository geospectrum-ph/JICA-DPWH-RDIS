// server/controllers/userController.js
const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 16);
  // Create a User object
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword
  };

  // Save a User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};
exports.findAll = (req, res) => {
  User.findAll({ attributes: ['email'] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.findOne = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the user."
      });
    });
};

exports.userProfile = async (req, res, next) => {
  let user = await User.findOne({ where: { id: req.user.id }, attributes: { exclude: ["password"] } });
  if (user === null) {
    res.status(404).json({ 'msg': "User not found" });
  }
  res.status(200).json(user);
};
