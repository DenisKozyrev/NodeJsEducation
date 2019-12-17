const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRouter = require("./src/routes/admin");
const shopRouter = require("./src/routes/shop");
// const errorsController = require("./src/controllers/errors");
const rootDir = require("./src/utils/path");

const mongoConnect = require("./src/utils/mongoDatabase").mongoConnect;

const app = express();

app.set("view engine", "ejs"); // set the template engine
app.set("views", "src/views"); // path to views file with pug or over extensions.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRouter); //filtering and adding same path beging
app.use(shopRouter);
// app.use(errorsController.getNotFoundPage);

// Relations

//Connection

mongoConnect(() => {
  app.listen(3000);
});
