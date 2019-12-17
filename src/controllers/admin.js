const Product = require("../models/product");

// exports.getProductsHandler = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then(products => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products"
//       });
//     })
//     .catch(err => {
//       res.write(`<h1>${err.message}</h1>`);
//       res.end();
//     });
// };

exports.getAddProductsPageHandler = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "src", "views", "add-product.html")); // we can send the statis html file
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.addProductHandler = (req, res, next) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product(null, title, price, description, imageUrl);
  product
    .addProduct()
    .then(() => {
      res.redirect("/products");
    })
    .catch(err => {
      res.write(`<h1>${err.message}</h1>`);
      res.end();
    });
};

// exports.getEditProductPageHandler = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }

//   const productId = req.params.productId;

//   req.user
//     .getProducts({ where: { id: productId } })
//     .then(products => {
//       const product = products[0];
//       if (!product) {
//         res.redirect("/");
//       }
//       res.render("admin/add-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product
//       });
//     })
//     .catch(err => {
//       res.write(`<h1>${err.message}</h1>`);
//       res.end();
//     });
// };

// exports.editProductHandler = (req, res, next) => {
//   const { title, price, description, imageUrl, id } = req.body;

//   Product.update({ title, price, description, imageUrl }, { where: { id } })
//     .then(() => {
//       res.redirect("/admin/products");
//     })
//     .catch(err => {
//       res.write(`<h1>${err.message}</h1>`);
//       res.end();
//     });
// };

// exports.deleteProductHandler = (req, res, next) => {
//   const { id, price } = req.body;
//   Product.destroy({ where: { id } }).then(() => {
//     res.redirect("/admin/products");
//   });
// };
