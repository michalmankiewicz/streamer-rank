import { Typography, Container, Stack } from '@mui/material';
import AddStreamerForm from './components/Form/AddStreamerForm';
import StreamerList from './components/List/StreamerList';

function App() {
  return (
    <Container maxWidth="md">
      <Stack spacing={3} display="flex" justifyContent="center">
        <Typography textAlign="center" color="primary" variant="h2">
          Streamer Ranking
        </Typography>
        <AddStreamerForm />
        <StreamerList />
      </Stack>
    </Container>
  );
}

export default App;
