const mongodb = require("mongodb");
const getDb = require("../utils/mongoDatabase").getDb;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  add() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static find(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
  }
}

module.exports = User;
