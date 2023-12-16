const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

// Endpoint untuk membuat postingan baru
router.post('/posts', authenticationMiddleware.authenticateUser, forumController.createPost);

// Endpoint untuk mendapatkan semua postingan
router.get('/posts', forumController.getAllPosts);

// Endpoint untuk mengedit postingan
router.put('/posts/:postId', authenticationMiddleware.authenticateUser, authenticationMiddleware.checkOwnership, forumController.editPost);

// Endpoint untuk menghapus postingan
router.delete('/posts/:postId', authenticationMiddleware.authenticateUser, authenticationMiddleware.checkOwnership, forumController.deletePost);

// Endpoint untuk menambahkan komentar pada postingan
router.post('/posts/:postId/comments', authenticationMiddleware.authenticateUser, forumController.addComment);

module.exports = router;
