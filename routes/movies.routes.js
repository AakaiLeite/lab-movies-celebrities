// Starter code
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model.js");

// Movies GET and POST Routes

// Create
router.get("/movies/create", async (req, res) => {
  let celebrities = await Celebrity.find();
  res.render("movies/new-movie", { celebrity: celebrities });
});

router.post("/movies/create", async (req, res) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    console.log("Error Creating Movie: ", error);
    res.render("/movies/new-movie");
  }
});

// Read
router.get("/movies", async (req, res) => {
  try {
    let movies = await Movie.find();
    res.render("movies/movies", { movies: movies });
  } catch (error) {
    console.log("Error Reading Movies: ", error);
  }
});

router.get("/movies/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let movie = await Movie.findById(id);
    await movie.populate("cast");
    res.render("movies/movie-details", { movie: movie });
  } catch (error) {
    console.log("Error getting Movie: ", error);
  }
});

// Update
router.get("/movies/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    let movie = await Movie.findById(id);
    let celebrities = await Celebrity.find();
    res.render("movies/edit-movie",{ movie, celebrities });
  } catch (error) {
    console.log("Error Updating Movie: ", error);
  }
});

router.post("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(id, { $push: { title, genre, plot, cast } });
    res.redirect(`/movies/${id}`);
  } catch (error) {
    console.log("Error Updating the Movie: ", error);
  }
});

// Delete
router.post("/movies/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch (error) {
    console.log("Error Deleting Movie: ", error);
  }
});

// Export
module.exports = router;
