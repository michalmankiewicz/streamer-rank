import React from 'react';
import AddStreamerForm from '../components/Form/AddStreamerForm';
import StreamerList from '../components/List/StreamerList';

function Home() {
  return (
    <>
      <AddStreamerForm />
      <StreamerList />
    </>
  );
}

export default Home;
