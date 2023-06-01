const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/HappyCow");

const favorisRoutes = require("./Routes/Favoris");
const userRoutes = require("./Routes/Users");
const RestaurantsRoute = require("./Routes/Restaurants");
app.use(userRoutes);
app.use(favorisRoutes);
app.use(RestaurantsRoute);

app.all("*", (req, res) => {
  console.log("hall");
  res.json("all Route");
});
app.listen(4001, () => {
  console.log("Serveur Started");
});
