const express = require("express");
const router = express();

const Favoris = require("../Model/favoris");
const { routes } = require("./Users");

router.post("/favoris", async (req, res) => {
  const { name, token, info } = req.body;

  const newFavoris = new Favoris({
    name: name,
    token: token,
    info: info,
  });
  await newFavoris.save();
  res.json({
    name: newFavoris.name,
  });
  //   console.log(favoris);
});

router.get("/favoris", async (req, res) => {
  const favoris = await Favoris.find();
  const name = favoris.map((fav) => fav.name);

  res.json(name);
});
router.get("/favoris/id", async (req, res) => {
  const favoris = await Favoris.find();
  const info = favoris.map((fav) => fav.info);

  res.json(info);
});

router.delete("/favoris", async (req, res) => {
  try {
    await Favoris.findOneAndDelete(req.body);
    res.json("supprimer");
  } catch (error) {}
});
module.exports = router;
