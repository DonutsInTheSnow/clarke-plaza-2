import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Typography, Box, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
// import { useNavigate } from 'react-router-dom';
import './StorageUnits.css';

const StorageUnits = () => {
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [sizeFilter, setSizeFilter] = useState('');
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('https://clarke-plaza-2-backend.vercel.app/units/available');
        // const response = await axios.get('http://localhost:3001/units/available');
        const unitsWithPrices = await Promise.all(
          response.data.map(async (unit) => {
            if (unit.priceId) {
              try {
                const priceResponse = await axios.get(`https://clarke-plaza-2-backend.vercel.app/checkout/get-price-details/${unit.priceId}`);
                // const priceResponse = await axios.get(`http://localhost:3001/checkout/get-price-details/${unit.priceId}`);
                return { ...unit, price: priceResponse.data.price };
              } catch (err) {
                console.error(`Failed to fetch price for unit ${unit.unitNumber}:`, err);
                return { ...unit, price: 'N/A' }; // Handle missing price gracefully
              }
            }
            return { ...unit, price: 'N/A' }; // Handle units without a priceId
          })
        );
        setUnits(unitsWithPrices);
        setFilteredUnits(unitsWithPrices); // Set initial units without filtering
      } catch (err) {
        console.error('Failed to fetch units:', err);
      }
    };

    fetchUnits();
  }, []); // Empty array ensures this runs every time component is mounted

  // Filter units by size
  const handleFilterChange = (event) => {
    setSizeFilter(event.target.value);
    if (event.target.value === '') {
      setFilteredUnits(units); // Reset to all units if filter is empty
    } else {
      const filtered = units.filter((unit) => unit.size.includes(event.target.value));
      setFilteredUnits(filtered);
    }
  };

  // const rentUnit = (unit) => {
  //   navigate('/checkout', { state: { selectedUnit: unit } });
  // };

  const rentUnit = async (unit) => {
    try {
      const response = await axios.post('https://clarke-plaza-2-backend.vercel.app/checkout/create-subscription-session', {
      // const response = await axios.post('http://localhost:3001/checkout/create-subscription-session', {
        // unitId: unit.id,
        unitId: unit.id, // Change id to _id if necessary
        priceId: unit.priceId, // Assuming priceId is the Stripe Price ID for the subscription
      });
      if (response.data) {
        console.log("Full response data:", response.data);
        if (response.data.url) {
          console.log("Stripe URL:", response.data.url);
          window.location.href = response.data.url;
        }
      }
      
    } catch (err) {
      console.error('Failed to create subscription session:', err);
      alert('Something went wrong while creating the subscription session.');
    }
  };
  

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} className="main-box">
      <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
        <Grid size={{ sm: 10, md: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: '600', color: '#ff0000', textShadow: '-2px 0 4px #999', marginBottom: '0' }}>
            Available Storage Units
          </Typography>
        </Grid>
        <Grid size={{ sm: 8 }} sx={{ marginBottom: '1rem' }}>
          <Typography variant="body1" sx={{ textAlign: 'left', fontSize: '1.2rem' }}>
            When it comes to storage units we offer competitive pricing! Prices shown are month-to-month rates with insurance already included. You can filter units based on size. Type <strong>5X10</strong> to filter all available 5 foot by 10 foot units. The results appear as soon as you type the dimensions. <strong>X</strong> has to be uppercase, as in 5X10. Not 5x10. Available dimensions are: <strong>5X10</strong>, <strong>10X10</strong>, <strong>10X20</strong>, <strong>10X30</strong> or <strong>10X40</strong>. <em>Note: only our Ossipee location offers 10X30 and 10X40 sized units.</em>
          </Typography>
        </Grid>
      </Grid>

      {/* Filter by size */}
      <TextField
        label="Filter, e.g. 10X20"
        variant="outlined"
        value={sizeFilter}
        onChange={handleFilterChange}
        sx={{ marginBottom: 3 }}
      />

      <Grid container spacing={3}>
        {filteredUnits.map((unit) => (
          <Grid size={{ xs: 6, sm: 3, md: 2 }} key={unit.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Unit {unit.unitNumber}
                </Typography>
                <Typography color="text.secondary">
                  Size: {unit.size}
                </Typography>
                <Typography color="text.secondary">
                  Price: ${unit.price !== 'N/A' ? unit.price : 'Loading...'}
                  {/* Price: ${unit.priceDetails?.price || 'Loading...'} */}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => rentUnit(unit)}>Rent Now</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1} sx={{ justifyContent: 'center', margin: '4rem 1rem' }}>
        <Grid size={{ sm: 10 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: '600', color: '#ff0000', textShadow: '-2px 0 4px #999', marginBottom: '0' }}>
            Our Units
          </Typography>
        </Grid>
        <Grid size={{ sm: 5 }}>
          <img 
            src="/assets/images/5X10.webp" 
            alt="5X10 Unit"
            style={{ width: '100%', borderRadius: '5px' }} 
          />
        </Grid>
        <Grid size={{ sm: 4 }} sx={{ alignSelf: 'center'  }}>
          <Typography variant="h4">5X10</Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', fontWeight: '600' }}>
            50 sq. ft. - Ideal for: Storing additional items, mattress, seasonal items, clothing, books, bicycles, record/file storage, business items, boxes, or one motorcycle. $84.00/mo. - Month to month
            $75.00/mo plus $9.00/mo insurance.
          </Typography>
        </Grid>
        <Grid size={{ sm: 4 }} sx={{ alignSelf: 'center'  }}>
          <Typography variant="h4">10X10</Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', fontWeight: '600' }}>
            100 sq. ft. - Ideal for: Two bedrooms, king-size mattress, major appliances, furniture, clothing, boxes, business merchandise, non traditional items and more.
          </Typography>
        </Grid>
        <Grid size={{ sm: 5 }}>
          <img 
            src="/assets/images/10X10.webp" 
            alt="10X10 Unit"
            style={{ width: '100%', borderRadius: '5px' }} 
          />
        </Grid>
        <Grid size={{ sm: 5 }}>
          <img 
            src="/assets/images/10X20.webp" 
            alt="10X20 Unit"
            style={{ width: '100%', borderRadius: '5px' }} 
          />
        </Grid>
        <Grid size={{ sm: 4 }} sx={{ alignSelf: 'center'  }}>
          <Typography variant="h4">10X20</Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', fontWeight: '600' }}>
            200 sq. ft. - Ideal for: Four bedrooms, king-size mattress, major appliances, furniture, clothing, bulk boxes sporting gear.
          </Typography>
        </Grid>
        <Grid size={{ sm: 4 }} sx={{ alignSelf: 'center'  }}>
          <Typography variant="h4">10X30</Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', fontWeight: '600' }}>
            300 sq. ft. - A hundred more square feet.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', fontWeight: '600', color: '#ff0000', fontStyle: 'italic' }}>
            Ossipee Location ONLY!
          </Typography>
        </Grid>
        <Grid size={{ sm: 5 }}>
          <img 
            src="/assets/images/10X30.webp" 
            alt="10X30 Unit"
            style={{ width: '100%', borderRadius: '5px' }} 
          />
        </Grid>
        <Grid size={{ sm: 5 }}>
          <img 
            src="/assets/images/10X40.webp" 
            alt="10X40 Unit"
            style={{ width: '100%', borderRadius: '5px' }} 
          />
        </Grid>
        <Grid size={{ sm: 4 }} sx={{ alignSelf: 'center'  }}>
          <Typography variant="h4">10X40</Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', fontWeight: '600' }}>
            400 sq. ft. - A whopper. If ya gotta lotta stuff why chuck it? Stick it here and fuhgetta-bouddit. 
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', fontWeight: '600', color: '#ff0000', fontStyle: 'italic' }}>
            Ossipee Location ONLY!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StorageUnits;

