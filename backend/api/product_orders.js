const productOrdersRouter = require("express").Router();

const {
  addProductToOrder,
  getAllProductOrders
} = require("../db/product_orders");

//Add product to order:

productOrdersRouter.post("/", async (req, res) => {
  try {
    const { product_id, price, order_id, quantity } = req.body;
    const productOrder = await addProductToOrder({
      product_id: product_id,
      price: price,
      order_id: order_id,
      quantity: quantity,
    });
    return res.send(productOrder);
  } catch (error) {
    console.error(error);
  }
});

//Get all product orders:

productOrdersRouter.get("/", async (req, res) => {
  try {
    const productOrders = await getAllProductOrders();
    return res.send(productOrders);
  } catch (error) {
    console.error(error);
  }
});

module.exports=productOrdersRouter