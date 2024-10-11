const db = require("../models");
const jwt = require('jsonwebtoken');

// load the users model
const User = db.users;

exports.loginUser = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcrypt.compare(req.body.password, user.password);
    if (password_valid) {
      token = jwt.sign({ "id": user.id, "email": user.email, "first_name": user.first_name }, process.env.JWT_SECRET);
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.headers['authorization'].split(" ")[1];
    let decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ "msg": "Couldnt Authenticate" });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};