const Loader = require("./Loader");
const ItemsLoader = new Loader("./data/items.json");
const LinesLoader = new Loader("./data/lines.json");
const SalesLoader = new Loader("./data/sales.json");
const ConfigLoader = new Loader("./data/config.json");

exports.getFullItem = (sku) => {
  const item = ItemsLoader.get().find((item) => item.sku === sku);
  if (item) {
    return {
      sku: item.sku,
      qty: item.qty,
      name: item.name,
      sale_price: item.sale_price,
      image_url: item.image_url,
    };
  }
};

exports.getItemsSorted = () => {
  return ItemsLoader.get().sort((a, b) => a.name.localeCompare(b.name, "en"));
};

exports.getItemInCart = (sku, qty, element) => {
  let line = LinesLoader.get();
  let itemInCart = line.find((item) => item.item.sku === sku);
  if (itemInCart) {
    let itemFound = line.indexOf(itemInCart);
    line[itemFound].qty += +qty; // add qty to the item of line
    LinesLoader.save(line);
  } else {
    this.addLine(element);
  }
};

exports.getAllLines = () => {
  return LinesLoader.get();
};

exports.addLine = (value) => {
  LinesLoader.add(value);
};

exports.addSale = (value) => {
  SalesLoader.add(value);
};

exports.deleteAllLines = () => {
  return LinesLoader.save([]);
};

exports.taxes = ConfigLoader.get().taxes;
