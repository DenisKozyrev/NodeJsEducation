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
  Product.findOne({ where: { id: productId } })
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
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.addProductToCartHandler = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      if (!products[0]) {
        return Product.findByPk(productId)
          .then(product => {
            return fetchedCart.addProduct(product, {
              through: { quantity: 1 }
            });
          })
          .catch(err => console.log(err));
      } else {
        return fetchedCart
          .addProduct(products[0], {
            through: { quantity: products[0].cartItem.quantity + 1 }
          })
          .then(() => {
            res.redirect("/cart");
          })
          .catch(err => console.log(err));
      }
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.deleteCartItemHandler = (req, res, next) => {
  const { productId } = req.body;
  let fetchedCart;

  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      console.log(products[0]);
      return products[0].cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.getCheckoutPageHandler = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrdersPageHandler = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};
