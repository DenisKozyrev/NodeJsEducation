const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const cartFilePath = path.join(rootDir, "src", "data", "cart.json");

const getCartFromFile = (cb) => {
  fs.readFile(cartFilePath, (err, fileContent) => {
    if (err) {
      cb({ products: [], totalPrice: 0 });
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const addProductToCart = (product, cb) => {
  getCartFromFile((cart) => {
    const existingProductIndex = cart.products.findIndex(
      (prod) => prod.id === product.id
    );
    if (existingProductIndex === -1) {
      cart = {
        products: [...cart.products, { ...product, qty: 1 }],
        totalPrice: cart.totalPrice + Number(product.price)
      };
    } else {
      const existingUpdatedProduct = {
        ...cart.products[existingProductIndex],
        qty: cart.products[existingProductIndex].qty + 1
      };

      const updatedProducts = [...cart.products];
      updatedProducts[existingProductIndex] = existingUpdatedProduct;

      cart = {
        products: [...updatedProducts],
        totalPrice: cart.totalPrice + Number(product.price)
      };
    }

    fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
      if (!err) {
        cb();
      } else {
        console.log(err);
      }
    });
  });
};

const deleteProductFromCart = (productId) => {
  getCartFromFile((cart) => {
    const deletedProduct = cart.products.find(
      (product) => product.id === productId
    );
    const updatedCart = {
      products: cart.products.filter((product) => product.id !== productId),
      totalPrice:
        cart.totalPrice - Number(deletedProduct.price) * deletedProduct.qty
    };
    fs.writeFile(cartFilePath, JSON.stringify(updatedCart), (err) => {
      console.log(err);
    });
  });
};

module.exports = { getCartFromFile, addProductToCart, deleteProductFromCart };
