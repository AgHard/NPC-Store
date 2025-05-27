const db = require('../config/db');

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const [announcements] = await db.query(
      'SELECT * FROM announcements ORDER BY updated_at DESC'
    );
    res.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get the active announcement (shown to users)
exports.getActiveAnnouncement = async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM announcements WHERE is_active = TRUE LIMIT 1'
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'No active announcement' });
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching active announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new announcement
exports.createAnnouncement = async (req, res) => {
  const { message, is_active } = req.body;

  try {
    await db.query(
      `INSERT INTO announcements (message, is_active)
       VALUES (?, ?)`,
      [message, is_active]
    );

    res.status(201).json({ message: 'Announcement created successfully' });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an announcement
exports.updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { message, is_active } = req.body;

  try {

    if (is_active) {
      await db.query(
        `UPDATE announcements SET is_active = 0 WHERE id != ?`,
        [id]
      );
    }
    
    const [result] = await db.query(
      `UPDATE announcements 
       SET message = ?, is_active = ?, updated_at = NOW()
       WHERE id = ?`,
      [message, is_active, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json({ message: 'Announcement updated successfully' });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an announcement
exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'DELETE FROM announcements WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
