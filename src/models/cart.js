const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const productsFilePath = path.join(rootDir, "src", "data", "cart.json");

module.exports = class Cart {
  static addProductToCart(productId, price) {
    fs.readFile(productsFilePath, (err, fileContent) => {
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

      fs.writeFile(productsFilePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
