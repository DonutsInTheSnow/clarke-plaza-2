// const express = require('express');
// const router = express.Router();
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./database.sqlite');

// // GET: Fetch available units with filtering by size if query is provided
// router.get('/available', (req, res) => {
//   const { size } = req.query; // Get size filter from query parameter
//   let sql = 'SELECT * FROM units WHERE isAvailable = ?';
//   let params = [1]; // SQLite uses 1 for true, 0 for false

//   if (size) {
//     // SQLite uses LIKE for partial matching
//     sql += ' AND size LIKE ?';
//     params.push(`%${size}%`); // Adding % for partial match
//   }

//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(500).json({ message: err.message });
//     } else {
//       res.status(200).json(rows);
//     }
//   });
// });

// module.exports = router;


require('dotenv').config();
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://oamydhslmxfpucpuqqac.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET: Fetch available units with filtering by size if query is provided
router.get('/available', async (req, res) => {
  const { size } = req.query; // Get size filter from query parameter
  let query = supabase
  .from('units')
  .select('*')
  .eq('isAvailable', true);

  if (size) {
    // Supabase uses ilike for case-insensitive partial matching
    query = query.ilike('size', `%${size}%`);
  }

  const { data: units, error } = await query;

  if (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ message: error.message });
  } else {
    res.status(200).json(units);
  }
});

module.exports = router;