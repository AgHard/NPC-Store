const express = require('express');
const { body, param, validationResult } = require('express-validator');
const gameController = require('../controllers/gameController');
const { verifyToken, adminOnly } = require('../middleware/authMiddleware'); // We won't use verifyToken here

const router = express.Router();

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

router.get('/', gameController.getGames);

// router.get('/:group_id', 
//     param('group_id').isInt().withMessage('Game ID must be an integer'), 
//     validateRequest, 
//     gameController.getGameById
// );

router.get('/:group_id/packages', 
    param('group_id').isInt().withMessage('Game ID must be an integer'),
    validateRequest,
    gameController.getGamePackages
);

router.get('/:game_id/package', gameController.getPackagesByGameId);

router.get('/:group_id/regions', gameController.getRegionsByGroupId);
// package details route
router.get('/:group_id/packages/:package_id',
    param('group_id').isInt().withMessage('Group ID must be an integer'),
    param('package_id').isInt().withMessage('Package ID must be an integer'),
    validateRequest,
    gameController.getPackageDetails
);

// router.get('/games/:group_id/regions/:region_id/packages', async (req, res) => {
//     const { group_id, region_id } = req.params;
  
//     try {
//       const [rows] = await db.query(
//         'SELECT * FROM game_packages WHERE group_id = ? AND region_id = ?',
//         [group_id, region_id]
//       );
//       res.json(rows);
//     } catch (err) {
//       console.error("Error fetching related packages:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   });
  
// The routes below require authentication (admin-only routes) — leave them as is
// ✅ ADD Game (Protected: Admin Only)
router.post('/', 
    verifyToken, 
    adminOnly,
    [
        body('name').notEmpty().withMessage('Game name is required'),
        body('description').optional().isLength({ max: 255 }).withMessage('Description must be 255 characters or less')
    ],
    validateRequest,
    gameController.addGame
);

// ✅ UPDATE Game (Protected: Admin Only)
router.put('/:id', verifyToken, adminOnly, gameController.updateGame);

// ✅ DELETE Game (Protected: Admin Only)
router.delete('/:id', 
    verifyToken, 
    adminOnly,
    param('id').isInt().withMessage('Game ID must be an integer'),
    validateRequest,
    gameController.deleteGame
);

module.exports = router;
