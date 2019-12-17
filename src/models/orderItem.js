const Sequelize = require("sequelize");
const nodeCompleteDB = require("../utils/mongoDatabase");

const OrderItem = nodeCompleteDB.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = OrderItem;
