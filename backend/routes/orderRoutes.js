const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create order
router.post("/", auth, async (req, res) => {
  const order = await Order.create({
    userId: req.user.id,
    products: req.body.products,
    totalAmount: req.body.totalAmount
  });

  res.json(order);
});

// Get user orders
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

module.exports = router;