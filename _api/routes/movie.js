var express = require("express");
var router = express.Router();

const movieDetails = require("../data/movieDetails");
const movies = require("../data/movies");

const requireJSON = (req, res, next) => {
  if (!req.is("application/json")) {
    res.json({ msg: "Content type must be application/json" });
  } else {
    next();
  }
};

// GET /movie/top_rated
router.get("/top_rated", (req, res, next) => {
  const topRated = movies.sort((a, b) => b.vote_average - a.vote_average);

  // top 10
  res.json(topRated.slice(0, 10));
});

// GET /movie/{movie_id}
router.get("/:id", function(req, res, next) {
  const movieId = parseFloat(req.params.id);

  const results = movieDetails.find(movie => movie.id === movieId);
  results
    ? res.json(results)
    : res.json({
        msg: "Movie id was not found!",
        production_companies: []
      });
});

// POST /movie/{movie_id}/rating
router.post("/:id/rating", requireJSON, (req, res, next) => {
  const movieId = req.params.id;

  // req.body.value - value comes from the documentation // https://developers.themoviedb.org/3/movies/rate-movie
  // req.body is expected to be an object with a value property
  const userRating = req.body.value;

  if (userRating < 0.5 || userRating > 10) {
    res.json({ msg: "Rating must be between 0.5 and 10" });
  } else {
    res.json({
      msg: "Thank you for the rating"
    });
  }
});

// DELETE / movie/{movie_id}/rating

module.exports = router;
