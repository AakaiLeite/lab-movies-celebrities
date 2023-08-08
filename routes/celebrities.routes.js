// Starter code
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
// Routes

// Celebrities GET and POST Routes
// Create
router.get("/celebrities/create", async (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    console.log("Error Creating Celebrity: ", error);
    res.render("celebrities/new-celebrity");
  }
});
// Read
router.get("/celebrities", async (req, res) => {
  try {
    let celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", {celebrity: celebrities});
  } catch (error) {
    console.log("Error Reading Celebrities: ", error);
  }
});
// Export
module.exports = router;
