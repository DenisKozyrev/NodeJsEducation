const Product = require("../models/product");

// const {
//   getCartFromFile,
//   addProductToCart,
//   deleteProductFromCart
// } = require("../models/cart");

exports.getIndexPageHandler = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop",
    path: "/"
  });
};

exports.getProductsPageHandler = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("shop/products-list", {
        prods: products,
        pageTitle: "All products",
        path: "/products"
      });
    })
    .catch(err => {
      res.write(`<h1>${err.message}</h1>`);
      res.end();
    });
};

exports.getProductDetailsPageHandler = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOne(productId)
    .then(product => {
      res.render("shop/product-details", {
        product,
        pageTitle: `${product.title} Details`,
        path: "/products"
      });
    })
    .catch(err => {
      res.write(`<h1>${err.message}</h1>`);
      res.end();
    });
};

exports.getCartPageHandler = (req, res, next) => {
  req.user
    .getCartItems()
    .then(items => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: items
      });
    })
    .catch(err => console.log(err));
};

exports.addProductToCartHandler = (req, res, next) => {
  const productId = req.body.productId;
  const user = req.user;

  Product.findOne(productId).then(product => {
    user
      .addProductToCart(product)
      .then(() => {
        res.redirect("/cart");
      })
      .catch(err => console.log(err));
  });
};

exports.deleteCartItemHandler = (req, res, next) => {
  const { productId } = req.body;
  req.user
    .deleteFromCart(productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.createOrderHandler = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => {
      res.redirect("/orders");
    })
    .catch(err => console.log(err));
};

exports.getOrdersPageHandler = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders
      });
    })
    .catch(err => console.log(err));
};
