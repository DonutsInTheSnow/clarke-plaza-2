// require('dotenv').config();
// const { createClient } = require('@supabase/supabase-js');
// const fs = require('fs');

// // Initialize Supabase client
// const supabaseUrl = 'https://oamydhslmxfpucpuqqac.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Read the JSON file
// const mockUnits = JSON.parse(fs.readFileSync('./mockUnits.json', 'utf-8'));

// // Ensure the table exists in Supabase
// // Note: This step might be unnecessary if you've already created the table in Supabase, but it's here for completeness.
// // You would need to create the table manually or via Supabase UI if it doesn't exist.

// // Insert each unit into Supabase
// mockUnits.forEach(async (unit) => {
//   const { data, error } = await supabase
//     .from('units')
//     .insert([
//       {
//         unitNumber: unit.unitNumber,
//         size: unit.size,
//         isAvailable: unit.isAvailable,
//         priceId: unit.priceId
//       }
//     ]);

//   if (error) {
//     console.error('Error seeding unit:', error);
//   } else {
//     console.log('Seeded unit:', unit.unitNumber);
//   }
// });

// console.log('Seeding completed!');


require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://oamydhslmxfpucpuqqac.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const mockUnits = JSON.parse(fs.readFileSync('./mockUnits.json', 'utf-8'));

async function seedSupabase() {
  // Insert each unit
  for (const unit of mockUnits) {
    const { data, error } = await supabase
      .from('units')
      .insert({
        unitNumber: unit.unitNumber,
        size: unit.size,
        isAvailable: unit.isAvailable,
        priceId: unit.priceId
      });

    if (error) {
      console.error('Error inserting unit:', error);
    } else {
      console.log('Inserted unit:', unit.unitNumber);
    }
  }

  console.log('Seeding completed!');
}

// Run the async function
seedSupabase().catch(console.error);