const mongodb = require("mongodb");
const getDb = require("../utils/mongoDatabase").getDb;
module.exports = class Product {
  constructor(title, price, description, imageUrl) {
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

  static update(product) {
    const db = getDb();
    return db
      .collection("products")
      .updateOne({ _id: new mongodb.ObjectId(product.id) }, { $set: product })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  static delete(productId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(productId) })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
};
