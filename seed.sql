DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id VARCHAR(100) NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100),
  price DECIMAL(10,2) NULL, 
  stock_quantity INT(4)
);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("A087ZA", "Climbing Harness", "Recreation", 55.99, 12);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("N2033", "Ultralight Tent", "Recreation", 324.99, 3);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("ZZZHF78", "Headlamp", "Recreation", 35.99, 8);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("G44F76", "Athletic Chalk", "Recreation", 15.99, 40);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("G3FG76", "Fabric of the Cosmos", "Literature", 17.99, 30);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("A997ZA", "Your Inner Fish", "Literature", 14.99, 52);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("99877", "Microwave Oven", "Homegoods", 155.99, 5);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("A0HHHA", "Towels", "Homegoods", 29.99, 40);

SELECT * FROM products;
