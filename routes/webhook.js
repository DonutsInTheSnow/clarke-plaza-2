const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SK);

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        console.log(`Hey McFly, you're dealing with an event of typ: ${event.type}`); // Add this line here to debug event type

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                console.log(`session.metadata has arrived: ${session.metadata}`);
                const unitId = session.metadata.unitId;

                // Mark the unit as unavailable and store subscription info
                const sql = `UPDATE units SET isAvailable = ?, renterEmail = ?, subscriptionId = ? WHERE id = ?`;
                db.run(sql, [0, session.customer_details.email, session.subscription, unitId], function(err) {
                    if (err) {
                        console.error('Error updating unit:', err.message);
                    } else {
                        console.log(`Storage unit ${unitId} is now unavailable.`);
                    }
                });
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object;

                // Update unit based on subscription status
                if (subscription.status === 'active') {
                    console.log(`Subscription ${subscription.id} is active.`);
                } else {
                    console.log(`Subscription ${subscription.id} updated with status: ${subscription.status}`);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object;

                // Find the unit by subscriptionId and mark it as available
                const sql = `UPDATE units SET isAvailable = ?, renterEmail = ?, subscriptionId = ? WHERE subscriptionId = ?`;
                db.run(sql, [1, null, null, subscription.id], function(err) {
                    if (err) {
                        console.error(`Error updating unit for subscription ${subscription.id}:`, err.message);
                    } else {
                        if (this.changes > 0) {
                            console.log(`Unit with subscription ${subscription.id} is now available.`);
                        } else {
                            console.error(`No unit found for subscription ${subscription.id}`);
                        }
                    }
                });
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook signature verification failed:', error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});

module.exports = router;