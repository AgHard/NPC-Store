const db = require('../config/db');

exports.getGames = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        MIN(id) AS id,
        group_id, 
        base_name, 
        image_url 
      FROM games 
      GROUP BY group_id, base_name, image_url
    `);
    res.json(results);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getGamePackages = async (req, res) => {
  const gameGroupId = req.params.group_id;

  try {
    const [packages] = await db.query(
      `SELECT gp.*, g.name AS region_name, g.image_url
       FROM game_packages gp
       JOIN games g ON gp.game_id = g.id
       WHERE gp.game_id IN (SELECT id FROM games WHERE group_id = ?)`,
      [gameGroupId]
    );

    if (packages.length === 0) {
      return res.status(404).json({ success: false, message: 'No packages found for this game group' });
    }

    res.json(packages);
  } catch (error) {
    console.error('Error fetching game packages:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getRegionsByGroupId = async (req, res) => {
    const { group_id } = req.params;
  
    try {
      const [regions] = await db.query(
        'SELECT id, name, image_url FROM games WHERE group_id = ?',
        [group_id]
      );
      res.json(regions);
    } catch (error) {
      console.error('Error fetching regions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.getPackagesByGameId = async (req, res) => {
    const gameId = req.params.game_id;
  
    try {
      const [packages] = await db.execute(
        'SELECT * FROM game_packages WHERE game_id = ?',
        [gameId]
      );
  
      res.json(packages);
    } catch (error) {
      console.error('Error fetching packages by game_id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
exports.getGameById = async (req, res) => {
    const gameId = req.params.id;

    try {
        db.query('SELECT * FROM games WHERE id = ?', [gameId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ error: 'Game not found' });
            res.json(results[0]);
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPackageDetails = async (req, res) => {
  const { group_id, package_id } = req.params;

  try {
      const [rows] = await db.query(
          'SELECT * FROM game_packages WHERE id = ? AND game_id = ?',
          [package_id, group_id]
      );

      if (rows.length === 0) {
          return res.status(404).json({ success: false, message: 'Package not found' });
      }

      res.status(200).json(rows[0]);
  } catch (error) {
      console.error('Error fetching package:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.addGame = async (req, res) => {
    const { name, category } = req.body;

    try {
        db.query('INSERT INTO games (name, category) VALUES (?, ?)', [name, category], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Game added successfully', gameId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateGame = async (req, res) => {
    const gameId = req.params.id;
    const { name, category } = req.body;

    try {
        db.query('UPDATE games SET name = ?, category = ? WHERE id = ?', [name, category, gameId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Game not found' });
            res.json({ message: 'Game updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteGame = async (req, res) => {
    const gameId = req.params.id;

    try {
        db.query('DELETE FROM games WHERE id = ?', [gameId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Game not found' });
            res.json({ message: 'Game deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
