const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        // console.log("Decoded JWT:", decoded);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(403).json({ error: 'Invalid token.' });
      }
      
};

// Middleware to allow only admin users
exports.adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};
