import React, { useEffect, useState } from 'react';
import StreamerItem from './StreamerItem';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { Streamer } from '../../types';
import api from '../../api/streamers';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket;
};

function StreamerList({ socket }: Props) {
  const [streamers, setStreamers] = useState<Streamer[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  console.log(streamers);
  console.log(socket);

  useEffect(() => {
    const fetchStreamers = async () => {
      try {
        setIsLoading(true);
        console.log('FETCHING');
        const response = await api.get('');
        setStreamers(response.data.streamers);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    socket.on('streamerAdded', () => {
      fetchStreamers(); // Fetch updated streamer list on event
    });

    socket.on('updateStreamerVote', () => {
      fetchStreamers(); // Fetch updated streamer list on event
    });

    fetchStreamers();
  }, []);

  const handleUpdateVote = async (streamerId: string, voteType: 'upvotes' | 'downvotes') => {
    await api.put(`/${streamerId}/vote`, { voteType });
    socket.emit('updateStreamerVote');
  };

  return (
    <Box sx={{ mx: 'auto' }}>
      <Stack spacing={2}>
        {isLoading && <CircularProgress size={60} sx={{ mx: 'auto', mt: '10rem' }} />}
        {!isLoading &&
          streamers &&
          streamers.map((str, i) => (
            <StreamerItem
              key={str._id}
              id={str._id}
              nick={str.nick}
              votes={str.upvotes - str.downvotes}
              place={i + 1}
              onHandleUpdateVote={handleUpdateVote}
            />
          ))}
      </Stack>
    </Box>
  );
}

export default StreamerList;
