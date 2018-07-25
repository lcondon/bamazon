drop database if exists bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    id INT
    AUTO_INCREMENT NOT NULL,
    product_name VARCHAR
    (100) NOT NULL,
    department_name VARCHAR
    (100) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY
    (id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Bamazon Balexa', 'Bamazon Devices', 50, 210);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Bamazon Fire Stick', 'Bamazon Devices', 40, 210);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Bodum French Press', 'Kitchen', 25, 60);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Cuisinart Food Processor', 'Kitchen', 175, 90);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Beats Headphones', 'Electronics', 200, 45);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Bose Speakers', 'Electronics', 270, 75);

    SELECT
        *
    FROM
        products;