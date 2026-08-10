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
app.get("/products", (req, res) => {
  res.json(products);
});
app.listen(PORT, () => {
  console.log(`Surge API running on http://localhost:${PORT}`);
});
