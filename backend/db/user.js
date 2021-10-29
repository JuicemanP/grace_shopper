const {
    client
  } = require("./client");
  const bcrypt = require("bcrypt")
async function createUser({ email, username, password }) {
  const hashPassword= await bcrypt.hash(password,10)
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        INSERT INTO users(email, username, password) 
        VALUES($1, $2, $3)
        RETURNING *;
      `,
        [email, username, hashPassword]
      );
      const user=response.rows[0]
      delete user.password;
      return user
    } catch (error) {
      throw error;
    }
  }
  async function getAllUsers({username, email}) {
    try {
      const response = await client.query(`
        SELECT * FROM users
        WHERE username =$1 OR email =$2;
      `,[username,email]);

      const user = response.rows[0]
      if
      (await bcrypt.compare(password,user.password)){
   
      delete user.password
      return user
  }
    } catch (error) {
      throw error;
    }
  }
  module.exports={createUser,getAllUsers}