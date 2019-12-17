const express = require("express");
const adminController = require("../controllers/admin");

const adminRouter = express.Router();

adminRouter.get("/products", adminController.getProductsHandler);

adminRouter.get("/add-product", adminController.getAddProductsPageHandler);

adminRouter.post("/add-product", adminController.addProductHandler);

adminRouter.get(
  "/edit-product/:productId",
  adminController.getEditProductPageHandler
);

adminRouter.post("/edit-product", adminController.editProductHandler);

adminRouter.post("/delete-product", adminController.deleteProductHandler);

module.exports = adminRouter;
