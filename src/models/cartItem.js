const Sequelize = require("sequelize");
const nodeCompleteDB = require("../utils/sqlDatabase");

const CartItem = nodeCompleteDB.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
