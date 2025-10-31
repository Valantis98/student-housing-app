// db.js
const mysql = require('mysql2');

// Δημιουργία σύνδεσης
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'student_housing',
  port: 3306
});

// Έλεγχος σύνδεσης
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log(' Connected to MySQL as ID ' + connection.threadId);
});

module.exports = connection;
