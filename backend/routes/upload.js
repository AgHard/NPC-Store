const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary'); // your config file
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // temporary local storage

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    
    // Optional: delete local file after upload
    fs.unlinkSync(req.file.path);

    // Save `result.secure_url` to your MySQL database
    const imageUrl = result.secure_url;

    // Example: send it back to frontend
    res.json({ imageUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
