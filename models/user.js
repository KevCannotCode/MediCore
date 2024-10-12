// jshint esversion:6

const mongoose = require("mongoose");
const Home = require(__dirname +'/home.js').schema;

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { 
      type: String, 
      required: true, 
      unique: true,
      // required: [true, 'username is required'], 
      // unique: [true, 'username is already exist']
     },
    email: { 
      type: String, 
      required: true, 
      unique: true,
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;