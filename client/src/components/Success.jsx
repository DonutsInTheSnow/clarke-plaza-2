import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Success = () => {
  return (
    <Box className="success-section" sx={{ padding: '40px 20px', backgroundColor: '#defdef' }}>
      <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: '700', color: '#2e7d32' }}>
        Payment Successful!
      </Typography>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="body1" sx={{ fontSize: '22px', fontWeight: '600', lineHeight: '1.6', textAlign: 'center', color: '#045039' }}>
            Thanks for renting one of our units! Let us know if there is anything you need. We are at your service.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <img
            src="/assets/images/wolfe-aerial.webp"
            alt="Payment Success"
            style={{ width: '100%', borderRadius: '8px', marginTop: '20px' }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a 
                href="/" 
                style={{
                textDecoration: 'none',
                backgroundColor: '#045039',
                color: '#ffffff',
                fontSize: '24px',
                fontWeight: 'bold',
                padding: '20px 40px',
                borderRadius: '12px',
                textAlign: 'center',
                display: 'block',
                width: '100%',
                maxWidth: '300px',
                }}
            >
                HOME
            </a>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Success;
