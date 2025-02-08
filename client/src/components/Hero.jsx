import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import './Hero.css';
import Grow from '@mui/material/Grow';

const Hero = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showH2, setShowH2] = useState(false);
  const [showH3, setShowH3] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 500);
    setTimeout(() => setShowH2(true), 1000);
    setTimeout(() => setShowH3(true), 1500);
  }, []);

  return (
    <div className="heroStyle">
      <div className="overlayStyle"></div>
      <div className="contentStyle">
        <Box component="div" sx={{ width: '100%', height: 'auto', backgroundColor: 'rgba(44, 134, 124, 0.8)', padding: '1rem', boxShadow: 'inset 0 0 5px #000', borderRadius: '10px' }} >
          <Grow in={showLogo}>
            <img src="/assets/images/clarke-logo.svg" alt="Clarke logo" width="250" height="auto" />
          </Grow>
        </Box>
        <Grow in={showH2}>
          <h2>Put your car back in the garage!</h2>
        </Grow>
        <Grow in={showH3}>
          <h3>Store your rarely used or seasonal items with us.</h3>
        </Grow>
      </div>
    </div>
  );
};

export default Hero;