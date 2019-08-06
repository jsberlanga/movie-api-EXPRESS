var express = require("express");
var router = express.Router();

const movies = require("../data/movies");
const people = require("../data/people");

const queryRequired = (req, res, next) => {
  if (!req.query.query) {
    res.json({ msg: "A query is required" });
  }
  next();
};

// middleware to ensure a query is requested
router.use(queryRequired);

// GET /search/movie
router.get("/movie", function(req, res, next) {
  const searchTerm = req.query.query;

  const moviesFound = movies.filter(movie => {
    let found = [];
    found =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.overview.toLowerCase().includes(searchTerm.toLowerCase());
    return found;
  });
  res.json({ results: moviesFound });
});

// GET /search/person
router.get("/person", function(req, res, next) {
  const searchTerm = req.query.query;
  const peopleFound = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.json({ results: peopleFound });
});

module.exports = router;
