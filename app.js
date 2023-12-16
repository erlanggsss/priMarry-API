const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const forumRoutes = require('./src/routes/forumRoutes');
const counselingRoutes = require('./src/routes/counselingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/forum', forumRoutes);
app.use('/counseling', counselingRoutes);

// Rute Default untuk Akar ("/")
app.get('/', (req, res) => {
  res.send('Ok!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Aplikasi berjalan di port ${PORT}`);
});
