const express = require("express");
const pool = require("../database");

const router = express.Router();

// GET all products
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM products");

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET one product
router.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// CREATE a product
router.post("/", async (req, res, next) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price < 0 || stock < 0) {
      return res.status(400).json({
        error: "Invalid product data",
      });
    }

    const result = await pool.query(
      `INSERT INTO products (name, price, stock)
             VALUES ($1, $2, $3)
             RETURNING *`,
      [name, price, stock],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
