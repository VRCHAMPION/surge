const express = require("express");

const router = express.Router();
const products = require("../data/products");
router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.json(product);
});

module.exports = router;
