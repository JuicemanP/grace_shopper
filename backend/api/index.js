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

module.exports = apiRouter;
