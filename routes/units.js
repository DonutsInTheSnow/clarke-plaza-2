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