import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

export default function ProgressBar({ completedPercent }) {
  return (
    <Box className="w-full my-4">
      <Typography variant="body2" sx={{mb: 1}}>Completed: {Math.round(completedPercent)}%</Typography>
      <LinearProgress variant="determinate" value={completedPercent} />
    </Box>
  );
}

