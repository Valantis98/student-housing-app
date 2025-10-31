const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.static('public'));

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- ΡΥΘΜΙΣΗ SESSION ---
app.use(
  session({
    secret: 'superSecretKey123', // μπορείς να αλλάξεις
    resave: false,
    saveUninitialized: false,
  })
);

// --- ΣΥΝΔΕΣΗ ΜΕ MySQL ---
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'student_housing',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

// --- DEFAULT ROUTE (login page) ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// --- LOGIN ROUTE ---
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  const sql = 'SELECT * FROM admin WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length > 0) {
      // ✅ Αποθηκεύουμε session
      req.session.admin = results[0].username;
      res.json({ message: '✅ Login successful' });
    } else {
      res.status(401).json({ message: '❌ Invalid username or password' });
    }
  });
});

// --- ΠΡΟΣΤΑΣΙΑ ΤΟΥ DASHBOARD ---
app.get('/admin/dashboard.html', (req, res) => {
  if (!req.session.admin) {
    // 🚫 Αν δεν υπάρχει session, redirect στο login
    return res.redirect('/login.html');
  }
  // ✅ Αν υπάρχει session, δείξε το dashboard
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// --- LOGOUT ROUTE ---
app.get('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
