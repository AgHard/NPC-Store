const db = require('../config/db');

// Get packages for a specific game (Public)
exports.getPackagesByGame = async (req, res) => {
    const gameId = req.params.id;

    try {
        db.query('SELECT * FROM game_packages WHERE game_id = ?', [gameId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);  // Return the packages to the client
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a package for a game (Protected, Admin Only)
exports.addPackage = async (req, res) => {
  const { game_id, amount, currency, price_egp, description_of_package, group_id, image_url } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO game_packages 
       (game_id, amount, currency, price_egp, description_of_package, group_id, image_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [game_id, amount, currency, price_egp, description_of_package, group_id, image_url || '']
    );

    res.status(201).json({ message: "Package added successfully", packageId: result.insertId });
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Update a package (Protected, Admin Only)
exports.updatePackage = async (req, res) => {
  const { id } = req.params;
  const { amount, currency, price_egp, description_of_package, group_id, image_url } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE game_packages 
       SET amount = ?, currency = ?, price_egp = ?, description_of_package = ?, group_id = ?, image_url = ? 
       WHERE id = ?`,
      [amount, currency, price_egp, description_of_package, group_id, image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({ message: "Package updated successfully" });
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Delete a package (Protected, Admin Only)
exports.deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM game_packages WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

