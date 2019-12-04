const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const admin = require("./src/routes/admin");
const shop = require("./src/routes/shop");
const rootDir = require("./src/utils/path");

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

app.use("/admin", admin.router); //filtering and adding same path beging
app.use(shop.router);

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Not Found Page",
    path: null
    // layout: false /* for handlebars*/
  });
});

app.listen(3000);


// server without express
// const requestHandler = require("./routes");
// const http = require("http");

// const server = http.createServer(requestHandler);

// server.listen(3000);  
