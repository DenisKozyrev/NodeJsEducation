const Sequelize = require("sequelize");

const nodeCompleteDB = new Sequelize("node_complete", "root", "nodecomplete", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = nodeCompleteDB;
