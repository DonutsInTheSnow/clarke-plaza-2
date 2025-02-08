import { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import FacebookIcon from '@mui/icons-material/Facebook';
import Paper from '@mui/material/Paper';

export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);
  return (
    <Box>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction 
            label="Home" 
            icon={<HomeIcon />} 
            onClick={() => (window.location.href = '/')}
          />
          <BottomNavigationAction
            label="Rent A Unit"
            icon={<PaymentIcon />}
            onClick={() => (window.location.href = '/storageunits')}
          />
          <BottomNavigationAction 
            label="Facebook" 
            icon={<FacebookIcon />}
            onClick={() => window.open('https://www.facebook.com/clarkeplazastorage', '_blank', 'noopener,noreferrer')}
          />
          <BottomNavigationAction 
            label="Call Us" 
            icon={
              <a href="tel:6035695818" style={{ textDecoration: 'none', color: 'inherit' }}>
                <SmartphoneIcon />
              </a>
              } 
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}


