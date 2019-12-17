const mongodb = require("mongodb");
const getDb = require("../utils/mongoDatabase").getDb;
module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err));
  }

  static findOne(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(productId) })
      .next()
      .then(product => {
        console.log(product, "product");
        return product;
      })
      .catch(err => console.log(err));
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
