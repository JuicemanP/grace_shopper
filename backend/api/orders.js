const {
  createOrders,
  getProductById,
  getProductOrdersByProduct,
} = require("../db/orders");

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

// ordersRouter.get("/:ordersId", async (req, res) => {
//   try {
//     const id = req.params.ordersId();
//     const productId = await getProductOrdersByProduct(id);
//     res.send(productId);
//   } catch (error) {
//     console.error(error);
//   }
// });

ordersRouter.get("/:userid/products", async (req, res) => {
  try {
    const userId = req.params.userid;
    const products = await getProductById(userId);
    res.send(products.title);
  } catch (error) {
    console.error(error);
  }
});

module.exports = ordersRouter;

//getting order by userid
// by order_id

//patch
//product to order

//delete Orders
