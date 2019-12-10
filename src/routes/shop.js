const express = require("express");
const shopController = require("../controllers/shop");

const shopRouter = express.Router();

shopRouter.get("/", shopController.getIndexPageHandler);

shopRouter.get("/products", shopController.getProductsPageHandler);

shopRouter.get("/products/:productId", shopController.getProductDetailsPageHandler);

shopRouter.get("/cart", shopController.getCartPageHandler);

shopRouter.post("/cart", shopController.addProductToCartHandler);

shopRouter.post("/cart/delete-item", shopController.deleteCartItemHandler)

shopRouter.get("/checkout", shopController.getCheckoutPageHandler);

shopRouter.get("/orders", shopController.getOrdersPageHandler);

module.exports = shopRouter;
