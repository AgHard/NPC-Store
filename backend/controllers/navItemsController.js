const db = require('../config/db');

exports.getAllNavItems = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM nav_items");
    res.json(results);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch nav items" });
  }
};
