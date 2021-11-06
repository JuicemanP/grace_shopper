const productsRouter = require("express").Router();
const { getAllProducts, createProduct } = require("../db");
const multer = require("multer");
const upload = multer({ dest: "public/images" });

//GET ALL PRODUCTS

productsRouter.get("getProducts", async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.send(products);
  } catch (error) {
    res.status(500).send({ error });
  }
});

//CREATE PRODUCT

productsRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const { user_id, title, description, price, quantity, category_id } =
      req.body;
    const product = await createProduct({
      user_id: user_id,
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      image: req.file.filename,
      category_id: category_id,
    });

    return res.send(product);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
});

//UPDATE PRODUCT

productsRouter.patch("/products/:id", async (req, res) => {
  try {
    const { id, title, description, price, quantity } = req.body;
    const updatedProduct = await updateProduct({
      id: id,
      title: title,
      description: description,
      price: price,
      quantity: quantity,
    });
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
});
// productsRouter.get("/productorders", (req, res) => {
//   try {
//     const newProductOrders = products.map((product_orders) => {
//       const { product_id, price, order_id, quantity } = product_orders;
//       return { product_id, price, order_id, quantity };
//     });
//     res.json(newProductOrders);
//   } catch (error) {
//     res.status(500).send({ error: "error" });
//   }
// });

module.exports = productsRouter;
