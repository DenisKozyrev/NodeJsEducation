const Product = require("../models/product");

exports.getProductsHandler = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products, "products");
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => {
      res.write(`<h1>${err.message}</h1>`);
      res.end();
    });
};

exports.getAddProductsPageHandler = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.addProductHandler = (req, res, next) => {
  console.log(req.body.description);
  const { title, price, description, imageUrl } = req.body;
  const product = new Product({ title, price, description, imageUrl });

  product
    .save() // mongoose method for creating document
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

//   Product.findOne(productId)
//     .then(product => {
//       if (!product) {
//         res.redirect("/");
//       }
//       res.render("admin/add-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product
//       });
//     })
//     .catch(err => {
//       res.write(`<h1>${err.message}</h1>`);
//       res.end();
//     });
// };

// exports.editProductHandler = (req, res, next) => {
//   const product = req.body;

//   Product.update(product)
//     .then(() => {
//       res.redirect("/admin/products");
//     })
//     .catch(err => {
//       res.write(`<h1>${err.message}</h1>`);
//       res.end();
//     });
// };

// exports.deleteProductHandler = (req, res, next) => {
//   const { id } = req.body;
//   Product.delete(id)
//     .then(() => {
//       res.redirect("/admin/products");
//     })
//     .catch(err => {
//       res.write(`<h1>${err.message}</h1>`);
//       res.end();
//     });
// };
