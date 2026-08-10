CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    CONSTRAINT price_non_negative CHECK (price >= 0),
    CONSTRAINT stock_non_negative CHECK (stock >= 0)
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    CONSTRAINT quantity_positive CHECK (quantity > 0),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (id, name, price, stock)
VALUES
    (1, 'wireless mouse', 1299, 100),
    (2, 'wireless keyboard', 2499, 50);