const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const productsFilePath = path.join(rootDir, "src", "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(productsFilePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(product) {
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.price = product.price;
    this.description = product.description;
  }

  save() {
    const id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push({ ...this, id });
      fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }
};
