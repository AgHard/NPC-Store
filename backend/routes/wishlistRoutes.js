const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Add to wishlist
router.post("/add", authenticate, (req, res) => {
  const user_id = req.user.id;
  const { package_id } = req.body;
  const sql = "INSERT IGNORE INTO wishlist (user_id, package_id) VALUES (?, ?)";
  db.query(sql, [user_id, package_id], (err) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json({ message: "Added to wishlist" });
  });
});

// Get wishlist
router.get("/", authenticate, (req, res) => {
  const user_id = req.user.id;
  const sql = `
    SELECT w.id AS wishlist_id, gp.*
    FROM wishlist w
    JOIN game_packages gp ON w.package_id = gp.id
    WHERE w.user_id = ?`;
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json(results);
  });
});

// Remove from wishlist
router.delete("/remove/:package_id", authenticate, (req, res) => {
  const user_id = req.user.id;
  const { package_id } = req.params;
  const sql = "DELETE FROM wishlist WHERE user_id = ? AND package_id = ?";
  db.query(sql, [user_id, package_id], (err) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json({ message: "Removed from wishlist" });
  });
});

module.exports = router;
