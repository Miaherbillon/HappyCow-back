const express = require("express");
const router = express();
const axios = require("axios");

router.get("/restaurants", async (req, res) => {
  const Restaurants = await axios.get(
    `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json`
  );
  res.json(Restaurants.data);
});

module.exports = router;
