const Sequelize = require("sequelize");

const mySequelize = new Sequelize("node_complete", "root", "nodecomplete", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = mySequelize;
