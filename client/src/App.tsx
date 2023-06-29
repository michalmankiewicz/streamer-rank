import { Typography, Container, Stack } from '@mui/material';
import AddStreamerForm from './components/Form/AddStreamerForm';
import StreamerList from './components/List/StreamerList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  return (
    <Container maxWidth="md">
      <Stack spacing={3} display="flex" justifyContent="center">
        <Typography textAlign="center" color="primary" variant="h2">
          Streamer Ranking
        </Typography>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </Stack>
    </Container>
  );
}

export default App;
