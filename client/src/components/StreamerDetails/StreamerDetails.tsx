import { Box, useTheme, Typography, Link, CircularProgress } from '@mui/material';
import { KeyboardBackspace } from '@mui/icons-material';

import streamerImage from '../../assets/streamer.png';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Streamer } from '../../types';
import useHttp from '../../hooks/useFetchData';
import { BASE_URL_STREAMERS } from '../../constants';

function StreamerDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const { value, isError, isLoading, sendRequest } = useHttp<{ streamer: Streamer }>();
  const streamer = value?.streamer;

  useEffect(() => {
    sendRequest(`${BASE_URL_STREAMERS}/${id}`);
  }, [sendRequest]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyItems="center"
      flexDirection="column"
      sx={{ backgroundColor: '#fff', p: 3, position: 'relative' }}
      borderRadius={theme.shape.borderRadius}
      minHeight="30rem"
    >
      {!isLoading && streamer && (
        <>
          <Box width="16rem" component="img" src={streamerImage} />
          <Typography variant="h3" color="primary">
            {streamer.nick}
          </Typography>
          <Typography variant="subtitle1" mb={1}>
            Available on <strong color="primary">{streamer.platform}</strong>
          </Typography>
          <Typography variant="body1">{streamer.description}</Typography>
          <Link
            onClick={() => navigate('/')}
            sx={{ position: 'absolute', left: 5, top: 5, '&:hover': { cursor: 'pointer' } }}
          >
            <KeyboardBackspace fontSize="large" />
          </Link>
        </>
      )}
      {isLoading && <CircularProgress size={50} />}
      {isError && (
        <Typography fontSize={25} color={theme.palette.primary.main} textAlign="center">
          Something went wrong!
        </Typography>
      )}
    </Box>
  );
}

export default StreamerDetails;
