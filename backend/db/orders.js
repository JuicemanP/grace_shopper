const { client } = require("./client");

const getProductById = async (id) => {
  try {
    const response = await client.query(
      `SELECT * FROM products 
        WHERE id = $1;`,
      [id]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};

async function createOrders({ user_id, status }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders(user_id, status) 
        VALUES($1, $2)
        RETURNING *;
      `,
      [user_id, status]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

const getAllOrders = async () => {
  try {
    const orders = await client.query(`SELECT * FROM orders;
        `);
    return orders.rows;
  } catch (error) {
    throw error;
  }
};

async function getOrdersByUser(userId) {
  try {
    const response = await client.query(
      `
      SELECT * 
      FROM orders
      WHERE user_id=$1;
    `,
      [userId]
    );

    const orders = response.rows;
    return orders;
  } catch (error) {
    throw error;
  }
}
async function getProductOrdersByProduct(productTitle) {
  try {
    const { rows: productId } = await client.query(
      `
        SELECT products
        FROM orders
        JOIN product_id ON products.id=product_id
        JOIN orders_id ON orders.id=orders_id
        WHERE product.title=$1;
      `,
      [productTitle]
    );
    return await Promise.all(
      productId.map((product) => getProductById(product.id))
    );
  } catch (error) {
    throw error;
  }
}

const destroyOrderById = async (id) => {
  try {
    await client.query(
      `
            DELETE FROM orders 
            WHERE id=$1;
            `,
      [id]
    );
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createOrders,
  getOrdersByUser,
  getProductById,
  getProductOrdersByProduct,
  destroyOrderById,
  getAllOrders,
};
