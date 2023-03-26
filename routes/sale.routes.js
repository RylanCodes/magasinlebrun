const router = require("express").Router();
const {
  getSaleForm,
  concludeSale,
} = require("../controllers/sales.controller");
const { addLine } = require("../controllers/lines.controller");

router.get("/", getSaleForm);
router.post("/", addLine);
router.post("/close", concludeSale);

module.exports = router;
