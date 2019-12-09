const express = require("express");
const shopController = require("../controllers/shop");

const shopRouter = express.Router();

shopRouter.get("/", shopController.getIndexPage);

shopRouter.get("/products", shopController.getProductsPage);

shopRouter.get("/products/:productId", shopController.getProductDetailsPage);

shopRouter.get("/cart", shopController.getCartPage);

shopRouter.get("/checkout", shopController.getCheckoutPage);

shopRouter.get("/orders", shopController.getOrdersPage);

module.exports = shopRouter;
