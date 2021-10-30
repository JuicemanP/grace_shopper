// const {
//   createOrders,
//   getProductById,
//   getProductOrdersByProduct,
// } = require("../db");

// const ordersRouter = require("express").Router();

// ordersRouter.get("/", async (req, res) => {
//   const order = await createOrders();

//   res.send(order);
// });

// ordersRouter.post("/registerOrder", async (req, res) => {
//   const { user_id, status } = req.body;
//   const productId = await createOrders({ user_id, status });
//   res.send(productId);
// });

// ordersRouter.get("/", async (req, res) => {
//   const products = await getProductById();
//   res.send(products);
// });

// ordersRouter.patch("/:ordersId", async (req, res) => {
//   const { ordersId } = req.params;
//   const { name, description } = req.body;
//   const updatedOrders = await updateOrders({
//     id: ordersId,
//     name,
//     description,
//   });
//   console.log(updatedOrders);
//   res.send(updatedOrders);
// });

// ordersRouter.get("/:ordersId", async (req, res) => {
//   const productId = await getProductOrdersByProduct();
//   res.send(productId);
// });

// module.exports = ordersRouter;

const { createOrders } = require("../db/orders");

const ordersRouter = require("express").Router();

ordersRouter.post("/", async (req, res) => {
  try {
    const { user_id, status } = req.body;
    const newOrder = await createOrders({ user_id, status });
    res.send(newOrder);
  } catch (error) {
    throw error;
  }
});
module.exports = ordersRouter;
