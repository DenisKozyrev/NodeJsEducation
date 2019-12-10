const { fetchAllProducts, findProductById } = require("../models/product");

const { getCartFromFile, addProductToCart } = require("../models/cart");

exports.getIndexPageHandler = (req, res, next) => {
  fetchAllProducts((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  });
};

exports.getProductsPageHandler = (req, res, next) => {
  fetchAllProducts((products) => {
    res.render("shop/products-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products"
    });
  });
  // or res.sendFile(path.join(rootDir, "src", "views", "shop.html")); // we can send the statis html file or only "shop" we render the view with the pug engine
};

exports.getProductDetailsPageHandler = (req, res, next) => {
  const productId = req.params.productId;
  findProductById(productId, (product) => {
    res.render("shop/product-details", {
      product,
      pageTitle: `${product.title} Details`,
      path: "/products"
    });
  });
};

exports.getCartPageHandler = (req, res, next) => {
  getCartFromFile((cart) => {
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
      products: cart.products,
      totalPrice: cart.totalPrice
    });
  });
};

exports.addProductToCartHandler = (req, res, next) => {
  const productId = req.body.productId;
  findProductById(productId, (product) => {
    addProductToCart(product, () => res.redirect("/cart"));
  });
};

exports.getCheckoutPageHandler = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrdersPageHandler = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};
