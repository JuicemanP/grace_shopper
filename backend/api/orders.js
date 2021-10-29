const {
  createOrders,
  //   getProductById,
  //   getProductOrdersByProduct,
} = require("./db");

const ordersRouter = require("express").Router();

ordersRouter.get("/", async (req, res) => {
  const orders = await createOrders();
  res.send(orders);
});

module.exports = ordersRouter;
