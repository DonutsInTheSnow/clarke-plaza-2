const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SK);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Fetch price details by priceId (unchanged)
router.get('/get-price-details/:priceId', async (req, res) => {
  const { priceId } = req.params;
  console.log(`priceId here: ${priceId}`);
  try {
    const price = await stripe.prices.retrieve(priceId);
    console.log(`stripe.prices.retrieve(priceId) is here in try block: ${price}`);
    res.json({
      price: (price.unit_amount / 100).toFixed(2), 
      currency: price.currency.toUpperCase(),
    });
  } catch (error) {
    console.error('Error fetching price details:', error);
    res.status(500).json({ error: 'Failed to fetch price details' });
  }
});

// Fetch one-time price ID for a unit (modified for SQLite)
router.get('/fetch-one-time-price-id/:unitId', async (req, res) => {
  const { unitId } = req.params;
  db.get('SELECT priceId, unitNumber, size FROM units WHERE id = ?', [unitId], (err, row) => {
    if (err) {
      console.error('Error fetching unit:', err);
      return res.status(500).send({ error: 'Failed to fetch unit details' });
    }
    if (!row) {
      return res.status(404).send({ error: 'Unit not found' });
    }
    if (!row.priceId) {
      return res.status(400).send({ error: `No price found for size: ${row.size}` });
    }
    res.json({
      priceId: row.priceId,
      unitNumber: row.unitNumber,
      size: row.size
    });
  });
});

// Create a Stripe Subscription session
router.post('/create-subscription-session', async (req, res) => {
  console.log("Hi there from create-subscription-session POST request.");
  try {
    const { unitId, priceId } = req.body;
    console.log(`Hi McDick, here is a priceID: ${priceId}`);

    // Fetch unit details
    const unit = await new Promise((resolve, reject) => {
      db.get('SELECT id, unitNumber, size, isAvailable FROM units WHERE id = ?', [unitId], (err, row) => {
        if (err) return reject(err);
        if (!row) return reject(new Error('Unit not found'));
        resolve(row);
      });
    });

    // Create subscription session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
        unitId: unit.id,
        unitNumber: unit.unitNumber,
        size: unit.size,
        isAvailable: unit.isAvailable,
      },
    });

    // Log the session ID
    console.log(`Session created: ${session.id}`);

    // Retrieve the session to access the metadata
    const retrievedSession = await stripe.checkout.sessions.retrieve(session.id);
    console.log('Retrieved session metadata:', retrievedSession.metadata);

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating subscription session:', error);
    res.status(500).send({ error: 'Subscription session creation failed' });
  }
});


module.exports = router;