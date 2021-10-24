const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: "grace-shopper",
});
async function createUser({ email, username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(email, username, password) 
      VALUES($1, $2, $3)
      RETURNING *;
    `,
      [email, username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}
async function createProduct({
  user_id,
  title,
  description,
  price,
  quantity,
  category_id,
}) {
  try {
    console.log("hi");
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
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, email, username
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}
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
async function getProductOrdersById(productTitle) {
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
async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * 
      FROM products
      WHERE id=$1;
    `,
      [productId]
    );

    return product;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  client,
  createUser,
  createProduct,
  getAllUsers,
  createOrders,
  getProductOrdersById,
};
