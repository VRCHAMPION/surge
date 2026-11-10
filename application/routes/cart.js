const express = require("express");
const { randomBytes } = require("node:crypto");
const products = require("../data/products");
const carts = require("../data/cart");

const router = express.Router();

function getCart(req, res) {
  let cartId = req.get("Cookie")?.match(/(?:^|;\s*)surge_cart=([a-f0-9]{64})(?:;|$)/)?.[1];
  if (!cartId) {
    cartId = randomBytes(32).toString("hex");
    res.setHeader(
      "Set-Cookie",
      `surge_cart=${cartId}; HttpOnly; SameSite=Lax; Path=/cart; Max-Age=2592000`,
    );
  }

  if (!carts.has(cartId)) carts.set(cartId, []);
  return carts.get(cartId);
}

router.post("/", (req, res) => {
  const cart = getCart(req, res);

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

router.get("/", (req, res) => {
  const cart = getCart(req, res);
  res.json(cart);
});

router.get("/count", (req, res) => {
  const cart = getCart(req, res);
  const totalCount = cart.length;

  res.json({
    count: totalCount,
  });
});

router.get("/:id", (req, res) => {
  const cart = getCart(req, res);
  const cartId = parseInt(req.params.id);

  const cartItem = cart.find((item) => item.id === cartId);

  if (!cartItem) {
    return res.status(404).json({
      error: "Cart item not found",
    });
  }

  res.json(cartItem);
});

router.put("/:id", (req, res) => {
  const cart = getCart(req, res);
  const cartId = parseInt(req.params.id);

  const cartItem = cart.find((item) => item.id === cartId);

  if (!cartItem) {
    return res.status(404).json({
      error: "Cart item not found",
    });
  }

  if (typeof req.body.quantity !== "number" || req.body.quantity <= 0) {
    return res.status(400).json({
      error: "quantity must be a positive number",
    });
  }

  cartItem.quantity = req.body.quantity;

  res.json({
    message: "Cart item updated",
    data: cartItem,
  });
});

router.delete("/:id", (req, res) => {
  const cart = getCart(req, res);
  const cartId = parseInt(req.params.id);

  const cartIndex = cart.findIndex((item) => item.id === cartId);

  if (cartIndex === -1) {
    return res.status(404).json({
      error: "Cart item not found",
    });
  }

  cart.splice(cartIndex, 1);

  res.status(204).send();
});

module.exports = router;
