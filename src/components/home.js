import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Our E-Store!
        </Typography>
        <Typography variant="body1" align="center">
          Choose form the wide range of products. Start shopping now!
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;