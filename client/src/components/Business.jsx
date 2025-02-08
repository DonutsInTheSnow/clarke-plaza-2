import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import './Business.css';

const Business = () => {
  return (
    <Box className="business-section">
      <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: '600', color: '#ff0000' }}>
        Business Services
      </Typography>
      <Grid container rowSpacing={{xs: 1, sm: 1.5, lg: 2.5}} columnSpacing={{ xs: 1, sm: 2, lg: 3 }} sx={{ justifyContent: 'center' }}>

        <Grid size={{ sm: 8 }} sx={{ alignSelf: 'center' }}>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>    
            In addition to providing a solution for your storage needs, at our Clarke Plaza office we offer a number of support services designed to help you operate your business more cost-effectively. 
          </Typography>
        </Grid>

        <Grid size={{ sm: 5 }}>
          <List>
            <ListItem>
                <ListItemText>Locally owned and managed.</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText>Professional and friendly customer service.</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText>24 hour access available 7 days a week.</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText>Facility well-lit at night with security cameras.</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText>Color copier/scanner/printer/fax on site.</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText>Free and ample parking.</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText>Conference room.</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText>Administrative Support services available.</ListItemText>
            </ListItem>
          </List>
        </Grid>

        <Grid size={{ sm: 5 }}>
          <List>
            <ListItem><ListItemText>Notary Services.</ListItemText></ListItem>
            <Divider />
            <ListItem><ListItemText>Convenient location.</ListItemText></ListItem>
            <Divider />
            <ListItem><ListItemText>Clients picking up documents and deliveries.</ListItemText></ListItem>
            <Divider />
            <ListItem><ListItemText>Post office in plaza.</ListItemText></ListItem>
            <Divider />
            <ListItem><ListItemText>UPS and FEDEX on site.</ListItemText></ListItem>
            <Divider />
            <ListItem><ListItemText>Restaurants.</ListItemText></ListItem>
            <Divider />
            <ListItem><ListItemText>Walking path.</ListItemText></ListItem>
            <Divider />
          </List>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Business;
