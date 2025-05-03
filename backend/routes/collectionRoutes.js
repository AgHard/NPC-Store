const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

router.get('/', collectionController.getAllCollections);
router.get('/:collection_id', collectionController.getCollectionsByType);

module.exports = router;
