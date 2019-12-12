const Product = require("../models/product");

const {
  getCartFromFile,
  addProductToCart,
  deleteProductFromCart
} = require("../models/cart");

exports.getIndexPageHandler = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop",
    path: "/"
  });
};

exports.getProductsPageHandler = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/products-list", {
        prods: products,
        pageTitle: "All products",
        path: "/products"
      });
    })
    .catch((err) => {
      res.write(`<h1>${err.message}</h1>`);
      res.end();
    });
};

exports.getProductDetailsPageHandler = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOne({ where: { id: productId } }).then(product => {
    res.render("shop/product-details", {
      product,
      pageTitle: `${product.title} Details`,
      path: "/products"
    });
  })
    .catch((err) => {
      res.write(`<h1>${err.message}</h1>`);
      res.end();
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

exports.deleteCartItemHandler = (req, res, next) => {
  const { productId } = req.body;
  deleteProductFromCart(productId, () => {
    res.redirect("/cart");
  });
};

exports.getCheckoutPageHandler = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrdersPageHandler = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};
