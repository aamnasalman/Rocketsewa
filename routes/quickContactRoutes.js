const express = require('express');
const router = express.Router();
const quickContactController = require('../controllers/quickContactController');

// Create a new Quick Contact entry
router.post('/create', quickContactController.createQuickContact);

// Fetch all Quick Contact entries (latest first)
router.get('/all', quickContactController.getAllQuickContacts);

module.exports = router;
