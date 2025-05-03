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
