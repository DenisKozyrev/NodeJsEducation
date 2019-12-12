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
const Cart = require("./src/models/cart");
const CartItem = require("./src/models/cartItem");

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

app.use((req, res, next) => {
  User.findOne({ where: { id: 1 } })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRouter); //filtering and adding same path beging
app.use(shopRouter);

app.use(errorsController.getNotFoundPage);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

nodeCompleteDB
  .sync({ force: true })
  // .sync()
  .then(() => {
    return User.findOne({ where: { id: 1 } });
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Denis", email: "test@test.com" });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    app.listen(3000);
  })
  .catch(err => console.log(err));
