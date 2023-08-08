const router = require("express").Router();

/* GET Home Route */
router.get("/", (req, res, next) => {
  res.render("index");
});


module.exports = router;
