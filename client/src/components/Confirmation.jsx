import { Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = location.state || { status: 'success' }; // Default to 'success'

  const handleReturn = () => {
    navigate('/', { replace: true });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <CardContent>
        {status === 'success' ? (
          <>
            <Typography variant="h4" component="h2" gutterBottom>
              Thank You for Your Payment!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your transaction has been successfully processed.
            </Typography>
            <Typography variant="body1" gutterBottom>
              You will receive a confirmation email shortly.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h2" gutterBottom>
              Payment Failed
            </Typography>
            <Typography variant="body1" gutterBottom>
              Unfortunately, we were unable to process your transaction.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please try again or contact support if the issue persists.
            </Typography>
          </>
        )}
        <Button variant="contained" color="primary" onClick={handleReturn}>
          Return to Storage Units
        </Button>
      </CardContent>
    </Card>
  );
};

export default Confirmation;
