// server/controllers/userController.js
// const db = require("../models");
// const User = db.users;
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  console.log(req.body)
  const hashedPassword = await bcrypt.hash(req.body.password, 16);
  // Create a User object
  const userInfo = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    position: req.body.position,
    role_access: req.body.role_access || 'guest',
    deo_id: req.body.deo_id,
    ro_id: req.body.ro_id
  };
  // Save a User in the database
  try{
    const user = await User.create(userInfo);
    res.status(201).json({ message: 'User created successfully', userId: user.id });  
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ message: 'Logged in successfully', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// exports.findAll = (req, res) => {
//   User.findAll({ attributes: ['email'] })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     });
// };

// exports.findOne = (req, res) => {
//   User.findOne({ where: { email: req.body.email } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving the user."
//       });
//     });
// };

// exports.userProfile = async (req, res, next) => {
//   let user = await User.findOne({ where: { id: req.user.id }, attributes: { exclude: ["password"] } });
//   if (user === null) {
//     res.status(404).json({ 'msg': "User not found" });
//   }
//   res.status(200).json(user);
// };
