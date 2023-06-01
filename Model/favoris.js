const mongoose = require("mongoose");

const User = mongoose.model("Favoris", {
  name: String,
  token: String,
  info: Array,
});

module.exports = User;
