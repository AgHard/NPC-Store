const db = require('../config/db');

// Get all collections
exports.getAllCollections = async (req, res) => {
    try {
        const [collections] = await db.query('SELECT * FROM collections');
        res.json(collections);
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getCollectionsByType = async (req, res) => {
    const { collection_id } = req.params;

    try {
        const [results] = await db.query(
            'SELECT * FROM collections WHERE collection_id = ?',
            [collection_id]
        );
        res.json(results);
    } catch (error) {
        console.error('Error fetching collections by type:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get distinct collection descriptions (for navbar)
exports.getCollectionDescriptions = async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT DISTINCT description FROM collections'
    );
    res.json(results);
  } catch (error) {
    console.error('Error fetching collection descriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.addCollection = async (req, res) => {
  const { name, description, collection_id, image_url, group_id } = req.body;

  try {
    await db.query(
      `INSERT INTO collections (name, description, collection_id, image_url, group_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, description, collection_id, image_url, group_id]
    );
    res.status(201).json({ message: "Collection added successfully" });
  } catch (error) {
    console.error("Error adding collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCollection = async (req, res) => {
  const { id } = req.params;
  const { name, description, collection_id, image_url, group_id } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE collections 
       SET name = ?, description = ?, collection_id = ?, image_url = ?, group_id = ? 
       WHERE id = ?`,
      [name, description, collection_id, image_url, group_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json({ message: "Collection updated successfully" });
  } catch (error) {
    console.error("Error updating collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCollection = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM collections WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
