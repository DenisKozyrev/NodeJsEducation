const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

const adminRouter = require("./src/routes/admin");
const shopRouter = require("./src/routes/shop");
const rootDir = require("./src/utils/path");
const errorsController = require("./src/controllers/errors");

const nodeCompleteDB = require("./src/utils/sqlDatabase");
const Product = require("./src/models/product");
const User = require("./src/models/user");

const app = express();

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "src/views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs"
//   })
// ); // thats how express-handlebars connected, pug and ejx don`t need it.

app.set("view engine", "ejs"); // set the template engine
app.set("views", "src/views"); // path to views file with pug or over extensions.

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRouter); //filtering and adding same path beging
app.use(shopRouter);

app.use(errorsController.getNotFoundPage);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product)


nodeCompleteDB
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
