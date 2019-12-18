const mongodb = require("mongodb");
const getDb = require("../utils/mongoDatabase").getDb;

class User {
  constructor(id, name, email, cart) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.cart = cart;
  }

  add() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addProductToCart(product) {
    const db = getDb();

    const cartItemIndex = this.cart.items.findIndex(cartItem => {
      return cartItem._id.toString() === product._id.toString();
    });

    if (cartItemIndex === -1) {
      return db.collection("users").updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        {
          $set: {
            cart: { items: [...this.cart.items, { ...product, quantity: 1 }] }
          }
        }
      );
    } else {
      const updatedCartItems = [...this.cart.items];
      updatedCartItems[cartItemIndex].quantity++;

      return db.collection("users").updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        {
          $set: {
            cart: {
              items: updatedCartItems
            }
          }
        }
      );
    }
  }

  static find(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
  }
}

module.exports = User;
