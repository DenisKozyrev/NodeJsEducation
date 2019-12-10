const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const adminRouter = require("./src/routes/admin");
const shopRouter = require("./src/routes/shop");
const rootDir = require("./src/utils/path");
const errorsController = require("./src/controllers/errors");
const sqlDatabase = require("./src/utils/sqlDatabase");

const app = express();

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "src/views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs"
  })
); // thats how express-handlebars connected, pug and ejx don`t need it.

app.set("view engine", "ejs"); // set the template engine
app.set("views", "src/views"); // path to views file with pug or over extensions.

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRouter); //filtering and adding same path beging
app.use(shopRouter);

app.use(errorsController.getNotFoundPage);

sqlDatabase.execute("SELECT * FROM node_complete.products").then();

app.listen(3000);

// server without express
// const requestHandler = require("./routes");
// const http = require("http");

// const server = http.createServer(requestHandler);

// server.listen(3000);
