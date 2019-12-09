const express = require("express");
const adminController = require("../controllers/admin");

const adminRouter = express.Router();

adminRouter.get("/add-product", adminController.getAddProductsPage);

adminRouter.post("/add-product", adminController.postProduct);

adminRouter.get("/products", adminController.getProducts);

module.exports = adminRouter;
