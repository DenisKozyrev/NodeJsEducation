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

  deleteFromCart(productId) {
    const db = getDb();
    const updatedCart = {
      items: this.cart.items.filter(item => {
        return item.productId.toString() !== productId;
      })
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCartItems()
      .then(products => {
        console.log(products);
        const order = {
          items: products,
          user: {
            _id: new mongodb.ObjectId(this._id),
            name: this.name
          }
        };
        return db.collection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      })
      .catch(err => console.log(err));
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new mongodb.ObjectId(this._id) })
      .toArray()
      .then(orders => {
        return orders;
      })
      .catch(err => console.log(err));
  }

  static find(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
  }
}

module.exports = User;
