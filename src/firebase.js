// firebase.js

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Sesuaikan dengan lokasi file service account Anda

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const usersRef = db.collection("users");
const auth = admin.auth();

module.exports = { admin, usersRef, db, auth };
