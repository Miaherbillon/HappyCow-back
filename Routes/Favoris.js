const express = require("express");
const router = express();

const Favoris = require("../Model/favoris");

router.post("/favoris", async (req, res) => {
  const { name } = req.body;

  const newFavoris = new Favoris({
    name: name,
  });
  await newFavoris.save();
  res.json({
    name: newFavoris.name,
  });
  //   console.log(favoris);
});

router.get("/favoris", async (req, res) => {
  const favoris = await Favoris.find();
  const names = favoris.map((fav) => fav.name);
  res.json(names);
});
module.exports = router;
