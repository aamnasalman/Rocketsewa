const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Create new content
router.post('/', contentController.createContent);

// Retrieve content by ID
router.get('/:contentId', contentController.getContentById);

// Update content by ID
router.put('/:contentId', contentController.updateContentById);

// Delete content by ID
router.delete('/:contentId', contentController.deleteContentById);

// Add more content-related routes as needed

module.exports = router;
