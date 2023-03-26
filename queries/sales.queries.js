const Sale = require("../database/models/sale.model");

exports.getOneSale = (saleId) => {
  return Sale.findOne({ id: saleId }).exec();
};

exports.getAllSales = () => {
  return Sale.find({}).exec();
};

exports.createSale = (sale) => {
  const newSale = new Sale(sale);
  return newSale.save();
};

exports.deleteSale = (saleId) => {
  return Sale.findByIdAndDelete(saleId).exec();
};

exports.updateSale = (saleId, sale) => {
  return Sale.findByIdAndUpdate(
    saleId,
    { $set: sale },
    { runValidators: true }
  );
};
