const express = require("express");

const app = express();
const PORT = 3000;

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
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
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
