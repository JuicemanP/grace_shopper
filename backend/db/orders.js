const { client } = require("./client");

async function createOrder({ user_id, status }) {
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

module.exports = { createOrder, getOrdersByUser };
