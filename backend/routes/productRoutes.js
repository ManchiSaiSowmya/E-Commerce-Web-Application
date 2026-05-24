const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all products (public)
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (Admin only)
router.post("/", auth, roleCheck("admin"), async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

module.exports = router;