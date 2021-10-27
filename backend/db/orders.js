const {client} = require("./client");

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
module.exports={createOrders,getProductById,getProductOrdersById}