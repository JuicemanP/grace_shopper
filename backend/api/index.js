const apiRouter = require("express").Router();
const usersRouter = require("./users");
const ordersRouter = require("./orders");
const productsRouter = require("./products");
const reviewsRouter = require("./reviews");

apiRouter.use("/health", (req, res) => {
  try {
    res.send({ message: "Healthy" });
  } catch (error) {
    console.error(error);
  }
});

apiRouter.use("/users", usersRouter);

apiRouter.use("/orders", ordersRouter);

apiRouter.use("/products", productsRouter);

apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
