const {
  getLineBySku,
  createLine,
  updateLine,
} = require("../queries/lines.queries");
const { getOneItem } = require("../queries/items.queries");
const data = require("../data");

exports.addLine = async (req, res, next) => {
  try {
    const body = req.body;
    const line = await getLineBySku(body.products);
    const item = await getOneItem(body.products);
    const qty = body.quantity;

    if (!item || isNaN(qty) || +qty <= 0) {
      res.redirect("/error");
    } else {
      if (line) {
        // if line exists, update qty
        line.qty += +body.quantity;
        await updateLine(line.id, line);
      } else {
        // if line doesn't exist, add one
        const newLine = {
          sku: item.sku,
          qty: req.body.quantity,
          name: item.name,
          sale_price: item.sale_price,
          image_url: item.image_url,
        };
        await createLine(newLine);
      }
      res.redirect("/sale");
    }
  } catch (e) {
    next(e);
  }
};
