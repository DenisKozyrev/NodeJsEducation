const { fetchAllProducts, findProductById } = require("../models/product");

const { addProductToCart } = require("../models/cart");

exports.getIndexPage = (req, res, next) => {
  fetchAllProducts((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  });
};

exports.getProductsPage = (req, res, next) => {
  fetchAllProducts((products) => {
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
  findProductById(productId, (product) => {
    res.render("shop/product-details", {
      product,
      pageTitle: `${product.title} Details`,
      path: "/products"
    });
  });
};

exports.getCartPage = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart"
  });
};

exports.postProductToCart = (req, res, next) => {
  const productId = req.body.productId;
  findProductById(productId, (product) => {
    addProductToCart(product);
  });
  res.redirect("/cart");
};

exports.getCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrdersPage = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};
