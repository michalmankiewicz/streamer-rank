import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
  Typography,
  colors,
  Link,
} from '@mui/material';
import { KeyboardBackspace } from '@mui/icons-material';

import streamerImage from '../../assets/streamer.png';

import React from 'react';
import { useNavigate } from 'react-router-dom';

function StreamerDetails() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ backgroundColor: '#fff', p: 3, position: 'relative' }}
      borderRadius={theme.shape.borderRadius}
    >
      <Box width="16rem" component="img" src={streamerImage} />
      <Typography variant="h3" color="primary">
        Nickname
      </Typography>
      <Typography variant="subtitle1" mb={1}>
        Available on <strong color="primary">YouTube</strong>
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum rutrum ligula, a
        vestibulum ipsum elementum ut. Aliquam convallis scelerisque iaculis. Sed iaculis sapien eu
        nulla tincidunt suscipit. Suspendisse aliquam auctor velit, sit amet feugiat ante lacinia a.
        Praesent eleifend.
      </Typography>
      <Link
        onClick={() => navigate('/')}
        sx={{ position: 'absolute', left: 5, top: 5, '&:hover': { cursor: 'pointer' } }}
      >
        <KeyboardBackspace fontSize="large" />
      </Link>
    </Box>
  );
}

export default StreamerDetails;
