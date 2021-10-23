const client = require("./");

const createDB = async () => {
  console.log("well hello there");
  try {
    console.log(client.query);
    await client.query(
      `
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories; 
    DROP TABLE IF EXISTS products_orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS orders;    
    DROP TABLE IF EXISTS reviews;

    
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

    //   .finally(() => client.end());
    // console.log("SOB");
  } catch (error) {
    console.error(error);
  }

  console.log("general kenobi");
};

const seedDB = async () => {
  try {
    client.connect();
    await createDB();

    const categories = [{ name: "gym" }, { name: "auto" }, { name: "home" }];
    for (let category of categories) {
      await client.query(
        `
        INSERT INTO categories (name) VALUES ($1)`,
        [category.name]
      );
      console.log(category.name);
    }
    console.log(category);
  } catch (error) {}
};

seedDB();
