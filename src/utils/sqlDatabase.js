const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_comlete", "root", "nodecomplete", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
