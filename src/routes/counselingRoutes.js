const express = require('express');
const router = express.Router();
const counselingController = require('../controllers/counselingController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

// Endpoint untuk mengirim pesan dalam konseling
router.post('/messages', authenticationMiddleware.authenticateUser, counselingController.sendMessage);

// Endpoint untuk mendapatkan semua pesan dalam konseling
router.get('/messages', counselingController.getAllMessages);

module.exports = router;
