import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box className="text-center py-20">
      <Typography variant="h3" className="mb-4">404 - Not Found</Typography>
      <Typography className="mb-6">The page you are looking for does not exist.</Typography>
      <Button variant="contained" component={Link} to="/">Go Home</Button>
    </Box>
  );
}

