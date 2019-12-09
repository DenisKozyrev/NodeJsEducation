const express = require("express");
const adminController = require("../controllers/admin");

const adminRouter = express.Router();

adminRouter.get("/products", adminController.getProducts);

adminRouter.get("/add-product", adminController.getAddProductsPage);

adminRouter.post("/add-product", adminController.postProduct);

adminRouter.get("/edit-product/:productId", adminController.getEditProductPage);

adminRouter.post("/edit-product", adminController.editProduct);

adminRouter.post("/delete-product", adminController.postDeleteProduct);

module.exports = adminRouter;
