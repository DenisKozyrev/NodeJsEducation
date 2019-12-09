const Product = require("../models/product");

exports.getAddProductsPage = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "src", "views", "add-product.html")); // we can send the statis html file
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postProduct = (req, res, next) => {
  const product = new Product(req.body);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};
