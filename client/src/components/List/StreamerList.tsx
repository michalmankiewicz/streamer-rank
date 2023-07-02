import { useEffect } from 'react';
import StreamerItem from './StreamerItem';
import { Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { Streamer } from '../../types';
import { Socket } from 'socket.io-client';
import useHttp from '../../hooks/useFetchData';
import { BASE_URL_STREAMERS } from '../../constants';

type Props = {
  socket: Socket;
};

function StreamerList({ socket }: Props) {
  const theme = useTheme();

  const {
    value,
    isLoading: isFetchLoading,
    isError: isFetchError,
    sendRequest: fetchStreamers,
  } = useHttp<{ streamers: Streamer[] }>();
  const streamers = value?.streamers;

  const { isError: isUpdateStreamerError, sendRequest: updateStreamer } = useHttp();

  useEffect(() => {
    socket.on('streamerAdded', () => {
      fetchStreamers(BASE_URL_STREAMERS);
    });

    socket.on('updateStreamerVote', () => {
      fetchStreamers(BASE_URL_STREAMERS);
    });

    fetchStreamers(BASE_URL_STREAMERS);

    return () => {
      socket.off('streamerAdded');
      socket.off('updateStreamerVote');
    };
  }, [fetchStreamers]);

  const handleUpdateVote = async (streamerId: string, voteType: 'upvotes' | 'downvotes') => {
    await updateStreamer(`${BASE_URL_STREAMERS}/${streamerId}/vote`, 'PUT', { voteType });
    socket.emit('updateStreamerVote');
  };

  return (
    <Box sx={{ mx: 'auto' }}>
      <Stack spacing={2}>
        {isFetchLoading && <CircularProgress size={60} sx={{ mx: 'auto', mt: '10rem' }} />}
        {!isFetchLoading &&
          streamers?.length !== 0 &&
          streamers?.map((str, i) => (
            <StreamerItem
              key={str._id}
              id={str._id}
              nick={str.nick}
              votes={str.upvotes - str.downvotes}
              place={i + 1}
              onHandleUpdateVote={handleUpdateVote}
            />
          ))}
        {!isFetchLoading && streamers?.length === 0 && (
          <Typography fontSize={25} color={theme.palette.primary.main} textAlign="center">
            There is no streamers! Add new one to see list.
          </Typography>
        )}
        {(isFetchError || isUpdateStreamerError) && (
          <Typography fontSize={25} color={theme.palette.primary.main} textAlign="center">
            Something went wrong!
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default StreamerList;
