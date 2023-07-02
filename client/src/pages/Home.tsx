import React from 'react';
import AddStreamerForm from '../components/Form/AddStreamerForm';
import StreamerList from '../components/List/StreamerList';
import { io } from 'socket.io-client';

function Home() {
  const socket = io('http://localhost:3000');

  return (
    <>
      <AddStreamerForm socket={socket} />
      <StreamerList socket={socket} />
    </>
  );
}

export default Home;
