const { client } = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ email, username, password }) {
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const response = await client.query(
      `
        INSERT INTO users(email, username, password) 
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [email, username, hashPassword]
    );
    const user = response.rows[0];
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername({ username }) {
  try {
    const response = await client.query(
      `
        SELECT * FROM users
        WHERE username =$1;
      `,
      [username]
    );
    const user = response.rows[0];
    return user;
  } catch (error) {
    throw error;
  }
}

const getUser = async ({ username, password }) => {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      throw "Passwords do not match!";
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getUserByUsername, getUser };
