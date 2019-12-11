// working with data with database(SQL)
const { deleteProductFromCart } = require("./cart");

const dataBase = require("../utils/sqlDatabase");

module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  addProduct() {
    return dataBase.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static editProduct() {}

  static deleteProduct(id) {}

  static fetchAllProducts() {
    return dataBase.execute("SELECT * FROM products");
  }

  static findProductById(id) {
    return dataBase.execute("SELECT * FROM products WHERE products.id = ?", [
      id
    ]);
  }
};
