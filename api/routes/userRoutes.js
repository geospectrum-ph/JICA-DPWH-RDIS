module.exports = app => {
  const auth = require("../middleware/auth.js");
  const users = require("../controllers/userController.js");
  var router = require("express").Router();
  // Login a new User
  router.post("/login", auth.loginUser);

  // Fetch User profile (protected endpoint)
  router.get("/profile", auth.verifyToken, users.userProfile);

  // Create a new User
  router.post("/register", users.create);
  // Retrieve all users
  router.get("/", auth.verifyToken, auth.checkRole(['admin']), users.findAll);
  app.use('/users', router);
};