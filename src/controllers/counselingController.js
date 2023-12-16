const admin = require('firebase-admin');
const db = admin.firestore();

// Fungsi untuk mengirim pesan dalam konseling
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Validasi input
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: 'ID pengirim, ID penerima, dan pesan harus diisi.' });
    }

    const newMessage = {
      senderId,
      receiverId,
      message,
      createdAt: new Date(),
    };

    // Simpan pesan dalam koleksi "counseling"
    await db.collection('counseling').add(newMessage);

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mengirim pesan.' });
  }
};

// Fungsi untuk mendapatkan semua pesan dalam konseling
exports.getAllMessages = async (req, res) => {
  try {
    const messagesSnapshot = await db.collection('counseling').get();
    const messages = messagesSnapshot.docs.map((doc) => doc.data());
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil pesan.' });
  }
};
