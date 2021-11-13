const { client } = require("./client");

const addProductToOrder = async ({ product_id, price, order_id, quantity }) => {
  try {
    const response = await client.query(
      `
      INSERT INTO product_orders (product_id, price, order_id, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [product_id, price, order_id, quantity]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllProductOrders = async () => {
  try {
    const response = await client.query(`
    SELECT * FROM product_orders;
    `);
    return response.rows;
  } catch (error) {
    console.error(error);
  }
};

const getProductOrderById = async (id) => {
  try {
    const response = await client.query(
      `
      SELECT * FROM product_orders WHERE id = $1;
      `,
      [id]
    );
    const product_order = response.rows[0];
    return product_order;
  } catch (error) {
    throw error;
  }
};

const getProductOrdersByProduct = async ({ id }) => {
  try {
    const response = await client.query(
      `
  SELECT * FROM product_orders WHERE product_id = $1;
  `,
      [id]
    );
    return response.rows;
  } catch (error) {
    throw error;
  }
};

const updateProductOrder = async ({ id, price, quantity }) => {
  if (price != undefined) {
    await client.query(
      `
      UPDATE product_orders
      SET price = $1
      WHERE id = $2;
      `,
      [price, id]
    );
  }
  if (quantity != undefined) {
    await client.query(
      `
      UPDATE product_orders
      SET quantity = $1
      WHERE id = $2;
      `,
      [quantity, id]
    );
  }
  const response = await client.query(
    `
    SELECT * FROM product_orders WHERE id = $1;
    `,
    [id]
  );

  return response.rows[0];
};

const destroyProductOrder = async (id) => {
  try {
    const response = await client.query(
      `
        DELETE FROM product_orders
        WHERE id = $1
        RETURNING *;
        `,
      [id]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

async function canEditProductOrder(productOrderId, userId) {
  const {
    rows: [orderFromProductOrder],
  } = await client.query(
    `
          SELECT * FROM product_orders
          JOIN orders ON product_orders.product_id = products.id
          AND product_orders.id = $1
        `,
    [productOrderId]
  );
  return orderFromProductOrder.user_id === userId;
}

module.exports = {
  addProductToOrder,
  destroyProductOrder,
  getProductOrderById,
  getProductOrdersByProduct,
  updateProductOrder,
  canEditProductOrder,
  getAllProductOrders,
};
