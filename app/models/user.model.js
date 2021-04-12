const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    favcomics: [String],
    favcharacters: [String]
  })
);

module.exports = User;
