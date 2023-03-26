const Item = require("../database/models/item.model");

exports.getOneItem = (itemSku) => {
  return Item.findOne({ sku: itemSku }).exec();
};

exports.getAllItems = () => {
  return Item.find().exec();
};

exports.getItemsPerPage = (limit, page) => {
  return Item.find()
    .sort({ name: 1 })
    .collation({ locale: "en" })
    .limit(+limit * 1)
    .skip((+page - 1) * +limit)
    .exec();
};

exports.createItem = (item) => {
  const newItem = new Item(item);
  return newItem.save();
};

exports.deleteItem = (itemId) => {
  return Item.findByIdAndDelete(itemId).exec();
};

exports.updateItem = (itemId, item) => {
  return Item.findByIdAndUpdate(
    itemId,
    { $set: item },
    { runValidators: true }
    // { new: true } THIS LINE CAUSED ME A LOT OF PAIN!
  ).exec();
};
