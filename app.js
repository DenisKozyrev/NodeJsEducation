const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRouter = require("./src/routes/admin");
const shopRouter = require("./src/routes/shop");
// const errorsController = require("./src/controllers/errors");
const rootDir = require("./src/utils/path");

//const User = require("./src/models/user");

const app = express();

app.set("view engine", "ejs"); // set the template engine
app.set("views", "src/views"); // path to views file with pug or over extensions.

// app.use((req, res, next) => {
//   User.find("5dfa44d00789a337b87a1ec3")
//     .then(user => {
//       if (user) {
//         req.user = new User(user._id, user.name, user.email, user.cart);
//       }
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRouter); //filtering and adding same path beging
app.use(shopRouter);
// app.use(errorsController.getNotFoundPage);

// Relations

//Connection with mongoose
mongoose
  .connect(
    "mongodb+srv://DenisKozyrev:hZ5hOty9NznUjWyK@nodecompletecluster-68qgp.mongodb.net/DenisKozyrevShop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(result => {
    console.log("Connect to Momgo!");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
