const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const cartFilePath = path.join(rootDir, "src", "data", "cart.json");

const addProductToCart = (productId, price) => {
  fs.readFile(cartFilePath, (err, fileContent) => {
    let cart = { products: [], totalPrice: 0 };

    if (!err) {
      cart = JSON.parse(fileContent);
    }

    const existingProductIndex = cart.products.findIndex(
      (product) => product.id === productId
    );

    if (existingProductIndex === -1) {
      cart = {
        products: [...cart.products, { id: productId, qty: 1 }],
        totalPrice: cart.totalPrice + Number(price)
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
        totalPrice: cart.totalPrice + Number(price)
      };
    }

    fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
      console.log(err);
    });
  });
};

const deleteProductFromCart = (productId, productPrice) => {
  fs.readFile(cartFilePath, (err, fileContent) => {
    if (!err) {
      const cart = JSON.parse(fileContent);
      const updatedCart = {
        products: cart.products.filter((product) => product.id !== productId),
        totalPrice: cart.totalPrice - Number(productPrice)
      };
      fs.writeFile(cartFilePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    }
  });
};

module.exports = { addProductToCart, deleteProductFromCart };
