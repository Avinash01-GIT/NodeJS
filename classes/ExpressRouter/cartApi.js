const express = require("express");
const router = express.Router();

router.get("/cart/add-to-cart", (req, res) => {
  res.json({
    success: true,
    message: "Dummy cart-add-to-cart API",
  });
});

router.get("/cart/remove-from-cart", (req, res) => {
  res.json({
    success: true,
    message: "Dummy cart-remove-from-cart API",
  });
});

module.exports = router;
