const mongoose = require("mongoose");

const User = mongoose.model("Favoris", {
  name: String,
  id: String,
});

module.exports = User;
