const admin = require('firebase-admin');

// Middleware untuk memeriksa apakah pengguna telah mengirim token otentikasi
exports.authenticateUser = (req, res, next) => {
  const authToken = req.header('Authorization');

  if (!authToken) {
    return res.status(401).json({ error: 'Tidak ada token otentikasi.' });
  }

  admin.auth().verifyIdToken(authToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error(error);
      return res.status(401).json({ error: 'Token otentikasi tidak valid.' });
    });
};

// Middleware untuk memeriksa apakah pengguna yang memodifikasi postingan adalah pemiliknya
exports.checkOwnership = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ error: 'ID postingan harus diisi.' });
    }

    const postRef = admin.firestore().collection('forum').doc(postId);
    const post = await postRef.get();

    if (!post.exists) {
      return res.status(404).json({ error: 'Postingan tidak ditemukan.' });
    }

    if (post.data().userId !== req.user.uid) {
      return res.status(403).json({ error: 'Anda tidak berhak mengubah postingan ini.' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat memeriksa kepemilikan.' });
  }
};
