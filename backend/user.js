const { client } = require("./client");

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
module.exports = { createUser, getAllUsers };
