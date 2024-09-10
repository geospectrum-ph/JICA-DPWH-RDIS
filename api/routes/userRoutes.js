module.exports = app => {
  const users = require("../controllers/userController.js");  
  var router = require("express").Router();
  // Login a new User
  router.post("/login", users.loginUser);

  // Fetch User profile
  router.get("/profile", users.verifyJWT, users.userProfile);

  // Create a new User
  router.post("/register", users.create);
  // Retrieve all users
  router.get("/", users.findAll);
  app.use('/users', router);
};