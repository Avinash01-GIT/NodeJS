const express = require("express");
const router = express.Router();

router.get("/product/list", (req, res) => {
  res.json({
    success: true,
    message: "Dummy product-list API",
  });
});

router.get("/product/:id", (req, res) => {
  res.json({
    success: true,
    message: "Dummy product-id API",
  });
});

module.exports = router;
