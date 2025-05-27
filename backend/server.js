require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// 📦 Routes
const uploadRoutes = require('./routes/upload');
const gameRoutes = require('./routes/gameRoutes');
const packageRoutes = require('./routes/packageRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const navItemsRoutes = require("./routes/navItemsRoutes");
const announcementRoutes = require('./routes/announcementRoutes');
const stripeRoutes = require('./routes/stripeRoutes');

db.getConnection()
    .then(() => console.log('Connected to database'))
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

// ✅ Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api', uploadRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use('/api/navItems', navItemsRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/stripe', stripeRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

