const path = require("path");

const rootDir = require("../utils/path");
const Product = require("../models/product");

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  });
};

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/products-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products"
    });
  });
  // or res.sendFile(path.join(rootDir, "src", "views", "shop.html")); // we can send the statis html file or only "shop" we render the view with the pug engine
};

exports.getProductDetailsPage = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("shop/product-details", {
      product,
      pageTitle: "Product Details",
      path: `/products/${productId}`
    });
  });
};

exports.getCartPage = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart"
  });
};

exports.getCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrdersPage = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};
