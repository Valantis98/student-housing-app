import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_housing"
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Σφάλμα σύνδεσης με τη MariaDB:", err);
  } else {
    console.log("✅ Συνδεθήκαμε επιτυχώς στη βάση δεδομένων!");
  }
});

export default connection;
