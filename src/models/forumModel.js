const admin = require('firebase-admin');
const db = admin.firestore();

// Model untuk postingan dalam forum
class ForumPost {
  constructor(userId, content) {
    this.userId = userId;
    this.content = content;
    this.comments = [];
    this.createdAt = new Date();
  }
}

module.exports = ForumPost;
