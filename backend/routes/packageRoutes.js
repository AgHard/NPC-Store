const express = require('express');
const { body, param, validationResult } = require('express-validator');
const packageController = require('../controllers/packageController');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

router.get('/:id', 
    param('id').isInt().withMessage('Game ID must be an integer'), 
    validateRequest, 
    packageController.getPackagesByGame
);

router.post('/', 
    verifyToken, 
    adminOnly,
    [
        body('game_id').isInt().withMessage('Game ID must be an integer'),
        body('amount').isInt({ min: 1 }).withMessage('Amount must be a positive integer'),
        body('currency').notEmpty().withMessage('Currency is required'),
        body('price_egp').isFloat({ min: 0 }).withMessage('Price must be a positive number')
    ],
    validateRequest,
    packageController.addPackage
);

router.put('/:id', 
    verifyToken, 
    adminOnly,
    // [
    //     param('id').isInt().withMessage('Package ID must be an integer'),
    //     body('amount').optional().isInt({ min: 1 }).withMessage('Amount must be a positive integer'),
    //     body('currency').optional().notEmpty().withMessage('Currency cannot be empty'),
    //     body('price_egp').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number')
    // ],
    // validateRequest,
    packageController.updatePackage
);

router.delete('/:id', 
    verifyToken, 
    adminOnly,
    param('id').isInt().withMessage('Package ID must be an integer'),
    validateRequest,
    packageController.deletePackage
);

module.exports = router;
