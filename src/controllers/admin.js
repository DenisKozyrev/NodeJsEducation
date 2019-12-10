const {
  addProduct,
  editProduct,
  fetchAllProducts,
  findProductById,
   deleteProduct
} = require("../models/product");

exports.getProductsHandler = (req, res, next) => {
  fetchAllProducts((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};

exports.getAddProductsPageHandler = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "src", "views", "add-product.html")); // we can send the statis html file
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postProductHandler = (req, res, next) => {
  addProduct(req.body);
  res.redirect("/products");
};

exports.getEditProductPageHandler = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.params.productId;

  findProductById(productId, (product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  });
};

exports.editProductHandler = (req, res, next) => {
  const product = req.body;
  editProduct(product);
  res.redirect("/admin/products");
};

exports.deleteProductHandler = (req, res, next) => {
  const { id, price } = req.body;
  deleteProduct(id, price);
  res.redirect("/admin/products");
};
