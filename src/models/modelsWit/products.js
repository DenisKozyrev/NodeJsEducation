// working with data with database(SQL)
const { deleteProductFromCart } = require("./cart");

const dataBase = require("../../utils/mySqlNativeConfig/sqlDatabase");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  addProduct() {}

  static editProduct() {}

  static deleteProduct(id) {}

  static fetchAllProducts() {
    return dataBase.execute("SELECT * FROM products");
  }

  static findProductById(id) {}
};
