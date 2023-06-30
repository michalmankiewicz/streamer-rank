import React from 'react';
import StreamerItem from './StreamerItem';
import { Box, Stack } from '@mui/material';
import { Streamer } from '../../types';

const DUMMY_DATA: Streamer[] = [
  {
    id: '1',
    nick: 'Johnnyyasdsayy',
    platform: 'YouTube',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum rutrum ligula, a vestibulum ipsum elementum ut. Aliquam convallis scelerisque iaculis. Sed iaculis sapien eu nulla tincidunt suscipit. Suspendisse aliquam auctor velit, sit amet feugiat ante lacinia a. Praesent eleifend.',
    votes: 1203,
  },
  {
    id: '2',
    nick: 'Jaaaaaaa',
    platform: 'YouTube',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum rutrum ligula, a vestibulum ipsum elementum ut. Aliquam convallis scelerisque iaculis. Sed iaculis sapien eu nulla tincidunt suscipit. Suspendisse aliquam auctor velit, sit amet feugiat ante lacinia a. Praesent eleifend.',
    votes: 1023,
  },
  {
    id: '3',
    nick: 'JGoustr',
    platform: 'YouTube',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum rutrum ligula, a vestibulum ipsum elementum ut. Aliquam convallis scelerisque iaculis. Sed iaculis sapien eu nulla tincidunt suscipit. Suspendisse aliquam auctor velit, sit amet feugiat ante lacinia a. Praesent eleifend.',
    votes: 10,
  },
  {
    id: '4',
    nick: 'wiwi',
    platform: 'YouTube',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum rutrum ligula, a vestibulum ipsum elementum ut. Aliquam convallis scelerisque iaculis. Sed iaculis sapien eu nulla tincidunt suscipit. Suspendisse aliquam auctor velit, sit amet feugiat ante lacinia a. Praesent eleifend.',
    votes: 1231,
  },
  {
    id: '5',
    nick: 'lulu',
    platform: 'YouTube',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum rutrum ligula, a vestibulum ipsum elementum ut. Aliquam convallis scelerisque iaculis. Sed iaculis sapien eu nulla tincidunt suscipit. Suspendisse aliquam auctor velit, sit amet feugiat ante lacinia a. Praesent eleifend.',
    votes: 213,
  },
  {
    id: '6',
    nick: 'Johnnyyyy',
    platform: 'YouTube',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum rutrum ligula, a vestibulum ipsum elementum ut. Aliquam convallis scelerisque iaculis. Sed iaculis sapien eu nulla tincidunt suscipit. Suspendisse aliquam auctor velit, sit amet feugiat ante lacinia a. Praesent eleifend.',
    votes: 1,
  },
  {
    id: '7',
    nick: 'Johnnyyyy',
    platform: 'YouTube',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum rutrum ligula, a vestibulum ipsum elementum ut. Aliquam convallis scelerisque iaculis. Sed iaculis sapien eu nulla tincidunt suscipit. Suspendisse aliquam auctor velit, sit amet feugiat ante lacinia a. Praesent eleifend.',
    votes: 2,
  },
];

console.log(JSON.stringify(DUMMY_DATA));

function StreamerList() {
  return (
    <Box sx={{ mx: 'auto' }}>
      <Stack spacing={2}>
        {DUMMY_DATA.map((str, i) => (
          <StreamerItem key={str.id} id={str.id} nick={str.nick} votes={str.votes} place={i + 1} />
        ))}
      </Stack>
    </Box>
  );
}

export default StreamerList;
