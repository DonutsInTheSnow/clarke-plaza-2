import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './About.css';

const About = () => {
  return (
    <Box className="about-section">
      <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: '600', color: '#ff0000' }}>
        About Us
      </Typography>
      <Grid container rowSpacing={{xs: 1, sm: 1.5, lg: 2.5}} columnSpacing={{ xs: 1, sm: 2, lg: 3 }} sx={{ justifyContent: 'center' }}>

        <Grid size={{ sm: 5 }} sx={{ alignSelf: 'center' }}>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>    
            Clarke Plaza Self-Storage and Ossipee Self-Storage are privately owned storage facilities, not part of a national chain. Our storage facility is owned and managed by the same courteous and friendly staff of Clarke Plaza and Wolfeboro Shopping Center for many years. We value your business and appreciate your patronage.
          </Typography>
        </Grid>

        <Grid size={{ sm: 5 }}>
          <img
              src="/assets/images/clarke-sign.webp"
              alt="Clarke Plaza road sign"
              style={{ width: '100%', borderRadius: '5px' }}
          /> 
          <Typography variant="caption">Rt 28 in Wolfeboro Falls</Typography>
        </Grid>

        <Grid size={{ sm: 6 }} sx={{ margin: '4em 0 2em 0' }}>
          <Typography variant="body1" sx={{ textAlign: 'left'  }}>
            We provide homeowners, businesses and contractors with storage solutions. Clarke Plaza Self-Storage is the home for all of your storage needs. Whether you need to store boxes, furniture, seasonal items, cars, or business documents, we can accommodate your needs.
          </Typography>
        </Grid>

        <Grid size={{ sm: 10 }} sx={{ margin: '4rem 0 -1rem 0' }}>
          <Typography variant="h3" sx={{ color: '#076839', fontSize: '2.2rem', fontStyle: 'italic', fontWeight: 'bold' }}>
            Ossipee Self-Storage
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#ff0000'}}>
            10x10 / 10x20 / 10x30 / 10x40 available
          </Typography>
        </Grid>

        <Grid size={{ sm: 10 }} sx={{ margin: '0 0 5em 0' }}>
          <img
            src="/assets/images/ossipee-storage.webp"
            alt="About Us"
            style={{ width: '100%', borderRadius: '5px' }}
          />
          <Typography variant="caption">Ossipee Self-Storage on Route 28</Typography>
        </Grid>

        <Grid size={{ sm: 5 }} sx={{ alignSelf: 'center', marginBottom: '4rem' }}>
          <img
            src="/assets/images/clarke-3.webp"
            alt="Storage Inside"
            style={{ width: '100%', borderRadius: '5px' }}
          />
          <Typography variant="caption">Clarke Plaza Self-Storage adjacent to our office</Typography>
        </Grid>

        <Grid size={{ sm: 5 }} sx={{ marginBottom: '4rem' }}>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Both of our convenient locations, Clarke Plaza Self-Storage and Ossipee Self-Storage, make it easy for you to access your self-storage units whenever necessary. Our storage units are super clean and well-cared for. We offer storage for both residential and commercial use. Whether you need a temporary place to store your belongings or a long-term storage solution, you&#8217;ve come to the right place. Gain more space in your office, shop, basement, attic or home by storing rarely used or seasonal items. Put your car back in the garage!
          </Typography>
        </Grid>

      </Grid>
    </Box>
  );
};

export default About;
