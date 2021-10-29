const { client } = require("./client");

async function createProduct({
  user_id,
  title,
  description,
  price,
  quantity,
  category_id,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(user_id, title, description, price, quantity, category_id ) 
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `,
      [user_id, title, description, price, quantity, category_id]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function createProductOrders({ product_id, price, order_id, quantity }) {
  try {
    await client.query(
      `
    INSERT INTO product_orders(product_id, price,order_id,quantity)
    VALUES ($1, $2, $3, $4)
RETURNING *;
    `,
      [product_id, price, order_id, quantity]
    );
  } catch (error) {
    throw error;
  }
}
module.exports = { createProduct, createProductOrders };
