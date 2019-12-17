const Sequelize = require("sequelize");
const nodeCompleteDB = require("../utils/mongoDatabase");

const Order = nodeCompleteDB.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Order;