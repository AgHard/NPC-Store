const express = require('express');
const router = express.Router();
const navItemsController = require('../controllers/navItemsController');

router.get('/', navItemsController.getAllNavItems);

module.exports = router;
