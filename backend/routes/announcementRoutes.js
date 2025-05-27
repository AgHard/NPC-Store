const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

// Get all announcements (admin or future analytics)
router.get('/', announcementController.getAllAnnouncements);

// Get the active announcement (public banner)
router.get('/active', announcementController.getActiveAnnouncement);

// Create new announcement (admin)
router.post('/', verifyToken, adminOnly, announcementController.createAnnouncement);

// Update an announcement by ID
router.put('/:id', verifyToken, adminOnly, announcementController.updateAnnouncement);

// Delete an announcement by ID
router.delete('/:id', verifyToken, adminOnly, announcementController.deleteAnnouncement);

module.exports = router;
