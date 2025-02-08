import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2'; 
import { Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import './Footer.css';

const Item = styled(Paper)(({ theme }) => ({
  color: '#ffffff',
  textAlign: 'center',
  padding: theme.spacing(2)
}));

export default function Footer() {
  return (
    <>
      <Box id="contact" sx={{ backgroundColor: '#afedaa' }}>
        <Typography variant="h2" sx={{ fontWeight: '600', color: '#ff0000', paddingTop: '3rem', textShadow: '-2px 0 4px #555;' }}>Contact</Typography>
        <Grid container rowSpacing={{ sm: 1.5, lg: 2.5 }} columnSpacing={{ sm: 2, lg: 3 }} sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Grid size={{ sm: 8, md: 5 }} className="contact-data" >
            <Item sx={{ backgroundColor: '#1e7a43'}}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ pe: "-1rem" }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body1" sx={{ fontWeight: '600' }}>Office Hours:</Typography>
                  <Typography variant="body1">Mon-Fri 8a-1p</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ pe: "-1rem" }}>
                  <PlaceIcon fontSize="small" />
                  <Typography variant="body1">PO Box 300, Wolfeboro Falls, NH 03896</Typography>
                </Stack>
                <Stack direction="row" alignItems="end" spacing={1}>
                  <PhoneIphoneIcon fontSize="small" />
                  <Typography variant="body1">603 569-5818 X 1100</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon fontSize="small" />
                  <Typography variant="body1">info@clarkeplazastorage.com</Typography>
                </Stack>
              </Stack>
            </Item>
          </Grid>

          <Grid size={{ sm: 8, md: 6 }} className="contact-form">
            <Item sx={{ backgroundColor: '#4dc17c', color: '#ffffff'}}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: '8px 0', width: '100%' },
                  display: 'flex',
                  flexDirection: 'column'
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  id="phone"
                  label="Phone"
                  variant="outlined"
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  id="message"
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, padding: '0.25rem 0 4.5rem 0', backgroundColor: '#ff4444' }}>
        <Grid container spacing={3} sx={{ alignItems: 'center', justifyContent: 'center', marginTop: '0.5em' }}>
          <Grid size={6}>
            <Item sx={{ boxShadow: 'inset 0 0 3px #333', padding: '1rem', backgroundColor: '#ff0000' }}>
              <Typography variant="body1">
                Copyright © <strong>Clarke Plaza Self Storage.</strong> All rights reserved.
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
