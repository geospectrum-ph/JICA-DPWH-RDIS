const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const validator = require('validator')

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  "user_id": {
    "type": "String"
    // "required": "true",
  },

  "account_role": {
    "type": "String",
    "default": ""
  },
  // "company_id": {"type": "String"},
  "username": {
    "type": "String",
    "required": "true",
    "unique": "true"
  },
  "password": {
    "type": "String"
  },
  "name": {
    "type": "String"
  },
});



//Static SignUp
userSchema.statics.signup = async function (
  user_id, username, password, name, account_role

) {
  //validation

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is weak')
  }

  const exists = await this.findOne({ username })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({
    user_id, username, password: hash, name, account_role
  })

  return user
}

//Static Login
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error('All fields Required')
  }
  const user = await this.findOne({ username })

  if (!user) {
    throw Error('Incorrect username')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect Password')
  }

  return user
}


const User = mongoose.model("user", userSchema);

module.exports = User;