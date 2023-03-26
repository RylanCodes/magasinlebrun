const { getAllLines, clearAllLines } = require("../queries/lines.queries");
const { getAllItems } = require("../queries/items.queries");
const { createSale } = require("../queries/sales.queries");
const saleModel = require("../database/models/sale.model");
const data = require("../data");

exports.getSaleForm = async (req, res, next) => {
  try {
    const items = await getAllItems();
    const lines = await getAllLines();
    const { subtotal, gst, qst, finalAmount } = getAllResults(lines);

    res.render("sale", {
      items,
      lines,
      result: {
        subtotal: subtotal,
        gst: gst,
        qst: qst,
        finalAmount: finalAmount,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.concludeSale = async (req, res, next) => {
  try {
    const lines = await getAllLines();
    const { subtotal, gst, qst, finalAmount } = getAllResults(lines);
    const newSale = new saleModel({
      lines: lines,
      subtotal: subtotal.toFixed(2),
      gst: gst,
      qst: qst,
      finalAmount: finalAmount.toFixed(2),
    });
    await createSale(newSale);
    await await clearAllLines();
    res.redirect("/sale");
  } catch (e) {
    next(e);
  }
};

function getAllResults(lines) {
  let subtotal = 0;
  for (let i = 0; i < lines.length; i++) {
    subtotal += lines[i].amount;
  }
  let gst = (data.taxes.gst * subtotal).toFixed(2);
  let qst = (data.taxes.qst * subtotal).toFixed(2);
  let finalAmount = +subtotal + +gst + +qst;
  return { subtotal, gst, qst, finalAmount };
}
