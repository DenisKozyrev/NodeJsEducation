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

  getCartItems() {
    const db = getDb();
    const productsInCartIndexes = this.cart.items.map(cartItem => {
      return cartItem.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productsInCartIndexes } })
      .toArray()
      .then(products => {
        return products.map(product => {
          return {
            ...product,
            quantity: this.cart.items.find(item => {
              return item.productId.toString() === product._id.toString();
            }).quantity
          };
        });
      })
      .catch(err => console.log(err));
  }

  addProductToCart(product) {
    const db = getDb();

    const cartItemIndex = this.cart.items.findIndex(cartItem => {
      return cartItem.productId.toString() === product._id.toString();
    });

    if (cartItemIndex === -1) {
      return db.collection("users").updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        {
          $set: {
            cart: {
              items: [
                ...this.cart.items,
                { productId: new mongodb.ObjectId(product._id), quantity: 1 }
              ]
            }
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
