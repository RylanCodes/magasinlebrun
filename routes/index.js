const router = require("express").Router();
const saleRoutes = require("./sale.routes");
const itemRoutes = require("./item.routes");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/error", (req, res) => {
  res.render("error");
});

router.use("/sale", saleRoutes);
router.use("/items", itemRoutes);

module.exports = router;
