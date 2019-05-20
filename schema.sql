DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id VARCHAR(100) NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100),
  price DECIMAL(10,2) NULL, 
  stock_quantity INT(4)
  PRIMARY KEY (position)
);

SELECT * FROM products;
