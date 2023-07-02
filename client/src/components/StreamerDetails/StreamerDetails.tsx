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
import api from '../../api/streamers';

import streamerImage from '../../assets/streamer.png';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Streamer } from '../../types';

function StreamerDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  // TODO Without useState
  const [streamer, setStreamer] = useState<Streamer | undefined>();
  const { id } = useParams();

  useEffect(() => {
    const fetchStreamers = async () => {
      try {
        const response = await api.get(`/${id}`);
        setStreamer(response.data.streamer);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStreamers();
  }, []);

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
        {streamer?.nick}
      </Typography>
      <Typography variant="subtitle1" mb={1}>
        Available on <strong color="primary">{streamer?.platform}</strong>
      </Typography>
      <Typography variant="body1">{streamer?.description}</Typography>
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
