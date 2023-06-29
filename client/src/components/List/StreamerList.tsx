import React from 'react';
import StreamerItem from './StreamerItem';
import { Box, Stack } from '@mui/material';

function StreamerList() {
  return (
    <Box sx={{ mx: 'auto' }}>
      <Stack spacing={2}>
        <StreamerItem />
        <StreamerItem />
        <StreamerItem />
        <StreamerItem />
        <StreamerItem />
      </Stack>
    </Box>
  );
}

export default StreamerList;
