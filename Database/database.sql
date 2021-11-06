CREATE TABLE products(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(125),
    price double (15, 2),
    created_at  timestamp default CURRENT_TIMESTAMP null,
    updated_at  timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at timestamp null
);

-- select
SELECT * FROM products;
-- insert
INSERT INTO products (name, price) values ('apple', 5000);
-- get by id
SELECT * FROM products WHERE id = 1;
-- update
UPDATE products SET name="jeruk", price=3000 WHERE id=1;
-- soft delete
UPDATE products SET deleted_at = now() WHERE id=1;
-- delete
DELETE FROM products WHERE id=1;