const admin = require("firebase-admin");
const serviceAccount = require('C:/primarryApp-backend/serviceAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Fungsi untuk membuat postingan baru
exports.createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    // Validasi input
    if (!userId || !content) {
      return res.status(400).json({ error: 'Data pengguna dan konten harus diisi.' });
    }

    const newPost = {
      userId,
      content,
      comments: [],
      createdAt: new Date(),
    };

    const postRef = await db.collection('forum').add(newPost);
    const createdPost = await postRef.get();

    return res.status(201).json(createdPost.data());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat membuat postingan.' });
  }
};

// Fungsi untuk mendapatkan semua postingan
exports.getAllPosts = async (req, res) => {
  try {
    const postsSnapshot = await db.collection('forum').get();
    const posts = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil postingan.' });
  }
};

// Fungsi untuk mengedit postingan
exports.editPost = async (req, res) => {
  try {
    const { postId, content } = req.body;

    // Validasi input
    if (!postId || !content) {
      return res.status(400).json({ error: 'ID postingan dan konten harus diisi.' });
    }

    const postRef = db.collection('forum').doc(postId);
    await postRef.update({ content });

    const updatedPost = await postRef.get();
    return res.status(200).json(updatedPost.data());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mengedit postingan.' });
  }
};

// Fungsi untuk menghapus postingan
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Validasi input
    if (!postId) {
      return res.status(400).json({ error: 'ID postingan harus diisi.' });
    }

    await db.collection('forum').doc(postId).delete();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat menghapus postingan.' });
  }
};

// Fungsi untuk menambahkan komentar pada postingan
exports.addComment = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;

    // Validasi input
    if (!postId || !userId || !comment) {
      return res.status(400).json({ error: 'ID postingan, ID pengguna, dan komentar harus diisi.' });
    }

    const postRef = db.collection('forum').doc(postId);
    const post = await postRef.get();

    if (!post.exists) {
      return res.status(404).json({ error: 'Postingan tidak ditemukan.' });
    }

    const newComment = {
      userId,
      comment,
      createdAt: new Date(),
    };

    // Gunakan arrayUnion untuk menambahkan komentar ke array
    await postRef.update({ comments: admin.firestore.FieldValue.arrayUnion(newComment) });

    const updatedPost = await postRef.get();
    return res.status(200).json(updatedPost.data());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan komentar.' });
  }
};
