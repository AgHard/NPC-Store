const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const db = require('../config/db');

exports.uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    fs.unlinkSync(req.file.path); // remove local file

    const imageUrl = result.secure_url;

    // Save to MySQL
    db.query('INSERT INTO images (url) VALUES (?)', [imageUrl], (err, resultDb) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ imageUrl, id: resultDb.insertId });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Image upload failed' });
  }
};
