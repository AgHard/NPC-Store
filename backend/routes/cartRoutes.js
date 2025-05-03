const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity
} = require("../controllers/cartController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateQuantity);
router.delete("/remove/:packageId", verifyToken, removeFromCart);
router.delete("/clear", verifyToken, clearCart);

module.exports = router;
