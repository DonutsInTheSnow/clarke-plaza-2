require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SK);
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://oamydhslmxfpucpuqqac.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

router.get('/fetch-one-time-price-id/:unitId', async (req, res) => {
  const { unitId } = req.params;
 
  const { data: unit, error } = await supabase.from('units').select('priceId, unitNumber, size').eq('id', unitId).single();
  if (error) {
    console.error('Error fetching unit:', error);
    return res.status(500).send({ error: 'Failed to fetch unit details' });
  }
  if (!unit) {
    return res.status(404).send({ error: 'Unit not found' });
  }
  if (!unit.priceId) {
    return res.status(400).send({ error: `No price found for size: ${unit.size}` });
  }
  res.json({
    priceId: unit.priceId,
    unitNumber: unit.unitNumber,
    size: unit.size
  });

});

router.post('/create-subscription-session', async (req, res) => {
  console.log("Hi there from create-subscription-session POST request.");
  try {
    const { unitId, priceId } = req.body;
    console.log(`Hi McDick, here is a priceID: ${priceId}`);

    // Fetch unit details
    const { data: unit, error } = await supabase.from('units').select('id, unitNumber, size, isAvailable').eq('id', unitId).single();
    if (error) {
      console.error('Error fetching unit:', error);
      return res.status(500).send({ error: 'Failed to fetch unit details' });
    }
    if (!unit) {
      return res.status(404).send({ error: 'Unit not found' });
    }

    // Create subscription session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'https://clarke-plaza-2.vercel.app/success',
      cancel_url: 'https://clarke-plaza-2.vercel.app/cancel',
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