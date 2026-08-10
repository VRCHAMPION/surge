const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "surge-api",
  });
});

const products = [
  {
    id: 1,
    name: "wireless mouse",
    price: 1499,
    stock: 100,
  },
  {
    id: 2,
    name: "wireless keyboard",
    price: 2499,
    stock: 50,
  },
];

const cart = [];

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.json(product);
});

app.post("/cart", (req, res) => {
  if (req.body.productId === undefined) {
    return res.status(400).json({
      error: "productId is required",
    });
  }

  if (req.body.quantity === undefined) {
    return res.status(400).json({
      error: "quantity is required",
    });
  }

  if (typeof req.body.productId !== "number" || req.body.productId <= 0) {
    return res.status(400).json({
      error: "productId must be a positive number",
    });
  }

  if (typeof req.body.quantity !== "number" || req.body.quantity <= 0) {
    return res.status(400).json({
      error: "quantity must be a positive number",
    });
  }

  const product = products.find((p) => p.id === req.body.productId);

  if (!product) {
    return res.status(400).json({
      error: "Product not found",
    });
  }

  const cartItem = {
    id: cart.length + 1,
    productId: req.body.productId,
    quantity: req.body.quantity,
  };

  cart.push(cartItem);

  res.status(201).json({
    message: "Item added to cart",
    data: cartItem,
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Surge API running on http://localhost:${PORT}`);
});
