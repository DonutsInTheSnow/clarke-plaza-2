import { Button, Typography, Card, CardContent } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const { selectedUnit } = location.state || {}; // Ensure selectedUnit is passed correctly
  const stripe = useStripe();

  const handleCheckout = async () => {
    if (!stripe || !selectedUnit) return;
  
    try {
      const response = await fetch('https://clarke-plaza-2-backend.vercel.app/checkout/create-subscription-session', {
      // const response = await fetch('/checkout/create-subscription-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId: selectedUnit._id,
          priceId: selectedUnit.priceId,
          quantity: 1,
        }),
      });
  
      const paymentData = await response.json();
  
      if (response.ok) {
        // Redirect to Stripe Checkout
        const { url: sessionUrl } = paymentData;
        window.location.href = sessionUrl;
      } else {
        console.error('Payment error:', paymentData.error);
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout. Please try again.');
    }
  };
  

  return (
    <Card>
      <CardContent className='checkout'>
        {selectedUnit ? (
          <>
            <Typography variant="h5">Checkout</Typography>
            <Typography>Unit Number: {selectedUnit.unitNumber}</Typography>
            <Typography>Price per Month: ${selectedUnit.price || 'Loading...'}</Typography> {/* Dynamically display price */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={!stripe}
            >
              Pay Now
            </Button>
          </>
        ) : (
          <Typography>Please select a unit to rent.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Checkout;
