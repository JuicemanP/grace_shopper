
// Must have title, description, price, and inventory quantity
async function createTable()
try {
    
    await client.query(`
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
    auth_user BOOLEAN NOT NULL,
    user_id INT REFERENCES users(id),
    price DECIMAL NOT NULL,
    
);

CREATE TABLE reviews(
product_id INT REFERCENCES products(id)
user_id INT REFERENCES users(id)
comment TEXT 
);

CREATE TABLE product_orders(
    product_id INT REFERENCES products(id),
    price DECIMAL REFERENCES products(price),
    order_id INT REFERENCES orders(id),
    quantity INT NOT NULL
);

CREATE TABLE cart(

)
    `)
    
} catch (error) {
    throw (error)
}