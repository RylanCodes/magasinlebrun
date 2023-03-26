const router = require("express").Router();
const {
  getPages,
  dropdownSelection,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/items.controller");

router.get("/:page", getPages);
router.post("/sortby", dropdownSelection);
router.post("/add", addProduct);
router.post("/edit", editProduct);
router.post("/delete", deleteProduct);

module.exports = router;
