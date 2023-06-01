const mongoose = require("mongoose");

const User = mongoose.model("Favoris", {
  name: String,
  token: String,
  info: Object,
});

module.exports = User;
