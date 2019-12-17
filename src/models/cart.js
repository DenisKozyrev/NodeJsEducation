const Sequelize = require("sequelize");
const nodeCompleteDB = require("../utils/mongoDatabase");

const Cart = nodeCompleteDB.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;
