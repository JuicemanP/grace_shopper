const {
  client,
  createUser,
  createProduct,
  getAllUsers,
  createOrders,
  getProductOrdersById,
} = require("./");

const createDB = async () => {
  console.log("well hello there");
  try {
    console.log(client.query);
    await client.query(
      `
<<<<<<< HEAD
      DROP TABLE IF EXISTS reviews CASCADE;       
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS orders CASCADE; 
      DROP TABLE IF EXISTS product_orders CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS categories CASCADE;
=======
    DROP TABLE IF EXISTS product_orders;
    DROP TABLE IF EXISTS categories CASCADE; 
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;    
    DROP TABLE IF EXISTS reviews CASCADE;
>>>>>>> 635edbffac751ad478eb9103959345e6323484ec

    
    CREATE TABLE categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     username VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL  
    );
        
    CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL NOT NULL,
    quantity INT NOT NULL,
    category_id INT REFERENCES categories(id)
    


    );
    
    CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        status VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE reviews(
    product_id INT REFERENCES products(id),
    user_id INT REFERENCES users(id),
    comment TEXT 
    );
    
    CREATE TABLE product_orders(
        product_id INT REFERENCES products(id),
        price DECIMAL NOT NULL,
        order_id INT REFERENCES orders(id),
        quantity INT NOT NULL
    );
        `
    );
  } catch (error) {
    console.error(error);
  }
};

async function createInitialUser() {
  try {
    await createUser({
      email: "user@example.com",
      username: "user",
      password: "password",
    });
  } catch (error) {
    console.error("Error creating user!");
    throw error;
  }
}

async function createCategories() {
  try {
    const categories = [{ name: "gym" }, { name: "auto" }, { name: "home" }];
    for (let category of categories) {
      await client.query(
        `
        INSERT INTO categories (name) VALUES ($1)`,
        [category.name]
      );
      console.log(category.name);
    }
  } catch (error) {
    console.error("Error creating category!");
    throw error;
  }
}
async function createInitialProducts() {
  try {
    const [user] = await getAllUsers();
    console.log(user);
    await createProduct({
      user_id: user.id,
      title: "Product",
      description: "Product",
      price: 123,
      quantity: 456,
      category_id: 1,
    });
  } catch (error) {
    throw error;
  }
}
async function createInitialOrder() {
  try {
    const [user] = await getAllUsers();
    await createOrders({
      user_id: user.id,
      status: "pending",
    });
  } catch (error) {
    throw error;
  }
}
async function createProductOrders({ price, quantity, order_id, product_id }) {
  try {
    await client.query(``);

    // await client query INSERT INTO product_orders
  } catch (error) {}
}
const seedDB = async () => {
  try {
    client.connect();
    await createDB();
    await createInitialUser();
    await createCategories();
    await createInitialProducts();
    await createInitialOrder();
    await getProductOrdersById();
  } catch (error) {}
};

seedDB();
