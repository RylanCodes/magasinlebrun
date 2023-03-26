const Item = require("../database/models/item.model");
const Line = require("../database/models/line.model");
const Sale = require("../database/models/sale.model");
const db = require("../database");
const data = require("./index");
const items = data.getItemsSorted();
let count = 0;
let totalItems = items.length;

db.connect(() => {
  console.log("Database connected");
  clearDB(() => {
    // loop to add each item to the db
    items.forEach((i) => {
      createItem(i, () => {
        // progress bar
        count++;
        console.clear();
        console.log(Math.floor((count / totalItems) * 100) + "% effectués");
        if (count === totalItems) {
          console.log("Opération terminée");
        }
      });
    });
  });
});

function clearDB(callback) {
  // Delete all items
  Item.deleteMany({})
    .then(() => {
      if (callback) callback();
    })
    .catch((err) => console.log(err));
  // Delete all lines
  Line.deleteMany({})
    .then()
    .catch((err) => console.log(err));
  // Delete all sales
  Sale.deleteMany({})
    .then()
    .catch((err) => console.log(err));
}

// Item creation into db
function createItem(item, callback) {
  const newItem = new Item({
    sku: item.sku,
    name: item.name,
    normalized: item.name.toLowerCase(),
    description: item.description,
    sale_price: item.sale_price,
    image_url: item.image_url,
    brand: item.brand,
  });
  newItem
    .save()
    .then((item) => {
      if (callback) callback();
    })
    .catch((err) => {
      console.log(err);
    });
}
