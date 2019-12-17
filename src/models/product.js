const getDb = require("../utils/mongoDatabase").getDb;
module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  addProduct() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
};
