require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// For Stripe webhook listeners to work the following 2 lines must 
// precede `express.json()` because it interferes with raw data in webhook.js 
const webhookRoutes = require('./routes/webhook');
app.use('/webhook', webhookRoutes);

// app.use(cors());
// Middleware
app.use(express.json());

const allowedOrigins = [
  // 'https://clarke-plaza-storage.vercel.app', 
  'http://localhost:5173', 
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Serve static files from the React frontend build directory
// app.use(express.static('client/build'));

// Routes
const checkoutRoutes = require('./routes/checkout');
const unitsRouter = require('./routes/units');

app.use('/checkout', checkoutRoutes);
app.use('/units', unitsRouter);

// Root Route
app.get('/', (_, res) => {
  res.send('Welcome to Clarke Plaza 2!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});