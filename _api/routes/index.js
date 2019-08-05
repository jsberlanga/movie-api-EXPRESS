var express = require("express");
var router = express.Router();

const movies = require("../data/movies");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json(movies);
});

router.get("/popular", (req, res, next) => {
  const popular = movies.filter(movie => movie.most_popular);
  res.json({ results: popular });
});

module.exports = router;
