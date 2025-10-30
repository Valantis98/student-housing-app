import db from "../config/db.js";

export const getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Σφάλμα ανάκτησης φοιτητών" });
    } else {
      res.json(results);
    }
  });
};

export const addStudent = (req, res) => {
  const { name, email, room_id, preferences } = req.body;
  db.query(
    "INSERT INTO students (name, email, room_id, preferences) VALUES (?, ?, ?, ?)",
    [name, email, room_id, preferences],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Αποτυχία εισαγωγής φοιτητή" });
      } else {
        res.status(201).json({ message: "Φοιτητής προστέθηκε επιτυχώς!" });
      }
    }
  );
};
