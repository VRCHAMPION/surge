require("dotenv").config();

const express = require("express");
const pool = require("./database");

const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

const app = express();
const PORT = process.env.PORT || 3000;

console.log(`Environment: ${process.env.NODE_ENV}`);

// Middleware
app.use(express.json());

// Test database connection
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected!");
    console.log(result.rows);
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "surge-api",
  });
});

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Surge API running on http://localhost:${PORT}`);
});
