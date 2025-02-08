const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// GET: Fetch available units with filtering by size if query is provided
router.get('/available', (req, res) => {
  const { size } = req.query; // Get size filter from query parameter
  let sql = 'SELECT * FROM units WHERE isAvailable = ?';
  let params = [1]; // SQLite uses 1 for true, 0 for false

  if (size) {
    // SQLite uses LIKE for partial matching
    sql += ' AND size LIKE ?';
    params.push(`%${size}%`); // Adding % for partial match
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;