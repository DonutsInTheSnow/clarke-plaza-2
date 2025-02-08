const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Open the database
const db = new sqlite3.Database('./database.sqlite');

// Read the JSON file
const mockUnits = JSON.parse(fs.readFileSync('./mockUnits.json', 'utf-8'));

// Ensure the table exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS units (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unitNumber TEXT,
      size TEXT,
      isAvailable INTEGER,
      priceId TEXT
    )
  `);

  // Prepare the SQL statement
  const stmt = db.prepare('INSERT INTO units (unitNumber, size, isAvailable, priceId) VALUES (?, ?, ?, ?)');

  // Insert each unit
  mockUnits.forEach(unit => {
    stmt.run(unit.unitNumber, unit.size, unit.isAvailable ? 1 : 0, unit.priceId);
  });

  // Finalize the statement
  stmt.finalize();

  // Log that seeding is complete
  console.log('Seeding completed!');
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  }
  console.log('Database connection closed.');
});