const {
  getAllItems,
  createItem,
  deleteItem,
  updateItem,
  getItemsPerPage,
} = require("../queries/items.queries");
const itemModel = require("../database/models/item.model");
const data = require("../data");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const path = require("path");

// how many items we want displayed on each page
let paginationLimit = 10;

let actualPage = 1;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, callback) => {
    callback(null, uuid() + file.originalname);
  },
});

const checkFileType = function (file, cb) {
  // allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  // check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can only upload images.");
  }
};

const upload = multer({
  limits: {
    fileSize: 5 * (1024 * 1024),
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
  storage: storage,
});

exports.getPages = async (req, res, next) => {
  try {
    const currentPage = req.params.page || 1;
    actualPage = currentPage;
    const items = await getItemsPerPage(paginationLimit, currentPage);
    const allItems = await getAllItems();
    const totalItemsCount = await allItems.length;
    // how many pages there will be based on the paginationLimit
    const pageCount = Math.ceil(totalItemsCount / paginationLimit);

    if (req.params.page > pageCount) {
      res.redirect("/items/" + pageCount);
    } else {
      res.render("items", {
        items,
        pageCount,
        currentPage,
        sortBy: paginationLimit,
        totalItems: totalItemsCount,
        // If I remove the "sortBy", the dropdown menu stops working properly
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.dropdownSelection = async (req, res, next) => {
  try {
    paginationLimit = +req.body.sortBy;
    res.redirect("/items/" + actualPage);
  } catch (e) {
    next(e);
  }
};

exports.addProduct = async (req, res, next) => {
  upload.single("image")(req, res, async (error) => {
    try {
      if (!error) {
        const newItem = {
          sku: req.body.sku,
          name: req.body.name,
          description: req.body.description,
          sale_price: req.body.sale_price,
          image_url: "/images/" + req.file.filename,
          brand: req.body.brand,
        };
        await createItem(newItem);
        res.redirect("/items/" + actualPage);
      } else {
        res.render("items.pug", { error: error.message });
      }
    } catch (e) {
      next(e);
    }
  });
};

exports.editProduct = async (req, res, next) => {
  upload.single("editImage")(req, res, async (error) => {
    try {
      if (!error) {
        let updatedItem = {
          sku: req.body.editSku,
          name: req.body.editName,
          description: req.body.editDescription,
          sale_price: req.body.editPrice,
          brand: req.body.editBrand,
        };
        // if you change the image, add it
        if (req.file) {
          updatedItem.image_url = "/images/" + req.file.filename;
        }
        await updateItem(req.body.idToEdit, updatedItem);

        res.redirect("/items/" + actualPage);
      } else {
        res.render("error.pug", { error: error.message });
      }
    } catch (e) {
      next(e);
    }
  });
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await deleteItem(req.body.idToRemove);
    res.redirect("/items/" + actualPage);
  } catch (e) {
    next(e);
  }
};
