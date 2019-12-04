const path = require("path");
const express = require("express");
const rootDir = require("../utils/path");
const admin = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "src", "views", "shop.html")); // we can send the statis html file
  res.render(path.join(rootDir, "src", "views", "shop"), {
    prods: admin.products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: admin.products.length > 0,
    activeShop: true,
    productCSS: true
  }); // or only "shop" we render the view with the pug engine
});

module.exports = { router };
