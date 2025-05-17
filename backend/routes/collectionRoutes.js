const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

router.get('/', collectionController.getAllCollections);
router.get('/:collection_id', collectionController.getCollectionsByType);

router.post('/', verifyToken, adminOnly, collectionController.addCollection);
router.put('/:id', verifyToken, adminOnly, collectionController.updateCollection);

router.delete('/:id', verifyToken, adminOnly, collectionController.deleteCollection);

module.exports = router;
