import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import api from '../../api/streamers';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket;
};

function AddStreamerForm({ socket }: Props) {
  const theme = useTheme();
  const [nickname, setNickname] = useState<string>('');
  // TODO
  const [platform, setPlatform] = useState<string>('');
  const [description, setDescription] = useState<String>('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);
  const handlePlatformChange = (e: SelectChangeEvent) => setPlatform(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('', {
      nick: nickname,
      platform: platform,
      description: description,
    });
    socket.emit('streamerAdded');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      sx={{ backgroundColor: '#fff', p: 2 }}
      borderRadius={theme.shape.borderRadius}
      component="form"
      gap={2}
      onSubmit={handleFormSubmit}
    >
      <TextField
        onChange={handleNicknameChange}
        fullWidth
        id="nick"
        label="Nick"
        variant="filled"
        color="primary"
        size="small"
        value={nickname}
      />
      <FormControl>
        <InputLabel id="platform">Platform</InputLabel>
        <Select
          variant="filled"
          fullWidth
          labelId="platform"
          id="platform"
          label="Platform"
          size="small"
          value={platform}
          onChange={handlePlatformChange}
        >
          <MenuItem value="YouTube">YouTube</MenuItem>
          <MenuItem value="Twitch">Twitch</MenuItem>
          <MenuItem value="TikTok">TikTok</MenuItem>
          <MenuItem value="Kick">Kick</MenuItem>
          <MenuItem value="Rumble">Rumble</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        multiline
        id="description"
        label="Description"
        variant="filled"
        size="small"
        value={description}
        onChange={handleDescriptionChange}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

export default AddStreamerForm;
