const {
  createOrders,
  getProductById,
  getProductOrdersByProduct,
} = require("../db");

const ordersRouter = require("express").Router();

ordersRouter.get("/", async (req, res) => {
  const orders = await createOrders();
  res.send(orders);
});

ordersRouter.get("/", async (req, res) => {
  const products = await getProductById();
  res.send(products);
});

ordersRouter.patch("/:ordersId", async (req, res) => {
  const { ordersId } = req.params;
  const { name, description } = req.body;
  const updatedOrders = await updateOrders({
    id: ordersId,
    name,
    description,
  });
  console.log(updatedOrders);
  res.send(updatedOrders);
});

ordersRouter.get("/:ordersId", async (req, res) => {
  const order = await getProductOrdersByProduct();
  res.send(order);
});

module.exports = ordersRouter;
