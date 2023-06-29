import { Box, Typography, useTheme } from '@mui/material';
import { ThumbUp, ThumbDown, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import React from 'react';

function StreamerItem() {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ backgroundColor: '#fff', borderRadius: theme.shape.borderRadius, p: 2 }}
    >
      <Box display="flex" gap={1} alignItems="flex-end">
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          sx={
            {
              // backgroundColor: theme.palette.primary.main,
              // p: 1.2,
              // borderRadius: theme.shape.borderRadius,
            }
          }
        >
          1.
        </Typography>
        <Typography variant="h5" fontWeight="bold" mb={0.3}>
          Streamer Nick
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <ThumbUp
          fontSize="large"
          sx={{ '&:hover': { color: theme.palette.primary.main, cursor: 'pointer' } }}
        />
        <Typography variant="h4" color="primary" fontWeight="bold">
          5
        </Typography>
        <ThumbDown
          fontSize="large"
          sx={{ '&:hover': { color: theme.palette.primary.main, cursor: 'pointer' } }}
        />
      </Box>
    </Box>
  );
}

export default StreamerItem;
