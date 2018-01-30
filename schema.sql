CREATE DATABASE bamazon;
USE bamazon;
  
CREATE TABLE products(
item_id  int auto_increment PRIMARY KEY not null,
product_name varchar(255),
department_name varchar(255),
price int unsigned,
stock_quantity int unsigned
);

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES
("Leather Recliner", "FURNITURE", 650, 4),
("Wood TV Stand ", "FURNITURE", 200, 6),
("King Size Bed", "FURNITURE", 1400, 3),
("Apple Iphone X", "ELECTRONICS", 1000, 4),
("Beat Headphone", "ELECTRONICS", 175, 3),
("Flat Screen TV", "ELECTRONICS", 600  , 2),
("Dog Bowl", "PETS", 20, 8 ),
("Cat Litter", "PETS", 30, 6),
("Yoga Mat", "FITNESS", 45, 5),
("Barbell", "FITNESS", 260, 3)