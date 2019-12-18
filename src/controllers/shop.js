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

// exports.getCartPageHandler = (req, res, next) => {
//   req.user
//     .getCart()
//     .then(cart => {
//       return cart.getProducts();
//     })
//     .then(products => {
//       res.render("shop/cart", {
//         pageTitle: "Your Cart",
//         path: "/cart",
//         products: products
//       });
//     })
//     .catch(err => console.log(err));
// };

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

// exports.deleteCartItemHandler = (req, res, next) => {
//   const { productId } = req.body;
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: productId } });
//     })
//     .then(products => {
//       return products[0].cartItem.destroy();
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch(err => console.log(err));
// };

// exports.createOrderHandler = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then(products => {
//       return req.user
//         .createOrder()
//         .then(order => {
//           return order.addProducts(
//             products.map(product => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch(err => console.log(err));
//     })
//     .then(() => {
//       fetchedCart.setProducts(null);
//       res.redirect("/orders");
//     })
//     .catch(err => console.log(err));
// };

// exports.getOrdersPageHandler = (req, res, next) => {
//   req.user
//     .getOrders({ include: "products" })
//     .then(orders => {
//       res.render("shop/orders", {
//         pageTitle: "Orders",
//         path: "/orders",
//         orders
//       });
//     })
//     .catch(err => console.log(err));
// };
