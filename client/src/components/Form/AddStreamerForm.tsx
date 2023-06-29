import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import React from 'react';

function AddStreamerForm() {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      sx={{ backgroundColor: '#fff', p: 2 }}
      borderRadius={theme.shape.borderRadius}
      component="form"
      gap={2}
    >
      <TextField fullWidth id="nick" label="Nick" variant="filled" color="primary" size="small" />
      <FormControl>
        {' '}
        <InputLabel id="platform">Platform</InputLabel>
        <Select
          variant="filled"
          fullWidth
          labelId="platform"
          id="platform"
          label="Platform"
          size="small"
        >
          <MenuItem value={10}>Youtube</MenuItem>
          <MenuItem value={20}>Twitch</MenuItem>
          <MenuItem value={30}>TikTok</MenuItem>
          <MenuItem value={30}>Kick</MenuItem>
          <MenuItem value={30}>Rumble</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        multiline
        id="description"
        label="Description"
        variant="filled"
        size="small"
      />
      <Button variant="contained">Submit</Button>
    </Box>
  );
}

export default AddStreamerForm;
